param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2102 Frontend Render Queue Creation Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-render-queue-creation-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\frontend-render-queue-creation-blocked-preview"
  Route = "src\\app\\frontend-render-queue-creation-blocked-preview"
  CommandLabel = "Go to Frontend Render Queue Creation Blocked Preview"
  RouteHref = "/frontend-render-queue-creation-blocked-preview"
  ContractFamily = "Render"
  Markers = @("Frontend render queue creation blocked preview", "Frontend render queue creation blocked preview blocks frontend queue creation frontend job creation frontend job persistence frontend retry dispatch frontend worker dispatch frontend artifact creation frontend telemetry persistence frontend failure persistence and frontend command execution", "Frontend render queue creation blocked preview requires backend-owned render queue worker orchestration job ledger telemetry approval capture and audit trail", "Frontend render queue creation blocked preview shows denied queue creation denied job creation denied worker dispatch denied artifact creation denied command execution and backend prerequisite", "Denied frontend render queue creation paths remain blocked", "Frontend render queue creation blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
