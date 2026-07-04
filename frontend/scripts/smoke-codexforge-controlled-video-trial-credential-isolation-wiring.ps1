param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2877 Controlled Video Trial Credential Isolation Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-credential-isolation-wiring.ps1" `
  -Route "controlled-video-trial-credential-isolation-wiring" `
  -CommandLabel "Go to Controlled Video Trial Credential Isolation Wiring" `
  -RouteHref "/controlled-video-trial-credential-isolation-wiring" `
  -Phase "2877" `
  -Title "Controlled Video Trial Credential Isolation Wiring"
