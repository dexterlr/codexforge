param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2876 Controlled Video Trial Persistence Guard Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-persistence-guard-wiring.ps1" `
  -Route "controlled-video-trial-persistence-guard-wiring" `
  -CommandLabel "Go to Controlled Video Trial Persistence Guard Wiring" `
  -RouteHref "/controlled-video-trial-persistence-guard-wiring" `
  -Phase "2876" `
  -Title "Controlled Video Trial Persistence Guard Wiring"
