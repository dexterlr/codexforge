param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1639 Next Action Rail Preview" `
  -ScriptFile "smoke-codexforge-next-action-rail-preview.ps1" `
  -Domain "src\lib\codexforge\next-action-rail-preview" `
  -Route "src\app\next-action-rail-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Next Action Rail Preview" `
  -RouteHref "/next-action-rail-preview" `
  -Markers @("Next action rail preview", "Next action rail preview does not execute actions from the UI", "Next action rail preview requires explicit operator approval", "Next action rail preview shows review goal choose domain inspect plan review approvals inspect artifacts inspect commands inspect evidence hold before execution and manual next steps", "Denied next action rail paths remain blocked", "Next action rail checklist")
