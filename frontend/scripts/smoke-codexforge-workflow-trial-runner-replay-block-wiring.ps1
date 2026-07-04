param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2896 Workflow Trial Runner Replay Block Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-replay-block-wiring.ps1" `
  -Route "workflow-trial-runner-replay-block-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Replay Block Wiring" `
  -RouteHref "/workflow-trial-runner-replay-block-wiring" `
  -Phase "2896" `
  -Title "Workflow Trial Runner Replay Block Wiring"
