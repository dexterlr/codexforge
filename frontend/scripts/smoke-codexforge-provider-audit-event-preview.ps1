param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2052 Provider Audit Event Preview"
  ScriptFile = "smoke-codexforge-provider-audit-event-preview.ps1"
  Domain = "src\lib\codexforge\provider-audit-event-preview"
  Route = "src\app\provider-audit-event-preview"
  CommandLabel = "Go to Provider Audit Event Preview"
  RouteHref = "/provider-audit-event-preview"
  Markers = @("Provider audit event preview", "Provider audit event preview does not persist logs transmit telemetry inspect secrets or call audit services from the UI", "Provider audit event preview requires backend-owned audit trail event schema redaction policy retention policy and operator review", "Provider audit event preview shows simulated audit event simulated actor binding simulated redaction state simulated retention rule simulated denied frontend audit persistence", "Denied provider audit event paths remain blocked", "Provider audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

