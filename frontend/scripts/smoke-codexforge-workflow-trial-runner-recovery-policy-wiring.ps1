param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2917 Workflow Trial Runner Recovery Policy Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-recovery-policy-wiring.ps1" `
  -Route "workflow-trial-runner-recovery-policy-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Recovery Policy Wiring" `
  -RouteHref "/workflow-trial-runner-recovery-policy-wiring" `
  -Phase "2917" `
  -Title "Workflow Trial Runner Recovery Policy Wiring"
