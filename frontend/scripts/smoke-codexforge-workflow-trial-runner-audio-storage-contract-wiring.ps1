param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2907 Workflow Trial Runner Audio Storage Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-audio-storage-contract-wiring.ps1" `
  -Route "workflow-trial-runner-audio-storage-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Audio Storage Contract Wiring" `
  -RouteHref "/workflow-trial-runner-audio-storage-contract-wiring" `
  -Phase "2907" `
  -Title "Workflow Trial Runner Audio Storage Contract Wiring"
