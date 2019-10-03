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

export function TestValidObject2() {
    assert.deepEqual(JSON.stringify(response2),
        ContentProcessor.TryUpdateConfig(testObject2),
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
    "response": {
        "allowed": true,
        "patch": [
            {
                "op": "add",
                "path": "/spec/template/spec/volumes",
                "value": [
                    {
                        "name": "agent-volume",
                        "persistentVolumeClaim": {
                            "claimName": "agent-disk"
                        }
                    }
                ]
            },
            {
                "op": "add",
                "path": "/spec/template/spec/initContainers",
                "value": [
                    {
                        "command": [
                            "cp",
                            "/applicationinsights-agent-codeless.jar",
                            "/agentconfig/applicationinsights-agent-codeless.jar"
                        ],
                        "image": "mcr.microsoft.com/applicationinsights/codeless-attach/mutating-webhook-agents:dev3",
                        "name": "agent-init",
                        "volumeMounts": [
                            {
                                "mountPath": "/agentconfig",
                                "name": "agentdisk"
                            }
                        ]
                    }
                ]
            },
            {
                "op": "add",
                "path": "/spec/template/spec/containers/0",
                "value": {
                    "name": "spring-simple",
                    "image": "tamhariacr.azurecr.io/spring-simple:v1",
                    "ports": [
                        {
                            "containerPort": 8080,
                            "protocol": "TCP"
                        }
                    ],
                    "resources": {
                        "limits": {
                            "cpu": "200m"
                        },
                        "requests": {
                            "cpu": "150m"
                        }
                    },
                    "terminationMessagePath": "/dev/termination-log",
                    "terminationMessagePolicy": "File",
                    "imagePullPolicy": "IfNotPresent",
                    "env": [
                        {
                            "name": "_JAVA_OPTIONS",
                            "value": "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar"
                        },
                        {
                            "name": "JAVA_TOOL_OPTIONS",
                            "value": "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar"
                        },
                        {
                            "name": "ASPNETCORE_HOSTINGSTARTUP",
                            "value": "/agentconfig/aspnetcore-agent-v1.dll"
                        },
                        {
                            "name": "NODE_OPTIONS",
                            "value": "/agentconfig/nodejs-agent-v1.js"
                        },
                        {
                            "name": "APPINSIGHTS_CONNECTIONSTRING",
                            "valueFrom": {
                                "configMapKeyRef": {
                                    "key": "ikey",
                                    "name": "attach-config"
                                }
                            }
                        }
                    ],
                    "volumeMounts": [
                        {
                            "mountPath": "/agentconfig",
                            "name": "agent-volume"
                        }
                    ]
                }
            },
            {
                "op": "test",
                "path": "/spec/template/spec/containers/1",
                "value": {
                    "name": "spring-simple",
                    "image": "tamhariacr.azurecr.io/spring-simple:v1",
                    "ports": [
                        {
                            "containerPort": 8080,
                            "protocol": "TCP"
                        }
                    ],
                    "resources": {
                        "limits": {
                            "cpu": "200m"
                        },
                        "requests": {
                            "cpu": "150m"
                        }
                    },
                    "terminationMessagePath": "/dev/termination-log",
                    "terminationMessagePolicy": "File",
                    "imagePullPolicy": "IfNotPresent"
                }
            },
            {
                "op": "remove",
                "path": "/spec/template/spec/containers/1"
            }
        ],
        "patchtype": "JSONPATCH",
        "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61"
    }
};

let testObject2 = JSON.stringify({
    "kind": "AdmissionReview",
    "apiVersion": "admission.k8s.io/v1beta1",
    "request": {
        "uid": "cf481665-e586-11e9-8636-beff4de305b8",
        "kind": {
            "group": "",
            "version": "v1",
            "kind": "Pod"
        },
        "resource": {
            "group": "",
            "version": "v1",
            "resource": "pods"
        },
        "namespace": "default",
        "operation": "CREATE",
        "userInfo": {
            "username": "aksService",
            "groups": [
                "system:masters",
                "system:authenticated"
            ]
        },
        "object": {
            "kind": "Pod",
            "apiVersion": "v1",
            "metadata": {
                "generateName": "quieting-garfish-ibm-ope-7459f598b4-",
                "creationTimestamp": null,
                "labels": {
                    "app": "quieting-garfish-ibm-ope",
                    "chart": "ibm-open-liberty-spring-1.10.0",
                    "heritage": "Tiller",
                    "pod-template-hash": "7459f598b4",
                    "release": "quieting-garfish"
                },
                "annotations": {
                    "productID": "OpenLiberty_67365423789_18002_151_00000",
                    "productName": "Open Liberty",
                    "productVersion": "19.0.0.5"
                },
                "ownerReferences": [
                    {
                        "apiVersion": "apps/v1",
                        "kind": "ReplicaSet",
                        "name": "quieting-garfish-ibm-ope-7459f598b4",
                        "uid": "b67a9438-e586-11e9-8636-beff4de305b8",
                        "controller": true,
                        "blockOwnerDeletion": true
                    }
                ]
            },
            "spec": {
                "volumes": [
                    {
                        "name": "liberty-overrides",
                        "configMap": {
                            "name": "quieting-garfish-ibm-ope",
                            "items": [
                                {
                                    "key": "include-configmap.xml",
                                    "path": "include-configmap.xml"
                                }
                            ],
                            "defaultMode": 420
                        }
                    },
                    {
                        "name": "liberty-config",
                        "configMap": {
                            "name": "quieting-garfish-ibm-ope",
                            "defaultMode": 420
                        }
                    },
                    {
                        "name": "quieting-garfish-ibm-ope-token-njwn6",
                        "secret": {
                            "secretName": "quieting-garfish-ibm-ope-token-njwn6"
                        }
                    }
                ],
                "containers": [
                    {
                        "name": "ibm-open-liberty-spring",
                        "image": "openliberty/open-liberty:springBoot2-ubi-min",
                        "env": [
                            {
                                "name": "WLP_LOGGING_CONSOLE_FORMAT",
                                "value": "json"
                            },
                            {
                                "name": "WLP_LOGGING_CONSOLE_LOGLEVEL",
                                "value": "info"
                            },
                            {
                                "name": "WLP_LOGGING_CONSOLE_SOURCE",
                                "value": "message,trace,accessLog,ffdc"
                            },
                            {
                                "name": "KUBERNETES_NAMESPACE",
                                "valueFrom": {
                                    "fieldRef": {
                                        "apiVersion": "v1",
                                        "fieldPath": "metadata.namespace"
                                    }
                                }
                            },
                            {
                                "name": "IIOP_ENDPOINT_HOST",
                                "valueFrom": {
                                    "fieldRef": {
                                        "apiVersion": "v1",
                                        "fieldPath": "status.podIP"
                                    }
                                }
                            },
                            {
                                "name": "KEYSTORE_REQUIRED",
                                "value": "true"
                            }
                        ],
                        "resources": {},
                        "volumeMounts": [
                            {
                                "name": "liberty-overrides",
                                "readOnly": true,
                                "mountPath": "/config/configDropins/overrides/include-configmap.xml",
                                "subPath": "include-configmap.xml"
                            },
                            {
                                "name": "liberty-config",
                                "readOnly": true,
                                "mountPath": "/etc/wlp/configmap"
                            },
                            {
                                "name": "quieting-garfish-ibm-ope-token-njwn6",
                                "readOnly": true,
                                "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                            }
                        ],
                        "livenessProbe": {
                            "httpGet": {
                                "path": "/",
                                "port": 9443,
                                "scheme": "HTTPS"
                            },
                            "initialDelaySeconds": 20,
                            "timeoutSeconds": 1,
                            "periodSeconds": 5,
                            "successThreshold": 1,
                            "failureThreshold": 3
                        },
                        "readinessProbe": {
                            "httpGet": {
                                "path": "/",
                                "port": 9443,
                                "scheme": "HTTPS"
                            },
                            "initialDelaySeconds": 2,
                            "timeoutSeconds": 1,
                            "periodSeconds": 5,
                            "successThreshold": 1,
                            "failureThreshold": 3
                        },
                        "terminationMessagePath": "/dev/termination-log",
                        "terminationMessagePolicy": "File",
                        "imagePullPolicy": "IfNotPresent",
                        "securityContext": {
                            "capabilities": {
                                "drop": [
                                    "ALL"
                                ]
                            },
                            "privileged": false,
                            "readOnlyRootFilesystem": false,
                            "allowPrivilegeEscalation": false
                        }
                    }
                ],
                "restartPolicy": "Always",
                "terminationGracePeriodSeconds": 30,
                "dnsPolicy": "ClusterFirst",
                "serviceAccountName": "quieting-garfish-ibm-ope",
                "serviceAccount": "quieting-garfish-ibm-ope",
                "securityContext": {
                    "runAsUser": 1001,
                    "runAsNonRoot": true
                },
                "imagePullSecrets": [
                    {
                        "name": "sa-default"
                    }
                ],
                "affinity": {
                    "nodeAffinity": {
                        "requiredDuringSchedulingIgnoredDuringExecution": {
                            "nodeSelectorTerms": [
                                {
                                    "matchExpressions": [
                                        {
                                            "key": "beta.kubernetes.io/arch",
                                            "operator": "In",
                                            "values": [
                                                "amd64",
                                                "ppc64le",
                                                "s390x"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "preferredDuringSchedulingIgnoredDuringExecution": [
                            {
                                "weight": 2,
                                "preference": {
                                    "matchExpressions": [
                                        {
                                            "key": "beta.kubernetes.io/arch",
                                            "operator": "In",
                                            "values": [
                                                "amd64"
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "weight": 2,
                                "preference": {
                                    "matchExpressions": [
                                        {
                                            "key": "beta.kubernetes.io/arch",
                                            "operator": "In",
                                            "values": [
                                                "ppc64le"
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "weight": 2,
                                "preference": {
                                    "matchExpressions": [
                                        {
                                            "key": "beta.kubernetes.io/arch",
                                            "operator": "In",
                                            "values": [
                                                "s390x"
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "podAntiAffinity": {
                        "preferredDuringSchedulingIgnoredDuringExecution": [
                            {
                                "weight": 100,
                                "podAffinityTerm": {
                                    "labelSelector": {
                                        "matchExpressions": [
                                            {
                                                "key": "app",
                                                "operator": "In",
                                                "values": [
                                                    "quieting-garfish-ibm-ope"
                                                ]
                                            },
                                            {
                                                "key": "release",
                                                "operator": "In",
                                                "values": [
                                                    "quieting-garfish"
                                                ]
                                            }
                                        ]
                                    },
                                    "topologyKey": "kubernetes.io/hostname"
                                }
                            }
                        ]
                    }
                },
                "schedulerName": "default-scheduler",
                "tolerations": [
                    {
                        "key": "node.kubernetes.io/not-ready",
                        "operator": "Exists",
                        "effect": "NoExecute",
                        "tolerationSeconds": 300
                    },
                    {
                        "key": "node.kubernetes.io/unreachable",
                        "operator": "Exists",
                        "effect": "NoExecute",
                        "tolerationSeconds": 300
                    }
                ],
                "priority": 0,
                "enableServiceLinks": true
            },
            "status": {}
        },
        "oldObject": null,
        "dryRun": false
    }
});

let response2 = {
    "response": {
        "allowed": true,
        "patch": [{
            "op": "add",
            "path": "/spec/initContainers",
            "value": [{
                "command": ["cp", "/applicationinsights-agent-codeless.jar", "/agentconfig/applicationinsights-agent-codeless.jar"],
                "image": "mcr.microsoft.com/applicationinsights/codeless-attach/mutating-webhook-agents:dev3",
                "name": "agent-init",
                "volumeMounts": [{
                    "mountPath": "/agentconfig",
                    "name": "agentdisk"
                }]
            }]
        }, {
            "op": "add",
            "path": "/spec/containers/0",
            "value": {
                "name": "ibm-open-liberty-spring",
                "image": "openliberty/open-liberty:springBoot2-ubi-min",
                "env": [{
                    "name": "WLP_LOGGING_CONSOLE_FORMAT",
                    "value": "json"
                }, {
                    "name": "WLP_LOGGING_CONSOLE_LOGLEVEL",
                    "value": "info"
                }, {
                    "name": "WLP_LOGGING_CONSOLE_SOURCE",
                    "value": "message,trace,accessLog,ffdc"
                }, {
                    "name": "KUBERNETES_NAMESPACE",
                    "valueFrom": {
                        "fieldRef": {
                            "apiVersion": "v1",
                            "fieldPath": "metadata.namespace"
                        }
                    }
                }, {
                    "name": "IIOP_ENDPOINT_HOST",
                    "valueFrom": {
                        "fieldRef": {
                            "apiVersion": "v1",
                            "fieldPath": "status.podIP"
                        }
                    }
                }, {
                    "name": "KEYSTORE_REQUIRED",
                    "value": "true"
                }, {
                    "name": "_JAVA_OPTIONS",
                    "value": "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar"
                }, {
                    "name": "JAVA_TOOL_OPTIONS",
                    "value": "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar"
                }, {
                    "name": "ASPNETCORE_HOSTINGSTARTUP",
                    "value": "/agentconfig/aspnetcore-agent-v1.dll"
                }, {
                    "name": "NODE_OPTIONS",
                    "value": "/agentconfig/nodejs-agent-v1.js"
                }, {
                    "name": "APPINSIGHTS_CONNECTIONSTRING",
                    "valueFrom": {
                        "configMapKeyRef": {
                            "key": "ikey",
                            "name": "attach-config"
                        }
                    }
                }],
                "resources": {},
                "volumeMounts": [{
                    "name": "liberty-overrides",
                    "readOnly": true,
                    "mountPath": "/config/configDropins/overrides/include-configmap.xml",
                    "subPath": "include-configmap.xml"
                }, {
                    "name": "liberty-config",
                    "readOnly": true,
                    "mountPath": "/etc/wlp/configmap"
                }, {
                    "name": "quieting-garfish-ibm-ope-token-njwn6",
                    "readOnly": true,
                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                }, {
                    "mountPath": "/agentconfig",
                    "name": "agent-volume"
                }],
                "livenessProbe": {
                    "httpGet": {
                        "path": "/",
                        "port": 9443,
                        "scheme": "HTTPS"
                    },
                    "initialDelaySeconds": 20,
                    "timeoutSeconds": 1,
                    "periodSeconds": 5,
                    "successThreshold": 1,
                    "failureThreshold": 3
                },
                "readinessProbe": {
                    "httpGet": {
                        "path": "/",
                        "port": 9443,
                        "scheme": "HTTPS"
                    },
                    "initialDelaySeconds": 2,
                    "timeoutSeconds": 1,
                    "periodSeconds": 5,
                    "successThreshold": 1,
                    "failureThreshold": 3
                },
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "imagePullPolicy": "IfNotPresent",
                "securityContext": {
                    "capabilities": {
                        "drop": ["ALL"]
                    },
                    "privileged": false,
                    "readOnlyRootFilesystem": false,
                    "allowPrivilegeEscalation": false
                }
            }
        }, {
            "op": "test",
            "path": "/spec/containers/1",
            "value": {
                "name": "ibm-open-liberty-spring",
                "image": "openliberty/open-liberty:springBoot2-ubi-min",
                "env": [{
                    "name": "WLP_LOGGING_CONSOLE_FORMAT",
                    "value": "json"
                }, {
                    "name": "WLP_LOGGING_CONSOLE_LOGLEVEL",
                    "value": "info"
                }, {
                    "name": "WLP_LOGGING_CONSOLE_SOURCE",
                    "value": "message,trace,accessLog,ffdc"
                }, {
                    "name": "KUBERNETES_NAMESPACE",
                    "valueFrom": {
                        "fieldRef": {
                            "apiVersion": "v1",
                            "fieldPath": "metadata.namespace"
                        }
                    }
                }, {
                    "name": "IIOP_ENDPOINT_HOST",
                    "valueFrom": {
                        "fieldRef": {
                            "apiVersion": "v1",
                            "fieldPath": "status.podIP"
                        }
                    }
                }, {
                    "name": "KEYSTORE_REQUIRED",
                    "value": "true"
                }],
                "resources": {},
                "volumeMounts": [{
                    "name": "liberty-overrides",
                    "readOnly": true,
                    "mountPath": "/config/configDropins/overrides/include-configmap.xml",
                    "subPath": "include-configmap.xml"
                }, {
                    "name": "liberty-config",
                    "readOnly": true,
                    "mountPath": "/etc/wlp/configmap"
                }, {
                    "name": "quieting-garfish-ibm-ope-token-njwn6",
                    "readOnly": true,
                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                }],
                "livenessProbe": {
                    "httpGet": {
                        "path": "/",
                        "port": 9443,
                        "scheme": "HTTPS"
                    },
                    "initialDelaySeconds": 20,
                    "timeoutSeconds": 1,
                    "periodSeconds": 5,
                    "successThreshold": 1,
                    "failureThreshold": 3
                },
                "readinessProbe": {
                    "httpGet": {
                        "path": "/",
                        "port": 9443,
                        "scheme": "HTTPS"
                    },
                    "initialDelaySeconds": 2,
                    "timeoutSeconds": 1,
                    "periodSeconds": 5,
                    "successThreshold": 1,
                    "failureThreshold": 3
                },
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "imagePullPolicy": "IfNotPresent",
                "securityContext": {
                    "capabilities": {
                        "drop": ["ALL"]
                    },
                    "privileged": false,
                    "readOnlyRootFilesystem": false,
                    "allowPrivilegeEscalation": false
                }
            }
        }, {
            "op": "remove",
            "path": "/spec/containers/1"
        }, {
            "op": "add",
            "path": "/spec/volumes/3",
            "value": {
                "name": "agent-volume",
                "persistentVolumeClaim": {
                    "claimName": "agent-disk"
                }
            }
        }],
        "patchtype": "JSONPATCH",
        "uid": "cf481665-e586-11e9-8636-beff4de305b8"
    }
};
/* tslint:enable */
