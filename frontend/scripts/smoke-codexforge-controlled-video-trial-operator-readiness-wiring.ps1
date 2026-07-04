param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2888 Controlled Video Trial Operator Readiness Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-operator-readiness-wiring.ps1" `
  -Route "controlled-video-trial-operator-readiness-wiring" `
  -CommandLabel "Go to Controlled Video Trial Operator Readiness Wiring" `
  -RouteHref "/controlled-video-trial-operator-readiness-wiring" `
  -Phase "2888" `
  -Title "Controlled Video Trial Operator Readiness Wiring"
