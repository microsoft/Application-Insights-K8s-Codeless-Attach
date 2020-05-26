{{- define "common.labels" }}
  labels: 
    version: {{ quote .Chart.Version }}
    environment: {{ quote .Values.app.environment }}
    owner: {{ quote .Values.app.owner }}
    app: {{ quote .Values.app.name }}
{{- end }}

{{- define "common.metadata" }}
  namespace: {{ quote .Values.namespace }}
  {{- template "common.labels" . }}
{{- end }}
