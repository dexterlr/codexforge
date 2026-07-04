param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2895 Workflow Trial Runner Execution Block Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-execution-block-wiring.ps1" `
  -Route "workflow-trial-runner-execution-block-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Execution Block Wiring" `
  -RouteHref "/workflow-trial-runner-execution-block-wiring" `
  -Phase "2895" `
  -Title "Workflow Trial Runner Execution Block Wiring"
