param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 780 Real Local Runtime Adapter Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-local-runtime-adapter-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-local-runtime-adapter-wiring-plan" `
  -Route "src\app\real-local-runtime-adapter-wiring-plan" `
  -MainPanel "RealLocalRuntimeAdapterWiringPlanPanel" `
  -CommandLabel "Go to Real Local Runtime Adapter Wiring Plan" `
  -Modules @("real-local-runtime-adapter-wiring-plan-model.ts", "index.ts") `
  -Components @("RealLocalRuntimeAdapterWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealLocalRuntimeAdapterWiringPlanStableKey", "buildRealLocalRuntimeAdapterWiringPlan", "buildRealLocalRuntimeAdapterWiringPlanItems", "buildRealLocalRuntimeAdapterWiringPlanBoundary", "buildRealLocalRuntimeAdapterWiringPlanModel", "summarizeRealLocalRuntimeAdapterWiringPlan", "REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Local Runtime Adapter Wiring Plan", "Real local runtime adapter wiring plan does not start local runtimes", "Local runtime adapter wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "process lifecycle", "port/network", "stop policy", "logs", "recovery", "audit", "validation", "unresolved blockers") `
  -PlainEnglish @("Real Local Runtime Adapter Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real local runtime adapter wiring plan does not start local runtimes") `
  -RouteHref "/real-local-runtime-adapter-wiring-plan"

Write-Host "[OK] CodexForge Phase 780 real local runtime adapter wiring plan smoke passed."
