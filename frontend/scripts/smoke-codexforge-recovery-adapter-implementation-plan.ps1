param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 707 Recovery Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-recovery-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\recovery-adapter-implementation-plan" `
  -Route "src\app\recovery-adapter-implementation-plan" `
  -MainPanel "RecoveryAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Recovery Adapter Implementation Plan" `
  -Modules @("recovery-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("RecoveryAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryAdapterImplementationPlanStableKey", "buildRecoveryAdapterImplementationPlan", "buildRecoveryAdapterImplementationPlans", "buildRecoveryAdapterImplementationPlanBoundary", "buildRecoveryAdapterImplementationPlanModel", "summarizeRecoveryAdapterImplementationPlan", "RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Recovery Adapter Implementation Plan", "Recovery adapter implementation plan does not trigger recovery or retry", "Recovery adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Retry policy", "Rollback policy", "Cleanup policy", "Escalation policy", "Audit policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Recovery adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/recovery-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 707 recovery adapter implementation plan smoke passed."
