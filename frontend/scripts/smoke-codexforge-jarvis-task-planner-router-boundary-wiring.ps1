param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3658 Jarvis Task Planner Router Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-router-boundary-wiring.ps1' `
  -Route 'jarvis-task-planner-router-boundary-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Router Boundary Wiring' `
  -RouteHref '/jarvis-task-planner-router-boundary-wiring' `
  -Phase '3658' `
  -Title 'Jarvis Task Planner Router Boundary Wiring'
