param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1212 Cockpit File Evidence View" `
  -ScriptFile "smoke-codexforge-cockpit-file-evidence-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-file-evidence-view" `
  -Route "src\app\cockpit-file-evidence-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit File Evidence View" `
  -RouteHref "/cockpit-file-evidence-view" `
  -Markers @("Cockpit file evidence view", "Cockpit file evidence view does not write files or persist evidence", "File evidence view requires explicit operator approval before future persistence", "File evidence view shows path guard diff before after approval and rollback placeholders", "Denied cockpit file evidence paths remain blocked", "Cockpit file evidence checklist")

