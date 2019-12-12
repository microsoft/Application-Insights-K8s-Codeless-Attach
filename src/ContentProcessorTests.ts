import assert = require("assert");
import { ContentProcessor } from "./ContentProcessor";
import { logger } from "./LoggerWrapper";

(async () => {
    logger.info("\n\n\nTestNullObject\n\n\n");
    await TestNullObject();
    logger.info("\n\n\nTestConstructor\n\n\n");
    await TestConstructor();
    logger.info("\n\n\nTestInvalidJSON\n\n\n");
    await TestInvalidJSON();
    logger.info("\n\n\nTestValidObject\n\n\n");
    await TestValidObject();
    logger.info("\n\n\nTestValidObject2\n\n\n");
    await TestValidObject2();
    logger.info("\n\n\nTestValidObject3\n\n\n");
    await TestValidObject3();
    logger.info("\n\n\nSUCCESS\n\n\n");
})();

async function TestNullObject() {
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig(null));
}

async function TestConstructor() {
    assert.deepEqual('{"kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig("{}"),
        "should return json");
}

async function TestInvalidJSON() {
    const something = "dsasda";
    assert.deepEqual('{"apiVersion":"admission.k8s.io/v1beta1","kind":"AdmissionReview","response":{"allowed":false,"patchtype":"JSONPATCH","uid":""}}',
        await ContentProcessor.TryUpdateConfig(something),
        "expect something");
}

async function TestValidObject() {
    assert.deepEqual(JSON.stringify(validResult),
        await ContentProcessor.TryUpdateConfig(testObject),
        "some valid other json");
}

async function TestValidObject2() {
    assert.deepEqual(JSON.stringify(response2),
        await ContentProcessor.TryUpdateConfig(testObject2),
        "some valid other json");
}

async function TestValidObject3() {
    assert.deepEqual(JSON.stringify(response3),
        await ContentProcessor.TryUpdateConfig(testObject3),
        "some valid other json");
}

