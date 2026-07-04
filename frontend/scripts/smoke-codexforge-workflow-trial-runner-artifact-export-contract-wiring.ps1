param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2913 Workflow Trial Runner Artifact Export Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-artifact-export-contract-wiring.ps1" `
  -Route "workflow-trial-runner-artifact-export-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Artifact Export Contract Wiring" `
  -RouteHref "/workflow-trial-runner-artifact-export-contract-wiring" `
  -Phase "2913" `
  -Title "Workflow Trial Runner Artifact Export Contract Wiring"
