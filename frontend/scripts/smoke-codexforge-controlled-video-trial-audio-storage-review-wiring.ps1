param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2865 Controlled Video Trial Audio Storage Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-audio-storage-review-wiring.ps1" `
  -Route "controlled-video-trial-audio-storage-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Audio Storage Review Wiring" `
  -RouteHref "/controlled-video-trial-audio-storage-review-wiring" `
  -Phase "2865" `
  -Title "Controlled Video Trial Audio Storage Review Wiring"
