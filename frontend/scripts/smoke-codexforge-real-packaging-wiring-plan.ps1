param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 784 Real Packaging Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-packaging-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-packaging-wiring-plan" `
  -Route "src\app\real-packaging-wiring-plan" `
  -MainPanel "RealPackagingWiringPlanPanel" `
  -CommandLabel "Go to Real Packaging Wiring Plan" `
  -Modules @("real-packaging-wiring-plan-model.ts", "index.ts") `
  -Components @("RealPackagingWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealPackagingWiringPlanStableKey", "buildRealPackagingWiringPlan", "buildRealPackagingWiringPlanItems", "buildRealPackagingWiringPlanBoundary", "buildRealPackagingWiringPlanModel", "summarizeRealPackagingWiringPlan", "REAL_PACKAGING_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Packaging Wiring Plan", "Real packaging wiring plan does not create packages or exports", "Packaging wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "packaging boundary", "bundle", "artifact", "destination", "license/redaction", "handoff", "rollback", "unresolved blockers") `
  -PlainEnglish @("Real Packaging Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real packaging wiring plan does not create packages or exports") `
  -RouteHref "/real-packaging-wiring-plan"

Write-Host "[OK] CodexForge Phase 784 real packaging wiring plan smoke passed."
