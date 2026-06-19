param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 787 Real Adapter Audit Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-adapter-audit-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-adapter-audit-wiring-plan" `
  -Route "src\app\real-adapter-audit-wiring-plan" `
  -MainPanel "RealAdapterAuditWiringPlanPanel" `
  -CommandLabel "Go to Real Adapter Audit Wiring Plan" `
  -Modules @("real-adapter-audit-wiring-plan-model.ts", "index.ts") `
  -Components @("RealAdapterAuditWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealAdapterAuditWiringPlanStableKey", "buildRealAdapterAuditWiringPlan", "buildRealAdapterAuditWiringPlanItems", "buildRealAdapterAuditWiringPlanBoundary", "buildRealAdapterAuditWiringPlanModel", "summarizeRealAdapterAuditWiringPlan", "REAL_ADAPTER_AUDIT_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Adapter Audit Wiring Plan", "Real adapter audit wiring plan does not store audit events", "Adapter audit wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "audit event shape", "actor", "request id", "adapter family", "approved operation", "denied operation", "redaction", "retention", "unresolved blockers") `
  -PlainEnglish @("Real Adapter Audit Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real adapter audit wiring plan does not store audit events") `
  -RouteHref "/real-adapter-audit-wiring-plan"

Write-Host "[OK] CodexForge Phase 787 real adapter audit wiring plan smoke passed."
