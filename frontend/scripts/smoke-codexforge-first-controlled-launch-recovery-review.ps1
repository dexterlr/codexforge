param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 613 First Controlled Launch Recovery Review" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-recovery-review.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-recovery-review" `
  -Route "src\app\first-controlled-launch-recovery-review" `
  -MainPanel "FirstControlledLaunchRecoveryReviewPanel" `
  -CommandLabel "Go to First Controlled Launch Recovery Review" `
  -Modules @("first-controlled-launch-recovery-review-types.ts", "first-controlled-launch-recovery-review-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchRecoveryReviewStableKey", "buildFirstControlledLaunchRecoveryReview", "buildFirstControlledLaunchRecoveryReviews", "buildFirstControlledLaunchRecoveryReviewBoundary", "buildFirstControlledLaunchRecoveryReviewModel", "summarizeFirstControlledLaunchRecoveryReview", "FIRST_CONTROLLED_LAUNCH_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First controlled launch recovery review", "First controlled launch recovery review does not trigger recovery", "Controlled launch recovery actions require explicit operator approval", "Unsafe controlled launch recovery shortcuts stay blocked", "Recovery groups", "Launch failure categories") `
  -PlainEnglish @("Controlled launch recovery identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved recovery blockers", "Controlled launch hardening route", "Controlled launch candidate route", "Next recommended action", "no rollback trigger", "no recovery trigger") `
  -RouteHref "/first-controlled-launch-recovery-review"

Write-Host "[OK] CodexForge Phase 613 first controlled launch recovery review smoke passed."
