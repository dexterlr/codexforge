param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 643 Local Runtime Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-local-runtime-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\local-runtime-controlled-trial-plan" `
  -Route "src\app\local-runtime-controlled-trial-plan" `
  -MainPanel "LocalRuntimeControlledTrialPlanPanel" `
  -CommandLabel "Go to Local Runtime Controlled Trial Plan" `
  -Modules @("local-runtime-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("LocalRuntimeControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeControlledTrialPlanStableKey", "buildLocalRuntimeControlledTrialPlan", "buildLocalRuntimeControlledTrialPlans", "buildLocalRuntimeControlledTrialPlanBoundary", "buildLocalRuntimeControlledTrialPlanModel", "summarizeLocalRuntimeControlledTrialPlan", "LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Local runtime controlled trial plan", "Local runtime controlled trial plan does not start local runtimes", "Runtime startup requires explicit operator approval", "Port checklist", "Network checklist", "Process lifecycle checklist", "Stop checklist", "Logging checklist") `
  -PlainEnglish @("Local runtime controlled trial plan identity", "Port checklist", "Network checklist", "Process lifecycle checklist", "Stop checklist", "Logging checklist", "Next recommended action") `
  -RouteHref "/local-runtime-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 643 local runtime controlled trial plan smoke passed."
