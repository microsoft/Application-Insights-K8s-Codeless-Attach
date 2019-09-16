// temporary thingy i need a better way to serve this, maybe put it in the config map and read it from there as json and parse the json
export class AddedTypes {
    public static init_containers() {
        return [{
            'name': 'agent-init',
            'image': 'mcr.microsoft.com/applicationinsights/attach-agents:v5',
            'command': ['cp', '/java-agent-v1.jar', '/agentconfig/java-agent-v1.jar'],
            'volumeMounts': [{
                'name': 'agentdisk',
                'mountPath': '/agentconfig'
            }]
        }]
    }

    public static env() {
        return [
            {
                'name': '_JAVA_OPTIONS',
                'value': '-javaagent:/agentconfig/java-agent-v1.jar'
            },
            {
                'name': 'APPINSIGHTS_CONNECTIONSTRING',
                'valueFrom': {
                    'configMapKeyRef': {
                        'name': 'attach-config',
                        'key': 'ikey'
                    }
                }
            }
        ]
    }

    public static volume_mounts() {
        return {
            'volumeMounts': [{
                'name': 'agentdisk',
                'mountPath': '/agentconfig'
            }]
        }
    }

    public static volumes() {
        return [{
            'name': 'agentdisk',
            'emptyDir': '{}'
        }]
    }
}