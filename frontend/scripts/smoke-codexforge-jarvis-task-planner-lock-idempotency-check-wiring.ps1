param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3684 Jarvis Task Planner Lock Idempotency Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-lock-idempotency-check-wiring.ps1' `
  -Route 'jarvis-task-planner-lock-idempotency-check-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Lock Idempotency Check Wiring' `
  -RouteHref '/jarvis-task-planner-lock-idempotency-check-wiring' `
  -Phase '3684' `
  -Title 'Jarvis Task Planner Lock Idempotency Check Wiring'
