param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/operator-preferences-review",
  "/workspace-personalization-review",
  "/saved-review-views",
  "/dashboard-density-navigation-polish"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 392 Workspace Personalization Review" `
  -ScriptFile "smoke-codexforge-workspace-personalization-review.ps1" `
  -Domain "src\lib\codexforge\workspace-personalization-review" `
  -Route "src\app\workspace-personalization-review" `
  -MainPanel "WorkspacePersonalizationReviewPanel" `
  -CommandLabel "Go to Workspace Personalization Review" `
  -Modules @("workspace-personalization-review-types.ts","workspace-personalization-review-summary.ts","index.ts") `
  -Components @("WorkspacePersonalizationReviewPanel.tsx","index.ts") `
  -Exports @("buildWorkspacePersonalizationReviewStableKey","buildWorkspacePersonalizationReview","buildWorkspacePersonalizationReviews","buildWorkspacePersonalizationReviewBoundary","buildWorkspacePersonalizationReviewModel","summarizeWorkspacePersonalizationReview","WORKSPACE_PERSONALIZATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Workspace personalization review","Personalization review does not persist layout changes","Safety areas cannot be hidden","Route coverage remains protected","Layout groups","Route grouping preview") `
  -PlainEnglish @("Personalization review identity","Novice/expert layout preview","Protected safety areas","Blocked personalization risks","Saved review views route","Daily onboarding route","Next recommended action","advanced personalization details collapsed/secondary") `
  -ExtraRoutes @("/saved-review-views","/daily-use-onboarding-polish","/operator-preferences-review","/dashboard-density-navigation-polish") `
  -ProtectedRoutes $protectedRoutes
