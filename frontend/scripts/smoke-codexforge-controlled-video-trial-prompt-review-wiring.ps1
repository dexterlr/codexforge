param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2862 Controlled Video Trial Prompt Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-prompt-review-wiring.ps1" `
  -Route "controlled-video-trial-prompt-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Prompt Review Wiring" `
  -RouteHref "/controlled-video-trial-prompt-review-wiring" `
  -Phase "2862" `
  -Title "Controlled Video Trial Prompt Review Wiring"
