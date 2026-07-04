param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2869 Controlled Video Trial Render Queue Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-render-queue-review-wiring.ps1" `
  -Route "controlled-video-trial-render-queue-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Render Queue Review Wiring" `
  -RouteHref "/controlled-video-trial-render-queue-review-wiring" `
  -Phase "2869" `
  -Title "Controlled Video Trial Render Queue Review Wiring"
