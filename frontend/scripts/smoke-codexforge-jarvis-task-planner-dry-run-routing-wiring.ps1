param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3667 Jarvis Task Planner Dry Run Routing Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-dry-run-routing-wiring.ps1' `
  -Route 'jarvis-task-planner-dry-run-routing-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Dry Run Routing Wiring' `
  -RouteHref '/jarvis-task-planner-dry-run-routing-wiring' `
  -Phase '3667' `
  -Title 'Jarvis Task Planner Dry Run Routing Wiring'
