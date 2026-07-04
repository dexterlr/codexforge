param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2883 Controlled Video Trial Redaction Boundary Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-redaction-boundary-wiring.ps1" `
  -Route "controlled-video-trial-redaction-boundary-wiring" `
  -CommandLabel "Go to Controlled Video Trial Redaction Boundary Wiring" `
  -RouteHref "/controlled-video-trial-redaction-boundary-wiring" `
  -Phase "2883" `
  -Title "Controlled Video Trial Redaction Boundary Wiring"
