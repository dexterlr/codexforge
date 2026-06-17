param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 645 Provider Model Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-provider-model-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\provider-model-controlled-trial-plan" `
  -Route "src\app\provider-model-controlled-trial-plan" `
  -MainPanel "ProviderModelControlledTrialPlanPanel" `
  -CommandLabel "Go to Provider Model Controlled Trial Plan" `
  -Modules @("provider-model-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("ProviderModelControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildProviderModelControlledTrialPlanStableKey", "buildProviderModelControlledTrialPlan", "buildProviderModelControlledTrialPlans", "buildProviderModelControlledTrialPlanBoundary", "buildProviderModelControlledTrialPlanModel", "summarizeProviderModelControlledTrialPlan", "PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Provider/model controlled trial plan", "Provider/model controlled trial plan does not call providers or models", "Provider/model calls require explicit operator approval", "Prompt preview", "Redaction checklist", "Cost/rate limit", "Output handling") `
  -PlainEnglish @("Provider/model controlled trial plan identity", "Prompt preview", "Redaction checklist", "Cost/rate limit", "Output handling", "Next recommended action") `
  -RouteHref "/provider-model-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 645 provider model controlled trial plan smoke passed."
