param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3672 Jarvis Task Planner Avatar Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-avatar-route-wiring.ps1' `
  -Route 'jarvis-task-planner-avatar-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Avatar Route Wiring' `
  -RouteHref '/jarvis-task-planner-avatar-route-wiring' `
  -Phase '3672' `
  -Title 'Jarvis Task Planner Avatar Route Wiring'
