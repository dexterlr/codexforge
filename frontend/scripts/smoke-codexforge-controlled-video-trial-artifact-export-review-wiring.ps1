param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2871 Controlled Video Trial Artifact Export Review Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-artifact-export-review-wiring.ps1" `
  -Route "controlled-video-trial-artifact-export-review-wiring" `
  -CommandLabel "Go to Controlled Video Trial Artifact Export Review Wiring" `
  -RouteHref "/controlled-video-trial-artifact-export-review-wiring" `
  -Phase "2871" `
  -Title "Controlled Video Trial Artifact Export Review Wiring"
