param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2884 Controlled Video Trial Observability Trace Wiring" `
  -ScriptFile "smoke-codexforge-controlled-video-trial-observability-trace-wiring.ps1" `
  -Route "controlled-video-trial-observability-trace-wiring" `
  -CommandLabel "Go to Controlled Video Trial Observability Trace Wiring" `
  -RouteHref "/controlled-video-trial-observability-trace-wiring" `
  -Phase "2884" `
  -Title "Controlled Video Trial Observability Trace Wiring"
