param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3665 Jarvis Task Planner Permission Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-permission-check-wiring.ps1' `
  -Route 'jarvis-task-planner-permission-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Permission Check Wiring' `
  -RouteHref '/jarvis-task-planner-permission-check-wiring' `
  -Phase '3665' `
  -Title 'Jarvis Task Planner Permission Check Wiring'
