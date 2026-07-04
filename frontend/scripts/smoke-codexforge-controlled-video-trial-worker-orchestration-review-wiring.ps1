param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2870 Controlled Video Trial Worker Orchestration Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-worker-orchestration-review-wiring.ps1" `
  -Route "controlled-video-trial-worker-orchestration-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Worker Orchestration Review Wiring" `
  -RouteHref "/controlled-video-trial-worker-orchestration-review-wiring" `
  -Phase "2870" `
  -Title "Controlled Video Trial Worker Orchestration Review Wiring"
