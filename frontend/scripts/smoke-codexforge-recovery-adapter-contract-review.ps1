param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 675 Recovery Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-recovery-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\recovery-adapter-contract-review" `
  -Route "src\app\recovery-adapter-contract-review" `
  -MainPanel "RecoveryAdapterContractReviewPanel" `
  -CommandLabel "Go to Recovery Adapter Contract Review" `
  -Modules @("recovery-adapter-contract-review-model.ts", "index.ts") `
  -Components @("RecoveryAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryAdapterContractReviewStableKey", "buildRecoveryAdapterContractReview", "buildRecoveryAdapterContractReviews", "buildRecoveryAdapterContractReviewBoundary", "buildRecoveryAdapterContractReviewModel", "summarizeRecoveryAdapterContractReview", "RECOVERY_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Recovery adapter contract review", "Recovery adapter contract review does not trigger recovery or retry", "Recovery adapters require explicit operator approval", "Adapter not executable from UI", "Retry", "Rollback", "Cleanup", "Escalation", "Evidence", "Audit", "Denied recovery adapter actions") `
  -PlainEnglish @("Recovery adapter contract review identity", "Retry", "Rollback", "Cleanup", "Escalation", "Evidence", "Audit", "Denied recovery adapter actions", "Unresolved recovery adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/recovery-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 675 recovery adapter contract review smoke passed."
