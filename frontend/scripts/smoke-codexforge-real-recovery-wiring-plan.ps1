param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 783 Real Recovery Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-recovery-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-recovery-wiring-plan" `
  -Route "src\app\real-recovery-wiring-plan" `
  -MainPanel "RealRecoveryWiringPlanPanel" `
  -CommandLabel "Go to Real Recovery Wiring Plan" `
  -Modules @("real-recovery-wiring-plan-model.ts", "index.ts") `
  -Components @("RealRecoveryWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealRecoveryWiringPlanStableKey", "buildRealRecoveryWiringPlan", "buildRealRecoveryWiringPlanItems", "buildRealRecoveryWiringPlanBoundary", "buildRealRecoveryWiringPlanModel", "summarizeRealRecoveryWiringPlan", "REAL_RECOVERY_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Recovery Wiring Plan", "Real recovery wiring plan does not trigger recovery or retry", "Recovery wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "recovery boundary", "retry", "rollback", "cleanup", "escalation", "audit", "evidence/result linkage", "unresolved blockers") `
  -PlainEnglish @("Real Recovery Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real recovery wiring plan does not trigger recovery or retry") `
  -RouteHref "/real-recovery-wiring-plan"

Write-Host "[OK] CodexForge Phase 783 real recovery wiring plan smoke passed."
