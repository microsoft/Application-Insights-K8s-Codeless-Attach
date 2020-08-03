import { ConfigReader } from "./ConfigReader"
import { AddonConfig } from './AddonConfig';
import { setTimeout } from "timers";
import k8s = require("@kubernetes/client-node");
import { logger } from "./LoggerWrapper";
import { V1Namespace } from "@kubernetes/client-node";
import { should } from "chai";

export class NamespaceLabeler {
    private delay: number = 15 * 60 * 1000

    private async labelNamespace():Promise<any> {
        return ConfigReader.ReadConfig()
            .then((config:AddonConfig) => {
                logger.info(`got config`, config);
                const kc = new k8s.KubeConfig();
                kc.loadFromDefault();
                const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

                return k8sApi.listNamespace().then((result) => {
                    logger.info(`got namespace list`,result);
                    const namespaceList = result.body.items;
                    namespaceList.forEach((item: V1Namespace) => {
                        const patchPayload = item;
                        if (patchPayload.metadata.labels == null) {
                            patchPayload.metadata.labels = {};
                        }
                        let shouldPatch:boolean = false;
                        if (config.excludedNamespaces.indexOf(item.metadata.name) < 0) {
                            if (patchPayload.metadata.labels["app-monitoring"] !== "enable") {
                                patchPayload.metadata.labels["app-monitoring"] = "enable";
                                shouldPatch = true;
                            }
                        } else {
                            if (patchPayload.metadata.labels["app-monitoring"] === "enabled") {
                                patchPayload.metadata.labels["app-monitoring"] = undefined;
                            }
                            shouldPatch = true;
                        }

                        if (shouldPatch === true) {
                            logger.info(`attempt patch `, patchPayload)

                            return k8sApi.patchNamespace(item.metadata.name, patchPayload, undefined, undefined, undefined, undefined,
                                {
                                    headers: {
                                        "Content-Type": "application/merge-patch+json"
                                    }
                                }).
                                then(response => {
                                    logger.info(`patched namnespace `, response);
                                }).
                                catch(error => {
                                    logger.error(`failed patch namespace `, error);
                                })
                        }
                        else {
                            logger.info(`no need to patch namespace`,patchPayload.metadata.name)
                        }
                    })
                }).catch(error => {
                    logger.error(`failed to list namespaces`, error )
                })
            }).then(() => {
                logger.info(`rescheduling loop in ${this.delay/60000} minutes` )
                setTimeout(async () => {
                    logger.info(`loop started `)
                    await this.labelNamespace();
                }, this.delay)
            })
    }

    public static async Start(delay: number) {
        const instance = new NamespaceLabeler();
        if (delay > 0) {
            instance.delay = delay * 60 * 1000;
        }
        await instance.labelNamespace();
    }
}