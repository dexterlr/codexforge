param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-operator-workflow-friction-patch"
$route = "src\app\beta-operator-workflow-friction-patch"
$phaseMarkers = @(
  "Beta operator workflow friction patch",
  "Beta operator workflow friction patch does not apply patches",
  "Friction fixes require explicit operator approval",
  "Unsafe friction patch shortcuts stay blocked",
  "Friction categories",
  "Candidate improvement groups"
)
$plainEnglish = @(
  "beta workflow friction patch identity",
  "validation checklist",
  "rollback checklist",
  "denied patch actions",
  "blocked patch risks",
  "release candidate route",
  "beta daily workflow route",
  "next recommended action",
  "no patch apply behavior",
  "advanced friction patch details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-operator-daily-workflow-trial",
  "/beta-operator-daily-workflow-review",
  "/beta-operator-workflow-friction-patch",
  "/beta-operator-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 480 Beta Operator Workflow Friction Patch" `
  -ScriptFile "smoke-codexforge-beta-operator-workflow-friction-patch.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaOperatorWorkflowFrictionPatchPanel" `
  -CommandLabel "Go to Beta Operator Workflow Friction Patch" `
  -Modules @("beta-operator-workflow-friction-patch-types.ts","beta-operator-workflow-friction-patch-summary.ts","index.ts") `
  -Components @("BetaOperatorWorkflowFrictionPatchPanel.tsx","index.ts") `
  -Exports @("buildBetaOperatorWorkflowFrictionPatchStableKey","buildBetaOperatorWorkflowFrictionPatch","buildBetaOperatorWorkflowFrictionPatches","buildBetaOperatorWorkflowFrictionPatchBoundary","buildBetaOperatorWorkflowFrictionPatchModel","summarizeBetaOperatorWorkflowFrictionPatch","BETA_OPERATOR_WORKFLOW_FRICTION_PATCH_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-operator-daily-workflow-review","/beta-operator-workflow-release-candidate","/beta-operator-daily-workflow-trial","/beta-fix-priority-matrix") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Operator Workflow Friction Patch smoke passed."
