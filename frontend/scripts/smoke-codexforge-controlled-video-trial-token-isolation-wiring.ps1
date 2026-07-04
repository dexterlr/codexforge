param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2878 Controlled Video Trial Token Isolation Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-token-isolation-wiring.ps1" `
  -Route "controlled-video-trial-token-isolation-wiring" `
  -CommandLabel "Go to Controlled Video Trial Token Isolation Wiring" `
  -RouteHref "/controlled-video-trial-token-isolation-wiring" `
  -Phase "2878" `
  -Title "Controlled Video Trial Token Isolation Wiring"
