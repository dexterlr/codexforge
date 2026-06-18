param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 751 First Recovery Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-recovery-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-recovery-adapter-implementation-review" `
  -Route "src\app\first-recovery-adapter-implementation-review" `
  -MainPanel "FirstRecoveryAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Recovery Adapter Implementation Review" `
  -Modules @("first-recovery-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstRecoveryAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstRecoveryAdapterImplementationReviewStableKey", "buildFirstRecoveryAdapterImplementationReview", "buildFirstRecoveryAdapterImplementationReviewItems", "buildFirstRecoveryAdapterImplementationReviewBoundary", "buildFirstRecoveryAdapterImplementationReviewModel", "summarizeFirstRecoveryAdapterImplementationReview", "FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Recovery Adapter Implementation Review", "First recovery adapter implementation review does not trigger recovery or retry", "Recovery adapter implementation requires explicit operator approval", "Implementation review", "Retry", "Rollback", "Cleanup", "Escalation", "Audit", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Recovery Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no recovery/retry trigger", "operator review") `
  -RouteHref "/first-recovery-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 751 first recovery adapter implementation review smoke passed."
