param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3681 Jarvis Task Planner Result Ledger Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-result-ledger-preview-wiring.ps1' `
  -Route 'jarvis-task-planner-result-ledger-preview-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Result Ledger Preview Wiring' `
  -RouteHref '/jarvis-task-planner-result-ledger-preview-wiring' `
  -Phase '3681' `
  -Title 'Jarvis Task Planner Result Ledger Preview Wiring'
