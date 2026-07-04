param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2879 Controlled Video Trial Provider Import Guard Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-provider-import-guard-wiring.ps1" `
  -Route "controlled-video-trial-provider-import-guard-wiring" `
  -CommandLabel "Go to Controlled Video Trial Provider Import Guard Wiring" `
  -RouteHref "/controlled-video-trial-provider-import-guard-wiring" `
  -Phase "2879" `
  -Title "Controlled Video Trial Provider Import Guard Wiring"
