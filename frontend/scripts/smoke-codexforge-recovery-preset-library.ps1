param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/approval-policy-presets",
  "/recovery-preset-library",
  "/safety-boundary-explainability-polish",
  "/failure-recovery-playbook-finalization",
  "/apply-validation"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 396 Recovery Preset Library" `
  -ScriptFile "smoke-codexforge-recovery-preset-library.ps1" `
  -Domain "src\lib\codexforge\recovery-preset-library" `
  -Route "src\app\recovery-preset-library" `
  -MainPanel "RecoveryPresetLibraryPanel" `
  -CommandLabel "Go to Recovery Preset Library" `
  -Modules @("recovery-preset-library-types.ts","recovery-preset-library-summary.ts","index.ts") `
  -Components @("RecoveryPresetLibraryPanel.tsx","index.ts") `
  -Exports @("buildRecoveryPresetLibraryStableKey","buildRecoveryPreset","buildRecoveryPresetLibrary","buildRecoveryPresetLibraryBoundary","buildRecoveryPresetLibraryModel","summarizeRecoveryPresetLibrary","RECOVERY_PRESET_LIBRARY_LANGUAGE") `
  -PhaseMarkers @("Recovery preset library","Recovery presets do not run recovery steps","Recovery presets require operator approval before use","Validation evidence is required before retry","Failure category mapping","Manual recovery checklist") `
  -PlainEnglish @("Recovery preset identity","Preset groups","Validation evidence requirements","Blocked recovery presets","Safety explainability route","Approval policy route","Next recommended action","advanced recovery preset details collapsed/secondary","no recovery execution","no recovery preset persistence","no command execution","no patch apply behavior") `
  -ExtraRoutes @("/safety-boundary-explainability-polish","/approval-policy-presets","/failure-recovery-playbook-finalization","/apply-validation") `
  -ProtectedRoutes $protectedRoutes

$source = ((Get-ChildItem -Recurse -File "src\lib\codexforge\recovery-preset-library", "src\app\recovery-preset-library") | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($pattern in @(
  "recoveryExecutionAllowedFromUi:\s*true|runRecovery\s*\(|executeRecovery\s*\(|retryRecovery\s*\(",
  "recoveryPresetPersistenceAllowedFromUi:\s*true|saveRecoveryPreset\s*\(|persistRecoveryPreset\s*\(",
  "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|runCommand\s*\(|execSync|spawn\s*\(",
  "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\(",
  "approvalPolicyMutationAllowedFromUi:\s*true|approvalPresetPersistenceAllowedFromUi:\s*true|changeApprovalPolicy\s*\(|saveApprovalPreset\s*\("
)) {
  if ($source -match $pattern) { throw "[FAIL] Unexpected review-only boundary violation: $pattern" }
}

Write-Host "[PASS] recovery preset phase-specific safety boundaries remain review-only"
