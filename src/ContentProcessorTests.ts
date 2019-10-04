import assert = require("assert");
import { ContentProcessor } from "./ContentProcessor";

export function TestNullObject() {
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        ContentProcessor.TryUpdateConfig(null),
        "expect null");
}

export function TestConstructor() {
    assert.deepEqual('{"kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        ContentProcessor.TryUpdateConfig("{}"),
        "should return json");
}

export function TestInvalidJSON() {
    const something = "dsasda";
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
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
    "apiVersion": "admission.k8s.io/v1beta1",
    "kind": "AdmissionReview",
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
                                "imagePullPolicy": "IfNotPresent"
                            }
                        ],
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
    },
    "response": {
        "allowed": true,
        "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc3BlYy92b2x1bWVzIiwidmFsdWUiOlt7ImVtcHR5RGlyIjp7fSwibmFtZSI6ImFnZW50LXZvbHVtZSJ9XX0seyJvcCI6ImFkZCIsInBhdGgiOiIvc3BlYy90ZW1wbGF0ZS9zcGVjL2luaXRDb250YWluZXJzIiwidmFsdWUiOlt7ImNvbW1hbmQiOlsiY3AiLCIvYXBwbGljYXRpb25pbnNpZ2h0cy1hZ2VudC1jb2RlbGVzcy5qYXIiLCIvYWdlbnRjb25maWciXSwiaW1hZ2UiOiJtY3IubWljcm9zb2Z0LmNvbS9hcHBsaWNhdGlvbmluc2lnaHRzL2NvZGVsZXNzLWF0dGFjaC9tdXRhdGluZy13ZWJob29rLWFnZW50czpkZXYzIiwibmFtZSI6ImFnZW50LWluaXQiLCJ2b2x1bWVNb3VudHMiOlt7Im1vdW50UGF0aCI6Ii9hZ2VudGNvbmZpZyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV19XX0seyJvcCI6ImFkZCIsInBhdGgiOiIvc3BlYy90ZW1wbGF0ZS9zcGVjL2NvbnRhaW5lcnMvMCIsInZhbHVlIjp7Im5hbWUiOiJzcHJpbmctc2ltcGxlIiwiaW1hZ2UiOiJ0YW1oYXJpYWNyLmF6dXJlY3IuaW8vc3ByaW5nLXNpbXBsZTp2MSIsInBvcnRzIjpbeyJjb250YWluZXJQb3J0Ijo4MDgwLCJwcm90b2NvbCI6IlRDUCJ9XSwicmVzb3VyY2VzIjp7ImxpbWl0cyI6eyJjcHUiOiIyMDBtIn0sInJlcXVlc3RzIjp7ImNwdSI6IjE1MG0ifX0sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJJZk5vdFByZXNlbnQiLCJlbnYiOlt7Im5hbWUiOiJfSkFWQV9PUFRJT05TIiwidmFsdWUiOiItamF2YWFnZW50Oi9hZ2VudGNvbmZpZy9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkpBVkFfVE9PTF9PUFRJT05TIiwidmFsdWUiOiItamF2YWFnZW50Oi9hZ2VudGNvbmZpZy9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkFTUE5FVENPUkVfSE9TVElOR1NUQVJUVVAiLCJ2YWx1ZSI6Ii9hZ2VudGNvbmZpZy9hc3BuZXRjb3JlLWFnZW50LXYxLmRsbCJ9LHsibmFtZSI6Ik5PREVfT1BUSU9OUyIsInZhbHVlIjoiL2FnZW50Y29uZmlnL25vZGVqcy1hZ2VudC12MS5qcyJ9LHsibmFtZSI6IkFQUElOU0lHSFRTX0NPTk5FQ1RJT05TVFJJTkciLCJ2YWx1ZUZyb20iOnsiY29uZmlnTWFwS2V5UmVmIjp7ImtleSI6ImlrZXkiLCJuYW1lIjoiYXR0YWNoLWNvbmZpZyJ9fX1dLCJ2b2x1bWVNb3VudHMiOlt7Im1vdW50UGF0aCI6Ii9hZ2VudGNvbmZpZyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV19fSx7Im9wIjoidGVzdCIsInBhdGgiOiIvc3BlYy90ZW1wbGF0ZS9zcGVjL2NvbnRhaW5lcnMvMSIsInZhbHVlIjp7Im5hbWUiOiJzcHJpbmctc2ltcGxlIiwiaW1hZ2UiOiJ0YW1oYXJpYWNyLmF6dXJlY3IuaW8vc3ByaW5nLXNpbXBsZTp2MSIsInBvcnRzIjpbeyJjb250YWluZXJQb3J0Ijo4MDgwLCJwcm90b2NvbCI6IlRDUCJ9XSwicmVzb3VyY2VzIjp7ImxpbWl0cyI6eyJjcHUiOiIyMDBtIn0sInJlcXVlc3RzIjp7ImNwdSI6IjE1MG0ifX0sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJJZk5vdFByZXNlbnQifX0seyJvcCI6InJlbW92ZSIsInBhdGgiOiIvc3BlYy90ZW1wbGF0ZS9zcGVjL2NvbnRhaW5lcnMvMSJ9XQ==",
        "patchtype": "JSONPATCH",
        "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61"
    }
}

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
    "apiVersion": "admission.k8s.io/v1beta1",
    "kind": "AdmissionReview",
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
    },
    "response": {
        "allowed": true,
        "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvaW5pdENvbnRhaW5lcnMiLCJ2YWx1ZSI6W3siY29tbWFuZCI6WyJjcCIsIi9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciIsIi9hZ2VudGNvbmZpZyJdLCJpbWFnZSI6Im1jci5taWNyb3NvZnQuY29tL2FwcGxpY2F0aW9uaW5zaWdodHMvY29kZWxlc3MtYXR0YWNoL211dGF0aW5nLXdlYmhvb2stYWdlbnRzOmRldjMiLCJuYW1lIjoiYWdlbnQtaW5pdCIsInZvbHVtZU1vdW50cyI6W3sibW91bnRQYXRoIjoiL2FnZW50Y29uZmlnIiwibmFtZSI6ImFnZW50LXZvbHVtZSJ9XX1dfSx7Im9wIjoiYWRkIiwicGF0aCI6Ii9zcGVjL2NvbnRhaW5lcnMvMCIsInZhbHVlIjp7Im5hbWUiOiJpYm0tb3Blbi1saWJlcnR5LXNwcmluZyIsImltYWdlIjoib3BlbmxpYmVydHkvb3Blbi1saWJlcnR5OnNwcmluZ0Jvb3QyLXViaS1taW4iLCJlbnYiOlt7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX0ZPUk1BVCIsInZhbHVlIjoianNvbiJ9LHsibmFtZSI6IldMUF9MT0dHSU5HX0NPTlNPTEVfTE9HTEVWRUwiLCJ2YWx1ZSI6ImluZm8ifSx7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX1NPVVJDRSIsInZhbHVlIjoibWVzc2FnZSx0cmFjZSxhY2Nlc3NMb2csZmZkYyJ9LHsibmFtZSI6IktVQkVSTkVURVNfTkFNRVNQQUNFIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6Im1ldGFkYXRhLm5hbWVzcGFjZSJ9fX0seyJuYW1lIjoiSUlPUF9FTkRQT0lOVF9IT1NUIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6InN0YXR1cy5wb2RJUCJ9fX0seyJuYW1lIjoiS0VZU1RPUkVfUkVRVUlSRUQiLCJ2YWx1ZSI6InRydWUifSx7Im5hbWUiOiJfSkFWQV9PUFRJT05TIiwidmFsdWUiOiItamF2YWFnZW50Oi9hZ2VudGNvbmZpZy9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkpBVkFfVE9PTF9PUFRJT05TIiwidmFsdWUiOiItamF2YWFnZW50Oi9hZ2VudGNvbmZpZy9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkFTUE5FVENPUkVfSE9TVElOR1NUQVJUVVAiLCJ2YWx1ZSI6Ii9hZ2VudGNvbmZpZy9hc3BuZXRjb3JlLWFnZW50LXYxLmRsbCJ9LHsibmFtZSI6Ik5PREVfT1BUSU9OUyIsInZhbHVlIjoiL2FnZW50Y29uZmlnL25vZGVqcy1hZ2VudC12MS5qcyJ9LHsibmFtZSI6IkFQUElOU0lHSFRTX0NPTk5FQ1RJT05TVFJJTkciLCJ2YWx1ZUZyb20iOnsiY29uZmlnTWFwS2V5UmVmIjp7ImtleSI6ImlrZXkiLCJuYW1lIjoiYXR0YWNoLWNvbmZpZyJ9fX1dLCJyZXNvdXJjZXMiOnt9LCJ2b2x1bWVNb3VudHMiOlt7Im5hbWUiOiJsaWJlcnR5LW92ZXJyaWRlcyIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvY29uZmlnL2NvbmZpZ0Ryb3BpbnMvb3ZlcnJpZGVzL2luY2x1ZGUtY29uZmlnbWFwLnhtbCIsInN1YlBhdGgiOiJpbmNsdWRlLWNvbmZpZ21hcC54bWwifSx7Im5hbWUiOiJsaWJlcnR5LWNvbmZpZyIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvZXRjL3dscC9jb25maWdtYXAifSx7Im5hbWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUtdG9rZW4tbmp3bjYiLCJyZWFkT25seSI6dHJ1ZSwibW91bnRQYXRoIjoiL3Zhci9ydW4vc2VjcmV0cy9rdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50In0seyJtb3VudFBhdGgiOiIvYWdlbnRjb25maWciLCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dLCJsaXZlbmVzc1Byb2JlIjp7Imh0dHBHZXQiOnsicGF0aCI6Ii8iLCJwb3J0Ijo5NDQzLCJzY2hlbWUiOiJIVFRQUyJ9LCJpbml0aWFsRGVsYXlTZWNvbmRzIjoyMCwidGltZW91dFNlY29uZHMiOjEsInBlcmlvZFNlY29uZHMiOjUsInN1Y2Nlc3NUaHJlc2hvbGQiOjEsImZhaWx1cmVUaHJlc2hvbGQiOjN9LCJyZWFkaW5lc3NQcm9iZSI6eyJodHRwR2V0Ijp7InBhdGgiOiIvIiwicG9ydCI6OTQ0Mywic2NoZW1lIjoiSFRUUFMifSwiaW5pdGlhbERlbGF5U2Vjb25kcyI6MiwidGltZW91dFNlY29uZHMiOjEsInBlcmlvZFNlY29uZHMiOjUsInN1Y2Nlc3NUaHJlc2hvbGQiOjEsImZhaWx1cmVUaHJlc2hvbGQiOjN9LCJ0ZXJtaW5hdGlvbk1lc3NhZ2VQYXRoIjoiL2Rldi90ZXJtaW5hdGlvbi1sb2ciLCJ0ZXJtaW5hdGlvbk1lc3NhZ2VQb2xpY3kiOiJGaWxlIiwiaW1hZ2VQdWxsUG9saWN5IjoiSWZOb3RQcmVzZW50Iiwic2VjdXJpdHlDb250ZXh0Ijp7ImNhcGFiaWxpdGllcyI6eyJkcm9wIjpbIkFMTCJdfSwicHJpdmlsZWdlZCI6ZmFsc2UsInJlYWRPbmx5Um9vdEZpbGVzeXN0ZW0iOmZhbHNlLCJhbGxvd1ByaXZpbGVnZUVzY2FsYXRpb24iOmZhbHNlfX19LHsib3AiOiJ0ZXN0IiwicGF0aCI6Ii9zcGVjL2NvbnRhaW5lcnMvMSIsInZhbHVlIjp7Im5hbWUiOiJpYm0tb3Blbi1saWJlcnR5LXNwcmluZyIsImltYWdlIjoib3BlbmxpYmVydHkvb3Blbi1saWJlcnR5OnNwcmluZ0Jvb3QyLXViaS1taW4iLCJlbnYiOlt7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX0ZPUk1BVCIsInZhbHVlIjoianNvbiJ9LHsibmFtZSI6IldMUF9MT0dHSU5HX0NPTlNPTEVfTE9HTEVWRUwiLCJ2YWx1ZSI6ImluZm8ifSx7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX1NPVVJDRSIsInZhbHVlIjoibWVzc2FnZSx0cmFjZSxhY2Nlc3NMb2csZmZkYyJ9LHsibmFtZSI6IktVQkVSTkVURVNfTkFNRVNQQUNFIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6Im1ldGFkYXRhLm5hbWVzcGFjZSJ9fX0seyJuYW1lIjoiSUlPUF9FTkRQT0lOVF9IT1NUIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6InN0YXR1cy5wb2RJUCJ9fX0seyJuYW1lIjoiS0VZU1RPUkVfUkVRVUlSRUQiLCJ2YWx1ZSI6InRydWUifV0sInJlc291cmNlcyI6e30sInZvbHVtZU1vdW50cyI6W3sibmFtZSI6ImxpYmVydHktb3ZlcnJpZGVzIiwicmVhZE9ubHkiOnRydWUsIm1vdW50UGF0aCI6Ii9jb25maWcvY29uZmlnRHJvcGlucy9vdmVycmlkZXMvaW5jbHVkZS1jb25maWdtYXAueG1sIiwic3ViUGF0aCI6ImluY2x1ZGUtY29uZmlnbWFwLnhtbCJ9LHsibmFtZSI6ImxpYmVydHktY29uZmlnIiwicmVhZE9ubHkiOnRydWUsIm1vdW50UGF0aCI6Ii9ldGMvd2xwL2NvbmZpZ21hcCJ9LHsibmFtZSI6InF1aWV0aW5nLWdhcmZpc2gtaWJtLW9wZS10b2tlbi1uanduNiIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvdmFyL3J1bi9zZWNyZXRzL2t1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQifV0sImxpdmVuZXNzUHJvYmUiOnsiaHR0cEdldCI6eyJwYXRoIjoiLyIsInBvcnQiOjk0NDMsInNjaGVtZSI6IkhUVFBTIn0sImluaXRpYWxEZWxheVNlY29uZHMiOjIwLCJ0aW1lb3V0U2Vjb25kcyI6MSwicGVyaW9kU2Vjb25kcyI6NSwic3VjY2Vzc1RocmVzaG9sZCI6MSwiZmFpbHVyZVRocmVzaG9sZCI6M30sInJlYWRpbmVzc1Byb2JlIjp7Imh0dHBHZXQiOnsicGF0aCI6Ii8iLCJwb3J0Ijo5NDQzLCJzY2hlbWUiOiJIVFRQUyJ9LCJpbml0aWFsRGVsYXlTZWNvbmRzIjoyLCJ0aW1lb3V0U2Vjb25kcyI6MSwicGVyaW9kU2Vjb25kcyI6NSwic3VjY2Vzc1RocmVzaG9sZCI6MSwiZmFpbHVyZVRocmVzaG9sZCI6M30sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJJZk5vdFByZXNlbnQiLCJzZWN1cml0eUNvbnRleHQiOnsiY2FwYWJpbGl0aWVzIjp7ImRyb3AiOlsiQUxMIl19LCJwcml2aWxlZ2VkIjpmYWxzZSwicmVhZE9ubHlSb290RmlsZXN5c3RlbSI6ZmFsc2UsImFsbG93UHJpdmlsZWdlRXNjYWxhdGlvbiI6ZmFsc2V9fX0seyJvcCI6InJlbW92ZSIsInBhdGgiOiIvc3BlYy9jb250YWluZXJzLzEifSx7Im9wIjoiYWRkIiwicGF0aCI6Ii9zcGVjL3ZvbHVtZXMvMyIsInZhbHVlIjp7ImVtcHR5RGlyIjp7fSwibmFtZSI6ImFnZW50LXZvbHVtZSJ9fV0=",
        "patchtype": "JSONPATCH",
        "uid": "cf481665-e586-11e9-8636-beff4de305b8"
    }
};
/* tslint:enable */
