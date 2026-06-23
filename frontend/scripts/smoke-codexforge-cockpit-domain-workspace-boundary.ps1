param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1626 Cockpit Domain Workspace Boundary" `
  -ScriptFile "smoke-codexforge-cockpit-domain-workspace-boundary.ps1" `
  -Domain "src\lib\codexforge\cockpit-domain-workspace-boundary" `
  -Route "src\app\cockpit-domain-workspace-boundary" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Cockpit Domain Workspace Boundary" `
  -RouteHref "/cockpit-domain-workspace-boundary" `
  -Markers @("Cockpit domain workspace boundary", "Cockpit domain workspace boundary does not execute domain packs from the UI", "Cockpit domain workspace requires explicit operator approval before execution", "Cockpit domain workspace prepares a front user-facing workspace without frontend execution", "Denied cockpit domain workspace paths remain blocked", "Cockpit domain workspace checklist")
