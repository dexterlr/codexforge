param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2092 Render Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-render-readiness-gate-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-readiness-gate-preview"
  Route = "src\\app\\render-readiness-gate-preview"
  CommandLabel = "Go to Render Readiness Gate Preview"
  RouteHref = "/render-readiness-gate-preview"
  ContractFamily = "Render"
  Markers = @("Render readiness gate preview", "Render readiness gate preview does not approve renders persist readiness state dispatch workers or create queues from the UI", "Render readiness gate preview requires backend-owned readiness validation asset storage caption workflow rights review and approval capture", "Render readiness gate preview shows simulated asset ready simulated audio ready simulated caption ready simulated rights ready simulated denied frontend readiness persistence", "Denied render readiness gate paths remain blocked", "Render readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
