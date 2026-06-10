param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/full-smoke-suite-stability-pass",
  "/foundation-beta-candidate",
  "/beta-trial-intake-review",
  "/beta-feedback-inbox",
  "/beta-issue-triage-review",
  "/beta-fix-priority-matrix",
  "/beta-regression-replay-review",
  "/beta-release-notes-draft-review",
  "/daily-operator-home",
  "/release-notes-draft-builder"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 389 Beta Release Notes Draft Review" `
  -ScriptFile "smoke-codexforge-beta-release-notes-draft-review.ps1" `
  -Domain "src\lib\codexforge\beta-release-notes-draft-review" `
  -Route "src\app\beta-release-notes-draft-review" `
  -MainPanel "BetaReleaseNotesDraftReviewPanel" `
  -CommandLabel "Go to Beta Release Notes Draft Review" `
  -Modules @("beta-release-notes-draft-review-types.ts","beta-release-notes-draft-review-summary.ts","index.ts") `
  -Components @("BetaReleaseNotesDraftReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaReleaseNotesDraftReviewStableKey","buildBetaReleaseNotesDraftReview","buildBetaReleaseNotesDraftReviews","buildBetaReleaseNotesDraftReviewBoundary","buildBetaReleaseNotesDraftReviewModel","summarizeBetaReleaseNotesDraftReview","BETA_RELEASE_NOTES_DRAFT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Beta release notes draft review","Release notes draft is not published from this page","Release notes require operator approval before use","Private details stay redacted","Summary sections","Known issues") `
  -PlainEnglish @("Release notes draft identity","Source regression replay review","Safety notes","Validation notes","Blocked release notes","Daily onboarding route","Next recommended action","advanced release notes details collapsed/secondary") `
  -ExtraRoutes @("/beta-regression-replay-review","/daily-operator-home","/foundation-beta-candidate","/release-notes-draft-builder") `
  -ProtectedRoutes $protectedRoutes
