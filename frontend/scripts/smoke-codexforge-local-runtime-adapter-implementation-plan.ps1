param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 701 Local Runtime Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-local-runtime-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\local-runtime-adapter-implementation-plan" `
  -Route "src\app\local-runtime-adapter-implementation-plan" `
  -MainPanel "LocalRuntimeAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Local Runtime Adapter Implementation Plan" `
  -Modules @("local-runtime-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("LocalRuntimeAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeAdapterImplementationPlanStableKey", "buildLocalRuntimeAdapterImplementationPlan", "buildLocalRuntimeAdapterImplementationPlans", "buildLocalRuntimeAdapterImplementationPlanBoundary", "buildLocalRuntimeAdapterImplementationPlanModel", "summarizeLocalRuntimeAdapterImplementationPlan", "LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Local Runtime Adapter Implementation Plan", "Local runtime adapter implementation plan does not start local runtimes", "Local runtime adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Process lifecycle", "Port/network policy", "Stop policy", "Logging policy", "Recovery policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Local runtime adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/local-runtime-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 701 local runtime adapter implementation plan smoke passed."
