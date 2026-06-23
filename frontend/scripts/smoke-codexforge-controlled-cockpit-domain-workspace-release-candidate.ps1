param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1641 Controlled Cockpit Domain Workspace Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-cockpit-domain-workspace-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-cockpit-domain-workspace-release-candidate" `
  -Route "src\app\controlled-cockpit-domain-workspace-release-candidate" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Controlled Cockpit Domain Workspace Release Candidate" `
  -RouteHref "/controlled-cockpit-domain-workspace-release-candidate" `
  -Markers @("Controlled cockpit domain workspace release candidate", "Controlled cockpit domain workspace release candidate does not execute domain packs dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory connect brokers place trades release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled cockpit domain workspace release requires explicit operator approval", "Release candidate makes the cockpit a clearer front user-facing workspace without frontend execution", "Denied controlled cockpit domain workspace paths remain blocked", "Controlled cockpit domain workspace release checklist")
