param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 702 Provider Model Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-provider-model-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\provider-model-adapter-implementation-plan" `
  -Route "src\app\provider-model-adapter-implementation-plan" `
  -MainPanel "ProviderModelAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Provider / Model Adapter Implementation Plan" `
  -Modules @("provider-model-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("ProviderModelAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildProviderModelAdapterImplementationPlanStableKey", "buildProviderModelAdapterImplementationPlan", "buildProviderModelAdapterImplementationPlans", "buildProviderModelAdapterImplementationPlanBoundary", "buildProviderModelAdapterImplementationPlanModel", "summarizeProviderModelAdapterImplementationPlan", "PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Provider / Model Adapter Implementation Plan", "Provider/model adapter implementation plan does not call providers or models", "Provider/model adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Prompt redaction policy", "Cost/rate-limit policy", "Output handling policy", "Result review policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Provider/model adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/provider-model-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 702 provider/model adapter implementation plan smoke passed."
