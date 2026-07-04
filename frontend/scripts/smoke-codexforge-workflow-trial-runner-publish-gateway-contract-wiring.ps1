param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2914 Workflow Trial Runner Publish Gateway Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-publish-gateway-contract-wiring.ps1" `
  -Route "workflow-trial-runner-publish-gateway-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Publish Gateway Contract Wiring" `
  -RouteHref "/workflow-trial-runner-publish-gateway-contract-wiring" `
  -Phase "2914" `
  -Title "Workflow Trial Runner Publish Gateway Contract Wiring"
