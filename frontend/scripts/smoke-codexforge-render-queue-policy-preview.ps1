param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2093 Render Queue Policy Preview"
  ScriptFile = "smoke-codexforge-render-queue-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-queue-policy-preview"
  Route = "src\\app\\render-queue-policy-preview"
  CommandLabel = "Go to Render Queue Policy Preview"
  RouteHref = "/render-queue-policy-preview"
  ContractFamily = "Render"
  Markers = @("Render queue policy preview", "Render queue policy preview does not create queues mutate queue policy persist jobs or start services from the UI", "Render queue policy preview requires backend-owned queue policy capacity guard priority rules and audit trail", "Render queue policy preview shows simulated capacity limit simulated queue lane simulated admission rule simulated operator hold simulated denied frontend queue mutation", "Denied render queue policy paths remain blocked", "Render queue policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
