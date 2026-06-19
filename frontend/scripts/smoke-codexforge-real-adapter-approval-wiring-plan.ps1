param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 786 Real Adapter Approval Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-adapter-approval-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-adapter-approval-wiring-plan" `
  -Route "src\app\real-adapter-approval-wiring-plan" `
  -MainPanel "RealAdapterApprovalWiringPlanPanel" `
  -CommandLabel "Go to Real Adapter Approval Wiring Plan" `
  -Modules @("real-adapter-approval-wiring-plan-model.ts", "index.ts") `
  -Components @("RealAdapterApprovalWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealAdapterApprovalWiringPlanStableKey", "buildRealAdapterApprovalWiringPlan", "buildRealAdapterApprovalWiringPlanItems", "buildRealAdapterApprovalWiringPlanBoundary", "buildRealAdapterApprovalWiringPlanModel", "summarizeRealAdapterApprovalWiringPlan", "REAL_ADAPTER_APPROVAL_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Adapter Approval Wiring Plan", "Real adapter approval wiring plan does not approve or execute adapters", "Adapter approval wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "approval flow", "reviewer requirements", "denial reasons", "expiry", "audit", "evidence", "rollback", "unresolved blockers") `
  -PlainEnglish @("Real Adapter Approval Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real adapter approval wiring plan does not approve or execute adapters") `
  -RouteHref "/real-adapter-approval-wiring-plan"

Write-Host "[OK] CodexForge Phase 786 real adapter approval wiring plan smoke passed."
