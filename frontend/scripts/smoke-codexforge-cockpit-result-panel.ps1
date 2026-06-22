param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1202 Cockpit Result Panel" `
  -ScriptFile "smoke-codexforge-cockpit-result-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-result-panel" `
  -Route "src\app\cockpit-result-panel" `
  -MainPanel "CockpitResultPanel" `
  -CommandLabel "Go to Cockpit Result Panel" `
  -RouteHref "/cockpit-result-panel" `
  -Markers @("Cockpit result panel", "Cockpit result panel does not persist results", "Result panel requires explicit operator approval before future persistence", "Result panel shows success denied blocked failed timeout and needs-review states", "Denied cockpit result paths remain blocked", "Cockpit result checklist")
