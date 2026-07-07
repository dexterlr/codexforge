param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3686 Jarvis Task Planner Router Status Dashboard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-router-status-dashboard-wiring.ps1' `
  -Route 'jarvis-task-planner-router-status-dashboard-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Router Status Dashboard Wiring' `
  -RouteHref '/jarvis-task-planner-router-status-dashboard-wiring' `
  -Phase '3686' `
  -Title 'Jarvis Task Planner Router Status Dashboard Wiring'
