param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3661 Jarvis Task Planner User Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-user-request-envelope-wiring.ps1' `
  -Route 'jarvis-task-planner-user-request-envelope-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner User Request Envelope Wiring' `
  -RouteHref '/jarvis-task-planner-user-request-envelope-wiring' `
  -Phase '3661' `
  -Title 'Jarvis Task Planner User Request Envelope Wiring'
