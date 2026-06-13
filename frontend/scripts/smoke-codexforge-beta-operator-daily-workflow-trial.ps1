param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-operator-daily-workflow-trial"
$route = "src\app\beta-operator-daily-workflow-trial"
$phaseMarkers = @(
  "Beta operator daily workflow trial",
  "Beta operator daily workflow trial does not execute actions",
  "Beta workflow actions require explicit operator approval",
  "Unapproved daily workflow paths remain blocked",
  "Daily workflow stage groups",
  "Operator goals checklist"
)
$plainEnglish = @(
  "beta daily workflow identity",
  "safety/approval checklist",
  "denied daily workflow actions",
  "blocked daily workflow risks",
  "beta workflow review route",
  "friction patch route",
  "next recommended action",
  "no trial launch",
  "advanced daily workflow details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-operator-daily-workflow-trial",
  "/beta-operator-daily-workflow-review",
  "/beta-operator-workflow-friction-patch",
  "/beta-operator-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 478 Beta Operator Daily Workflow Trial" `
  -ScriptFile "smoke-codexforge-beta-operator-daily-workflow-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaOperatorDailyWorkflowTrialPanel" `
  -CommandLabel "Go to Beta Operator Daily Workflow Trial" `
  -Modules @("beta-operator-daily-workflow-trial-types.ts","beta-operator-daily-workflow-trial-summary.ts","index.ts") `
  -Components @("BetaOperatorDailyWorkflowTrialPanel.tsx","index.ts") `
  -Exports @("buildBetaOperatorDailyWorkflowTrialStableKey","buildBetaOperatorDailyWorkflowTrial","buildBetaOperatorDailyWorkflowTrials","buildBetaOperatorDailyWorkflowTrialBoundary","buildBetaOperatorDailyWorkflowTrialModel","summarizeBetaOperatorDailyWorkflowTrial","BETA_OPERATOR_DAILY_WORKFLOW_TRIAL_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-workflow-trial-2-hardening-pass","/beta-operator-daily-workflow-review","/beta-operator-workflow-friction-patch","/daily-operator-home") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Operator Daily Workflow Trial smoke passed."
