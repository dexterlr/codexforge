param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-workflow-operator-trial-plan"
$route = "src\app\multi-workflow-operator-trial-plan"
$phaseMarkers = @(
  "Multi-workflow operator trial plan",
  "Multi-workflow operator trial plan does not execute workflows",
  "Multi-workflow trials require explicit operator approval",
  "Unapproved workflow plans remain blocked",
  "Workflow candidate groups",
  "Operator task checklist"
)
$plainEnglish = @(
  "multi-workflow trial plan identity",
  "approval gate checklist",
  "provider/local/connector/automation handoff checklist",
  "evidence/result/recovery checklist",
  "denied planning actions",
  "unresolved planning blockers",
  "multi-workflow trial review route",
  "multi-workflow regression route",
  "next recommended action",
  "no multi-workflow trial launch",
  "advanced planning details collapsed/secondary"
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
  -PhaseName "Phase 506 Multi-Workflow Operator Trial Plan" `
  -ScriptFile "smoke-codexforge-multi-workflow-operator-trial-plan.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiWorkflowOperatorTrialPlanPanel" `
  -CommandLabel "Go to Multi-Workflow Operator Trial Plan" `
  -Modules @("multi-workflow-operator-trial-plan-types.ts","multi-workflow-operator-trial-plan-summary.ts","index.ts") `
  -Components @("MultiWorkflowOperatorTrialPlanPanel.tsx","index.ts") `
  -Exports @("buildMultiWorkflowOperatorTrialPlanStableKey","buildMultiWorkflowOperatorTrialPlan","buildMultiWorkflowOperatorTrialPlans","buildMultiWorkflowOperatorTrialPlanBoundary","buildMultiWorkflowOperatorTrialPlanModel","summarizeMultiWorkflowOperatorTrialPlan","MULTI_WORKFLOW_OPERATOR_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/multi-workflow-trial-review","/multi-workflow-regression-review","/first-real-daily-workflow-candidate","/real-daily-workflow-hardening-pass") `
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

Write-Host "[OK] CodexForge Multi-Workflow Operator Trial Plan smoke passed."
