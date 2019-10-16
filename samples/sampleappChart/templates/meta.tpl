{{- define "common.labels" }}
  labels: 
    version: {{ .Chart.Version }}
    environment: {{ .Values.app.environment }}
    owner: {{ .Values.app.owner }}
    app: {{ .Values.app.name }}
{{- end }}

{{- define "common.metadata" }}
  namespace: {{ .Values.namespace }}
  {{- template "common.labels" . }}
{{- end }}
