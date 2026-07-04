param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2874 Controlled Video Trial Execution Lock Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-execution-lock-wiring.ps1" `
  -Route "controlled-video-trial-execution-lock-wiring" `
  -CommandLabel "Go to Controlled Video Trial Execution Lock Wiring" `
  -RouteHref "/controlled-video-trial-execution-lock-wiring" `
  -Phase "2874" `
  -Title "Controlled Video Trial Execution Lock Wiring"
