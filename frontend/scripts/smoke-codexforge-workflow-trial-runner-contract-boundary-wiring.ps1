param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2890 Workflow Trial Runner Contract Boundary Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-contract-boundary-wiring.ps1" `
  -Route "workflow-trial-runner-contract-boundary-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Contract Boundary Wiring" `
  -RouteHref "/workflow-trial-runner-contract-boundary-wiring" `
  -Phase "2890" `
  -Title "Workflow Trial Runner Contract Boundary Wiring"
