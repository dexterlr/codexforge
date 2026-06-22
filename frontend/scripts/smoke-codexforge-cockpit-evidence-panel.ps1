param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1201 Cockpit Evidence Panel" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-panel" `
  -Route "src\app\cockpit-evidence-panel" `
  -MainPanel "CockpitEvidencePanel" `
  -CommandLabel "Go to Cockpit Evidence Panel" `
  -RouteHref "/cockpit-evidence-panel" `
  -Markers @("Cockpit evidence panel", "Cockpit evidence panel does not persist evidence", "Evidence panel requires explicit operator approval before future persistence", "Evidence panel shows diff stdout stderr exit code approval and operator placeholders", "Denied cockpit evidence paths remain blocked", "Cockpit evidence checklist")
