param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2130 Export Audit Event Preview"
  ScriptFile = "smoke-codexforge-export-audit-event-preview.ps1"
  Domain = "src\\lib\\codexforge\\export-audit-event-preview"
  Route = "src\\app\\export-audit-event-preview"
  CommandLabel = "Go to Export Audit Event Preview"
  RouteHref = "/export-audit-event-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Export audit event preview", "Export audit event preview does not persist audit logs transmit telemetry inspect artifacts or mutate audit trails from the UI", "Export audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Export audit event preview shows simulated export event simulated actor binding simulated artifact placeholder simulated redaction state simulated denied frontend audit persistence", "Denied export audit event paths remain blocked", "Export audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
