param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2893 Workflow Trial Runner State Machine Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-state-machine-wiring.ps1" `
  -Route "workflow-trial-runner-state-machine-wiring" `
  -CommandLabel "Go to Workflow Trial Runner State Machine Wiring" `
  -RouteHref "/workflow-trial-runner-state-machine-wiring" `
  -Phase "2893" `
  -Title "Workflow Trial Runner State Machine Wiring"
