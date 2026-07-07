param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3682 Jarvis Task Planner Memory Boundary Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-memory-boundary-preview-wiring.ps1' `
  -Route 'jarvis-task-planner-memory-boundary-preview-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Memory Boundary Preview Wiring' `
  -RouteHref '/jarvis-task-planner-memory-boundary-preview-wiring' `
  -Phase '3682' `
  -Title 'Jarvis Task Planner Memory Boundary Preview Wiring'
