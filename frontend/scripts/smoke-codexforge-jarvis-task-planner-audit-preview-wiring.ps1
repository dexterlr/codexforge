param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3680 Jarvis Task Planner Audit Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-audit-preview-wiring.ps1' `
  -Route 'jarvis-task-planner-audit-preview-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Audit Preview Wiring' `
  -RouteHref '/jarvis-task-planner-audit-preview-wiring' `
  -Phase '3680' `
  -Title 'Jarvis Task Planner Audit Preview Wiring'
