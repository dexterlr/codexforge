param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2114 Worker Retry Backoff Preview"
  ScriptFile = "smoke-codexforge-worker-retry-backoff-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-retry-backoff-preview"
  Route = "src\\app\\worker-retry-backoff-preview"
  CommandLabel = "Go to Worker Retry Backoff Preview"
  RouteHref = "/worker-retry-backoff-preview"
  ContractFamily = "Worker"
  Markers = @("Worker retry backoff preview", "Worker retry backoff preview does not retry jobs dispatch workers persist retry state or restart processes from the UI", "Worker retry backoff preview requires backend-owned retry policy worker orchestration failure ledger and audit trail", "Worker retry backoff preview shows simulated backoff window simulated retry tier simulated manual hold simulated failure reason simulated denied frontend retry dispatch", "Denied worker retry backoff paths remain blocked", "Worker retry backoff checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
