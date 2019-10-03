{{- define "common.metadata" }}
  namespace: {{ .Values.namespace }}
  #labels: 
  #  version: {{ .Chart.Version }}
  #  environment: {{ .Values.app.environment }}
  #  owner: {{ .Values.app.owner }}
  #  app: {{ .Values.app.name }}
{{- end }}