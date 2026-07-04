param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2916 Workflow Trial Runner Fallback Policy Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-fallback-policy-wiring.ps1" `
  -Route "workflow-trial-runner-fallback-policy-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Fallback Policy Wiring" `
  -RouteHref "/workflow-trial-runner-fallback-policy-wiring" `
  -Phase "2916" `
  -Title "Workflow Trial Runner Fallback Policy Wiring"
