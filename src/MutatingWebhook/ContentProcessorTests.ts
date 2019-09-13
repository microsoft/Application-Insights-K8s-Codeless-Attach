import assert = require('assert');
import { ContentProcessor } from "./ContentProcessor";

export function TestNullObject() {
    assert.equal(null, ContentProcessor.TryUpdateConfig(null), "expect null");
};

export function TestConstructor() {
    assert.equal("{}" , ContentProcessor.TryUpdateConfig("{}"), "should return json");
}

export function TestInvalidJSON() {
    let something = "dsasda"
    assert.deepEqual(something, ContentProcessor.TryUpdateConfig(something), "expect something");
};

export function TestValidObject() {
    assert.deepEqual(JSON.stringify(valid_result), ContentProcessor.TryUpdateConfig(getTestObject()), "some valid other json");
}

export function TestValidInvalidObject() {
    assert.deepEqual(getInvalidObject(), ContentProcessor.TryUpdateConfig(getInvalidObject()), "fails validation");
}

function getInvalidObject() {
    let test = test_object;
    test.kind = 'some other kind';
    return JSON.stringify(test);
}

function getTestObject() {
    let test = test_object;
    test.kind = 'AdmissionReview';
    return JSON.stringify(test);
}

let test_object = {
    "kind": "AdmissionReview",
    "apiVersion": "admission.k8s.io/v1beta1",
    "request": {
        "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61",
        "kind": {
            "group": "apps",
            "version": "v1beta1",
            "kind": "Deployment"
        },
        "resource": {
            "group": "apps",
            "version": "v1beta1",
            "resource": "deployments"
        },
        "namespace": "default",
        "operation": "CREATE",
        "userInfo": {
            "username": "masterclient",
            "groups": ["system:masters", "system:authenticated"]
        },
        "object": {
            "kind": "Deployment",
            "apiVersion": "apps/v1beta1",
            "metadata": {
                "name": "spring-simple",
                "namespace": "default",
                "creationTimestamp": "None",
                "labels": {
                    "app": "spring-simple"
                },
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apps/v1beta1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"name\":\"spring-simple\",\"namespace\":\"default\"},\"spec\":{\"minReadySeconds\":5,\"replicas\":1,\"strategy\":{\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":1}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"spring-simple\"}},\"spec\":{\"containers\":[{\"image\":\"tamhariacr.azurecr.io/spring-simple:v1\",\"name\":\"spring-simple\",\"ports\":[{\"containerPort\":8080}],\"resources\":{\"limits\":{\"cpu\":\"200m\"},\"requests\":{\"cpu\":\"150m\"}}}],\"nodeSelector\":{\"beta.kubernetes.io/os\":\"linux\"}}}}}\n"
                }
            },
            "spec": {
                "replicas": 1,
                "selector": {
                    "matchLabels": {
                        "app": "spring-simple"
                    }
                },
                "template": {
                    "metadata": {
                        "creationTimestamp": "None",
                        "labels": {
                            "app": "spring-simple"
                        }
                    },
                    "spec": {
                        "containers": [{
                            "name": "spring-simple",
                            "image": "tamhariacr.azurecr.io/spring-simple:v1",
                            "ports": [{
                                "containerPort": 8080,
                                "protocol": "TCP"
                            }],
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
                        }],
                        "restartPolicy": "Always",
                        "terminationGracePeriodSeconds": 30,
                        "dnsPolicy": "ClusterFirst",
                        "nodeSelector": {
                            "beta.kubernetes.io/os": "linux"
                        },
                        "securityContext": {},
                        "schedulerName": "default-scheduler"
                    }
                },
                "strategy": {
                    "type": "RollingUpdate",
                    "rollingUpdate": {
                        "maxUnavailable": 1,
                        "maxSurge": 1
                    }
                },
                "minReadySeconds": 5,
                "revisionHistoryLimit": 2,
                "progressDeadlineSeconds": 600
            },
            "status": {}
        },
        "oldObject": "None",
        "dryRun": "False"
    }
}

let valid_result = {
    "kind": "AdmissionReview",
    "apiVersion": "admission.k8s.io/v1beta1",
    "request": {
        "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61",
        "kind": {
            "group": "apps",
            "version": "v1beta1",
            "kind": "Deployment"
        },
        "resource": {
            "group": "apps",
            "version": "v1beta1",
            "resource": "deployments"
        },
        "namespace": "default",
        "operation": "CREATE",
        "userInfo": {
            "username": "masterclient",
            "groups": [
                "system:masters",
                "system:authenticated"
            ]
        },
        "object": {
            "kind": "Deployment",
            "apiVersion": "apps/v1beta1",
            "metadata": {
                "name": "spring-simple",
                "namespace": "default",
                "creationTimestamp": "None",
                "labels": {
                    "app": "spring-simple"
                },
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apps/v1beta1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"name\":\"spring-simple\",\"namespace\":\"default\"},\"spec\":{\"minReadySeconds\":5,\"replicas\":1,\"strategy\":{\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":1}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"spring-simple\"}},\"spec\":{\"containers\":[{\"image\":\"tamhariacr.azurecr.io/spring-simple:v1\",\"name\":\"spring-simple\",\"ports\":[{\"containerPort\":8080}],\"resources\":{\"limits\":{\"cpu\":\"200m\"},\"requests\":{\"cpu\":\"150m\"}}}],\"nodeSelector\":{\"beta.kubernetes.io/os\":\"linux\"}}}}}\n"
                }
            },
            "spec": {
                "replicas": 1,
                "selector": {
                    "matchLabels": {
                        "app": "spring-simple"
                    }
                },
                "template": {
                    "metadata": {
                        "creationTimestamp": "None",
                        "labels": {
                            "app": "spring-simple"
                        }
                    },
                    "spec": {
                        "containers": [
                            {
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
                                        "value": "-javaagent:/agentconfig/java-agent-v1.jar"
                                    },
                                    {
                                        "name": "APPINSIGHTS_CONNECTIONSTRING",
                                        "valueFrom": {
                                            "configMapKeyRef": {
                                                "name": "attach-config",
                                                "key": "ikey"
                                            }
                                        }
                                    }
                                ],
                                "volumeMounts": {
                                    "volumeMounts": {
                                        "name": "agentdisk",
                                        "mountPath": "/agentconfig"
                                    }
                                }
                            }
                        ],
                        "restartPolicy": "Always",
                        "terminationGracePeriodSeconds": 30,
                        "dnsPolicy": "ClusterFirst",
                        "nodeSelector": {
                            "beta.kubernetes.io/os": "linux"
                        },
                        "securityContext": {},
                        "schedulerName": "default-scheduler",
                        "initContainers": {
                            "name": "agent - init",
                            "image": "mcr.microsoft.com / applicationinsights / attach - agents: v5",
                            "command": [
                                "cp",
                                " /java-agent-v1.jar",
                                " /agentconfig/java-agent-v1.jar"
                            ],
                            "volumeMounts": {
                                "name": "agentdisk",
                                "mountPath": "/agentconfig"
                            }
                        },
                        "volumes": {
                            "name": "agentdisk",
                            "emptyDir": "{}"
                        }
                    }
                },
                "strategy": {
                    "type": "RollingUpdate",
                    "rollingUpdate": {
                        "maxUnavailable": 1,
                        "maxSurge": 1
                    }
                },
                "minReadySeconds": 5,
                "revisionHistoryLimit": 2,
                "progressDeadlineSeconds": 600
            },
            "status": {}
        },
        "oldObject": "None",
        "dryRun": "False"
    }
}