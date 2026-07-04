param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2867 Controlled Video Trial Keyframe Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-keyframe-review-wiring.ps1" `
  -Route "controlled-video-trial-keyframe-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Keyframe Review Wiring" `
  -RouteHref "/controlled-video-trial-keyframe-review-wiring" `
  -Phase "2867" `
  -Title "Controlled Video Trial Keyframe Review Wiring"
