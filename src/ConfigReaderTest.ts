import assert = require('assert');
import { ConfigReader, AddonConfig } from './ConfigReader'

describe("ConfigReader", () => {
    it("no file", async () => {
        const result: AddonConfig = await ConfigReader.ReadConfig("");
        assert.deepEqual(["kube-system"], result.excludedNamespaces,
            "should be equal");
    })

    it("file1", async () => {
        const result: AddonConfig = await ConfigReader.ReadConfig("./extras/content1");
        assert.deepEqual(["kube-system"], result.excludedNamespaces,
            "should be equal");
    })

    it("file2", async () => {
        const result: AddonConfig = await ConfigReader.ReadConfig("./extras/content2");
        assert.deepEqual(["default", "goqu", "kube-system"], result.excludedNamespaces.sort(),
            "should be equal");
    })

    it("file3", async () => {
        const result: AddonConfig = await ConfigReader.ReadConfig("./extras/content3");
        assert.deepEqual(["kube-system"], result.excludedNamespaces,
            "should be equal");
    })

    it("file4", async () => {
        const result: AddonConfig = await ConfigReader.ReadConfig("./extras/content4");
        assert.deepEqual(["kube-system"], result.excludedNamespaces,
            "should be equal");
    })
})
