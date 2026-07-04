param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2887 Controlled Video Trial Privacy Safety Cost Guard Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-privacy-safety-cost-guard-wiring.ps1" `
  -Route "controlled-video-trial-privacy-safety-cost-guard-wiring" `
  -CommandLabel "Go to Controlled Video Trial Privacy Safety Cost Guard Wiring" `
  -RouteHref "/controlled-video-trial-privacy-safety-cost-guard-wiring" `
  -Phase "2887" `
  -Title "Controlled Video Trial Privacy Safety Cost Guard Wiring"
