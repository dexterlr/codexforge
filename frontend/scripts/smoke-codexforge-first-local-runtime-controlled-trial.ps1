param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 656 First Local Runtime Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-local-runtime-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-local-runtime-controlled-trial" `
  -Route "src\app\first-local-runtime-controlled-trial" `
  -MainPanel "FirstLocalRuntimeControlledTrialPanel" `
  -CommandLabel "Go to First Local Runtime Controlled Trial" `
  -Modules @("first-local-runtime-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstLocalRuntimeControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstLocalRuntimeControlledTrialStableKey", "buildFirstLocalRuntimeControlledTrial", "buildFirstLocalRuntimeControlledTrials", "buildFirstLocalRuntimeControlledTrialBoundary", "buildFirstLocalRuntimeControlledTrialModel", "summarizeFirstLocalRuntimeControlledTrial", "FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First local runtime controlled trial", "First local runtime controlled trial does not start local runtimes", "Local runtime startup requires explicit operator approval", "Port checklist", "Network checklist", "Process lifecycle checklist", "Stop checklist", "Logging checklist", "Recovery checklist") `
  -PlainEnglish @("First local runtime controlled trial identity", "Port checklist", "Network checklist", "Process lifecycle checklist", "Stop checklist", "Logging checklist", "Recovery checklist", "Next recommended action") `
  -RouteHref "/first-local-runtime-controlled-trial"

Write-Host "[OK] CodexForge Phase 656 first local runtime controlled trial smoke passed."
