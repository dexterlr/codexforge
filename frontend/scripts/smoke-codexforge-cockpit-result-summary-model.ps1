param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1214 Cockpit Result Summary Model" `
  -ScriptFile "smoke-codexforge-cockpit-result-summary-model.ps1" `
  -Domain "src\lib\codexforge\cockpit-result-summary-model" `
  -Route "src\app\cockpit-result-summary-model" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Result Summary Model" `
  -RouteHref "/cockpit-result-summary-model" `
  -Markers @("Cockpit result summary model", "Cockpit result summary model does not persist results", "Result summary requires explicit operator approval before future persistence", "Result summary supports success denied blocked failed timeout and needs-review states", "Denied cockpit result summary paths remain blocked", "Cockpit result summary checklist")

