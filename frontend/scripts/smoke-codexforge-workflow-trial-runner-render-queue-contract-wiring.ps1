param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2911 Workflow Trial Runner Render Queue Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-render-queue-contract-wiring.ps1" `
  -Route "workflow-trial-runner-render-queue-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Render Queue Contract Wiring" `
  -RouteHref "/workflow-trial-runner-render-queue-contract-wiring" `
  -Phase "2911" `
  -Title "Workflow Trial Runner Render Queue Contract Wiring"
