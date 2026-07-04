param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2872 Controlled Video Trial Publish Gateway Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-publish-gateway-review-wiring.ps1" `
  -Route "controlled-video-trial-publish-gateway-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Publish Gateway Review Wiring" `
  -RouteHref "/controlled-video-trial-publish-gateway-review-wiring" `
  -Phase "2872" `
  -Title "Controlled Video Trial Publish Gateway Review Wiring"
