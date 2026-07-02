param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2030 Render Queue Contract Preview"
  ScriptFile = "smoke-codexforge-render-queue-contract-preview.ps1"
  Domain = "src\lib\codexforge\render-queue-contract-preview"
  Route = "src\app\render-queue-contract-preview"
  CommandLabel = "Go to Render Queue Contract Preview"
  RouteHref = "/render-queue-contract-preview"
  Markers = @("Render queue contract preview", "Render queue contract preview does not create render queues persist render jobs retry jobs start runtimes or dispatch workers from the UI", "Render queue contract preview requires backend-owned render queue job ledger retry policy worker orchestration and audit trail", "Render queue contract preview shows simulated queue interface simulated job schema simulated retry policy simulated readiness gate simulated denied frontend queue creation", "Denied render queue contract paths remain blocked", "Render queue contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

