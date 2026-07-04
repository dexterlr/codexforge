param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2912 Workflow Trial Runner Worker Orchestration Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-worker-orchestration-contract-wiring.ps1" `
  -Route "workflow-trial-runner-worker-orchestration-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Worker Orchestration Contract Wiring" `
  -RouteHref "/workflow-trial-runner-worker-orchestration-contract-wiring" `
  -Phase "2912" `
  -Title "Workflow Trial Runner Worker Orchestration Contract Wiring"
