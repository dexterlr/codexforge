param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-1-controlled-rollout-plan"
$route = "src\app\daily-beta-1-controlled-rollout-plan"
$phaseMarkers = @(
  "Daily Beta 1 controlled rollout plan",
  "Daily Beta 1 controlled rollout plan does not execute rollout",
  "Rollout actions require explicit operator approval",
  "Unapproved rollout paths remain blocked",
  "Rollout stage groups",
  "Rollback checklist"
)
$plainEnglish = @(
  "Daily Beta 1 rollout plan identity",
  "Operator cohort checklist",
  "Approval gate checklist",
  "Monitoring/review checklist",
  "Denied rollout actions",
  "Unresolved rollout blockers",
  "Daily Beta 1 rollout review route",
  "Daily Beta 1 feedback inbox route",
  "next recommended action",
  "no rollout execution",
  "advanced rollout plan details collapsed/secondary"
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
  -PhaseName "Phase 519 Daily Beta 1 Controlled Rollout Plan" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-rollout-plan.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaOneControlledRolloutPlanPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Rollout Plan" `
  -Modules @("daily-beta-1-controlled-rollout-plan-types.ts","daily-beta-1-controlled-rollout-plan-summary.ts","index.ts") `
  -Components @("DailyBetaOneControlledRolloutPlanPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaOneControlledRolloutPlanStableKey","buildDailyBetaOneControlledRolloutPlan","buildDailyBetaOneControlledRolloutPlans","buildDailyBetaOneControlledRolloutPlanBoundary","buildDailyBetaOneControlledRolloutPlanModel","summarizeDailyBetaOneControlledRolloutPlan","DAILY_BETA_ONE_CONTROLLED_ROLLOUT_PLAN_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/codexforge-daily-beta-1-candidate","/daily-beta-release-signoff-review","/daily-beta-1-rollout-review","/daily-beta-1-feedback-inbox") `
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

Write-Host "[OK] CodexForge Daily Beta 1 Controlled Rollout Plan smoke passed."
