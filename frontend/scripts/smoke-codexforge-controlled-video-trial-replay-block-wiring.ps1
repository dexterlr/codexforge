param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2875 Controlled Video Trial Replay Block Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-replay-block-wiring.ps1" `
  -Route "controlled-video-trial-replay-block-wiring" `
  -CommandLabel "Go to Controlled Video Trial Replay Block Wiring" `
  -RouteHref "/controlled-video-trial-replay-block-wiring" `
  -Phase "2875" `
  -Title "Controlled Video Trial Replay Block Wiring"
