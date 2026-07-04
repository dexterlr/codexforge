param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2901 Workflow Trial Runner Cost Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-cost-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-cost-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Cost Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-cost-envelope-wiring" `
  -Phase "2901" `
  -Title "Workflow Trial Runner Cost Envelope Wiring"
