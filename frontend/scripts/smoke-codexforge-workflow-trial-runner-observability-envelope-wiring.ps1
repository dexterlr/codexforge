param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2900 Workflow Trial Runner Observability Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-observability-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-observability-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Observability Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-observability-envelope-wiring" `
  -Phase "2900" `
  -Title "Workflow Trial Runner Observability Envelope Wiring"
