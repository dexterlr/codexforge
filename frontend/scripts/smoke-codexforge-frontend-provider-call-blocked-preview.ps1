param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2054 Frontend Provider Call Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-provider-call-blocked-preview.ps1"
  Domain = "src\lib\codexforge\frontend-provider-call-blocked-preview"
  Route = "src\app\frontend-provider-call-blocked-preview"
  CommandLabel = "Go to Frontend Provider Call Blocked Preview"
  RouteHref = "/frontend-provider-call-blocked-preview"
  Markers = @("Frontend provider call blocked preview", "Frontend provider call blocked preview blocks frontend provider calls frontend model calls frontend connector calls frontend prompt sending frontend credential storage frontend request dispatch frontend response persistence frontend quota mutation and frontend audit persistence", "Frontend provider call blocked preview requires backend-owned provider gateway credential vault prompt review safety review approval capture and audit trail", "Frontend provider call blocked preview shows denied provider call denied model call denied prompt send denied credential storage denied response persistence and backend prerequisite", "Denied frontend provider call paths remain blocked", "Frontend provider call blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

