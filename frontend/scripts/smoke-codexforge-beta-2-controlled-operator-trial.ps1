param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-2-controlled-operator-trial"
$route = "src\app\beta-2-controlled-operator-trial"
$phaseMarkers = @(
  "Beta 2 controlled operator trial",
  "Beta 2 controlled operator trial does not execute workflows",
  "Beta 2 trial actions require explicit operator approval",
  "Unapproved Beta 2 trial paths remain blocked",
  "Trial stage groups",
  "Operator task checklist"
)
$plainEnglish = @(
  "Beta 2 controlled operator trial identity",
  "approval gate checklist",
  "evidence/result checklist",
  "denied trial actions",
  "blocked trial risks",
  "operator feedback review route",
  "Beta 2 hardening route",
  "next recommended action",
  "no beta trial launch",
  "advanced trial details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-workflow-release-regression-review",
  "/beta-workflow-safety-signoff-review",
  "/beta-workflow-documentation-review",
  "/beta-workflow-onboarding-final-pass",
  "/codexforge-beta-2-release-candidate",
  "/beta-2-controlled-operator-trial",
  "/beta-2-operator-feedback-review",
  "/beta-2-hardening-pass"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 487 Beta 2 Controlled Operator Trial" `
  -ScriptFile "smoke-codexforge-beta-2-controlled-operator-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaTwoControlledOperatorTrialPanel" `
  -CommandLabel "Go to Beta 2 Controlled Operator Trial" `
  -Modules @("beta-2-controlled-operator-trial-types.ts","beta-2-controlled-operator-trial-summary.ts","index.ts") `
  -Components @("BetaTwoControlledOperatorTrialPanel.tsx","index.ts") `
  -Exports @("buildBetaTwoControlledOperatorTrialStableKey","buildBetaTwoControlledOperatorTrial","buildBetaTwoControlledOperatorTrials","buildBetaTwoControlledOperatorTrialBoundary","buildBetaTwoControlledOperatorTrialModel","summarizeBetaTwoControlledOperatorTrial","BETA_TWO_CONTROLLED_OPERATOR_TRIAL_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/codexforge-beta-2-release-candidate","/beta-2-operator-feedback-review","/beta-2-hardening-pass","/beta-workflow-onboarding-final-pass") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta 2 Controlled Operator Trial smoke passed."
