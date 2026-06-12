param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-live-integration-readiness-review"
$route = "src\app\unified-live-integration-readiness-review"
$newRoutes = @(
  "/unified-live-integration-readiness-review",
  "/first-end-to-end-dry-run-review",
  "/end-to-end-approval-flow-review",
  "/codexforge-live-integration-release-candidate"
)

$phaseMarkers = @(
  "Unified live integration readiness review",
  "Unified live integration readiness does not run live workflows",
  "Live integration requires explicit operator approval",
  "Unresolved readiness risks stay blocked",
  "Provider readiness status",
  "Automation readiness status"
)

$plainEnglish = @(
  "unified live integration identity",
  "local model readiness status",
  "connector readiness status",
  "approval gate checklist",
  "denied live integration actions",
  "unresolved readiness risks",
  "first end-to-end dry run route",
  "approval flow route",
  "next recommended action",
  "advanced readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 442 Unified Live Integration Readiness Review" `
  -ScriptFile "smoke-codexforge-unified-live-integration-readiness-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedLiveIntegrationReadinessReviewPanel" `
  -CommandLabel "Go to Unified Live Integration Readiness Review" `
  -Modules @("unified-live-integration-readiness-review-types.ts","unified-live-integration-readiness-review-summary.ts","index.ts") `
  -Components @("UnifiedLiveIntegrationReadinessReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedLiveIntegrationReadinessReviewStableKey","buildUnifiedLiveIntegrationReadinessReview","buildUnifiedLiveIntegrationReadinessReviews","buildUnifiedLiveIntegrationReadinessReviewBoundary","buildUnifiedLiveIntegrationReadinessReviewModel","summarizeUnifiedLiveIntegrationReadinessReview","UNIFIED_LIVE_INTEGRATION_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-end-to-end-dry-run-review","/end-to-end-approval-flow-review","/provider-integration-hardening-pass","/automation-integration-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Live Integration Readiness Review smoke passed."
