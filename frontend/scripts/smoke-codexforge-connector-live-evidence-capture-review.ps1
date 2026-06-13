param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-live-evidence-capture-review"
$route = "src\app\connector-live-evidence-capture-review"
$phaseMarkers = @(
  "Connector live evidence capture review",
  "Connector live evidence capture review does not ingest connector evidence automatically",
  "Connector evidence requires operator review before use",
  "Private connector evidence stays redacted",
  "Evidence capture groups",
  "Source citation checklist"
)
$plainEnglish = @(
  "connector live evidence capture identity",
  "redaction checklist",
  "review-before-use checklist",
  "denied evidence actions",
  "blocked evidence risks",
  "connector release candidate route",
  "automation live guard route",
  "next recommended action",
  "no connector evidence auto-ingestion",
  "no evidence ingestion automation",
  "advanced evidence details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 468 Connector Live Evidence Capture Review" `
  -ScriptFile "smoke-codexforge-connector-live-evidence-capture-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorLiveEvidenceCaptureReviewPanel" `
  -CommandLabel "Go to Connector Live Evidence Capture Review" `
  -Modules @("connector-live-evidence-capture-review-types.ts","connector-live-evidence-capture-review-summary.ts","index.ts") `
  -Components @("ConnectorLiveEvidenceCaptureReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorLiveEvidenceCaptureReviewStableKey","buildConnectorLiveEvidenceCaptureReview","buildConnectorLiveEvidenceCaptureReviews","buildConnectorLiveEvidenceCaptureReviewBoundary","buildConnectorLiveEvidenceCaptureReviewModel","summarizeConnectorLiveEvidenceCaptureReview","CONNECTOR_LIVE_EVIDENCE_CAPTURE_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-connector-live-access-trial-review","/connector-live-trial-release-candidate","/automation-live-execution-guard-review","/connector-evidence-handoff-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/connector-live-evidence-capture-review")

Write-Host "[OK] CodexForge Connector Live Evidence Capture Review smoke passed."
