param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2894 Workflow Trial Runner Approval Lock Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-approval-lock-wiring.ps1" `
  -Route "workflow-trial-runner-approval-lock-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Approval Lock Wiring" `
  -RouteHref "/workflow-trial-runner-approval-lock-wiring" `
  -Phase "2894" `
  -Title "Workflow Trial Runner Approval Lock Wiring"
