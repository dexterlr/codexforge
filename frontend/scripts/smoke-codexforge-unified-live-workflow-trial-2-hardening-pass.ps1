param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-live-workflow-trial-2-hardening-pass"
$route = "src\app\unified-live-workflow-trial-2-hardening-pass"
$phaseMarkers = @(
  "Unified live workflow trial 2 hardening pass",
  "Trial 2 hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening risks stay blocked",
  "Hardening groups",
  "Safety boundary checklist"
)
$plainEnglish = @(
  "trial 2 hardening identity",
  "evidence/result/recovery status",
  "denied hardening actions",
  "unresolved hardening risks",
  "beta daily workflow route",
  "beta workflow review route",
  "next recommended action",
  "no hardening apply behavior",
  "advanced hardening details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 477 Unified Live Workflow Trial 2 Hardening Pass" `
  -ScriptFile "smoke-codexforge-unified-live-workflow-trial-2-hardening-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedLiveWorkflowTrialTwoHardeningPassPanel" `
  -CommandLabel "Go to Unified Live Workflow Trial 2 Hardening Pass" `
  -Modules @("unified-live-workflow-trial-2-hardening-pass-types.ts","unified-live-workflow-trial-2-hardening-pass-summary.ts","index.ts") `
  -Components @("UnifiedLiveWorkflowTrialTwoHardeningPassPanel.tsx","index.ts") `
  -Exports @("buildUnifiedLiveWorkflowTrialTwoHardeningPassStableKey","buildUnifiedLiveWorkflowTrialTwoHardeningPass","buildUnifiedLiveWorkflowTrialTwoHardeningPassReviews","buildUnifiedLiveWorkflowTrialTwoHardeningPassBoundary","buildUnifiedLiveWorkflowTrialTwoHardeningPassModel","summarizeUnifiedLiveWorkflowTrialTwoHardeningPass","UNIFIED_LIVE_WORKFLOW_TRIAL_TWO_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-workflow-trial-2-result-review","/unified-live-workflow-trial-2-failure-recovery","/beta-operator-daily-workflow-trial","/beta-operator-daily-workflow-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/unified-live-workflow-trial-2-hardening-pass")

Write-Host "[OK] CodexForge Unified Live Workflow Trial 2 Hardening Pass smoke passed."
