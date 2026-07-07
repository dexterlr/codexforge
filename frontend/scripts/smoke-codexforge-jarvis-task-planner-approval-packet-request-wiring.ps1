param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3679 Jarvis Task Planner Approval Packet Request Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-approval-packet-request-wiring.ps1' `
  -Route 'jarvis-task-planner-approval-packet-request-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Approval Packet Request Wiring' `
  -RouteHref '/jarvis-task-planner-approval-packet-request-wiring' `
  -Phase '3679' `
  -Title 'Jarvis Task Planner Approval Packet Request Wiring'
