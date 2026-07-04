param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2864 Controlled Video Trial Asset Storage Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-asset-storage-review-wiring.ps1" `
  -Route "controlled-video-trial-asset-storage-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Asset Storage Review Wiring" `
  -RouteHref "/controlled-video-trial-asset-storage-review-wiring" `
  -Phase "2864" `
  -Title "Controlled Video Trial Asset Storage Review Wiring"
