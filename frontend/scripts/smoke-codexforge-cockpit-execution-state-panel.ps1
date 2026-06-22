param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1200 Cockpit Execution State Panel" `
  -ScriptFile "smoke-codexforge-cockpit-execution-state-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-execution-state-panel" `
  -Route "src\app\cockpit-execution-state-panel" `
  -MainPanel "CockpitExecutionStatePanel" `
  -CommandLabel "Go to Cockpit Execution State Panel" `
  -RouteHref "/cockpit-execution-state-panel" `
  -Markers @("Cockpit execution state panel", "Cockpit execution state panel does not release execution", "Execution state requires explicit operator approval before future run", "Execution state shows blocked pending approved running failed and complete preview states", "Denied cockpit execution paths remain blocked", "Cockpit execution state checklist")
