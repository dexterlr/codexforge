param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2091 Render Job Schema Preview"
  ScriptFile = "smoke-codexforge-render-job-schema-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-job-schema-preview"
  Route = "src\\app\\render-job-schema-preview"
  CommandLabel = "Go to Render Job Schema Preview"
  RouteHref = "/render-job-schema-preview"
  ContractFamily = "Render"
  Markers = @("Render job schema preview", "Render job schema preview does not create jobs persist job payloads dispatch workers or render videos from the UI", "Render job schema preview requires backend-owned schema validation job ledger approval capture and audit trail", "Render job schema preview shows simulated job id simulated source artifact reference simulated render preset simulated approval gate simulated denied frontend job creation", "Denied render job schema paths remain blocked", "Render job schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
