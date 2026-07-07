param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3676 Jarvis Task Planner Render Publish Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-render-publish-route-wiring.ps1' `
  -Route 'jarvis-task-planner-render-publish-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Render Publish Route Wiring' `
  -RouteHref '/jarvis-task-planner-render-publish-route-wiring' `
  -Phase '3676' `
  -Title 'Jarvis Task Planner Render Publish Route Wiring'
