param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3669 Jarvis Task Planner Backend Adapter Routing Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-backend-adapter-routing-wiring.ps1' `
  -Route 'jarvis-task-planner-backend-adapter-routing-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Backend Adapter Routing Wiring' `
  -RouteHref '/jarvis-task-planner-backend-adapter-routing-wiring' `
  -Phase '3669' `
  -Title 'Jarvis Task Planner Backend Adapter Routing Wiring'
