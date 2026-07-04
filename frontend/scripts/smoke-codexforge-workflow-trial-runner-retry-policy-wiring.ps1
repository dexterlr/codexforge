param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2915 Workflow Trial Runner Retry Policy Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-retry-policy-wiring.ps1" `
  -Route "workflow-trial-runner-retry-policy-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Retry Policy Wiring" `
  -RouteHref "/workflow-trial-runner-retry-policy-wiring" `
  -Phase "2915" `
  -Title "Workflow Trial Runner Retry Policy Wiring"
