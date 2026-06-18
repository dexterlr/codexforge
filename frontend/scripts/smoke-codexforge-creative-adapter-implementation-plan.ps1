param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 709 Creative Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-creative-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\creative-adapter-implementation-plan" `
  -Route "src\app\creative-adapter-implementation-plan" `
  -MainPanel "CreativeAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Creative Adapter Implementation Plan" `
  -Modules @("creative-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("CreativeAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildCreativeAdapterImplementationPlanStableKey", "buildCreativeAdapterImplementationPlan", "buildCreativeAdapterImplementationPlans", "buildCreativeAdapterImplementationPlanBoundary", "buildCreativeAdapterImplementationPlanModel", "summarizeCreativeAdapterImplementationPlan", "CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Creative Adapter Implementation Plan", "Creative adapter implementation plan does not generate images, video, or 3D assets", "Creative adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Brief/storyboard policy", "Prompt policy", "Provider/local tool policy", "Output review policy", "Packaging policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Creative adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/creative-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 709 creative adapter implementation plan smoke passed."
