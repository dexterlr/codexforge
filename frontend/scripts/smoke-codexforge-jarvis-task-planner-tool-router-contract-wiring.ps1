param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3668 Jarvis Task Planner Tool Router Contract Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-tool-router-contract-wiring.ps1' `
  -Route 'jarvis-task-planner-tool-router-contract-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Tool Router Contract Wiring' `
  -RouteHref '/jarvis-task-planner-tool-router-contract-wiring' `
  -Phase '3668' `
  -Title 'Jarvis Task Planner Tool Router Contract Wiring'
