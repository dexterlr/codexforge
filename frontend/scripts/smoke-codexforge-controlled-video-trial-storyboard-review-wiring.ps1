param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2866 Controlled Video Trial Storyboard Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-storyboard-review-wiring.ps1" `
  -Route "controlled-video-trial-storyboard-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Storyboard Review Wiring" `
  -RouteHref "/controlled-video-trial-storyboard-review-wiring" `
  -Phase "2866" `
  -Title "Controlled Video Trial Storyboard Review Wiring"
