param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2094 Render Retry Policy Preview"
  ScriptFile = "smoke-codexforge-render-retry-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-retry-policy-preview"
  Route = "src\\app\\render-retry-policy-preview"
  CommandLabel = "Go to Render Retry Policy Preview"
  RouteHref = "/render-retry-policy-preview"
  ContractFamily = "Render"
  Markers = @("Render retry policy preview", "Render retry policy preview does not retry jobs dispatch workers persist failures or restart renders from the UI", "Render retry policy preview requires backend-owned retry policy failure ledger worker orchestration and audit trail", "Render retry policy preview shows simulated retry window simulated max attempts simulated backoff rule simulated manual hold simulated denied frontend retry dispatch", "Denied render retry policy paths remain blocked", "Render retry policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
