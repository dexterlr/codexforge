param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-workflow-onboarding-final-pass"
$route = "src\app\beta-workflow-onboarding-final-pass"
$phaseMarkers = @(
  "Beta workflow onboarding final pass",
  "Beta workflow onboarding final pass does not launch workflows",
  "Onboarding changes require explicit operator approval",
  "Unresolved onboarding blockers stay blocked",
  "Onboarding groups",
  "Novice path checklist"
)
$plainEnglish = @(
  "beta workflow onboarding identity",
  "expert path checklist",
  "safety explanation checklist",
  "denied onboarding shortcuts",
  "unresolved onboarding blockers",
  "Beta 2 release candidate route",
  "controlled operator trial route",
  "next recommended action",
  "no onboarding launch behavior",
  "advanced onboarding details collapsed/secondary"
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
  -PhaseName "Phase 485 Beta Workflow Onboarding Final Pass" `
  -ScriptFile "smoke-codexforge-beta-workflow-onboarding-final-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaWorkflowOnboardingFinalPassPanel" `
  -CommandLabel "Go to Beta Workflow Onboarding Final Pass" `
  -Modules @("beta-workflow-onboarding-final-pass-types.ts","beta-workflow-onboarding-final-pass-summary.ts","index.ts") `
  -Components @("BetaWorkflowOnboardingFinalPassPanel.tsx","index.ts") `
  -Exports @("buildBetaWorkflowOnboardingFinalPassStableKey","buildBetaWorkflowOnboardingFinalPass","buildBetaWorkflowOnboardingFinalPasses","buildBetaWorkflowOnboardingFinalPassBoundary","buildBetaWorkflowOnboardingFinalPassModel","summarizeBetaWorkflowOnboardingFinalPass","BETA_WORKFLOW_ONBOARDING_FINAL_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-workflow-safety-signoff-review","/beta-workflow-documentation-review","/codexforge-beta-2-release-candidate","/beta-2-controlled-operator-trial") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Workflow Onboarding Final Pass smoke passed."
