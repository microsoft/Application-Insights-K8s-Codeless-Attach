package logsuploader

import "time"

type Event struct {
	Time       time.Time  `json:"time"`
	Level      string     `json:"level"`
	Logger     string     `json:"logger"`
	Message    string     `json:"message"`
	Properties Properties `json:"properties"`
}
type Properties struct {
	Operation        string `json:"operation"`
	SiteName         string `json:"siteName"`
	Ikey             string `json:"ikey"`
	ExtensionVersion string `json:"extensionVersion"`
	SdkVersion       string `json:"sdkVersion"`
	SubscriptionID   string `json:"subscriptionId"`
}
