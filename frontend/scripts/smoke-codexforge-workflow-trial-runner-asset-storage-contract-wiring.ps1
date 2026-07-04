param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2906 Workflow Trial Runner Asset Storage Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-asset-storage-contract-wiring.ps1" `
  -Route "workflow-trial-runner-asset-storage-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Asset Storage Contract Wiring" `
  -RouteHref "/workflow-trial-runner-asset-storage-contract-wiring" `
  -Phase "2906" `
  -Title "Workflow Trial Runner Asset Storage Contract Wiring"
