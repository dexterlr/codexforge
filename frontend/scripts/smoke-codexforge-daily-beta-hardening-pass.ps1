param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-hardening-pass"
$route = "src\app\daily-beta-hardening-pass"
$phaseMarkers = @(
  "Daily Beta hardening pass",
  "Daily Beta hardening pass does not apply changes",
  "Daily Beta hardening changes require explicit operator approval",
  "Unresolved Daily Beta hardening blockers stay blocked",
  "Hardening groups",
  "Release readiness checklist"
)
$plainEnglish = @(
  "Daily Beta hardening identity",
  "Multi-workflow readiness status",
  "Controlled live signoff status",
  "Daily Beta trial/feedback status",
  "Denied hardening actions",
  "Unresolved hardening blockers",
  "Documentation final review route",
  "Onboarding final review route",
  "next recommended action",
  "no hardening apply behavior",
  "advanced hardening details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review",
  "/daily-beta-hardening-pass",
  "/daily-beta-documentation-final-review",
  "/daily-beta-onboarding-final-review",
  "/daily-beta-release-signoff-review",
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 514 Daily Beta Hardening Pass" `
  -ScriptFile "smoke-codexforge-daily-beta-hardening-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaHardeningPassPanel" `
  -CommandLabel "Go to Daily Beta Hardening Pass" `
  -Modules @("daily-beta-hardening-pass-types.ts","daily-beta-hardening-pass-summary.ts","index.ts") `
  -Components @("DailyBetaHardeningPassPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaHardeningPassStableKey","buildDailyBetaHardeningPass","buildDailyBetaHardeningPasses","buildDailyBetaHardeningPassBoundary","buildDailyBetaHardeningPassModel","summarizeDailyBetaHardeningPass","DAILY_BETA_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-documentation-final-review","/daily-beta-onboarding-final-review","/daily-beta-release-signoff-review","/codexforge-daily-beta-1-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta Hardening Pass smoke passed."
