param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1223 Cockpit Recovery Safety Gate" `
  -ScriptFile "smoke-codexforge-cockpit-recovery-safety-gate.ps1" `
  -Domain "src\lib\codexforge\cockpit-recovery-safety-gate" `
  -Route "src\app\cockpit-recovery-safety-gate" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Recovery Safety Gate" `
  -RouteHref "/cockpit-recovery-safety-gate" `
  -Markers @("Cockpit recovery safety gate", "Cockpit recovery safety gate does not release recovery", "Recovery safety gate requires explicit operator approval", "Recovery safety gate blocks rollback retry restore export command and file mutation until approved", "Denied cockpit recovery safety paths remain blocked", "Cockpit recovery safety checklist")

