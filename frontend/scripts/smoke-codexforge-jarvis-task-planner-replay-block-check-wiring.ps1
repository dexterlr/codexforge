param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3685 Jarvis Task Planner Replay Block Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-replay-block-check-wiring.ps1' `
  -Route 'jarvis-task-planner-replay-block-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Replay Block Check Wiring' `
  -RouteHref '/jarvis-task-planner-replay-block-check-wiring' `
  -Phase '3685' `
  -Title 'Jarvis Task Planner Replay Block Check Wiring'
