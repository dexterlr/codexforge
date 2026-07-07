param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3663 Jarvis Task Planner Step Graph Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-step-graph-wiring.ps1' `
  -Route 'jarvis-task-planner-step-graph-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Step Graph Wiring' `
  -RouteHref '/jarvis-task-planner-step-graph-wiring' `
  -Phase '3663' `
  -Title 'Jarvis Task Planner Step Graph Wiring'
