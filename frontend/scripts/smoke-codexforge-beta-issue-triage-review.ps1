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
  "/review-inbox",
  "/local-first-privacy-audit"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 386 Beta Issue Triage Review" `
  -ScriptFile "smoke-codexforge-beta-issue-triage-review.ps1" `
  -Domain "src\lib\codexforge\beta-issue-triage-review" `
  -Route "src\app\beta-issue-triage-review" `
  -MainPanel "BetaIssueTriageReviewPanel" `
  -CommandLabel "Go to Beta Issue Triage Review" `
  -Modules @("beta-issue-triage-review-types.ts","beta-issue-triage-review-summary.ts","index.ts") `
  -Components @("BetaIssueTriageReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaIssueTriageReviewStableKey","buildBetaIssueTriageReview","buildBetaIssueTriageReviews","buildBetaIssueTriageReviewBoundary","buildBetaIssueTriageReviewModel","summarizeBetaIssueTriageReview","BETA_ISSUE_TRIAGE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Beta issue triage review","Issue triage does not create tickets automatically","Issue candidates require operator approval","Private feedback details stay redacted until approved","Issue candidate groups","Fix priority route") `
  -PlainEnglish @("Beta issue triage identity","Source feedback inbox","Severity/confidence summary","Privacy/redaction status","Duplicate/related issue notes","Blocked issue candidates","Next recommended action","advanced triage details collapsed/secondary") `
  -ExtraRoutes @("/beta-feedback-inbox","/beta-fix-priority-matrix","/review-inbox","/local-first-privacy-audit") `
  -ProtectedRoutes $protectedRoutes
