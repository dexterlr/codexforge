param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2902 Workflow Trial Runner Rate Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-rate-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-rate-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Rate Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-rate-envelope-wiring" `
  -Phase "2902" `
  -Title "Workflow Trial Runner Rate Envelope Wiring"
