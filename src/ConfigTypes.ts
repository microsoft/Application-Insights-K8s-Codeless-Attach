export interface Namespaces {
    excluded: string[];
}

export interface ApplicationMonitoringSettings {
    namespaces: Namespaces;
}

export interface SettingsRoot {
    "application-monitoring-settings": ApplicationMonitoringSettings;
}