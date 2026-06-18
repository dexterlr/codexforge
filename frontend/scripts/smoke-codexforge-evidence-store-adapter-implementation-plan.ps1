param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 705 Evidence Store Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-evidence-store-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\evidence-store-adapter-implementation-plan" `
  -Route "src\app\evidence-store-adapter-implementation-plan" `
  -MainPanel "EvidenceStoreAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Evidence Store Adapter Implementation Plan" `
  -Modules @("evidence-store-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("EvidenceStoreAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreAdapterImplementationPlanStableKey", "buildEvidenceStoreAdapterImplementationPlan", "buildEvidenceStoreAdapterImplementationPlans", "buildEvidenceStoreAdapterImplementationPlanBoundary", "buildEvidenceStoreAdapterImplementationPlanModel", "summarizeEvidenceStoreAdapterImplementationPlan", "EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Evidence Store Adapter Implementation Plan", "Evidence store adapter implementation plan does not store or ingest evidence", "Evidence store adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Source/citation policy", "Redaction policy", "Retention policy", "Privacy policy", "Audit policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Evidence store adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/evidence-store-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 705 evidence store adapter implementation plan smoke passed."
