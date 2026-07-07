param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3671 Jarvis Task Planner Website Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-website-route-wiring.ps1' `
  -Route 'jarvis-task-planner-website-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Website Route Wiring' `
  -RouteHref '/jarvis-task-planner-website-route-wiring' `
  -Phase '3671' `
  -Title 'Jarvis Task Planner Website Route Wiring'
