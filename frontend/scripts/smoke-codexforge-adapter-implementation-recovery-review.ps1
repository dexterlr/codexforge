param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 757 Adapter Implementation Recovery Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-recovery-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-recovery-review" `
  -Route "src\app\adapter-implementation-recovery-review" `
  -MainPanel "AdapterImplementationRecoveryReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Recovery Review" `
  -Modules @("adapter-implementation-recovery-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationRecoveryReviewStableKey", "buildAdapterImplementationRecoveryReview", "buildAdapterImplementationRecoveryReviewItems", "buildAdapterImplementationRecoveryReviewBoundary", "buildAdapterImplementationRecoveryReviewModel", "summarizeAdapterImplementationRecoveryReview", "ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Recovery Review", "Adapter implementation recovery review does not trigger recovery or retry", "Adapter recovery execution requires explicit operator approval", "Recovery modes", "Rollback", "Retry", "Cleanup", "Escalation", "Evidence/result linkage", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Recovery Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no recovery/retry trigger", "no background job creation") `
  -RouteHref "/adapter-implementation-recovery-review"

Write-Host "[OK] CodexForge Phase 757 adapter implementation recovery review smoke passed."
