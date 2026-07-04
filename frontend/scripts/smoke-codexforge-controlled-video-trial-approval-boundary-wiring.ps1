param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2882 Controlled Video Trial Approval Boundary Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-approval-boundary-wiring.ps1" `
  -Route "controlled-video-trial-approval-boundary-wiring" `
  -CommandLabel "Go to Controlled Video Trial Approval Boundary Wiring" `
  -RouteHref "/controlled-video-trial-approval-boundary-wiring" `
  -Phase "2882" `
  -Title "Controlled Video Trial Approval Boundary Wiring"
