param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1631 Worker Route Workspace Preview" `
  -ScriptFile "smoke-codexforge-worker-route-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\worker-route-workspace-preview" `
  -Route "src\app\worker-route-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Worker Route Workspace Preview" `
  -RouteHref "/worker-route-workspace-preview" `
  -Markers @("Worker route workspace preview", "Worker route workspace preview does not dispatch workers", "Worker route workspace preview requires explicit operator approval", "Worker route workspace preview shows specialist worker route model route provider approval local model bridge evidence result audit and denied worker routes", "Denied worker route workspace paths remain blocked", "Worker route workspace checklist")
