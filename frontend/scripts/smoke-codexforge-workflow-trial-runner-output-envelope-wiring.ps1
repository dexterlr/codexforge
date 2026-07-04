param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2892 Workflow Trial Runner Output Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-output-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-output-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Output Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-output-envelope-wiring" `
  -Phase "2892" `
  -Title "Workflow Trial Runner Output Envelope Wiring"
