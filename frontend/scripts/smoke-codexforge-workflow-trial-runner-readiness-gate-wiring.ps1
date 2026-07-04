param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2920 Workflow Trial Runner Readiness Gate Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-readiness-gate-wiring.ps1" `
  -Route "workflow-trial-runner-readiness-gate-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Readiness Gate Wiring" `
  -RouteHref "/workflow-trial-runner-readiness-gate-wiring" `
  -Phase "2920" `
  -Title "Workflow Trial Runner Readiness Gate Wiring"
