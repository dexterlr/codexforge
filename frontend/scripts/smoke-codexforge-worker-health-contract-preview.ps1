param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2113 Worker Health Contract Preview"
  ScriptFile = "smoke-codexforge-worker-health-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-health-contract-preview"
  Route = "src\\app\\worker-health-contract-preview"
  CommandLabel = "Go to Worker Health Contract Preview"
  RouteHref = "/worker-health-contract-preview"
  ContractFamily = "Worker"
  Markers = @("Worker health contract preview", "Worker health contract preview does not inspect live workers read logs start services or persist health state from the UI", "Worker health contract preview requires backend-owned health monitoring telemetry redaction policy and audit trail", "Worker health contract preview shows simulated worker health simulated heartbeat status simulated resource state simulated redaction note simulated denied frontend health persistence", "Denied worker health contract paths remain blocked", "Worker health contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
