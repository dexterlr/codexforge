param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1216 Cockpit Recovery Option Model" `
  -ScriptFile "smoke-codexforge-cockpit-recovery-option-model.ps1" `
  -Domain "src\lib\codexforge\cockpit-recovery-option-model" `
  -Route "src\app\cockpit-recovery-option-model" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Recovery Option Model" `
  -RouteHref "/cockpit-recovery-option-model" `
  -Markers @("Cockpit recovery option model", "Cockpit recovery option model does not execute recovery", "Recovery option requires explicit operator approval before future recovery", "Recovery options include rollback retry stop restore explain and manual-review previews", "Denied cockpit recovery option paths remain blocked", "Cockpit recovery option checklist")

