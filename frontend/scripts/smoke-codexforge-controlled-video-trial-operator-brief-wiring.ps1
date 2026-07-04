param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2861 Controlled Video Trial Operator Brief Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-operator-brief-wiring.ps1" `
  -Route "controlled-video-trial-operator-brief-wiring" `
  -CommandLabel "Go to Controlled Video Trial Operator Brief Wiring" `
  -RouteHref "/controlled-video-trial-operator-brief-wiring" `
  -Phase "2861" `
  -Title "Controlled Video Trial Operator Brief Wiring"
