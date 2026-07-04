param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2886 Controlled Video Trial Fallback Policy Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-fallback-policy-wiring.ps1" `
  -Route "controlled-video-trial-fallback-policy-wiring" `
  -CommandLabel "Go to Controlled Video Trial Fallback Policy Wiring" `
  -RouteHref "/controlled-video-trial-fallback-policy-wiring" `
  -Phase "2886" `
  -Title "Controlled Video Trial Fallback Policy Wiring"
