param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3678 Jarvis Task Planner Blocked Action Summary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-blocked-action-summary-wiring.ps1' `
  -Route 'jarvis-task-planner-blocked-action-summary-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Blocked Action Summary Wiring' `
  -RouteHref '/jarvis-task-planner-blocked-action-summary-wiring' `
  -Phase '3678' `
  -Title 'Jarvis Task Planner Blocked Action Summary Wiring'
