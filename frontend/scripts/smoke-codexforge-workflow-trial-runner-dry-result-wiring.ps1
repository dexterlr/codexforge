param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2919 Workflow Trial Runner Dry Result Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-dry-result-wiring.ps1" `
  -Route "workflow-trial-runner-dry-result-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Dry Result Wiring" `
  -RouteHref "/workflow-trial-runner-dry-result-wiring" `
  -Phase "2919" `
  -Title "Workflow Trial Runner Dry Result Wiring"
