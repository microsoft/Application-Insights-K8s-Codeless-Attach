import toml = require("toml");
import fs = require('fs');
import { logger } from "./LoggerWrapper";
import { SettingsRoot } from "./ConfigTypes"
import { Data } from "ws";

export class ConfigReader {
    private readonly configPath = "/mnt/settings/application-monitoring-settings";
    private static CurrentConfig: AddonConfig;

    public static async ReadConfig(file?: string): Promise<AddonConfig> {
        if (this.CurrentConfig == null) {
            this.CurrentConfig = new AddonConfig(new Date(-1), null)
        }
        let instance: ConfigReader;
        instance = new ConfigReader();
        const filePath: string = file != null ? file : instance.configPath;

        return new Promise<AddonConfig>((resolve, reject) => {
            fs.stat(file, (err, stats) => {
                if (err) {
                    logger.info(`could not find file ${file}`)
                    resolve(this.CurrentConfig);
                }else if (stats.ctime != this.CurrentConfig.configTime) {
                    logger.info(`timestamp ${stats.ctime} with config timestamp ${this.CurrentConfig.configTime}doesn't match attempting to read ${filePath}`);
                    fs.readFile(file, (err, data) => {
                        if (!err) {
                            const fileContent = data.toString();
                            logger.info(`read config content ${fileContent}`);
                            const parsedContent = toml.parse(fileContent)
                            this.CurrentConfig = new AddonConfig(stats.ctime, parsedContent);
                        } else {
                            logger.info(`config does not exist, using defaults`);
                        }

                        logger.info(`excluded namespaces ${this.CurrentConfig.excludedNamespaces}`);
                        resolve(this.CurrentConfig);
                    })
                } else {
                    logger.info(`no config change detected. timestamp ${stats.ctime}`);
                    resolve(this.CurrentConfig);
                }
            })
        }).catch(err => {
            logger.error(`${err}`);
            return this.CurrentConfig;
        })

    }
}

export class AddonConfig {
    private namespaces: string[] = ["kube-system"];
    private iKeys: Map<string, string> = new Map<string, string>();
    private timestamp: Date;
    public constructor(timestamp: Date, entries: SettingsRoot) {
        this.timestamp = timestamp
        this.iKeys.set("ALL_DEFAULT", process.env.ALL_APPINSIGHTS_INSTRUMENTATIONKEY);
        if (entries != null &&
            entries["application-monitoring-settings"] != null &&
            entries["application-monitoring-settings"].namespaces != null &&
            entries["application-monitoring-settings"].namespaces.excluded != null &&
            entries["application-monitoring-settings"].namespaces.excluded.length != 0) {

            const targets: string[] = entries["application-monitoring-settings"].namespaces.excluded;
            targets.forEach((item) => {
                if (this.namespaces.indexOf(item) < 0) {
                    this.namespaces.push(item);
                }
            })
        }

        if (entries != null &&
            entries.IKEYS != null &&
            entries.IKEYS.length > 0) {
            entries.IKEYS.forEach((item) => {
                this.iKeys.set(item.namespace, item.ikey)
            })
        }
    }

    public get excludedNamespaces(): string[] {
        return this.namespaces;
    }

    public get namespaceTarget(): Map<string, string> {
        return this.iKeys;
    }

    public retrieveIkey(namespace: string): string {
        if (this.iKeys.has(namespace)) {
            return this.iKeys.get(namespace);
        }
        return this.iKeys.get("ALL_DEFAULT");
    }

    public get configTime(): Date {
        return this.timestamp;
    }
}