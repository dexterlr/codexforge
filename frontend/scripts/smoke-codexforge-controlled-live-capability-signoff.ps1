param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\controlled-live-capability-signoff"
$route = "src\app\controlled-live-capability-signoff"
$phaseMarkers = @(
  "Controlled live capability signoff",
  "Controlled live capability signoff does not sign off live capability automatically",
  "Controlled live capability requires explicit operator approval",
  "Unresolved live capability blockers stay blocked",
  "Live capability groups",
  "Release readiness checklist"
)
$plainEnglish = @(
  "controlled live capability signoff identity",
  "provider/local/connector/automation readiness checklist",
  "approval/evidence/result/recovery readiness checklist",
  "denied signoff actions",
  "unresolved live capability blockers",
  "Daily Beta release candidate route",
  "Daily Beta controlled operator trial route",
  "next recommended action",
  "no controlled live signoff automation",
  "advanced signoff details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 510 Controlled Live Capability Signoff" `
  -ScriptFile "smoke-codexforge-controlled-live-capability-signoff.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ControlledLiveCapabilitySignoffPanel" `
  -CommandLabel "Go to Controlled Live Capability Signoff" `
  -Modules @("controlled-live-capability-signoff-types.ts","controlled-live-capability-signoff-summary.ts","index.ts") `
  -Components @("ControlledLiveCapabilitySignoffPanel.tsx","index.ts") `
  -Exports @("buildControlledLiveCapabilitySignoffStableKey","buildControlledLiveCapabilitySignoff","buildControlledLiveCapabilitySignoffs","buildControlledLiveCapabilitySignoffBoundary","buildControlledLiveCapabilitySignoffModel","summarizeControlledLiveCapabilitySignoff","CONTROLLED_LIVE_CAPABILITY_SIGNOFF_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/multi-workflow-release-candidate","/codexforge-daily-beta-release-candidate","/daily-beta-controlled-operator-trial","/release-readiness-dashboard") `
  -ProtectedRoutes $newRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Controlled Live Capability Signoff smoke passed."
