import assert = require('assert');
import { ContentProcessor } from "./ContentProcessor";

export function TestNullObject() {
    assert.throws(() => { ContentProcessor.TryUpdateConfig(null); }, "expect exception");
};

export function TestConstructor() {
    let cp = ContentProcessor.TryUpdateConfig("{}");
    assert.ok(cp != null, "cp should not be null")
}

export function TestInvalidJSON() {
    assert.throws(() => { ContentProcessor.TryUpdateConfig("dfsdfsds"); }, "expect exception");
};

export function TestValidObject() {
    let cp = ContentProcessor.TryUpdateConfig(getTestObject());
    assert.ok(cp !== null);
}



function getTestObject() {
    return JSON.stringify(testObject);
}

let testObject = {
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