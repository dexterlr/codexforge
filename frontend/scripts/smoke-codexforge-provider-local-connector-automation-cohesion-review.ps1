param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-local-connector-automation-cohesion-review"
$route = "src\app\provider-local-connector-automation-cohesion-review"
$newRoutes = @(
  "/provider-local-connector-automation-cohesion-review",
  "/unified-approval-policy-final-review",
  "/unified-evidence-policy-final-review",
  "/unified-result-policy-final-review",
  "/unified-recovery-policy-final-review",
  "/unified-settings-preferences-review",
  "/daily-operator-cockpit-final-polish",
  "/global-command-palette-final-polish"
)
$deterministicMarkerFallback = @(
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no appendEvent/saveBrainGraph calls from UI",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text"
)
$phaseMarkers = @(
  "Provider local connector automation cohesion review",
  "Cohesion review does not route live traffic",
  "Cross-lane actions require explicit operator approval",
  "Unresolved cohesion blockers stay blocked",
  "Shared approval evidence result recovery handoff matrix",
  "Provider lane status"
)
$plainEnglish = @(
  "cross-lane cohesion identity",
  "local model lane status",
  "connector lane status",
  "automation lane status",
  "denied cohesion actions",
  "unresolved cohesion blockers",
  "unified approval policy route",
  "unified evidence policy route",
  "next recommended action",
  "advanced cohesion details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 490 Provider Local Connector Automation Cohesion Review" `
  -ScriptFile "smoke-codexforge-provider-local-connector-automation-cohesion-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLocalConnectorAutomationCohesionReviewPanel" `
  -CommandLabel "Go to Provider Local Connector Automation Cohesion Review" `
  -Modules @("provider-local-connector-automation-cohesion-review-types.ts","provider-local-connector-automation-cohesion-review-summary.ts","index.ts") `
  -Components @("ProviderLocalConnectorAutomationCohesionReviewPanel.tsx","index.ts") `
  -Exports @("buildProviderLocalConnectorAutomationCohesionReviewStableKey","buildProviderLocalConnectorAutomationCohesionReview","buildProviderLocalConnectorAutomationCohesionReviews","buildProviderLocalConnectorAutomationCohesionReviewBoundary","buildProviderLocalConnectorAutomationCohesionReviewModel","summarizeProviderLocalConnectorAutomationCohesionReview","PROVIDER_LOCAL_CONNECTOR_AUTOMATION_COHESION_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/provider-live-trial-release-candidate","/local-model-live-trial-release-candidate","/connector-live-trial-release-candidate","/unified-approval-policy-final-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Provider Local Connector Automation Cohesion Review smoke passed."
