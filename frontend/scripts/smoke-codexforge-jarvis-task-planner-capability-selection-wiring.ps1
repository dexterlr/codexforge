param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3662 Jarvis Task Planner Capability Selection Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-capability-selection-wiring.ps1' `
  -Route 'jarvis-task-planner-capability-selection-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Capability Selection Wiring' `
  -RouteHref '/jarvis-task-planner-capability-selection-wiring' `
  -Phase '3662' `
  -Title 'Jarvis Task Planner Capability Selection Wiring'
