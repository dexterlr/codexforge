param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1209 Controlled Unified Cockpit Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-unified-cockpit-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-unified-cockpit-release-candidate" `
  -Route "src\app\controlled-unified-cockpit-release-candidate" `
  -MainPanel "ControlledUnifiedCockpitReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Unified Cockpit Release Candidate" `
  -RouteHref "/controlled-unified-cockpit-release-candidate" `
  -Markers @("Controlled unified cockpit release candidate", "Controlled unified cockpit release candidate does not call models execute commands or write files", "Controlled unified cockpit release requires explicit operator approval", "Release candidate makes the cockpit the preferred normal user surface", "Denied controlled unified cockpit paths remain blocked", "Controlled unified cockpit release checklist")
