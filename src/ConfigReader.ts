import toml = require("toml");
import fs = require('fs');
import { logger } from "./LoggerWrapper";
import { SettingsRoot } from "./ConfigTypes"

export class ConfigReader {
    private readonly configPath = "/mnt/settings/application-monitoring-settings";

    public static async ReadConfig(file?: string): Promise<AddonConfig> {
        let instance: ConfigReader;
        instance = new ConfigReader();
        const filePath: string = file!=null ? file : instance.configPath;
        let config: AddonConfig = new AddonConfig(null);
        return new Promise<AddonConfig>((resolve, rejectfs) => {
            logger.info(`attermpting to read ${filePath}`);

            fs.readFile(file, (err, data) => {
                if (!err) {
                    const fileContent = data.toString();
                    logger.info(`read config content ${fileContent}`);
                    const parsedContent = toml.parse(fileContent)
                    config = new AddonConfig(parsedContent);
                } else {
                    logger.info(`config does not exist, using defaults`);
                }
                logger.info(`excluded namespaces ${config.excludedNamespaces}`);
                resolve(config);
            })
        }).catch(err => {
            logger.error(`${err}`);
            return config;
        })

    }
}

export class AddonConfig {
    private namespaces: string[] = ["kube-system"];

    public constructor(namespace_list: SettingsRoot) {
        if (namespace_list == null ||
            namespace_list["application-monitoring-settings"] == null ||
            namespace_list["application-monitoring-settings"].namespaces.excluded == null ||
            namespace_list["application-monitoring-settings"].namespaces.excluded.length == 0) {
            return;
        }
        const targets: string[] = namespace_list["application-monitoring-settings"].namespaces.excluded;
        targets.forEach((item) => {
            if (this.namespaces.indexOf(item) < 0) {
                this.namespaces.push(item);
            }
        })
    }

    public get excludedNamespaces(): string[] {
        return this.namespaces;
    }
}