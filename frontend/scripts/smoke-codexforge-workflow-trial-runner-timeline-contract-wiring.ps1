param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2910 Workflow Trial Runner Timeline Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-timeline-contract-wiring.ps1" `
  -Route "workflow-trial-runner-timeline-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Timeline Contract Wiring" `
  -RouteHref "/workflow-trial-runner-timeline-contract-wiring" `
  -Phase "2910" `
  -Title "Workflow Trial Runner Timeline Contract Wiring"
