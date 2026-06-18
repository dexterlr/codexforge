param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 708 Packaging Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-packaging-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\packaging-adapter-implementation-plan" `
  -Route "src\app\packaging-adapter-implementation-plan" `
  -MainPanel "PackagingAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Packaging Adapter Implementation Plan" `
  -Modules @("packaging-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("PackagingAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildPackagingAdapterImplementationPlanStableKey", "buildPackagingAdapterImplementationPlan", "buildPackagingAdapterImplementationPlans", "buildPackagingAdapterImplementationPlanBoundary", "buildPackagingAdapterImplementationPlanModel", "summarizePackagingAdapterImplementationPlan", "PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Packaging Adapter Implementation Plan", "Packaging adapter implementation plan does not create packages or exports", "Packaging adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Bundle policy", "Artifact policy", "Destination policy", "Redaction/license policy", "Handoff/rollback policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Packaging adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/packaging-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 708 packaging adapter implementation plan smoke passed."
