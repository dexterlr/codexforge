param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2881 Controlled Video Trial Audit Boundary Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-audit-boundary-wiring.ps1" `
  -Route "controlled-video-trial-audit-boundary-wiring" `
  -CommandLabel "Go to Controlled Video Trial Audit Boundary Wiring" `
  -RouteHref "/controlled-video-trial-audit-boundary-wiring" `
  -Phase "2881" `
  -Title "Controlled Video Trial Audit Boundary Wiring"
