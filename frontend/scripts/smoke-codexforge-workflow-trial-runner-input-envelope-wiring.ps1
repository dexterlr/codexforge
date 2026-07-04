param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2891 Workflow Trial Runner Input Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-input-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-input-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Input Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-input-envelope-wiring" `
  -Phase "2891" `
  -Title "Workflow Trial Runner Input Envelope Wiring"
