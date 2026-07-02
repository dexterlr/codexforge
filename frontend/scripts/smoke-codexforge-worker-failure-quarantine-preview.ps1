param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2117 Worker Failure Quarantine Preview"
  ScriptFile = "smoke-codexforge-worker-failure-quarantine-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-failure-quarantine-preview"
  Route = "src\\app\\worker-failure-quarantine-preview"
  CommandLabel = "Go to Worker Failure Quarantine Preview"
  RouteHref = "/worker-failure-quarantine-preview"
  ContractFamily = "Worker"
  Markers = @("Worker failure quarantine preview", "Worker failure quarantine preview does not quarantine workers kill processes restart runtimes or persist failure state from the UI", "Worker failure quarantine preview requires backend-owned failure quarantine worker isolation incident review and audit trail", "Worker failure quarantine preview shows simulated quarantine state simulated failure class simulated operator review simulated retry hold simulated denied frontend quarantine mutation", "Denied worker failure quarantine paths remain blocked", "Worker failure quarantine checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
