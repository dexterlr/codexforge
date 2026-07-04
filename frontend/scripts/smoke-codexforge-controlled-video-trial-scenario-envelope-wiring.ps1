param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2860 Controlled Video Trial Scenario Envelope Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-scenario-envelope-wiring.ps1" `
  -Route "controlled-video-trial-scenario-envelope-wiring" `
  -CommandLabel "Go to Controlled Video Trial Scenario Envelope Wiring" `
  -RouteHref "/controlled-video-trial-scenario-envelope-wiring" `
  -Phase "2860" `
  -Title "Controlled Video Trial Scenario Envelope Wiring"
