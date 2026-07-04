param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2880 Controlled Video Trial Network Egress Guard Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-network-egress-guard-wiring.ps1" `
  -Route "controlled-video-trial-network-egress-guard-wiring" `
  -CommandLabel "Go to Controlled Video Trial Network Egress Guard Wiring" `
  -RouteHref "/controlled-video-trial-network-egress-guard-wiring" `
  -Phase "2880" `
  -Title "Controlled Video Trial Network Egress Guard Wiring"
