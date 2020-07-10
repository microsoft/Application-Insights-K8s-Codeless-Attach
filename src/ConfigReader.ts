import toml = require("toml");
import fs = require('fs');
import { logger } from "./LoggerWrapper";
import { AddonConfig} from './AddonConfig';

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
            fs.stat(file, (error, stats) => {
                if (error) {
                    logger.info(`could not find file ${file}`)
                    resolve(this.CurrentConfig);
                }else if (stats.ctime !== this.CurrentConfig.configTime) {
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
