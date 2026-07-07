param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3670 Jarvis Task Planner Video Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-video-route-wiring.ps1' `
  -Route 'jarvis-task-planner-video-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Video Route Wiring' `
  -RouteHref '/jarvis-task-planner-video-route-wiring' `
  -Phase '3670' `
  -Title 'Jarvis Task Planner Video Route Wiring'
