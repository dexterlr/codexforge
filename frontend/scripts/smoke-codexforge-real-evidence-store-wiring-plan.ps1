param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 781 Real Evidence Store Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-evidence-store-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-evidence-store-wiring-plan" `
  -Route "src\app\real-evidence-store-wiring-plan" `
  -MainPanel "RealEvidenceStoreWiringPlanPanel" `
  -CommandLabel "Go to Real Evidence Store Wiring Plan" `
  -Modules @("real-evidence-store-wiring-plan-model.ts", "index.ts") `
  -Components @("RealEvidenceStoreWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealEvidenceStoreWiringPlanStableKey", "buildRealEvidenceStoreWiringPlan", "buildRealEvidenceStoreWiringPlanItems", "buildRealEvidenceStoreWiringPlanBoundary", "buildRealEvidenceStoreWiringPlanModel", "summarizeRealEvidenceStoreWiringPlan", "REAL_EVIDENCE_STORE_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Evidence Store Wiring Plan", "Real evidence store wiring plan does not store or ingest evidence", "Evidence store wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "storage boundary", "redaction", "citation", "retention", "privacy", "audit", "result linkage", "unresolved blockers") `
  -PlainEnglish @("Real Evidence Store Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real evidence store wiring plan does not store or ingest evidence") `
  -RouteHref "/real-evidence-store-wiring-plan"

Write-Host "[OK] CodexForge Phase 781 real evidence store wiring plan smoke passed."
