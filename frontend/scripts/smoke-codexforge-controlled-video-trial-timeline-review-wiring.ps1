param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2868 Controlled Video Trial Timeline Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-timeline-review-wiring.ps1" `
  -Route "controlled-video-trial-timeline-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Timeline Review Wiring" `
  -RouteHref "/controlled-video-trial-timeline-review-wiring" `
  -Phase "2868" `
  -Title "Controlled Video Trial Timeline Review Wiring"
