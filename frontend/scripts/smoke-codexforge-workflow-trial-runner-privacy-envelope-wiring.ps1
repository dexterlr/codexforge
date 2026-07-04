param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2903 Workflow Trial Runner Privacy Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-privacy-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-privacy-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Privacy Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-privacy-envelope-wiring" `
  -Phase "2903" `
  -Title "Workflow Trial Runner Privacy Envelope Wiring"
