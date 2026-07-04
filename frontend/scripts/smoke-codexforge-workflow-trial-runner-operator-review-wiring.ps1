param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2918 Workflow Trial Runner Operator Review Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-operator-review-wiring.ps1" `
  -Route "workflow-trial-runner-operator-review-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Operator Review Wiring" `
  -RouteHref "/workflow-trial-runner-operator-review-wiring" `
  -Phase "2918" `
  -Title "Workflow Trial Runner Operator Review Wiring"
