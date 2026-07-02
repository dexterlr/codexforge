param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2108 Runtime Isolation Contract Preview"
  ScriptFile = "smoke-codexforge-runtime-isolation-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\runtime-isolation-contract-preview"
  Route = "src\\app\\runtime-isolation-contract-preview"
  CommandLabel = "Go to Runtime Isolation Contract Preview"
  RouteHref = "/runtime-isolation-contract-preview"
  ContractFamily = "Worker"
  Markers = @("Runtime isolation contract preview", "Runtime isolation contract preview does not deploy runtimes start containers bind ports spawn processes or run commands from the UI", "Runtime isolation contract preview requires backend-owned runtime isolation sandboxing resource limits and audit trail", "Runtime isolation contract preview shows simulated runtime boundary simulated resource cap simulated filesystem boundary simulated network policy simulated denied frontend runtime control", "Denied runtime isolation contract paths remain blocked", "Runtime isolation contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
