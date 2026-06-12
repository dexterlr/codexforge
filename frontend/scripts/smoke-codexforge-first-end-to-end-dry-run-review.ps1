param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-end-to-end-dry-run-review"
$route = "src\app\first-end-to-end-dry-run-review"
$newRoutes = @(
  "/unified-live-integration-readiness-review",
  "/first-end-to-end-dry-run-review",
  "/end-to-end-approval-flow-review",
  "/codexforge-live-integration-release-candidate"
)

$phaseMarkers = @(
  "First end-to-end dry run review",
  "First end-to-end dry run does not execute workflows",
  "All workflow stages require explicit operator approval before live use",
  "Dry-run results are reviewed before use",
  "Dry-run workflow stages",
  "Simulated output review checklist"
)

$plainEnglish = @(
  "end-to-end dry run identity",
  "provider/local/connector/automation handoff summary",
  "denied execution actions",
  "safety validation checklist",
  "blocked dry-run risks",
  "approval flow route",
  "live integration release candidate route",
  "next recommended action",
  "advanced dry-run details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 443 First End-to-End Dry Run Review" `
  -ScriptFile "smoke-codexforge-first-end-to-end-dry-run-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstEndToEndDryRunReviewPanel" `
  -CommandLabel "Go to First End-to-End Dry Run Review" `
  -Modules @("first-end-to-end-dry-run-review-types.ts","first-end-to-end-dry-run-review-summary.ts","index.ts") `
  -Components @("FirstEndToEndDryRunReviewPanel.tsx","index.ts") `
  -Exports @("buildFirstEndToEndDryRunReviewStableKey","buildFirstEndToEndDryRunReview","buildFirstEndToEndDryRunReviews","buildFirstEndToEndDryRunReviewBoundary","buildFirstEndToEndDryRunReviewModel","summarizeFirstEndToEndDryRunReview","FIRST_END_TO_END_DRY_RUN_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-integration-readiness-review","/end-to-end-approval-flow-review","/codexforge-live-integration-release-candidate","/automation-dry-run-trial-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge First End-to-End Dry Run Review smoke passed."
