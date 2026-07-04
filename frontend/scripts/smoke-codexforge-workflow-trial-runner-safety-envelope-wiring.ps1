param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2904 Workflow Trial Runner Safety Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-safety-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-safety-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Safety Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-safety-envelope-wiring" `
  -Phase "2904" `
  -Title "Workflow Trial Runner Safety Envelope Wiring"
