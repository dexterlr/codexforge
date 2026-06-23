param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1629 Active Domain Workspace Preview" `
  -ScriptFile "smoke-codexforge-active-domain-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\active-domain-workspace-preview" `
  -Route "src\app\active-domain-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Active Domain Workspace Preview" `
  -RouteHref "/active-domain-workspace-preview" `
  -Markers @("Active domain workspace preview", "Active domain workspace preview does not dispatch workers or call models", "Active domain workspace preview requires explicit operator approval", "Active domain workspace preview shows selected domain goal status generated plan worker route approvals artifacts commands evidence result audit and recovery", "Denied active domain workspace paths remain blocked", "Active domain workspace checklist")
