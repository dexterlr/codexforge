param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1211 Cockpit Evidence Stream Model" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-stream-model.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-stream-model" `
  -Route "src\app\cockpit-evidence-stream-model" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Evidence Stream Model" `
  -RouteHref "/cockpit-evidence-stream-model" `
  -Markers @("Cockpit evidence stream model", "Cockpit evidence stream model does not persist evidence", "Evidence stream requires explicit operator approval before future persistence", "Evidence stream shows planned file command approval operator and timestamp placeholders", "Denied cockpit evidence stream paths remain blocked", "Cockpit evidence stream checklist")

