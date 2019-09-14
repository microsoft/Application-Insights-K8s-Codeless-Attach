

    export interface Kind {
        group: string;
        version: string;
        kind: string;
    }

    export interface Resource {
        group: string;
        version: string;
        resource: string;
    }

    export interface UserInfo {
        username: string;
        groups: string[];
    }

    export interface Labels {
        app: string;
    }

    export interface Annotations {
        'kubectl.kubernetes.io/last-applied-configuration': string;
    }

    export interface Metadata {
        name: string;
        namespace: string;
        creationTimestamp: string;
        labels: Labels;
        annotations: Annotations;
    }

    export interface MatchLabels {
        app: string;
    }

    export interface Selector {
        matchLabels: MatchLabels;
    }

    export interface Labels2 {
        app: string;
    }

    export interface Metadata2 {
        creationTimestamp: string;
        labels: Labels2;
    }

    export interface Port {
        containerPort: number;
        protocol: string;
    }

    export interface Limits {
        cpu: string;
    }

    export interface Requests {
        cpu: string;
    }

    export interface Resources {
        limits: Limits;
        requests: Requests;
    }

    export interface Container {
        name: string;
        image: string;
        ports: Port[];
        resources: Resources;
        terminationMessagePath: string;
        terminationMessagePolicy: string;
        imagePullPolicy: string;
        env?: Object;
        volumeMounts?: Object;
    }

    export interface NodeSelector {
        'beta.kubernetes.io/os': string;
    }

    export interface SecurityContext {
    }

    export interface Spec2 {
        containers: Container[];
        restartPolicy: string;
        terminationGracePeriodSeconds: number;
        dnsPolicy: string;
        nodeSelector: NodeSelector;
        securityContext: SecurityContext;
        schedulerName: string;
        initContainers?: Object;
        volumes?: Object;
    }

    export interface Template {
        metadata: Metadata2;
        spec: Spec2;
    }

    export interface RollingUpdate {
        maxUnavailable: number;
        maxSurge: number;
    }

    export interface Strategy {
        type: string;
        rollingUpdate: RollingUpdate;
    }

    export interface Spec {
        replicas: number;
        selector: Selector;
        template: Template;
        strategy: Strategy;
        minReadySeconds: number;
        revisionHistoryLimit: number;
        progressDeadlineSeconds: number;
    }

    export interface Status {
    }

    export interface ObjectType {
        kind: string;
        apiVersion: string;
        metadata: Metadata;
        spec: Spec;
        status: Status;
    }

    export interface Request {
        uid: string;
        kind: Kind;
        resource: Resource;
        namespace: string;
        operation: string;
        userInfo: UserInfo;
        object: ObjectType;
        oldObject: string;
        dryRun: string;
    }

    export interface RootObject {
        kind: string;
        apiVersion: string;
        request: Request;
    }

