import assert = require("assert");
import { ContentProcessor } from "./ContentProcessor";

export function TestNullObject() {
    assert.deepEqual('{"response":{"allowed":false,"patch":"","patchtype":"JSONPATCH","uid":""}}',
        ContentProcessor.TryUpdateConfig(null),
        "expect null");
}

export function TestConstructor() {
    assert.deepEqual('{"response":{"allowed":false,"patch":"","patchtype":"JSONPATCH","uid":""}}',
        ContentProcessor.TryUpdateConfig("{}"),
        "should return json");
}

export function TestInvalidJSON() {
    const something = "dsasda";
    assert.deepEqual('{"response":{"allowed":false,"patch":"","patchtype":"JSONPATCH","uid":""}}',
        ContentProcessor.TryUpdateConfig(something),
        "expect something");
}

export function TestValidObject() {
    assert.deepEqual(JSON.stringify(validResult),
        ContentProcessor.TryUpdateConfig(testObject),
        "some valid other json");
}

export function TestValidInvalidObject() {
    assert.deepEqual({
        response: {
            allowed: false,
            patch: "",
            patchtype: "JSONPATCH",
            uid: "6e55578b-9c4f-11e9-9685-b65b44598b61",
        },
    },
        JSON.parse(ContentProcessor.TryUpdateConfig(getInvalidObject())),
        "fails validation");
}
// [[gearama]] multiple containers within the same pod
function getInvalidObject() {
    const test = JSON.parse(testObject);
    test.kind = "some other kind";
    return JSON.stringify(test);
}
/* tslint:disable */
const testObject = JSON.stringify({
    kind: "AdmissionReview",
    apiVersion: "admission.k8s.io/v1beta1",
    request: {
        uid: "6e55578b-9c4f-11e9-9685-b65b44598b61",
        kind: {
            group: "apps",
            version: "v1beta1",
            kind: "Deployment",
        },
        resource: {
            group: "apps",
            version: "v1beta1",
            resource: "deployments",
        },
        namespace: "default",
        operation: "CREATE",
        userInfo: {
            username: "masterclient",
            groups: ["system:masters", "system:authenticated"],
        },
        object: {
            kind: "Deployment",
            apiVersion: "apps/v1beta1",
            metadata: {
                name: "spring-simple",
                namespace: "default",
                creationTimestamp: "None",
                labels: {
                    app: "spring-simple",
                },
                annotations: {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apps/v1beta1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"name\":\"spring-simple\",\"namespace\":\"default\"},\"spec\":{\"minReadySeconds\":5,\"replicas\":1,\"strategy\":{\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":1}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"spring-simple\"}},\"spec\":{\"containers\":[{\"image\":\"tamhariacr.azurecr.io/spring-simple:v1\",\"name\":\"spring-simple\",\"ports\":[{\"containerPort\":8080}],\"resources\":{\"limits\":{\"cpu\":\"200m\"},\"requests\":{\"cpu\":\"150m\"}}}],\"nodeSelector\":{\"beta.kubernetes.io/os\":\"linux\"}}}}}\n",
                },
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        app: "spring-simple",
                    },
                },
                template: {
                    metadata: {
                        creationTimestamp: "None",
                        labels: {
                            app: "spring-simple",
                        },
                    },
                    spec: {
                        containers: [{
                            name: "spring-simple",
                            image: "tamhariacr.azurecr.io/spring-simple:v1",
                            ports: [{
                                containerPort: 8080,
                                protocol: "TCP",
                            }],
                            resources: {
                                limits: {
                                    cpu: "200m",
                                },
                                requests: {
                                    cpu: "150m",
                                },
                            },
                            terminationMessagePath: "/dev/termination-log",
                            terminationMessagePolicy: "File",
                            imagePullPolicy: "IfNotPresent",
                        }],
                        restartPolicy: "Always",
                        terminationGracePeriodSeconds: 30,
                        dnsPolicy: "ClusterFirst",
                        nodeSelector: {
                            "beta.kubernetes.io/os": "linux",
                        },
                        securityContext: {},
                        schedulerName: "default-scheduler",
                    },
                },
                strategy: {
                    type: "RollingUpdate",
                    rollingUpdate: {
                        maxUnavailable: 1,
                        maxSurge: 1,
                    },
                },
                minReadySeconds: 5,
                revisionHistoryLimit: 2,
                progressDeadlineSeconds: 600,
            },
            status: {},
        },
        oldObject: "None",
        dryRun: "False",
    },
});

const validResult = {
    response: {
        allowed: true,
        patch: [
            {
                op: "add",
                path: "/spec/template/spec/volumes",
                value: [
                    {
                        name: "agent-volume",
                        persistentVolumeClaim: {
                            claimName: "agent-disk",
                        },
                    },
                ],
            },
            {
                op: "add",
                path: "/spec/template/spec/initContainers",
                value: [
                    {
                        command: [
                            "cp",
                            "/java-agent-v1.jar",
                            "/agentconfig/java-agent-v1.jar",
                        ],
                        image: "mcr.microsoft.com/applicationinsights/attach-agents:v5",
                        name: "agent-init",
                        volumeMounts: [
                            {
                                mountPath: "/agentconfig",
                                name: "agentdisk",
                            },
                        ],
                    },
                ],
            },
            {
                op: "add",
                path: "/spec/template/spec/containers/0",
                value: {
                    name: "spring-simple",
                    image: "tamhariacr.azurecr.io/spring-simple:v1",
                    ports: [
                        {
                            containerPort: 8080,
                            protocol: "TCP",
                        },
                    ],
                    resources: {
                        limits: {
                            cpu: "200m",
                        },
                        requests: {
                            cpu: "150m",
                        },
                    },
                    terminationMessagePath: "/dev/termination-log",
                    terminationMessagePolicy: "File",
                    imagePullPolicy: "IfNotPresent",
                    env: [
                        {
                            name: "_JAVA_OPTIONS",
                            value: "-javaagent:/agentconfig/java-agent-v1.jar",
                        },
                        {
                            name: "JAVA_TOOL_OPTIONS",
                            value: "-javaagent:/agentconfig/java-agent-v1.jar",
                        },
                        {
                            name: "ASPNETCORE_HOSTINGSTARTUP",
                            value: "/agentconfig/aspnetcore-agent-v1.dll",
                        },
                        {
                            name: "NODE_OPTIONS",
                            value: "/agentconfig/nodejs-agent-v1.js",
                        },
                        {
                            name: "APPINSIGHTS_CONNECTIONSTRING",
                            valueFrom: {
                                configMapKeyRef: {
                                    key: "ikey",
                                    name: "attach-config",
                                },
                            },
                        },
                    ],
                    volumeMounts: [
                        {
                            mountPath: "/agentconfig",
                            name: "agent-volume",
                        },
                    ],
                },
            },
            {
                op: "test",
                path: "/spec/template/spec/containers/1",
                value: {
                    name: "spring-simple",
                    image: "tamhariacr.azurecr.io/spring-simple:v1",
                    ports: [
                        {
                            containerPort: 8080,
                            protocol: "TCP",
                        },
                    ],
                    resources: {
                        limits: {
                            cpu: "200m",
                        },
                        requests: {
                            cpu: "150m",
                        },
                    },
                    terminationMessagePath: "/dev/termination-log",
                    terminationMessagePolicy: "File",
                    imagePullPolicy: "IfNotPresent",
                },
            },
            {
                op: "remove",
                path: "/spec/template/spec/containers/1",
            },
        ],
        patchtype: "JSONPATCH",
        uid: "6e55578b-9c4f-11e9-9685-b65b44598b61",
    },
};
/* tslint:enable */
