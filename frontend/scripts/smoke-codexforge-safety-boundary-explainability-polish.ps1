param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/approval-policy-presets",
  "/recovery-preset-library",
  "/safety-boundary-explainability-polish",
  "/safety-boundary-matrix-finalization"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 397 Safety Boundary Explainability Polish" `
  -ScriptFile "smoke-codexforge-safety-boundary-explainability-polish.ps1" `
  -Domain "src\lib\codexforge\safety-boundary-explainability-polish" `
  -Route "src\app\safety-boundary-explainability-polish" `
  -MainPanel "SafetyBoundaryExplainabilityPolishPanel" `
  -CommandLabel "Go to Safety Boundary Explainability Polish" `
  -Modules @("safety-boundary-explainability-polish-types.ts","safety-boundary-explainability-polish-summary.ts","index.ts") `
  -Components @("SafetyBoundaryExplainabilityPolishPanel.tsx","index.ts") `
  -Exports @("buildSafetyBoundaryExplainabilityPolishStableKey","buildSafetyBoundaryExplainabilityPolish","buildSafetyBoundaryExplainabilityPolishes","buildSafetyBoundaryExplainabilityPolishBoundary","buildSafetyBoundaryExplainabilityPolishModel","summarizeSafetyBoundaryExplainabilityPolish","SAFETY_BOUNDARY_EXPLAINABILITY_POLISH_LANGUAGE") `
  -PhaseMarkers @("Safety boundary explainability polish","Safety explanations do not weaken boundaries","Approval gates remain enforced","Blocked actions stay blocked until resolved","Boundary explanation groups","Why approval is required") `
  -PlainEnglish @("Explainability identity","Novice explanation mode","Expert explanation mode","Examples of blocked actions","Unresolved explanation gaps","Daily onboarding route","Next recommended action","advanced explainability details collapsed/secondary","no safety boundary mutation","no action approval from UI","no action execution from UI") `
  -ExtraRoutes @("/daily-use-onboarding-polish","/approval-policy-presets","/recovery-preset-library","/safety-boundary-matrix-finalization") `
  -ProtectedRoutes $protectedRoutes

$source = ((Get-ChildItem -Recurse -File "src\lib\codexforge\safety-boundary-explainability-polish", "src\app\safety-boundary-explainability-polish") | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($pattern in @(
  "safetyBoundaryMutationAllowedFromUi:\s*true|changeSafetyBoundary\s*\(|weakenBoundary\s*\(|updateSafetyBoundary\s*\(",
  "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|autoApprove\s*\(",
  "actionsExecutedFromUi:\s*true|executeAction\s*\(|runAction\s*\(",
  "approvalPolicyMutationAllowedFromUi:\s*true|approvalPresetPersistenceAllowedFromUi:\s*true|changeApprovalPolicy\s*\(|saveApprovalPreset\s*\(",
  "recoveryExecutionAllowedFromUi:\s*true|recoveryPresetPersistenceAllowedFromUi:\s*true|runRecovery\s*\(|executeRecovery\s*\(|saveRecoveryPreset\s*\("
)) {
  if ($source -match $pattern) { throw "[FAIL] Unexpected review-only boundary violation: $pattern" }
}

Write-Host "[PASS] safety explainability phase-specific safety boundaries remain review-only"
