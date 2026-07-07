param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-task-planner-tool-router-smoke-helper.ps1')

Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke `
  -SmokeName 'Phase 3689 Jarvis Task Planner Tool Router Completion' `
  -ScriptFile 'smoke-codexforge-jarvis-task-planner-tool-router-completion.ps1' `
  -Route 'jarvis-task-planner-tool-router-completion' `
  -CommandLabel 'Go to Jarvis Task Planner Tool Router Completion' `
  -RouteHref '/jarvis-task-planner-tool-router-completion' `
  -Phase '3689' `
  -Title 'Jarvis Task Planner Tool Router Completion'
