param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2858 Controlled Video Trial Intake Boundary Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-intake-boundary-wiring.ps1" `
  -Route "controlled-video-trial-intake-boundary-wiring" `
  -CommandLabel "Go to Controlled Video Trial Intake Boundary Wiring" `
  -RouteHref "/controlled-video-trial-intake-boundary-wiring" `
  -Phase "2858" `
  -Title "Controlled Video Trial Intake Boundary Wiring"
