param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1225 Controlled Cockpit Evidence Result Recovery Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-cockpit-evidence-result-recovery-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-cockpit-evidence-result-recovery-release-candidate" `
  -Route "src\app\controlled-cockpit-evidence-result-recovery-release-candidate" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Controlled Cockpit Evidence Result Recovery Release Candidate" `
  -RouteHref "/controlled-cockpit-evidence-result-recovery-release-candidate" `
  -Markers @("Controlled cockpit evidence result recovery release candidate", "Controlled cockpit evidence result recovery release candidate does not call models execute commands write files persist results or execute recovery", "Controlled cockpit evidence result recovery release requires explicit operator approval", "Release candidate moves CodexForge toward one cockpit for evidence result and recovery", "Denied controlled cockpit evidence result recovery paths remain blocked", "Controlled cockpit evidence result recovery release checklist")

