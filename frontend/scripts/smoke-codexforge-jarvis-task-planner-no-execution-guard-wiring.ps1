param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3688 Jarvis Task Planner No Execution Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-no-execution-guard-wiring.ps1' `
  -Route 'jarvis-task-planner-no-execution-guard-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner No Execution Guard Wiring' `
  -RouteHref '/jarvis-task-planner-no-execution-guard-wiring' `
  -Phase '3688' `
  -Title 'Jarvis Task Planner No Execution Guard Wiring'
