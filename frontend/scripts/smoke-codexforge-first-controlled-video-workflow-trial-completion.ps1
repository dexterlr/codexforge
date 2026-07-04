param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-first-controlled-video-workflow-trial-smoke-helper.ps1")

Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke `
  -SmokeName "Phase 2889 First Controlled Video Workflow Trial Completion" `
  -ScriptFile "smoke-codexforge-first-controlled-video-workflow-trial-completion.ps1" `
  -Route "first-controlled-video-workflow-trial-completion" `
  -CommandLabel "Go to First Controlled Video Workflow Trial Completion" `
  -RouteHref "/first-controlled-video-workflow-trial-completion" `
  -Phase "2889" `
  -Title "First Controlled Video Workflow Trial Completion"
