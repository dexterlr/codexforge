param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2145 Publish Audit Event Preview"
  ScriptFile = "smoke-codexforge-publish-audit-event-preview.ps1"
  Domain = "src\\lib\\codexforge\\publish-audit-event-preview"
  Route = "src\\app\\publish-audit-event-preview"
  CommandLabel = "Go to Publish Audit Event Preview"
  RouteHref = "/publish-audit-event-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Publish audit event preview", "Publish audit event preview does not persist audit logs transmit telemetry call social APIs or mutate publish state from the UI", "Publish audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Publish audit event preview shows simulated publish event simulated actor binding simulated platform placeholder simulated redaction state simulated denied frontend audit persistence", "Denied publish audit event paths remain blocked", "Publish audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
