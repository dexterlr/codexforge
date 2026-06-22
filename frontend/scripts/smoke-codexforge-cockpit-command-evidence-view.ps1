param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1213 Cockpit Command Evidence View" `
  -ScriptFile "smoke-codexforge-cockpit-command-evidence-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-command-evidence-view" `
  -Route "src\app\cockpit-command-evidence-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Command Evidence View" `
  -RouteHref "/cockpit-command-evidence-view" `
  -Markers @("Cockpit command evidence view", "Cockpit command evidence view does not run commands or persist evidence", "Command evidence view requires explicit operator approval before future persistence", "Command evidence view shows command stdout stderr exit code working directory and approval placeholders", "Denied cockpit command evidence paths remain blocked", "Cockpit command evidence checklist")

