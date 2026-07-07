param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3659 Jarvis Task Planner Router Intent Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-router-intent-wiring.ps1' `
  -Route 'jarvis-task-planner-router-intent-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Router Intent Wiring' `
  -RouteHref '/jarvis-task-planner-router-intent-wiring' `
  -Phase '3659' `
  -Title 'Jarvis Task Planner Router Intent Wiring'