/* tslint:disable */
const testObject = JSON.stringify({
    kind: "Testing",
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

const validResult = { "apiVersion": "admission.k8s.io/v1beta1", "kind": "Testing", "request": { "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61", "kind": { "group": "apps", "version": "v1beta1", "kind": "Deployment" }, "resource": { "group": "apps", "version": "v1beta1", "resource": "deployments" }, "namespace": "default", "operation": "CREATE", "userInfo": { "username": "masterclient", "groups": ["system:masters", "system:authenticated"] }, "object": { "kind": "Deployment", "apiVersion": "apps/v1beta1", "metadata": { "name": "spring-simple", "namespace": "default", "creationTimestamp": "None", "labels": { "app": "spring-simple" }, "annotations": { "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apps/v1beta1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"name\":\"spring-simple\",\"namespace\":\"default\"},\"spec\":{\"minReadySeconds\":5,\"replicas\":1,\"strategy\":{\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":1}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"spring-simple\"}},\"spec\":{\"containers\":[{\"image\":\"tamhariacr.azurecr.io/spring-simple:v1\",\"name\":\"spring-simple\",\"ports\":[{\"containerPort\":8080}],\"resources\":{\"limits\":{\"cpu\":\"200m\"},\"requests\":{\"cpu\":\"150m\"}}}],\"nodeSelector\":{\"beta.kubernetes.io/os\":\"linux\"}}}}}\n" } }, "spec": { "replicas": 1, "selector": { "matchLabels": { "app": "spring-simple" } }, "template": { "metadata": { "creationTimestamp": "None", "labels": { "app": "spring-simple" } }, "spec": { "containers": [{ "name": "spring-simple", "image": "tamhariacr.azurecr.io/spring-simple:v1", "ports": [{ "containerPort": 8080, "protocol": "TCP" }], "resources": { "limits": { "cpu": "200m" }, "requests": { "cpu": "150m" } }, "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "imagePullPolicy": "IfNotPresent" }], "restartPolicy": "Always", "terminationGracePeriodSeconds": 30, "dnsPolicy": "ClusterFirst", "nodeSelector": { "beta.kubernetes.io/os": "linux" }, "securityContext": {}, "schedulerName": "default-scheduler" } }, "strategy": { "type": "RollingUpdate", "rollingUpdate": { "maxUnavailable": 1, "maxSurge": 1 } }, "minReadySeconds": 5, "revisionHistoryLimit": 2, "progressDeadlineSeconds": 600 }, "status": {} }, "oldObject": "None", "dryRun": "False" }, "response": { "allowed": true, "patch": "W3sib3AiOiJyZXBsYWNlIiwicGF0aCI6Ii9zcGVjIiwidmFsdWUiOnsicmVwbGljYXMiOjEsInNlbGVjdG9yIjp7Im1hdGNoTGFiZWxzIjp7ImFwcCI6InNwcmluZy1zaW1wbGUifX0sInRlbXBsYXRlIjp7Im1ldGFkYXRhIjp7ImNyZWF0aW9uVGltZXN0YW1wIjoiTm9uZSIsImxhYmVscyI6eyJhcHAiOiJzcHJpbmctc2ltcGxlIn19LCJzcGVjIjp7ImNvbnRhaW5lcnMiOlt7Im5hbWUiOiJzcHJpbmctc2ltcGxlIiwiaW1hZ2UiOiJ0YW1oYXJpYWNyLmF6dXJlY3IuaW8vc3ByaW5nLXNpbXBsZTp2MSIsInBvcnRzIjpbeyJjb250YWluZXJQb3J0Ijo4MDgwLCJwcm90b2NvbCI6IlRDUCJ9XSwicmVzb3VyY2VzIjp7ImxpbWl0cyI6eyJjcHUiOiIyMDBtIn0sInJlcXVlc3RzIjp7ImNwdSI6IjE1MG0ifX0sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJJZk5vdFByZXNlbnQiLCJlbnYiOlt7Im5hbWUiOiJKQVZBX1RPT0xfT1BUSU9OUyIsInZhbHVlIjoiLWphdmFhZ2VudDovYWdlbnRmaWxlcy9qYXZhL2FwcGxpY2F0aW9uaW5zaWdodHMtYWdlbnQtY29kZWxlc3MuamFyIn0seyJuYW1lIjoiQVNQTkVUQ09SRV9IT1NUSU5HU1RBUlRVUEFTU0VNQkxJRVMiLCJ2YWx1ZSI6IlN0YXJ0dXBCb290c3RyYXBwZXIifSx7Im5hbWUiOiJET1RORVRfQURESVRJT05BTF9ERVBTIiwidmFsdWUiOiIvYWdlbnRmaWxlcy9jb3JlL2FkZGl0aW9uYWxEZXBzIn0seyJuYW1lIjoiRE9UTkVUX1NIQVJFRF9TVE9SRSIsInZhbHVlIjoiL2FnZW50ZmlsZXMvY29yZS9zdG9yZS9saW4ifSx7Im5hbWUiOiJOT0RFX09QVElPTlMiLCJ2YWx1ZSI6Ii0tcmVxdWlyZSAvYWdlbnRmaWxlcy9ub2RlL2FpLWJvb3RzdHJhcC5qcyJ9LHsibmFtZSI6IkFQUElOU0lHSFRTX0lOU1RSVU1FTlRBVElPTktFWSIsInZhbHVlRnJvbSI6eyJjb25maWdNYXBLZXlSZWYiOnsia2V5IjoiaWtleSIsIm5hbWUiOiJhdHRhY2gtY29uZmlnIn19fSx7Im5hbWUiOiJPQ0FHRU5UX1RSQUNFX0VYUE9SVEVSX0VORFBPSU5UIiwidmFsdWUiOiJsb2NhbGZvcndhcmRlci11bmRlZmluZWQifV0sInZvbHVtZU1vdW50cyI6W3sibW91bnRQYXRoIjoiL2FnZW50ZmlsZXMiLCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dfV0sInJlc3RhcnRQb2xpY3kiOiJBbHdheXMiLCJ0ZXJtaW5hdGlvbkdyYWNlUGVyaW9kU2Vjb25kcyI6MzAsImRuc1BvbGljeSI6IkNsdXN0ZXJGaXJzdCIsIm5vZGVTZWxlY3RvciI6eyJiZXRhLmt1YmVybmV0ZXMuaW8vb3MiOiJsaW51eCJ9LCJzZWN1cml0eUNvbnRleHQiOnt9LCJzY2hlZHVsZXJOYW1lIjoiZGVmYXVsdC1zY2hlZHVsZXIiLCJpbml0Q29udGFpbmVycyI6W3siYXJncyI6WyItYSIsIi9hZ2VudHMvLiIsIi9hZ2VudGZpbGVzIl0sImNvbW1hbmQiOlsiY3AiXSwiaW1hZ2UiOiJFUlJPUiIsIm5hbWUiOiJhZ2VudC1pbml0Iiwidm9sdW1lTW91bnRzIjpbeyJtb3VudFBhdGgiOiIvYWdlbnRmaWxlcyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV19XSwidm9sdW1lcyI6W3siZW1wdHlEaXIiOnt9LCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dfX0sInN0cmF0ZWd5Ijp7InR5cGUiOiJSb2xsaW5nVXBkYXRlIiwicm9sbGluZ1VwZGF0ZSI6eyJtYXhVbmF2YWlsYWJsZSI6MSwibWF4U3VyZ2UiOjF9fSwibWluUmVhZHlTZWNvbmRzIjo1LCJyZXZpc2lvbkhpc3RvcnlMaW1pdCI6MiwicHJvZ3Jlc3NEZWFkbGluZVNlY29uZHMiOjYwMH19XQ==", "patchtype": "JSONPATCH", "uid": "6e55578b-9c4f-11e9-9685-b65b44598b61" } };

const testObject2 = JSON.stringify({
    "kind": "Testing",
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

const response2 = { "apiVersion": "admission.k8s.io/v1beta1", "kind": "Testing", "request": { "uid": "cf481665-e586-11e9-8636-beff4de305b8", "kind": { "group": "", "version": "v1", "kind": "Pod" }, "resource": { "group": "", "version": "v1", "resource": "pods" }, "namespace": "default", "operation": "CREATE", "userInfo": { "username": "aksService", "groups": ["system:masters", "system:authenticated"] }, "object": { "kind": "Pod", "apiVersion": "v1", "metadata": { "generateName": "quieting-garfish-ibm-ope-7459f598b4-", "creationTimestamp": null, "labels": { "app": "quieting-garfish-ibm-ope", "chart": "ibm-open-liberty-spring-1.10.0", "heritage": "Tiller", "pod-template-hash": "7459f598b4", "release": "quieting-garfish" }, "annotations": { "productID": "OpenLiberty_67365423789_18002_151_00000", "productName": "Open Liberty", "productVersion": "19.0.0.5" }, "ownerReferences": [{ "apiVersion": "apps/v1", "kind": "ReplicaSet", "name": "quieting-garfish-ibm-ope-7459f598b4", "uid": "b67a9438-e586-11e9-8636-beff4de305b8", "controller": true, "blockOwnerDeletion": true }] }, "spec": { "volumes": [{ "name": "liberty-overrides", "configMap": { "name": "quieting-garfish-ibm-ope", "items": [{ "key": "include-configmap.xml", "path": "include-configmap.xml" }], "defaultMode": 420 } }, { "name": "liberty-config", "configMap": { "name": "quieting-garfish-ibm-ope", "defaultMode": 420 } }, { "name": "quieting-garfish-ibm-ope-token-njwn6", "secret": { "secretName": "quieting-garfish-ibm-ope-token-njwn6" } }], "containers": [{ "name": "ibm-open-liberty-spring", "image": "openliberty/open-liberty:springBoot2-ubi-min", "env": [{ "name": "WLP_LOGGING_CONSOLE_FORMAT", "value": "json" }, { "name": "WLP_LOGGING_CONSOLE_LOGLEVEL", "value": "info" }, { "name": "WLP_LOGGING_CONSOLE_SOURCE", "value": "message,trace,accessLog,ffdc" }, { "name": "KUBERNETES_NAMESPACE", "valueFrom": { "fieldRef": { "apiVersion": "v1", "fieldPath": "metadata.namespace" } } }, { "name": "IIOP_ENDPOINT_HOST", "valueFrom": { "fieldRef": { "apiVersion": "v1", "fieldPath": "status.podIP" } } }, { "name": "KEYSTORE_REQUIRED", "value": "true" }], "resources": {}, "volumeMounts": [{ "name": "liberty-overrides", "readOnly": true, "mountPath": "/config/configDropins/overrides/include-configmap.xml", "subPath": "include-configmap.xml" }, { "name": "liberty-config", "readOnly": true, "mountPath": "/etc/wlp/configmap" }, { "name": "quieting-garfish-ibm-ope-token-njwn6", "readOnly": true, "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount" }], "livenessProbe": { "httpGet": { "path": "/", "port": 9443, "scheme": "HTTPS" }, "initialDelaySeconds": 20, "timeoutSeconds": 1, "periodSeconds": 5, "successThreshold": 1, "failureThreshold": 3 }, "readinessProbe": { "httpGet": { "path": "/", "port": 9443, "scheme": "HTTPS" }, "initialDelaySeconds": 2, "timeoutSeconds": 1, "periodSeconds": 5, "successThreshold": 1, "failureThreshold": 3 }, "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "imagePullPolicy": "IfNotPresent", "securityContext": { "capabilities": { "drop": ["ALL"] }, "privileged": false, "readOnlyRootFilesystem": false, "allowPrivilegeEscalation": false } }], "restartPolicy": "Always", "terminationGracePeriodSeconds": 30, "dnsPolicy": "ClusterFirst", "serviceAccountName": "quieting-garfish-ibm-ope", "serviceAccount": "quieting-garfish-ibm-ope", "securityContext": { "runAsUser": 1001, "runAsNonRoot": true }, "imagePullSecrets": [{ "name": "sa-default" }], "affinity": { "nodeAffinity": { "requiredDuringSchedulingIgnoredDuringExecution": { "nodeSelectorTerms": [{ "matchExpressions": [{ "key": "beta.kubernetes.io/arch", "operator": "In", "values": ["amd64", "ppc64le", "s390x"] }] }] }, "preferredDuringSchedulingIgnoredDuringExecution": [{ "weight": 2, "preference": { "matchExpressions": [{ "key": "beta.kubernetes.io/arch", "operator": "In", "values": ["amd64"] }] } }, { "weight": 2, "preference": { "matchExpressions": [{ "key": "beta.kubernetes.io/arch", "operator": "In", "values": ["ppc64le"] }] } }, { "weight": 2, "preference": { "matchExpressions": [{ "key": "beta.kubernetes.io/arch", "operator": "In", "values": ["s390x"] }] } }] }, "podAntiAffinity": { "preferredDuringSchedulingIgnoredDuringExecution": [{ "weight": 100, "podAffinityTerm": { "labelSelector": { "matchExpressions": [{ "key": "app", "operator": "In", "values": ["quieting-garfish-ibm-ope"] }, { "key": "release", "operator": "In", "values": ["quieting-garfish"] }] }, "topologyKey": "kubernetes.io/hostname" } }] } }, "schedulerName": "default-scheduler", "tolerations": [{ "key": "node.kubernetes.io/not-ready", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }, { "key": "node.kubernetes.io/unreachable", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }], "priority": 0, "enableServiceLinks": true }, "status": {} }, "oldObject": null, "dryRun": false }, "response": { "allowed": true, "patch": "W3sib3AiOiJyZXBsYWNlIiwicGF0aCI6Ii9zcGVjIiwidmFsdWUiOnsidm9sdW1lcyI6W3sibmFtZSI6ImxpYmVydHktb3ZlcnJpZGVzIiwiY29uZmlnTWFwIjp7Im5hbWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUiLCJpdGVtcyI6W3sia2V5IjoiaW5jbHVkZS1jb25maWdtYXAueG1sIiwicGF0aCI6ImluY2x1ZGUtY29uZmlnbWFwLnhtbCJ9XSwiZGVmYXVsdE1vZGUiOjQyMH19LHsibmFtZSI6ImxpYmVydHktY29uZmlnIiwiY29uZmlnTWFwIjp7Im5hbWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUiLCJkZWZhdWx0TW9kZSI6NDIwfX0seyJuYW1lIjoicXVpZXRpbmctZ2FyZmlzaC1pYm0tb3BlLXRva2VuLW5qd242Iiwic2VjcmV0Ijp7InNlY3JldE5hbWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUtdG9rZW4tbmp3bjYifX0seyJlbXB0eURpciI6e30sIm5hbWUiOiJhZ2VudC12b2x1bWUifV0sImNvbnRhaW5lcnMiOlt7Im5hbWUiOiJpYm0tb3Blbi1saWJlcnR5LXNwcmluZyIsImltYWdlIjoib3BlbmxpYmVydHkvb3Blbi1saWJlcnR5OnNwcmluZ0Jvb3QyLXViaS1taW4iLCJlbnYiOlt7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX0ZPUk1BVCIsInZhbHVlIjoianNvbiJ9LHsibmFtZSI6IldMUF9MT0dHSU5HX0NPTlNPTEVfTE9HTEVWRUwiLCJ2YWx1ZSI6ImluZm8ifSx7Im5hbWUiOiJXTFBfTE9HR0lOR19DT05TT0xFX1NPVVJDRSIsInZhbHVlIjoibWVzc2FnZSx0cmFjZSxhY2Nlc3NMb2csZmZkYyJ9LHsibmFtZSI6IktVQkVSTkVURVNfTkFNRVNQQUNFIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6Im1ldGFkYXRhLm5hbWVzcGFjZSJ9fX0seyJuYW1lIjoiSUlPUF9FTkRQT0lOVF9IT1NUIiwidmFsdWVGcm9tIjp7ImZpZWxkUmVmIjp7ImFwaVZlcnNpb24iOiJ2MSIsImZpZWxkUGF0aCI6InN0YXR1cy5wb2RJUCJ9fX0seyJuYW1lIjoiS0VZU1RPUkVfUkVRVUlSRUQiLCJ2YWx1ZSI6InRydWUifSx7Im5hbWUiOiJKQVZBX1RPT0xfT1BUSU9OUyIsInZhbHVlIjoiLWphdmFhZ2VudDovYWdlbnRmaWxlcy9qYXZhL2FwcGxpY2F0aW9uaW5zaWdodHMtYWdlbnQtY29kZWxlc3MuamFyIn0seyJuYW1lIjoiQVNQTkVUQ09SRV9IT1NUSU5HU1RBUlRVUEFTU0VNQkxJRVMiLCJ2YWx1ZSI6IlN0YXJ0dXBCb290c3RyYXBwZXIifSx7Im5hbWUiOiJET1RORVRfQURESVRJT05BTF9ERVBTIiwidmFsdWUiOiIvYWdlbnRmaWxlcy9jb3JlL2FkZGl0aW9uYWxEZXBzIn0seyJuYW1lIjoiRE9UTkVUX1NIQVJFRF9TVE9SRSIsInZhbHVlIjoiL2FnZW50ZmlsZXMvY29yZS9zdG9yZS9saW4ifSx7Im5hbWUiOiJOT0RFX09QVElPTlMiLCJ2YWx1ZSI6Ii0tcmVxdWlyZSAvYWdlbnRmaWxlcy9ub2RlL2FpLWJvb3RzdHJhcC5qcyJ9LHsibmFtZSI6IkFQUElOU0lHSFRTX0lOU1RSVU1FTlRBVElPTktFWSIsInZhbHVlRnJvbSI6eyJjb25maWdNYXBLZXlSZWYiOnsia2V5IjoiaWtleSIsIm5hbWUiOiJhdHRhY2gtY29uZmlnIn19fSx7Im5hbWUiOiJPQ0FHRU5UX1RSQUNFX0VYUE9SVEVSX0VORFBPSU5UIiwidmFsdWUiOiJsb2NhbGZvcndhcmRlci11bmRlZmluZWQifSx7Im5hbWUiOiJBUFBMSUNBVElPTklOU0lHSFRTX1JPTEVfTkFNRSIsInZhbHVlIjoicXVpZXRpbmctZ2FyZmlzaC1pYm0tb3BlLTc0NTlmNTk4YjQtIn0seyJuYW1lIjoiV0VCU0lURV9IT1NUTkFNRSIsInZhbHVlIjoicXVpZXRpbmctZ2FyZmlzaC1pYm0tb3BlLTc0NTlmNTk4YjQtIn0seyJuYW1lIjoiQVBQTElDQVRJT05JTlNJR0hUU19ST0xFX0lOU1RBTkNFIiwidmFsdWUiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUtNzQ1OWY1OThiNC0ifV0sInJlc291cmNlcyI6e30sInZvbHVtZU1vdW50cyI6W3sibmFtZSI6ImxpYmVydHktb3ZlcnJpZGVzIiwicmVhZE9ubHkiOnRydWUsIm1vdW50UGF0aCI6Ii9jb25maWcvY29uZmlnRHJvcGlucy9vdmVycmlkZXMvaW5jbHVkZS1jb25maWdtYXAueG1sIiwic3ViUGF0aCI6ImluY2x1ZGUtY29uZmlnbWFwLnhtbCJ9LHsibmFtZSI6ImxpYmVydHktY29uZmlnIiwicmVhZE9ubHkiOnRydWUsIm1vdW50UGF0aCI6Ii9ldGMvd2xwL2NvbmZpZ21hcCJ9LHsibmFtZSI6InF1aWV0aW5nLWdhcmZpc2gtaWJtLW9wZS10b2tlbi1uanduNiIsInJlYWRPbmx5Ijp0cnVlLCJtb3VudFBhdGgiOiIvdmFyL3J1bi9zZWNyZXRzL2t1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQifSx7Im1vdW50UGF0aCI6Ii9hZ2VudGZpbGVzIiwibmFtZSI6ImFnZW50LXZvbHVtZSJ9XSwibGl2ZW5lc3NQcm9iZSI6eyJodHRwR2V0Ijp7InBhdGgiOiIvIiwicG9ydCI6OTQ0Mywic2NoZW1lIjoiSFRUUFMifSwiaW5pdGlhbERlbGF5U2Vjb25kcyI6MjAsInRpbWVvdXRTZWNvbmRzIjoxLCJwZXJpb2RTZWNvbmRzIjo1LCJzdWNjZXNzVGhyZXNob2xkIjoxLCJmYWlsdXJlVGhyZXNob2xkIjozfSwicmVhZGluZXNzUHJvYmUiOnsiaHR0cEdldCI6eyJwYXRoIjoiLyIsInBvcnQiOjk0NDMsInNjaGVtZSI6IkhUVFBTIn0sImluaXRpYWxEZWxheVNlY29uZHMiOjIsInRpbWVvdXRTZWNvbmRzIjoxLCJwZXJpb2RTZWNvbmRzIjo1LCJzdWNjZXNzVGhyZXNob2xkIjoxLCJmYWlsdXJlVGhyZXNob2xkIjozfSwidGVybWluYXRpb25NZXNzYWdlUGF0aCI6Ii9kZXYvdGVybWluYXRpb24tbG9nIiwidGVybWluYXRpb25NZXNzYWdlUG9saWN5IjoiRmlsZSIsImltYWdlUHVsbFBvbGljeSI6IklmTm90UHJlc2VudCIsInNlY3VyaXR5Q29udGV4dCI6eyJjYXBhYmlsaXRpZXMiOnsiZHJvcCI6WyJBTEwiXX0sInByaXZpbGVnZWQiOmZhbHNlLCJyZWFkT25seVJvb3RGaWxlc3lzdGVtIjpmYWxzZSwiYWxsb3dQcml2aWxlZ2VFc2NhbGF0aW9uIjpmYWxzZX19XSwicmVzdGFydFBvbGljeSI6IkFsd2F5cyIsInRlcm1pbmF0aW9uR3JhY2VQZXJpb2RTZWNvbmRzIjozMCwiZG5zUG9saWN5IjoiQ2x1c3RlckZpcnN0Iiwic2VydmljZUFjY291bnROYW1lIjoicXVpZXRpbmctZ2FyZmlzaC1pYm0tb3BlIiwic2VydmljZUFjY291bnQiOiJxdWlldGluZy1nYXJmaXNoLWlibS1vcGUiLCJzZWN1cml0eUNvbnRleHQiOnsicnVuQXNVc2VyIjoxMDAxLCJydW5Bc05vblJvb3QiOnRydWV9LCJpbWFnZVB1bGxTZWNyZXRzIjpbeyJuYW1lIjoic2EtZGVmYXVsdCJ9XSwiYWZmaW5pdHkiOnsibm9kZUFmZmluaXR5Ijp7InJlcXVpcmVkRHVyaW5nU2NoZWR1bGluZ0lnbm9yZWREdXJpbmdFeGVjdXRpb24iOnsibm9kZVNlbGVjdG9yVGVybXMiOlt7Im1hdGNoRXhwcmVzc2lvbnMiOlt7ImtleSI6ImJldGEua3ViZXJuZXRlcy5pby9hcmNoIiwib3BlcmF0b3IiOiJJbiIsInZhbHVlcyI6WyJhbWQ2NCIsInBwYzY0bGUiLCJzMzkweCJdfV19XX0sInByZWZlcnJlZER1cmluZ1NjaGVkdWxpbmdJZ25vcmVkRHVyaW5nRXhlY3V0aW9uIjpbeyJ3ZWlnaHQiOjIsInByZWZlcmVuY2UiOnsibWF0Y2hFeHByZXNzaW9ucyI6W3sia2V5IjoiYmV0YS5rdWJlcm5ldGVzLmlvL2FyY2giLCJvcGVyYXRvciI6IkluIiwidmFsdWVzIjpbImFtZDY0Il19XX19LHsid2VpZ2h0IjoyLCJwcmVmZXJlbmNlIjp7Im1hdGNoRXhwcmVzc2lvbnMiOlt7ImtleSI6ImJldGEua3ViZXJuZXRlcy5pby9hcmNoIiwib3BlcmF0b3IiOiJJbiIsInZhbHVlcyI6WyJwcGM2NGxlIl19XX19LHsid2VpZ2h0IjoyLCJwcmVmZXJlbmNlIjp7Im1hdGNoRXhwcmVzc2lvbnMiOlt7ImtleSI6ImJldGEua3ViZXJuZXRlcy5pby9hcmNoIiwib3BlcmF0b3IiOiJJbiIsInZhbHVlcyI6WyJzMzkweCJdfV19fV19LCJwb2RBbnRpQWZmaW5pdHkiOnsicHJlZmVycmVkRHVyaW5nU2NoZWR1bGluZ0lnbm9yZWREdXJpbmdFeGVjdXRpb24iOlt7IndlaWdodCI6MTAwLCJwb2RBZmZpbml0eVRlcm0iOnsibGFiZWxTZWxlY3RvciI6eyJtYXRjaEV4cHJlc3Npb25zIjpbeyJrZXkiOiJhcHAiLCJvcGVyYXRvciI6IkluIiwidmFsdWVzIjpbInF1aWV0aW5nLWdhcmZpc2gtaWJtLW9wZSJdfSx7ImtleSI6InJlbGVhc2UiLCJvcGVyYXRvciI6IkluIiwidmFsdWVzIjpbInF1aWV0aW5nLWdhcmZpc2giXX1dfSwidG9wb2xvZ3lLZXkiOiJrdWJlcm5ldGVzLmlvL2hvc3RuYW1lIn19XX19LCJzY2hlZHVsZXJOYW1lIjoiZGVmYXVsdC1zY2hlZHVsZXIiLCJ0b2xlcmF0aW9ucyI6W3sia2V5Ijoibm9kZS5rdWJlcm5ldGVzLmlvL25vdC1yZWFkeSIsIm9wZXJhdG9yIjoiRXhpc3RzIiwiZWZmZWN0IjoiTm9FeGVjdXRlIiwidG9sZXJhdGlvblNlY29uZHMiOjMwMH0seyJrZXkiOiJub2RlLmt1YmVybmV0ZXMuaW8vdW5yZWFjaGFibGUiLCJvcGVyYXRvciI6IkV4aXN0cyIsImVmZmVjdCI6Ik5vRXhlY3V0ZSIsInRvbGVyYXRpb25TZWNvbmRzIjozMDB9XSwicHJpb3JpdHkiOjAsImVuYWJsZVNlcnZpY2VMaW5rcyI6dHJ1ZSwiaW5pdENvbnRhaW5lcnMiOlt7ImFyZ3MiOlsiLWEiLCIvYWdlbnRzLy4iLCIvYWdlbnRmaWxlcyJdLCJjb21tYW5kIjpbImNwIl0sImltYWdlIjoiRVJST1IiLCJuYW1lIjoiYWdlbnQtaW5pdCIsInZvbHVtZU1vdW50cyI6W3sibW91bnRQYXRoIjoiL2FnZW50ZmlsZXMiLCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dfV19fV0=", "patchtype": "JSONPATCH", "uid": "cf481665-e586-11e9-8636-beff4de305b8" } };

const testObject3 = JSON.stringify({ "kind": "Testing", "apiVersion": "admission.k8s.io/v1beta1", "request": { "uid": "26897b2e-1609-11ea-a591-d6dc29b985cb", "kind": { "group": "", "version": "v1", "kind": "Pod" }, "resource": { "group": "", "version": "v1", "resource": "pods" }, "namespace": "default", "operation": "CREATE", "userInfo": { "username": "aksService", "groups": ["system:masters", "system:authenticated"] }, "object": { "kind": "Pod", "apiVersion": "v1", "metadata": { "generateName": "statistics-service-5547698479-", "creationTimestamp": null, "labels": { "io.kompose.service": "statistics-service", "pod-template-hash": "5547698479" }, "ownerReferences": [{ "apiVersion": "apps/v1", "kind": "ReplicaSet", "name": "statistics-service-5547698479", "uid": "7508732f-1607-11ea-a591-d6dc29b985cb", "controller": true, "blockOwnerDeletion": true }] }, "spec": { "volumes": [{ "name": "default-token-ctb67", "secret": { "secretName": "default-token-ctb67" } }], "containers": [{ "name": "statistics-service", "image": "gearamaaks.azurecr.io/piggymetrics-statistics-service", "env": [{ "name": "CONFIG_SERVICE_PASSWORD", "value": "rose98074" }, { "name": "MONGODB_DATABASE", "value": "piggymetrics" }, { "name": "MONGODB_URI", "value": "mongodb://piggymetrics:2EQgQfLMZS0OYyhruMIdk9JWUBodsHmaHa9WXPJ7Ex5gsovcmB9ElHlXJQsjqnOYnN8aWMbV6bLGZ13VZhCu9A==@piggymetrics.documents.azure.com:10255/?ssl=true&replicaSet=globaldb" }, { "name": "RABBITMQ_HOST", "value": "40.87.124.184" }, { "name": "RABBITMQ_PASSWORD", "value": "rose98074" }, { "name": "RABBITMQ_PORT", "value": "5672" }, { "name": "RABBITMQ_USERNAME", "value": "rabbitmq" }, { "name": "STATISTICS_SERVICE_PASSWORD", "value": "XUoJBrTtqXBonU5zMVzSUtrLPKRQztLUQE4poDoIR1QdcDfGgnGgJO5wbFC7xCEL" }], "resources": {}, "volumeMounts": [{ "name": "default-token-ctb67", "readOnly": true, "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount" }], "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "imagePullPolicy": "Always" }], "restartPolicy": "Always", "terminationGracePeriodSeconds": 30, "dnsPolicy": "ClusterFirst", "serviceAccountName": "default", "serviceAccount": "default", "securityContext": {}, "schedulerName": "default-scheduler", "tolerations": [{ "key": "node.kubernetes.io/not-ready", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }, { "key": "node.kubernetes.io/unreachable", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }], "priority": 0, "enableServiceLinks": true }, "status": {} }, "oldObject": null, "dryRun": false } });

const response3 = { "apiVersion": "admission.k8s.io/v1beta1", "kind": "Testing", "request": { "uid": "26897b2e-1609-11ea-a591-d6dc29b985cb", "kind": { "group": "", "version": "v1", "kind": "Pod" }, "resource": { "group": "", "version": "v1", "resource": "pods" }, "namespace": "default", "operation": "CREATE", "userInfo": { "username": "aksService", "groups": ["system:masters", "system:authenticated"] }, "object": { "kind": "Pod", "apiVersion": "v1", "metadata": { "generateName": "statistics-service-5547698479-", "creationTimestamp": null, "labels": { "io.kompose.service": "statistics-service", "pod-template-hash": "5547698479" }, "ownerReferences": [{ "apiVersion": "apps/v1", "kind": "ReplicaSet", "name": "statistics-service-5547698479", "uid": "7508732f-1607-11ea-a591-d6dc29b985cb", "controller": true, "blockOwnerDeletion": true }] }, "spec": { "volumes": [{ "name": "default-token-ctb67", "secret": { "secretName": "default-token-ctb67" } }], "containers": [{ "name": "statistics-service", "image": "gearamaaks.azurecr.io/piggymetrics-statistics-service", "env": [{ "name": "CONFIG_SERVICE_PASSWORD", "value": "rose98074" }, { "name": "MONGODB_DATABASE", "value": "piggymetrics" }, { "name": "MONGODB_URI", "value": "mongodb://piggymetrics:2EQgQfLMZS0OYyhruMIdk9JWUBodsHmaHa9WXPJ7Ex5gsovcmB9ElHlXJQsjqnOYnN8aWMbV6bLGZ13VZhCu9A==@piggymetrics.documents.azure.com:10255/?ssl=true&replicaSet=globaldb" }, { "name": "RABBITMQ_HOST", "value": "40.87.124.184" }, { "name": "RABBITMQ_PASSWORD", "value": "rose98074" }, { "name": "RABBITMQ_PORT", "value": "5672" }, { "name": "RABBITMQ_USERNAME", "value": "rabbitmq" }, { "name": "STATISTICS_SERVICE_PASSWORD", "value": "XUoJBrTtqXBonU5zMVzSUtrLPKRQztLUQE4poDoIR1QdcDfGgnGgJO5wbFC7xCEL" }], "resources": {}, "volumeMounts": [{ "name": "default-token-ctb67", "readOnly": true, "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount" }], "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "imagePullPolicy": "Always" }], "restartPolicy": "Always", "terminationGracePeriodSeconds": 30, "dnsPolicy": "ClusterFirst", "serviceAccountName": "default", "serviceAccount": "default", "securityContext": {}, "schedulerName": "default-scheduler", "tolerations": [{ "key": "node.kubernetes.io/not-ready", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }, { "key": "node.kubernetes.io/unreachable", "operator": "Exists", "effect": "NoExecute", "tolerationSeconds": 300 }], "priority": 0, "enableServiceLinks": true }, "status": {} }, "oldObject": null, "dryRun": false }, "response": { "allowed": true, "patch": "W3sib3AiOiJyZXBsYWNlIiwicGF0aCI6Ii9zcGVjIiwidmFsdWUiOnsidm9sdW1lcyI6W3sibmFtZSI6ImRlZmF1bHQtdG9rZW4tY3RiNjciLCJzZWNyZXQiOnsic2VjcmV0TmFtZSI6ImRlZmF1bHQtdG9rZW4tY3RiNjcifX0seyJlbXB0eURpciI6e30sIm5hbWUiOiJhZ2VudC12b2x1bWUifV0sImNvbnRhaW5lcnMiOlt7Im5hbWUiOiJzdGF0aXN0aWNzLXNlcnZpY2UiLCJpbWFnZSI6ImdlYXJhbWFha3MuYXp1cmVjci5pby9waWdneW1ldHJpY3Mtc3RhdGlzdGljcy1zZXJ2aWNlIiwiZW52IjpbeyJuYW1lIjoiQ09ORklHX1NFUlZJQ0VfUEFTU1dPUkQiLCJ2YWx1ZSI6InJvc2U5ODA3NCJ9LHsibmFtZSI6Ik1PTkdPREJfREFUQUJBU0UiLCJ2YWx1ZSI6InBpZ2d5bWV0cmljcyJ9LHsibmFtZSI6Ik1PTkdPREJfVVJJIiwidmFsdWUiOiJtb25nb2RiOi8vcGlnZ3ltZXRyaWNzOjJFUWdRZkxNWlMwT1l5aHJ1TUlkazlKV1VCb2RzSG1hSGE5V1hQSjdFeDVnc292Y21COUVsSGxYSlFzanFuT1luTjhhV01iVjZiTEdaMTNWWmhDdTlBPT1AcGlnZ3ltZXRyaWNzLmRvY3VtZW50cy5henVyZS5jb206MTAyNTUvP3NzbD10cnVlJnJlcGxpY2FTZXQ9Z2xvYmFsZGIifSx7Im5hbWUiOiJSQUJCSVRNUV9IT1NUIiwidmFsdWUiOiI0MC44Ny4xMjQuMTg0In0seyJuYW1lIjoiUkFCQklUTVFfUEFTU1dPUkQiLCJ2YWx1ZSI6InJvc2U5ODA3NCJ9LHsibmFtZSI6IlJBQkJJVE1RX1BPUlQiLCJ2YWx1ZSI6IjU2NzIifSx7Im5hbWUiOiJSQUJCSVRNUV9VU0VSTkFNRSIsInZhbHVlIjoicmFiYml0bXEifSx7Im5hbWUiOiJTVEFUSVNUSUNTX1NFUlZJQ0VfUEFTU1dPUkQiLCJ2YWx1ZSI6IlhVb0pCclR0cVhCb25VNXpNVnpTVXRyTFBLUlF6dExVUUU0cG9Eb0lSMVFkY0RmR2duR2dKTzV3YkZDN3hDRUwifSx7Im5hbWUiOiJKQVZBX1RPT0xfT1BUSU9OUyIsInZhbHVlIjoiLWphdmFhZ2VudDovYWdlbnRmaWxlcy9qYXZhL2FwcGxpY2F0aW9uaW5zaWdodHMtYWdlbnQtY29kZWxlc3MuamFyIn0seyJuYW1lIjoiQVNQTkVUQ09SRV9IT1NUSU5HU1RBUlRVUEFTU0VNQkxJRVMiLCJ2YWx1ZSI6IlN0YXJ0dXBCb290c3RyYXBwZXIifSx7Im5hbWUiOiJET1RORVRfQURESVRJT05BTF9ERVBTIiwidmFsdWUiOiIvYWdlbnRmaWxlcy9jb3JlL2FkZGl0aW9uYWxEZXBzIn0seyJuYW1lIjoiRE9UTkVUX1NIQVJFRF9TVE9SRSIsInZhbHVlIjoiL2FnZW50ZmlsZXMvY29yZS9zdG9yZS9saW4ifSx7Im5hbWUiOiJOT0RFX09QVElPTlMiLCJ2YWx1ZSI6Ii0tcmVxdWlyZSAvYWdlbnRmaWxlcy9ub2RlL2FpLWJvb3RzdHJhcC5qcyJ9LHsibmFtZSI6IkFQUElOU0lHSFRTX0lOU1RSVU1FTlRBVElPTktFWSIsInZhbHVlRnJvbSI6eyJjb25maWdNYXBLZXlSZWYiOnsia2V5IjoiaWtleSIsIm5hbWUiOiJhdHRhY2gtY29uZmlnIn19fSx7Im5hbWUiOiJPQ0FHRU5UX1RSQUNFX0VYUE9SVEVSX0VORFBPSU5UIiwidmFsdWUiOiJsb2NhbGZvcndhcmRlci11bmRlZmluZWQifSx7Im5hbWUiOiJBUFBMSUNBVElPTklOU0lHSFRTX1JPTEVfTkFNRSIsInZhbHVlIjoic3RhdGlzdGljcy1zZXJ2aWNlLTU1NDc2OTg0NzktIn0seyJuYW1lIjoiV0VCU0lURV9IT1NUTkFNRSIsInZhbHVlIjoic3RhdGlzdGljcy1zZXJ2aWNlLTU1NDc2OTg0NzktIn0seyJuYW1lIjoiQVBQTElDQVRJT05JTlNJR0hUU19ST0xFX0lOU1RBTkNFIiwidmFsdWUiOiJzdGF0aXN0aWNzLXNlcnZpY2UtNTU0NzY5ODQ3OS0ifV0sInJlc291cmNlcyI6e30sInZvbHVtZU1vdW50cyI6W3sibmFtZSI6ImRlZmF1bHQtdG9rZW4tY3RiNjciLCJyZWFkT25seSI6dHJ1ZSwibW91bnRQYXRoIjoiL3Zhci9ydW4vc2VjcmV0cy9rdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50In0seyJtb3VudFBhdGgiOiIvYWdlbnRmaWxlcyIsIm5hbWUiOiJhZ2VudC12b2x1bWUifV0sInRlcm1pbmF0aW9uTWVzc2FnZVBhdGgiOiIvZGV2L3Rlcm1pbmF0aW9uLWxvZyIsInRlcm1pbmF0aW9uTWVzc2FnZVBvbGljeSI6IkZpbGUiLCJpbWFnZVB1bGxQb2xpY3kiOiJBbHdheXMifV0sInJlc3RhcnRQb2xpY3kiOiJBbHdheXMiLCJ0ZXJtaW5hdGlvbkdyYWNlUGVyaW9kU2Vjb25kcyI6MzAsImRuc1BvbGljeSI6IkNsdXN0ZXJGaXJzdCIsInNlcnZpY2VBY2NvdW50TmFtZSI6ImRlZmF1bHQiLCJzZXJ2aWNlQWNjb3VudCI6ImRlZmF1bHQiLCJzZWN1cml0eUNvbnRleHQiOnt9LCJzY2hlZHVsZXJOYW1lIjoiZGVmYXVsdC1zY2hlZHVsZXIiLCJ0b2xlcmF0aW9ucyI6W3sia2V5Ijoibm9kZS5rdWJlcm5ldGVzLmlvL25vdC1yZWFkeSIsIm9wZXJhdG9yIjoiRXhpc3RzIiwiZWZmZWN0IjoiTm9FeGVjdXRlIiwidG9sZXJhdGlvblNlY29uZHMiOjMwMH0seyJrZXkiOiJub2RlLmt1YmVybmV0ZXMuaW8vdW5yZWFjaGFibGUiLCJvcGVyYXRvciI6IkV4aXN0cyIsImVmZmVjdCI6Ik5vRXhlY3V0ZSIsInRvbGVyYXRpb25TZWNvbmRzIjozMDB9XSwicHJpb3JpdHkiOjAsImVuYWJsZVNlcnZpY2VMaW5rcyI6dHJ1ZSwiaW5pdENvbnRhaW5lcnMiOlt7ImFyZ3MiOlsiLWEiLCIvYWdlbnRzLy4iLCIvYWdlbnRmaWxlcyJdLCJjb21tYW5kIjpbImNwIl0sImltYWdlIjoiRVJST1IiLCJuYW1lIjoiYWdlbnQtaW5pdCIsInZvbHVtZU1vdW50cyI6W3sibW91bnRQYXRoIjoiL2FnZW50ZmlsZXMiLCJuYW1lIjoiYWdlbnQtdm9sdW1lIn1dfV19fV0=", "patchtype": "JSONPATCH", "uid": "26897b2e-1609-11ea-a591-d6dc29b985cb" } };
/* tslint:enable */
