param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3660 Jarvis Task Planner Goal Model Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-goal-model-wiring.ps1' `
  -Route 'jarvis-task-planner-goal-model-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Goal Model Wiring' `
  -RouteHref '/jarvis-task-planner-goal-model-wiring' `
  -Phase '3660' `
  -Title 'Jarvis Task Planner Goal Model Wiring'
