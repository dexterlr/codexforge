param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/operator-preferences-review",
  "/saved-review-views",
  "/notification-preferences-review",
  "/approval-policy-presets",
  "/recovery-preset-library",
  "/safety-boundary-explainability-polish",
  "/approval-queue"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 395 Approval Policy Presets" `
  -ScriptFile "smoke-codexforge-approval-policy-presets.ps1" `
  -Domain "src\lib\codexforge\approval-policy-presets" `
  -Route "src\app\approval-policy-presets" `
  -MainPanel "ApprovalPolicyPresetsPanel" `
  -CommandLabel "Go to Approval Policy Presets" `
  -Modules @("approval-policy-presets-types.ts","approval-policy-presets-summary.ts","index.ts") `
  -Components @("ApprovalPolicyPresetsPanel.tsx","index.ts") `
  -Exports @("buildApprovalPolicyPresetsStableKey","buildApprovalPolicyPreset","buildApprovalPolicyPresets","buildApprovalPolicyPresetsBoundary","buildApprovalPolicyPresetsModel","summarizeApprovalPolicyPresets","APPROVAL_POLICY_PRESETS_LANGUAGE") `
  -PhaseMarkers @("Approval policy presets","Approval presets do not change live policy","Policy changes require explicit operator approval","Unsafe approval shortcuts stay blocked","Preset groups","Required approval gates") `
  -PlainEnglish @("Approval policy preset identity","Novice/expert preset preview","Denied automation policy","Blocked preset risks","Recovery preset library route","Safety explainability route","Next recommended action","advanced policy details collapsed/secondary","no approval policy mutation","no approval preset persistence","no approval automation") `
  -ExtraRoutes @("/recovery-preset-library","/safety-boundary-explainability-polish","/notification-preferences-review","/approval-queue") `
  -ProtectedRoutes $protectedRoutes

$source = ((Get-ChildItem -Recurse -File "src\lib\codexforge\approval-policy-presets", "src\app\approval-policy-presets") | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($pattern in @(
  "approvalPolicyMutationAllowedFromUi:\s*true|changeApprovalPolicy\s*\(|setApprovalPolicy\s*\(|updateApprovalPolicy\s*\(",
  "approvalPresetPersistenceAllowedFromUi:\s*true|saveApprovalPreset\s*\(|persistApprovalPreset\s*\(",
  "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|autoApprove\s*\(",
  "notificationPreferencePersistenceAllowedFromUi:\s*true|notificationCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|saveNotificationPreference|createNotification\s*\(|sendNotification\s*\(",
  "recoveryExecutionAllowedFromUi:\s*true|recoveryPresetPersistenceAllowedFromUi:\s*true|runRecovery\s*\(|executeRecovery\s*\(|saveRecoveryPreset\s*\(|persistRecoveryPreset\s*\("
)) {
  if ($source -match $pattern) { throw "[FAIL] Unexpected review-only boundary violation: $pattern" }
}

Write-Host "[PASS] approval policy preset phase-specific safety boundaries remain review-only"
