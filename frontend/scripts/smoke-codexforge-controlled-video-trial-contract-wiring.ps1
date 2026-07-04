param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2859 Controlled Video Trial Contract Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-contract-wiring.ps1" `
  -Route "controlled-video-trial-contract-wiring" `
  -CommandLabel "Go to Controlled Video Trial Contract Wiring" `
  -RouteHref "/controlled-video-trial-contract-wiring" `
  -Phase "2859" `
  -Title "Controlled Video Trial Contract Wiring"
