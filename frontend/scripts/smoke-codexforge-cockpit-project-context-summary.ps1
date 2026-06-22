param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1415 Cockpit Project Context Summary" `
  -ScriptFile "smoke-codexforge-cockpit-project-context-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-project-context-summary" `
  -Route "src\app\cockpit-project-context-summary" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Cockpit Project Context Summary" `
  -RouteHref "/cockpit-project-context-summary" `
  -Markers @("Cockpit project context summary", "Cockpit project context summary keeps the cockpit as the normal user surface", "Cockpit project context summary does not broaden execution", "Cockpit project context summary shows project stack files commands risks evidence result recovery and confidence", "Phase pages remain dev test diagnostics only", "Cockpit project context checklist")
