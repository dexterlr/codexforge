param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2873 Controlled Video Trial Approval Checkpoint Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-approval-checkpoint-wiring.ps1" `
  -Route "controlled-video-trial-approval-checkpoint-wiring" `
  -CommandLabel "Go to Controlled Video Trial Approval Checkpoint Wiring" `
  -RouteHref "/controlled-video-trial-approval-checkpoint-wiring" `
  -Phase "2873" `
  -Title "Controlled Video Trial Approval Checkpoint Wiring"
