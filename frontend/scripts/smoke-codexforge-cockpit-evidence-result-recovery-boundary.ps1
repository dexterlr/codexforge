param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1210 Cockpit Evidence Result Recovery Boundary" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-result-recovery-boundary.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-result-recovery-boundary" `
  -Route "src\app\cockpit-evidence-result-recovery-boundary" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Evidence Result Recovery Boundary" `
  -RouteHref "/cockpit-evidence-result-recovery-boundary" `
  -Markers @("Cockpit evidence result recovery boundary", "Cockpit evidence result recovery boundary does not persist evidence results or recovery actions", "Cockpit evidence result recovery requires explicit operator approval", "Cockpit unifies evidence result and recovery in one place", "Denied cockpit evidence result recovery paths remain blocked", "Cockpit evidence result recovery checklist")

