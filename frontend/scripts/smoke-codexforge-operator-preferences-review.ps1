param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/operator-preferences-review",
  "/workspace-personalization-review",
  "/saved-review-views"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 391 Operator Preferences Review" `
  -ScriptFile "smoke-codexforge-operator-preferences-review.ps1" `
  -Domain "src\lib\codexforge\operator-preferences-review" `
  -Route "src\app\operator-preferences-review" `
  -MainPanel "OperatorPreferencesReviewPanel" `
  -CommandLabel "Go to Operator Preferences Review" `
  -Modules @("operator-preferences-review-types.ts","operator-preferences-review-summary.ts","index.ts") `
  -Components @("OperatorPreferencesReviewPanel.tsx","index.ts") `
  -Exports @("buildOperatorPreferencesReviewStableKey","buildOperatorPreferencesReview","buildOperatorPreferencesReviews","buildOperatorPreferencesReviewBoundary","buildOperatorPreferencesReviewModel","summarizeOperatorPreferencesReview","OPERATOR_PREFERENCES_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Operator preferences review","Preferences review does not save preferences","Preference changes require explicit approval","Preferences are not stored in browser storage from this page","Preference groups","Safety preference guardrails") `
  -PlainEnglish @("Preferences review identity","Novice/expert preference preview","Notification/review cadence preview","Blocked preference risks","Workspace personalization route","Saved review views route","Next recommended action","advanced preference details collapsed/secondary") `
  -ExtraRoutes @("/workspace-personalization-review","/saved-review-views","/daily-use-onboarding-polish","/expert-mode-fast-path-review") `
  -ProtectedRoutes $protectedRoutes
