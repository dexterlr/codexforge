param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2921 Controlled Workflow Trial Runner Backend Contract Completion" `
  -ScriptFile "smoke-codexforge-controlled-workflow-trial-runner-backend-contract-completion.ps1" `
  -Route "controlled-workflow-trial-runner-backend-contract-completion" `
  -CommandLabel "Go to Controlled Workflow Trial Runner Backend Contract Completion" `
  -RouteHref "/controlled-workflow-trial-runner-backend-contract-completion" `
  -Phase "2921" `
  -Title "Controlled Workflow Trial Runner Backend Contract Completion"
