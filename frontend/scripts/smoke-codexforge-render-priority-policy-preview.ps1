param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2095 Render Priority Policy Preview"
  ScriptFile = "smoke-codexforge-render-priority-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-priority-policy-preview"
  Route = "src\\app\\render-priority-policy-preview"
  CommandLabel = "Go to Render Priority Policy Preview"
  RouteHref = "/render-priority-policy-preview"
  ContractFamily = "Render"
  Markers = @("Render priority policy preview", "Render priority policy preview does not reprioritize jobs mutate queue order persist priority or dispatch workers from the UI", "Render priority policy preview requires backend-owned priority policy approval capture and audit trail", "Render priority policy preview shows simulated priority tier simulated operator reason simulated fairness guard simulated approval state simulated denied frontend priority mutation", "Denied render priority policy paths remain blocked", "Render priority policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
