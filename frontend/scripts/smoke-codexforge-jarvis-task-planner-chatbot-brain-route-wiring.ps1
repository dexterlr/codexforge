param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3673 Jarvis Task Planner Chatbot Brain Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-chatbot-brain-route-wiring.ps1' `
  -Route 'jarvis-task-planner-chatbot-brain-route-wiring' `
  -CommandLabel 'Go to Jarvis Task Planner Chatbot Brain Route Wiring' `
  -RouteHref '/jarvis-task-planner-chatbot-brain-route-wiring' `
  -Phase '3673' `
  -Title 'Jarvis Task Planner Chatbot Brain Route Wiring'
