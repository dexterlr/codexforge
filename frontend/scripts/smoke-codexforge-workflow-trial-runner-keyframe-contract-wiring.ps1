param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-controlled-workflow-trial-runner-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke `
  -SmokeName "Phase 2909 Workflow Trial Runner Keyframe Contract Wiring" `
  -ScriptFile "smoke-codexforge-workflow-trial-runner-keyframe-contract-wiring.ps1" `
  -Route "workflow-trial-runner-keyframe-contract-wiring" `
  -CommandLabel "Go to Workflow Trial Runner Keyframe Contract Wiring" `
  -RouteHref "/workflow-trial-runner-keyframe-contract-wiring" `
  -Phase "2909" `
  -Title "Workflow Trial Runner Keyframe Contract Wiring"
