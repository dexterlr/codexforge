param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/operator-preferences-review",
  "/workspace-personalization-review",
  "/saved-review-views",
  "/global-review-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 393 Saved Review Views" `
  -ScriptFile "smoke-codexforge-saved-review-views.ps1" `
  -Domain "src\lib\codexforge\saved-review-views" `
  -Route "src\app\saved-review-views" `
  -MainPanel "SavedReviewViewsPanel" `
  -CommandLabel "Go to Saved Review Views" `
  -Modules @("saved-review-views-types.ts","saved-review-views-summary.ts","index.ts") `
  -Components @("SavedReviewViewsPanel.tsx","index.ts") `
  -Exports @("buildSavedReviewViewsStableKey","buildSavedReviewViews","buildSavedReviewViewsList","buildSavedReviewViewsBoundary","buildSavedReviewViewsModel","summarizeSavedReviewViews","SAVED_REVIEW_VIEWS_LANGUAGE") `
  -PhaseMarkers @("Saved review views","Saved review views are not stored from this page","View presets require operator approval before use","Private details stay redacted in view previews","Proposed view presets","Filter scope preview") `
  -PlainEnglish @("Saved views identity","Privacy/redaction rules","Approval and safety rules","Blocked saved view risks","Preferences route","Personalization route","Next recommended action","advanced saved view details collapsed/secondary") `
  -ExtraRoutes @("/operator-preferences-review","/workspace-personalization-review","/daily-use-onboarding-polish","/global-review-inbox") `
  -ProtectedRoutes $protectedRoutes
