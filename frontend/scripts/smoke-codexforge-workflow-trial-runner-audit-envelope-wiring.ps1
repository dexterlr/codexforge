param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2898 Workflow Trial Runner Audit Envelope Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-audit-envelope-wiring.ps1" `
  -Route "workflow-trial-runner-audit-envelope-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Audit Envelope Wiring" `
  -RouteHref "/workflow-trial-runner-audit-envelope-wiring" `
  -Phase "2898" `
  -Title "Workflow Trial Runner Audit Envelope Wiring"
