param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 740 Adapter Implementation Audit Trail" `
  -ScriptFile "smoke-codexforge-adapter-implementation-audit-trail.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-audit-trail" `
  -Route "src\app\adapter-implementation-audit-trail" `
  -MainPanel "AdapterImplementationAuditTrailPanel" `
  -CommandLabel "Go to Adapter Implementation Audit Trail" `
  -Modules @("adapter-implementation-audit-trail-model.ts", "index.ts") `
  -Components @("AdapterImplementationAuditTrailPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationAuditTrailStableKey", "buildAdapterImplementationAuditTrail", "buildAdapterImplementationAuditTrailItems", "buildAdapterImplementationAuditTrailBoundary", "buildAdapterImplementationAuditTrailModel", "summarizeAdapterImplementationAuditTrail", "ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Audit Trail", "Adapter implementation audit trail does not store audit events", "Audit persistence requires explicit operator approval", "Audit event shape", "Redaction needs", "Retention needs", "Evidence links", "Result links", "Recovery links", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Audit Trail identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "audit persistence is not implemented yet") `
  -RouteHref "/adapter-implementation-audit-trail"

Write-Host "[OK] CodexForge Phase 740 adapter implementation audit trail smoke passed."
