param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-live-workflow-trial-2-failure-recovery"
$route = "src\app\unified-live-workflow-trial-2-failure-recovery"
$phaseMarkers = @(
  "Unified live workflow trial 2 failure recovery",
  "Trial 2 failure recovery does not trigger recovery automatically",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts remain blocked",
  "Failure categories",
  "Recovery action groups"
)
$plainEnglish = @(
  "trial 2 failure recovery identity",
  "rollback checklist",
  "escalation checklist",
  "denied recovery shortcuts",
  "blocked recovery risks",
  "hardening pass route",
  "beta daily workflow route",
  "next recommended action",
  "no recovery auto-trigger",
  "advanced recovery details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 476 Unified Live Workflow Trial 2 Failure Recovery" `
  -ScriptFile "smoke-codexforge-unified-live-workflow-trial-2-failure-recovery.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedLiveWorkflowTrialTwoFailureRecoveryPanel" `
  -CommandLabel "Go to Unified Live Workflow Trial 2 Failure Recovery" `
  -Modules @("unified-live-workflow-trial-2-failure-recovery-types.ts","unified-live-workflow-trial-2-failure-recovery-summary.ts","index.ts") `
  -Components @("UnifiedLiveWorkflowTrialTwoFailureRecoveryPanel.tsx","index.ts") `
  -Exports @("buildUnifiedLiveWorkflowTrialTwoFailureRecoveryStableKey","buildUnifiedLiveWorkflowTrialTwoFailureRecovery","buildUnifiedLiveWorkflowTrialTwoFailureRecoveries","buildUnifiedLiveWorkflowTrialTwoFailureRecoveryBoundary","buildUnifiedLiveWorkflowTrialTwoFailureRecoveryModel","summarizeUnifiedLiveWorkflowTrialTwoFailureRecovery","UNIFIED_LIVE_WORKFLOW_TRIAL_TWO_FAILURE_RECOVERY_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-workflow-trial-2-result-review","/unified-live-workflow-trial-2-hardening-pass","/beta-operator-daily-workflow-trial","/live-trial-failure-recovery-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/unified-live-workflow-trial-2-failure-recovery")

Write-Host "[OK] CodexForge Unified Live Workflow Trial 2 Failure Recovery smoke passed."
