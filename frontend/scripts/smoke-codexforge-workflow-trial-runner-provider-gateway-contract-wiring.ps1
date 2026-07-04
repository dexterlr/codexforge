param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2905 Workflow Trial Runner Provider Gateway Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-provider-gateway-contract-wiring.ps1" `
  -Route "workflow-trial-runner-provider-gateway-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Provider Gateway Contract Wiring" `
  -RouteHref "/workflow-trial-runner-provider-gateway-contract-wiring" `
  -Phase "2905" `
  -Title "Workflow Trial Runner Provider Gateway Contract Wiring"
