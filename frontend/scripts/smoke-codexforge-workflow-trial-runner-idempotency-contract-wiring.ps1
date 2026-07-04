param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2897 Workflow Trial Runner Idempotency Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-idempotency-contract-wiring.ps1" `
  -Route "workflow-trial-runner-idempotency-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Idempotency Contract Wiring" `
  -RouteHref "/workflow-trial-runner-idempotency-contract-wiring" `
  -Phase "2897" `
  -Title "Workflow Trial Runner Idempotency Contract Wiring"
