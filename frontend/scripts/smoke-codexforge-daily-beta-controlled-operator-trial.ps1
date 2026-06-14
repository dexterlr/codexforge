param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-controlled-operator-trial"
$route = "src\app\daily-beta-controlled-operator-trial"
$phaseMarkers = @(
  "Daily Beta controlled operator trial",
  "Daily Beta controlled operator trial does not execute workflows",
  "Daily Beta trial actions require explicit operator approval",
  "Unapproved Daily Beta trial paths remain blocked",
  "Daily beta trial groups",
  "Operator task checklist"
)
$plainEnglish = @(
  "Daily Beta controlled operator trial identity",
  "approval gate checklist",
  "evidence/result/recovery checklist",
  "denied trial actions",
  "unresolved daily beta trial blockers",
  "Daily Beta feedback review route",
  "Daily Beta hardening route",
  "next recommended action",
  "no daily beta launch",
  "advanced trial details collapsed/secondary"
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
  -PhaseName "Phase 512 Daily Beta Controlled Operator Trial" `
  -ScriptFile "smoke-codexforge-daily-beta-controlled-operator-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaControlledOperatorTrialPanel" `
  -CommandLabel "Go to Daily Beta Controlled Operator Trial" `
  -Modules @("daily-beta-controlled-operator-trial-types.ts","daily-beta-controlled-operator-trial-summary.ts","index.ts") `
  -Components @("DailyBetaControlledOperatorTrialPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaControlledOperatorTrialStableKey","buildDailyBetaControlledOperatorTrial","buildDailyBetaControlledOperatorTrials","buildDailyBetaControlledOperatorTrialBoundary","buildDailyBetaControlledOperatorTrialModel","summarizeDailyBetaControlledOperatorTrial","DAILY_BETA_CONTROLLED_OPERATOR_TRIAL_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/codexforge-daily-beta-release-candidate","/daily-beta-feedback-review","/beta-2-hardening-pass","/controlled-live-capability-signoff") `
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

Write-Host "[OK] CodexForge Daily Beta Controlled Operator Trial smoke passed."
