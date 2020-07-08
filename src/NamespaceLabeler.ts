import { ConfigReader, AddonConfig } from "./ConfigReader"
import { setTimeout } from "timers";
import k8s = require("@kubernetes/client-node");
import { logger } from "./LoggerWrapper";
import { V1Namespace } from "@kubernetes/client-node";

export class NamespaceLabeler {
    private delay: number = 15 * 60 * 1000

    private loop(delay?: number) {
        if (delay != null || delay == 0) {
            this.delay = delay*60*1000;
        }

        setTimeout(async () => {
            logger.info("relooping")
            await this.labelNamespace();
        }, this.delay)
    }

    private async labelNamespace():Promise<any> {
        return ConfigReader.ReadConfig()
            .then((config:AddonConfig) => {
                logger.info(`got config ${JSON.stringify(config)}`);
                const kc = new k8s.KubeConfig();
                kc.loadFromDefault();
                const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
                k8s.V1Namespace
                return k8sApi.listNamespace().then((result) => {
                    logger.info(`got namespace list ${JSON.stringify(result)}`);
                    const namespaceList = result.body.items;
                    namespaceList.forEach((item: V1Namespace) => {
                        const patchPayload = item;
                        if (patchPayload.metadata.labels == null) {
                            patchPayload.metadata.labels = {};
                        }
                        patchPayload.metadata.labels["app-monitoring"] =
                            config.excludedNamespaces.indexOf(item.metadata.name) < 0 ?
                            "enable" : "disabled";
                        logger.info(`attempt patch ${JSON.stringify(patchPayload)}`)
                        patchPayload.kind
                        return k8sApi.patchNamespace(item.metadata.name, patchPayload, undefined, undefined, undefined, undefined,
                            {
                                headers: {
                                    "Content-Type": "application/merge-patch+json"
                                }
                            }).
                            then(response => {
                                logger.info(`patched namnespace ${JSON.stringify(response)}`);
                            }).
                            catch(error => {
                                logger.error(`failed patch namespace ${JSON.stringify(error)}`);
                            })
                    })
                }).catch(error => {
                    logger.error(`failed to list namespaces${error}`)
                })
            }).then(() => {
                logger.info(`rescheduling loop in ${this.delay} minutes` )
                this.loop(this.delay);
            })
    }

    public static Start(delay: number) {
        const instance = new NamespaceLabeler();
        instance.loop(delay);
    }
}