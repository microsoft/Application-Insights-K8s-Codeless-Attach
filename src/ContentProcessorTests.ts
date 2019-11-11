import assert = require("assert");
import { ContentProcessor } from "./ContentProcessor";

export async function TestNullObject() {
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig(null),
        "expect null");
}

export async function TestConstructor() {
    assert.deepEqual('{"kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig("{}"),
        "should return json");
}

export async function TestInvalidJSON() {
    const something = "dsasda";
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig(something),
        "expect something");
}

export async function TestValidObject() {
    assert.deepEqual(JSON.stringify(validResult),
        await ContentProcessor.TryUpdateConfig(testObject),
        "some valid other json");
}

export async function TestValidObject2() {
    assert.deepEqual(JSON.stringify(response2),
        await ContentProcessor.TryUpdateConfig(testObject2),
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
        "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc3BlYy92b2x1bWVzIiwidmFsdWUiOlt7ImVtcHR5RGlyIjp7fSwibmFtZSI6ImFnZW50LXZvbHVtZSJ9XX0seyJvcCI6ImFkZCIsInBhdGgiOiIvc3BlYy90ZW1wbGF0ZS9zcGVjL2luaXRDb250YWluZXJzIiwidmFsdWUiOlt7ImFyZ3MiOlsiLWEiLCIvYWdlbnRzLy4iLCIvYWdlbnRmaWxlcyJdLCJjb21tYW5kIjpbImNwIl0sImltYWdlIjoiRVJST1IiLCJuYW1lIjoiYWdlbnQtaW5pdCIsInZvbHVtZU1vdW50cyI6W3sibW91bnRQYXRoIjoiL2FnZW50ZmlsZXMiLCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dfV19LHsib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc3BlYy9jb250YWluZXJzLzAiLCJ2YWx1ZSI6eyJuYW1lIjoic3ByaW5nLXNpbXBsZSIsImltYWdlIjoidGFtaGFyaWFjci5henVyZWNyLmlvL3NwcmluZy1zaW1wbGU6djEiLCJwb3J0cyI6W3siY29udGFpbmVyUG9ydCI6ODA4MCwicHJvdG9jb2wiOiJUQ1AifV0sInJlc291cmNlcyI6eyJsaW1pdHMiOnsiY3B1IjoiMjAwbSJ9LCJyZXF1ZXN0cyI6eyJjcHUiOiIxNTBtIn19LCJ0ZXJtaW5hdGlvbk1lc3NhZ2VQYXRoIjoiL2Rldi90ZXJtaW5hdGlvbi1sb2ciLCJ0ZXJtaW5hdGlvbk1lc3NhZ2VQb2xpY3kiOiJGaWxlIiwiaW1hZ2VQdWxsUG9saWN5IjoiSWZOb3RQcmVzZW50IiwiZW52IjpbeyJuYW1lIjoiX0pBVkFfT1BUSU9OUyIsInZhbHVlIjoiLWphdmFhZ2VudDovYWdlbnRmaWxlcy9qYXZhL2FwcGxpY2F0aW9uaW5zaWdodHMtYWdlbnQtY29kZWxlc3MuamFyIn0seyJuYW1lIjoiSkFWQV9UT09MX09QVElPTlMiLCJ2YWx1ZSI6Ii1qYXZhYWdlbnQ6L2FnZW50ZmlsZXMvamF2YS9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkFTUE5FVENPUkVfSE9TVElOR1NUQVJUVVAiLCJ2YWx1ZSI6Ii9hZ2VudGZpbGVzL2FzcG5ldGNvcmUtYWdlbnQtdjEuZGxsIn0seyJuYW1lIjoiTk9ERV9PUFRJT05TIiwidmFsdWUiOiItLXJlcXVpcmUgL2FnZW50ZmlsZXMvbm9kZS9haS1ib290c3RyYXAuanMifSx7Im5hbWUiOiJBUFBJTlNJR0hUU19JTlNUUlVNRU5UQVRJT05LRVkiLCJ2YWx1ZUZyb20iOnsiY29uZmlnTWFwS2V5UmVmIjp7ImtleSI6ImlrZXkiLCJuYW1lIjoiYXR0YWNoLWNvbmZpZyJ9fX1dLCJ2b2x1bWVNb3VudHMiOlt7Im1vdW50UGF0aCI6Ii9hZ2VudGZpbGVzIiwibmFtZSI6ImFnZW50LXZvbHVtZSJ9XX19LHsib3AiOiJ0ZXN0IiwicGF0aCI6Ii9zcGVjL3RlbXBsYXRlL3NwZWMvY29udGFpbmVycy8xIiwidmFsdWUiOnsibmFtZSI6InNwcmluZy1zaW1wbGUiLCJpbWFnZSI6InRhbWhhcmlhY3IuYXp1cmVjci5pby9zcHJpbmctc2ltcGxlOnYxIiwicG9ydHMiOlt7ImNvbnRhaW5lclBvcnQiOjgwODAsInByb3RvY29sIjoiVENQIn1dLCJyZXNvdXJjZXMiOnsibGltaXRzIjp7ImNwdSI6IjIwMG0ifSwicmVxdWVzdHMiOnsiY3B1IjoiMTUwbSJ9fSwidGVybWluYXRpb25NZXNzYWdlUGF0aCI6Ii9kZXYvdGVybWluYXRpb24tbG9nIiwidGVybWluYXRpb25NZXNzYWdlUG9saWN5IjoiRmlsZSIsImltYWdlUHVsbFBvbGljeSI6IklmTm90UHJlc2VudCJ9fSx7Im9wIjoicmVtb3ZlIiwicGF0aCI6Ii9zcGVjL3RlbXBsYXRlL3NwZWMvY29udGFpbmVycy8xIn1d",
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
        "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvaW5pdENvbnRhaW5lcnMiLCJ2YWx1ZSI6W3siYXJncyI6WyItYSIsIi9hZ2VudHMvLiIsIi9hZ2VudGZpbGVzIl0sImNvbW1hbmQiOlsiY3AiXSwiaW1hZ2UiOiJFUlJPUiIsIm5hbWUiOiJhZ2VudC1pbml0Iiwidm9sdW1lTW91bnRzIjpbeyJtb3VudFBhdGgiOiIvYWdlbnRmaWxlcyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV19XX0seyJvcCI6ImFkZCIsInBhdGgiOiIvc3BlYy9jb250YWluZXJzLzAiLCJ2YWx1ZSI6eyJuYW1lIjoiaWJtLW9wZW4tbGliZXJ0eS1zcHJpbmciLCJpbWFnZSI6Im9wZW5saWJlcnR5L29wZW4tbGliZXJ0eTpzcHJpbmdCb290Mi11YmktbWluIiwiZW52IjpbeyJuYW1lIjoiV0xQX0xPR0dJTkdfQ09OU09MRV9GT1JNQVQiLCJ2YWx1ZSI6Impzb24ifSx7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX0xPR0xFVkVMIiwidmFsdWUiOiJpbmZvIn0seyJuYW1lIjoiV0xQX0xPR0dJTkdfQ09OU09MRV9TT1VSQ0UiLCJ2YWx1ZSI6Im1lc3NhZ2UsdHJhY2UsYWNjZXNzTG9nLGZmZGMifSx7Im5hbWUiOiJLVUJFUk5FVEVTX05BTUVTUEFDRSIsInZhbHVlRnJvbSI6eyJmaWVsZFJlZiI6eyJhcGlWZXJzaW9uIjoidjEiLCJmaWVsZFBhdGgiOiJtZXRhZGF0YS5uYW1lc3BhY2UifX19LHsibmFtZSI6IklJT1BfRU5EUE9JTlRfSE9TVCIsInZhbHVlRnJvbSI6eyJmaWVsZFJlZiI6eyJhcGlWZXJzaW9uIjoidjEiLCJmaWVsZFBhdGgiOiJzdGF0dXMucG9kSVAifX19LHsibmFtZSI6IktFWVNUT1JFX1JFUVVJUkVEIiwidmFsdWUiOiJ0cnVlIn0seyJuYW1lIjoiX0pBVkFfT1BUSU9OUyIsInZhbHVlIjoiLWphdmFhZ2VudDovYWdlbnRmaWxlcy9qYXZhL2FwcGxpY2F0aW9uaW5zaWdodHMtYWdlbnQtY29kZWxlc3MuamFyIn0seyJuYW1lIjoiSkFWQV9UT09MX09QVElPTlMiLCJ2YWx1ZSI6Ii1qYXZhYWdlbnQ6L2FnZW50ZmlsZXMvamF2YS9hcHBsaWNhdGlvbmluc2lnaHRzLWFnZW50LWNvZGVsZXNzLmphciJ9LHsibmFtZSI6IkFTUE5FVENPUkVfSE9TVElOR1NUQVJUVVAiLCJ2YWx1ZSI6Ii9hZ2VudGZpbGVzL2FzcG5ldGNvcmUtYWdlbnQtdjEuZGxsIn0seyJuYW1lIjoiTk9ERV9PUFRJT05TIiwidmFsdWUiOiItLXJlcXVpcmUgL2FnZW50ZmlsZXMvbm9kZS9haS1ib290c3RyYXAuanMifSx7Im5hbWUiOiJBUFBJTlNJR0hUU19JTlNUUlVNRU5UQVRJT05LRVkiLCJ2YWx1ZUZyb20iOnsiY29uZmlnTWFwS2V5UmVmIjp7ImtleSI6ImlrZXkiLCJuYW1lIjoiYXR0YWNoLWNvbmZpZyJ9fX1dLCJyZXNvdXJjZXMiOnt9LCJ2b2x1bWVNb3VudHMiOlt7Im5hbWUiOiJsaWJlcnR5LW92ZXJyaWRlcyIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvY29uZmlnL2NvbmZpZ0Ryb3BpbnMvb3ZlcnJpZGVzL2luY2x1ZGUtY29uZmlnbWFwLnhtbCIsInN1YlBhdGgiOiJpbmNsdWRlLWNvbmZpZ21hcC54bWwifSx7Im5hbWUiOiJsaWJlcnR5LWNvbmZpZyIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvZXRjL3dscC9jb25maWdtYXAifSx7Im5hbWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUtdG9rZW4tbmp3bjYiLCJyZWFkT25seSI6dHJ1ZSwibW91bnRQYXRoIjoiL3Zhci9ydW4vc2VjcmV0cy9rdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50In0seyJtb3VudFBhdGgiOiIvYWdlbnRmaWxlcyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV0sImxpdmVuZXNzUHJvYmUiOnsiaHR0cEdldCI6eyJwYXRoIjoiLyIsInBvcnQiOjk0NDMsInNjaGVtZSI6IkhUVFBTIn0sImluaXRpYWxEZWxheVNlY29uZHMiOjIwLCJ0aW1lb3V0U2Vjb25kcyI6MSwicGVyaW9kU2Vjb25kcyI6NSwic3VjY2Vzc1RocmVzaG9sZCI6MSwiZmFpbHVyZVRocmVzaG9sZCI6M30sInJlYWRpbmVzc1Byb2JlIjp7Imh0dHBHZXQiOnsicGF0aCI6Ii8iLCJwb3J0Ijo5NDQzLCJzY2hlbWUiOiJIVFRQUyJ9LCJpbml0aWFsRGVsYXlTZWNvbmRzIjoyLCJ0aW1lb3V0U2Vjb25kcyI6MSwicGVyaW9kU2Vjb25kcyI6NSwic3VjY2Vzc1RocmVzaG9sZCI6MSwiZmFpbHVyZVRocmVzaG9sZCI6M30sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJJZk5vdFByZXNlbnQiLCJzZWN1cml0eUNvbnRleHQiOnsiY2FwYWJpbGl0aWVzIjp7ImRyb3AiOlsiQUxMIl19LCJwcml2aWxlZ2VkIjpmYWxzZSwicmVhZE9ubHlSb290RmlsZXN5c3RlbSI6ZmFsc2UsImFsbG93UHJpdmlsZWdlRXNjYWxhdGlvbiI6ZmFsc2V9fX0seyJvcCI6InRlc3QiLCJwYXRoIjoiL3NwZWMvY29udGFpbmVycy8xIiwidmFsdWUiOnsibmFtZSI6ImlibS1vcGVuLWxpYmVydHktc3ByaW5nIiwiaW1hZ2UiOiJvcGVubGliZXJ0eS9vcGVuLWxpYmVydHk6c3ByaW5nQm9vdDItdWJpLW1pbiIsImVudiI6W3sibmFtZSI6IldMUF9MT0dHSU5HX0NPTlNPTEVfRk9STUFUIiwidmFsdWUiOiJqc29uIn0seyJuYW1lIjoiV0xQX0xPR0dJTkdfQ09OU09MRV9MT0dMRVZFTCIsInZhbHVlIjoiaW5mbyJ9LHsibmFtZSI6IldMUF9MT0dHSU5HX0NPTlNPTEVfU09VUkNFIiwidmFsdWUiOiJtZXNzYWdlLHRyYWNlLGFjY2Vzc0xvZyxmZmRjIn0seyJuYW1lIjoiS1VCRVJORVRFU19OQU1FU1BBQ0UiLCJ2YWx1ZUZyb20iOnsiZmllbGRSZWYiOnsiYXBpVmVyc2lvbiI6InYxIiwiZmllbGRQYXRoIjoibWV0YWRhdGEubmFtZXNwYWNlIn19fSx7Im5hbWUiOiJJSU9QX0VORFBPSU5UX0hPU1QiLCJ2YWx1ZUZyb20iOnsiZmllbGRSZWYiOnsiYXBpVmVyc2lvbiI6InYxIiwiZmllbGRQYXRoIjoic3RhdHVzLnBvZElQIn19fSx7Im5hbWUiOiJLRVlTVE9SRV9SRVFVSVJFRCIsInZhbHVlIjoidHJ1ZSJ9XSwicmVzb3VyY2VzIjp7fSwidm9sdW1lTW91bnRzIjpbeyJuYW1lIjoibGliZXJ0eS1vdmVycmlkZXMiLCJyZWFkT25seSI6dHJ1ZSwibW91bnRQYXRoIjoiL2NvbmZpZy9jb25maWdEcm9waW5zL292ZXJyaWRlcy9pbmNsdWRlLWNvbmZpZ21hcC54bWwiLCJzdWJQYXRoIjoiaW5jbHVkZS1jb25maWdtYXAueG1sIn0seyJuYW1lIjoibGliZXJ0eS1jb25maWciLCJyZWFkT25seSI6dHJ1ZSwibW91bnRQYXRoIjoiL2V0Yy93bHAvY29uZmlnbWFwIn0seyJuYW1lIjoicXVpZXRpbmctZ2FyZmlzaC1pYm0tb3BlLXRva2VuLW5qd242IiwicmVhZE9ubHkiOnRydWUsIm1vdW50UGF0aCI6Ii92YXIvcnVuL3NlY3JldHMva3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudCJ9XSwibGl2ZW5lc3NQcm9iZSI6eyJodHRwR2V0Ijp7InBhdGgiOiIvIiwicG9ydCI6OTQ0Mywic2NoZW1lIjoiSFRUUFMifSwiaW5pdGlhbERlbGF5U2Vjb25kcyI6MjAsInRpbWVvdXRTZWNvbmRzIjoxLCJwZXJpb2RTZWNvbmRzIjo1LCJzdWNjZXNzVGhyZXNob2xkIjoxLCJmYWlsdXJlVGhyZXNob2xkIjozfSwicmVhZGluZXNzUHJvYmUiOnsiaHR0cEdldCI6eyJwYXRoIjoiLyIsInBvcnQiOjk0NDMsInNjaGVtZSI6IkhUVFBTIn0sImluaXRpYWxEZWxheVNlY29uZHMiOjIsInRpbWVvdXRTZWNvbmRzIjoxLCJwZXJpb2RTZWNvbmRzIjo1LCJzdWNjZXNzVGhyZXNob2xkIjoxLCJmYWlsdXJlVGhyZXNob2xkIjozfSwidGVybWluYXRpb25NZXNzYWdlUGF0aCI6Ii9kZXYvdGVybWluYXRpb24tbG9nIiwidGVybWluYXRpb25NZXNzYWdlUG9saWN5IjoiRmlsZSIsImltYWdlUHVsbFBvbGljeSI6IklmTm90UHJlc2VudCIsInNlY3VyaXR5Q29udGV4dCI6eyJjYXBhYmlsaXRpZXMiOnsiZHJvcCI6WyJBTEwiXX0sInByaXZpbGVnZWQiOmZhbHNlLCJyZWFkT25seVJvb3RGaWxlc3lzdGVtIjpmYWxzZSwiYWxsb3dQcml2aWxlZ2VFc2NhbGF0aW9uIjpmYWxzZX19fSx7Im9wIjoicmVtb3ZlIiwicGF0aCI6Ii9zcGVjL2NvbnRhaW5lcnMvMSJ9LHsib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdm9sdW1lcy8zIiwidmFsdWUiOnsiZW1wdHlEaXIiOnt9LCJuYW1lIjoiYWdlbnQtdm9sdW1lIn19XQ==",
        "patchtype": "JSONPATCH",
        "uid": "cf481665-e586-11e9-8636-beff4de305b8"
    }
}
/* tslint:enable */
