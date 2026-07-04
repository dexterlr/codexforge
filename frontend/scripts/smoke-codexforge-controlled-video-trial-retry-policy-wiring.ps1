param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2885 Controlled Video Trial Retry Policy Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-retry-policy-wiring.ps1" `
  -Route "controlled-video-trial-retry-policy-wiring" `
  -CommandLabel "Go to Controlled Video Trial Retry Policy Wiring" `
  -RouteHref "/controlled-video-trial-retry-policy-wiring" `
  -Phase "2885" `
  -Title "Controlled Video Trial Retry Policy Wiring"
