param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2038 Frontend Execution Blocked Contract Preview"
  ScriptFile = "smoke-codexforge-frontend-execution-blocked-contract-preview.ps1"
  Domain = "src\lib\codexforge\frontend-execution-blocked-contract-preview"
  Route = "src\app\frontend-execution-blocked-contract-preview"
  CommandLabel = "Go to Frontend Execution Blocked Contract Preview"
  RouteHref = "/frontend-execution-blocked-contract-preview"
  Markers = @("Frontend execution blocked contract preview", "Frontend execution blocked contract preview blocks frontend service creation frontend API creation frontend command execution frontend provider calls frontend model calls frontend connector calls frontend prompt sending frontend worker dispatch frontend render queue creation frontend artifact creation frontend export frontend upload download frontend publish schedule and frontend persistence", "Frontend execution blocked contract preview requires backend-owned services and explicit operator approval", "Frontend execution blocked contract preview shows denied command execution denied service start denied provider call denied worker dispatch denied artifact creation denied publishing and backend prerequisite", "Denied frontend execution contract paths remain blocked", "Frontend execution blocked contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

