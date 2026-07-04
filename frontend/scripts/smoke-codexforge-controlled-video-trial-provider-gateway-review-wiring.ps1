param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2863 Controlled Video Trial Provider Gateway Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-provider-gateway-review-wiring.ps1" `
  -Route "controlled-video-trial-provider-gateway-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Provider Gateway Review Wiring" `
  -RouteHref "/controlled-video-trial-provider-gateway-review-wiring" `
  -Phase "2863" `
  -Title "Controlled Video Trial Provider Gateway Review Wiring"
