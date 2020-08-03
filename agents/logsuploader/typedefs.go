package main

type Event struct {
	Time       string     `json:"time"` // leave as tring the date time format is not recognized
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

type LogLevel string

const (
	DEBUG   LogLevel = "DEBUG"
	INFO             = "INFO"
	ERROR            = "ERROR"
	CONSOLE          = "CONSOLE"
)
