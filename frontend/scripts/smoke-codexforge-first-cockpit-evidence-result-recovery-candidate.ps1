param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1224 First Cockpit Evidence Result Recovery Candidate" `
  -ScriptFile "smoke-codexforge-first-cockpit-evidence-result-recovery-candidate.ps1" `
  -Domain "src\lib\codexforge\first-cockpit-evidence-result-recovery-candidate" `
  -Route "src\app\first-cockpit-evidence-result-recovery-candidate" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to First Cockpit Evidence Result Recovery Candidate" `
  -RouteHref "/first-cockpit-evidence-result-recovery-candidate" `
  -Markers @("First cockpit evidence result recovery candidate", "First cockpit evidence result recovery candidate does not persist evidence results or execute recovery", "First cockpit evidence result recovery candidate requires explicit operator approval", "Candidate combines evidence stream file evidence command evidence result decision recovery audit timeline and export previews", "Denied first cockpit evidence result recovery paths remain blocked", "First cockpit evidence result recovery checklist")

