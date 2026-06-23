param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1640 First Cockpit Domain Workspace Candidate" `
  -ScriptFile "smoke-codexforge-first-cockpit-domain-workspace-candidate.ps1" `
  -Domain "src\lib\codexforge\first-cockpit-domain-workspace-candidate" `
  -Route "src\app\first-cockpit-domain-workspace-candidate" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to First Cockpit Domain Workspace Candidate" `
  -RouteHref "/first-cockpit-domain-workspace-candidate" `
  -Markers @("First cockpit domain workspace candidate", "First cockpit domain workspace candidate does not execute domain packs from the UI", "First cockpit domain workspace candidate requires explicit operator approval", "Candidate combines goal composer domain cards active workspace plan worker route approvals artifacts commands evidence results recovery audit memory context trading teaser game server workspace and next action rail", "Denied first cockpit domain workspace paths remain blocked", "First cockpit domain workspace checklist")
