param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2149 Publish Telemetry Preview"
  ScriptFile = "smoke-codexforge-publish-telemetry-preview.ps1"
  Domain = "src\\lib\\codexforge\\publish-telemetry-preview"
  Route = "src\\app\\publish-telemetry-preview"
  CommandLabel = "Go to Publish Telemetry Preview"
  RouteHref = "/publish-telemetry-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Publish telemetry preview", "Publish telemetry preview does not read platform metrics call social APIs persist analytics or transmit telemetry from the UI", "Publish telemetry preview requires backend-owned telemetry pipeline account authorization redaction policy and audit trail", "Publish telemetry preview shows simulated publish status simulated platform response placeholder simulated metric placeholder simulated redaction state simulated denied frontend telemetry persistence", "Denied publish telemetry paths remain blocked", "Publish telemetry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
