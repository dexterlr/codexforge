param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3664 Jarvis Task Planner Risk Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-risk-check-wiring.ps1' `
  -Route 'jarvis-task-planner-risk-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Risk Check Wiring' `
  -RouteHref '/jarvis-task-planner-risk-check-wiring' `
  -Phase '3664' `
  -Title 'Jarvis Task Planner Risk Check Wiring'
