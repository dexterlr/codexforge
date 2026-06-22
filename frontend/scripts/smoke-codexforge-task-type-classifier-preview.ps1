param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1421 Task Type Classifier Preview" `
  -ScriptFile "smoke-codexforge-task-type-classifier-preview.ps1" `
  -Domain "src\lib\codexforge\task-type-classifier-preview" `
  -Route "src\app\task-type-classifier-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Task Type Classifier Preview" `
  -RouteHref "/task-type-classifier-preview" `
  -Markers @("Task type classifier preview", "Task type classifier preview does not execute tasks", "Task type classifier preview requires explicit operator approval before execution", "Task type classifier previews build fix refactor generate research analyze configure test document and automate task types", "Denied task type classifier paths remain blocked", "Task type classifier checklist")
