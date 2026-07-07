param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3683 Jarvis Task Planner Kill Switch Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-kill-switch-check-wiring.ps1' `
  -Route 'jarvis-task-planner-kill-switch-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Kill Switch Check Wiring' `
  -RouteHref '/jarvis-task-planner-kill-switch-check-wiring' `
  -Phase '3683' `
  -Title 'Jarvis Task Planner Kill Switch Check Wiring'
