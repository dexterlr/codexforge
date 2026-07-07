param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3687 Jarvis Task Planner Human Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-human-review-wiring.ps1' `
  -Route 'jarvis-task-planner-human-review-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Human Review Wiring' `
  -RouteHref '/jarvis-task-planner-human-review-wiring' `
  -Phase '3687' `
  -Title 'Jarvis Task Planner Human Review Wiring'
