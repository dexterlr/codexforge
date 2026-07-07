param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3666 Jarvis Task Planner Approval Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-approval-check-wiring.ps1' `
  -Route 'jarvis-task-planner-approval-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Approval Check Wiring' `
  -RouteHref '/jarvis-task-planner-approval-check-wiring' `
  -Phase '3666' `
  -Title 'Jarvis Task Planner Approval Check Wiring'
