param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2097 Render Cost Guard Preview"
  ScriptFile = "smoke-codexforge-render-cost-guard-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-cost-guard-preview"
  Route = "src\\app\\render-cost-guard-preview"
  CommandLabel = "Go to Render Cost Guard Preview"
  RouteHref = "/render-cost-guard-preview"
  ContractFamily = "Render"
  Markers = @("Render cost guard preview", "Render cost guard preview does not spend credits call providers create jobs mutate quota or approve spend from the UI", "Render cost guard preview requires backend-owned cost ledger budget thresholds approval capture and audit trail", "Render cost guard preview shows simulated cost estimate simulated budget tier simulated approval threshold simulated quota hold simulated denied frontend cost mutation", "Denied render cost guard paths remain blocked", "Render cost guard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
