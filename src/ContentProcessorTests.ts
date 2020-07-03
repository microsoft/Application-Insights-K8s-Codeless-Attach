import assert = require("assert");
import { ContentProcessor } from "./ContentProcessor";
import { logger } from "./LoggerWrapper";
import test = require("./UnitTest1");
(async () => {
    logger.info("\n\n\nTestNullObject\n\n\n");
    await test.TestNullObject();
    logger.info("\n\n\nTestConstructor\n\n\n");
    await test.TestConstructor();
    logger.info("\n\n\nTestInvalidJSON\n\n\n");
    await test.TestInvalidJSON();
    logger.info("\n\n\nTestValidObject\n\n\n");
    await test.TestValidObject();
    logger.info("\n\n\nTestValidObject2\n\n\n");
    await test.TestValidObject2();
    logger.info("\n\n\nTestValidObject3\n\n\n");
    await test.TestValidObject3();
    logger.info("\n\n\nSUCCESS\n\n\n");
})();