param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3674 Jarvis Task Planner Trading Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-trading-route-wiring.ps1' `
  -Route 'jarvis-task-planner-trading-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Trading Route Wiring' `
  -RouteHref '/jarvis-task-planner-trading-route-wiring' `
  -Phase '3674' `
  -Title 'Jarvis Task Planner Trading Route Wiring'
