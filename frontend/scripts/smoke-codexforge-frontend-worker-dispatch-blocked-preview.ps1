param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2118 Frontend Worker Dispatch Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-worker-dispatch-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\frontend-worker-dispatch-blocked-preview"
  Route = "src\\app\\frontend-worker-dispatch-blocked-preview"
  CommandLabel = "Go to Frontend Worker Dispatch Blocked Preview"
  RouteHref = "/frontend-worker-dispatch-blocked-preview"
  ContractFamily = "Worker"
  Markers = @("Frontend worker dispatch blocked preview", "Frontend worker dispatch blocked preview blocks frontend worker dispatch frontend worker start frontend command execution frontend process spawn frontend port bind frontend runtime deployment frontend artifact creation frontend health persistence and frontend audit persistence", "Frontend worker dispatch blocked preview requires backend-owned worker orchestration runtime isolation sandbox policy telemetry approval capture and audit trail", "Frontend worker dispatch blocked preview shows denied worker dispatch denied command execution denied process spawn denied runtime deployment denied artifact persistence and backend prerequisite", "Denied frontend worker dispatch paths remain blocked", "Frontend worker dispatch blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
