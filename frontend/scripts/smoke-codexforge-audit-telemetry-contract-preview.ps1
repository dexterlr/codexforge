param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2037 Audit Telemetry Contract Preview"
  ScriptFile = "smoke-codexforge-audit-telemetry-contract-preview.ps1"
  Domain = "src\lib\codexforge\audit-telemetry-contract-preview"
  Route = "src\app\audit-telemetry-contract-preview"
  CommandLabel = "Go to Audit Telemetry Contract Preview"
  RouteHref = "/audit-telemetry-contract-preview"
  Markers = @("Audit telemetry contract preview", "Audit telemetry contract preview does not persist logs inspect services read secrets or transmit telemetry from the UI", "Audit telemetry contract preview requires backend-owned audit log telemetry pipeline redaction policy retention policy and operator review", "Audit telemetry contract preview shows simulated audit contract simulated event schema simulated redaction prerequisite simulated retention prerequisite simulated denied frontend telemetry persistence", "Denied audit telemetry contract paths remain blocked", "Audit telemetry contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

