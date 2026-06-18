param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 756 Adapter Implementation Audit Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-audit-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-audit-review" `
  -Route "src\app\adapter-implementation-audit-review" `
  -MainPanel "AdapterImplementationAuditReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Audit Review" `
  -Modules @("adapter-implementation-audit-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationAuditReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationAuditReviewStableKey", "buildAdapterImplementationAuditReview", "buildAdapterImplementationAuditReviewItems", "buildAdapterImplementationAuditReviewBoundary", "buildAdapterImplementationAuditReviewModel", "summarizeAdapterImplementationAuditReview", "ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Audit Review", "Adapter implementation audit review does not store audit events", "Adapter audit persistence requires explicit operator approval", "Audit events", "Approval records", "Redaction", "Evidence/result links", "Recovery links", "Retention", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Audit Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no approval decision persistence", "no credential/key/token/endpoint/output storage") `
  -RouteHref "/adapter-implementation-audit-review"

Write-Host "[OK] CodexForge Phase 756 adapter implementation audit review smoke passed."
