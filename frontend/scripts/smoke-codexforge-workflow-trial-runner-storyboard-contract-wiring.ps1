param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2908 Workflow Trial Runner Storyboard Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-storyboard-contract-wiring.ps1" `
  -Route "workflow-trial-runner-storyboard-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Storyboard Contract Wiring" `
  -RouteHref "/workflow-trial-runner-storyboard-contract-wiring" `
  -Phase "2908" `
  -Title "Workflow Trial Runner Storyboard Contract Wiring"
