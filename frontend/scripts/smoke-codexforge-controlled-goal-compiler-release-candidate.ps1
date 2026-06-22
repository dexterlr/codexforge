param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1433 Controlled Goal Compiler Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-goal-compiler-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-goal-compiler-release-candidate" `
  -Route "src\app\controlled-goal-compiler-release-candidate" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Controlled Goal Compiler Release Candidate" `
  -RouteHref "/controlled-goal-compiler-release-candidate" `
  -Markers @("Controlled goal compiler release candidate", "Controlled goal compiler release candidate does not call models providers connectors write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend", "Controlled goal compiler release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned and model-assisted goal compilation without broad execution", "Denied controlled goal compiler paths remain blocked", "Controlled goal compiler release checklist")
