param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 710 Research Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-research-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\research-adapter-implementation-plan" `
  -Route "src\app\research-adapter-implementation-plan" `
  -MainPanel "ResearchAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Research Adapter Implementation Plan" `
  -Modules @("research-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("ResearchAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildResearchAdapterImplementationPlanStableKey", "buildResearchAdapterImplementationPlan", "buildResearchAdapterImplementationPlans", "buildResearchAdapterImplementationPlanBoundary", "buildResearchAdapterImplementationPlanModel", "summarizeResearchAdapterImplementationPlan", "RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Research Adapter Implementation Plan", "Research adapter implementation plan does not browse, search, or fetch sources", "Research adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Source scope policy", "Live research policy", "Connector/web/search policy", "Citation/contradiction policy", "Evidence/result policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Research adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/research-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 710 research adapter implementation plan smoke passed."
