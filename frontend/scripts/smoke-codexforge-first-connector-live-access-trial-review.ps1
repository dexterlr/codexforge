param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-connector-live-access-trial-review"
$route = "src\app\first-connector-live-access-trial-review"
$phaseMarkers = @(
  "First connector live access trial review",
  "First connector live access trial review does not fetch connector data",
  "Connector access trials require explicit operator approval",
  "Unapproved connector access remains blocked",
  "Trial stages",
  "Privacy and redaction checklist"
)
$plainEnglish = @(
  "first connector live access trial identity",
  "permission scope review checklist",
  "approval gate checklist",
  "denied connector trial actions",
  "blocked connector trial risks",
  "connector evidence capture route",
  "connector release candidate route",
  "next recommended action",
  "no connector data persistence",
  "no connector permission persistence",
  "advanced trial details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 467 First Connector Live Access Trial Review" `
  -ScriptFile "smoke-codexforge-first-connector-live-access-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstConnectorLiveAccessTrialReviewPanel" `
  -CommandLabel "Go to First Connector Live Access Trial Review" `
  -Modules @("first-connector-live-access-trial-review-types.ts","first-connector-live-access-trial-review-summary.ts","index.ts") `
  -Components @("FirstConnectorLiveAccessTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildFirstConnectorLiveAccessTrialReviewStableKey","buildFirstConnectorLiveAccessTrialReview","buildFirstConnectorLiveAccessTrialReviews","buildFirstConnectorLiveAccessTrialReviewBoundary","buildFirstConnectorLiveAccessTrialReviewModel","summarizeFirstConnectorLiveAccessTrialReview","FIRST_CONNECTOR_LIVE_ACCESS_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/connector-live-access-guard-review","/connector-live-evidence-capture-review","/connector-live-trial-release-candidate","/connector-evidence-handoff-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/first-connector-live-access-trial-review")

Write-Host "[OK] CodexForge First Connector Live Access Trial Review smoke passed."
