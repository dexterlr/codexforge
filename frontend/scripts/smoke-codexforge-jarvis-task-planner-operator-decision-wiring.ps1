param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3677 Jarvis Task Planner Operator Decision Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-operator-decision-wiring.ps1' `
  -Route 'jarvis-task-planner-operator-decision-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Operator Decision Wiring' `
  -RouteHref '/jarvis-task-planner-operator-decision-wiring' `
  -Phase '3677' `
  -Title 'Jarvis Task Planner Operator Decision Wiring'
