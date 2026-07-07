param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3675 Jarvis Task Planner Workflow Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-workflow-route-wiring.ps1' `
  -Route 'jarvis-task-planner-workflow-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Workflow Route Wiring' `
  -RouteHref '/jarvis-task-planner-workflow-route-wiring' `
  -Phase '3675' `
  -Title 'Jarvis Task Planner Workflow Route Wiring'
