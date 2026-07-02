param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2099 Render Queue Telemetry Preview"
  ScriptFile = "smoke-codexforge-render-queue-telemetry-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-queue-telemetry-preview"
  Route = "src\\app\\render-queue-telemetry-preview"
  CommandLabel = "Go to Render Queue Telemetry Preview"
  RouteHref = "/render-queue-telemetry-preview"
  ContractFamily = "Render"
  Markers = @("Render queue telemetry preview", "Render queue telemetry preview does not transmit telemetry persist logs inspect workers or read service state from the UI", "Render queue telemetry preview requires backend-owned telemetry pipeline redaction policy retention policy and operator review", "Render queue telemetry preview shows simulated queue depth simulated job status simulated latency bucket simulated redaction state simulated denied frontend telemetry persistence", "Denied render queue telemetry paths remain blocked", "Render queue telemetry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
