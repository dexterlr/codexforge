param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-live-access-guard-review"
$route = "src\app\connector-live-access-guard-review"
$phaseMarkers = @(
  "Connector live access guard review",
  "Connector live access guard review does not connect accounts",
  "Connector live access requires explicit operator approval",
  "Private connector data stays private",
  "Connector access guard groups",
  "Permission boundary checklist"
)
$plainEnglish = @(
  "connector live access guard identity",
  "private data boundary checklist",
  "approval gate checklist",
  "denied connector live-access actions",
  "blocked live-access risks",
  "first connector live access trial route",
  "connector evidence capture route",
  "next recommended action",
  "no connector permission persistence",
  "no connector evidence auto-ingestion",
  "advanced guard details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 466 Connector Live Access Guard Review" `
  -ScriptFile "smoke-codexforge-connector-live-access-guard-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorLiveAccessGuardReviewPanel" `
  -CommandLabel "Go to Connector Live Access Guard Review" `
  -Modules @("connector-live-access-guard-review-types.ts","connector-live-access-guard-review-summary.ts","index.ts") `
  -Components @("ConnectorLiveAccessGuardReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorLiveAccessGuardReviewStableKey","buildConnectorLiveAccessGuardReview","buildConnectorLiveAccessGuardReviews","buildConnectorLiveAccessGuardReviewBoundary","buildConnectorLiveAccessGuardReviewModel","summarizeConnectorLiveAccessGuardReview","CONNECTOR_LIVE_ACCESS_GUARD_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-connector-live-access-trial-review","/connector-live-evidence-capture-review","/connector-live-permission-trial-review","/connector-data-redaction-trial-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/connector-live-access-guard-review")

Write-Host "[OK] CodexForge Connector Live Access Guard Review smoke passed."
