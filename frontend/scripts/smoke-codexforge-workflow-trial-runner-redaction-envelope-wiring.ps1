param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2899 Workflow Trial Runner Redaction Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-redaction-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-redaction-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Redaction Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-redaction-envelope-wiring" `
  -Phase "2899" `
  -Title "Workflow Trial Runner Redaction Envelope Wiring"
