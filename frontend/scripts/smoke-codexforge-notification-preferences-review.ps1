param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/operator-preferences-review",
  "/workspace-personalization-review",
  "/saved-review-views",
  "/notification-preferences-review",
  "/approval-policy-presets"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 394 Notification Preferences Review" `
  -ScriptFile "smoke-codexforge-notification-preferences-review.ps1" `
  -Domain "src\lib\codexforge\notification-preferences-review" `
  -Route "src\app\notification-preferences-review" `
  -MainPanel "NotificationPreferencesReviewPanel" `
  -CommandLabel "Go to Notification Preferences Review" `
  -Modules @("notification-preferences-review-types.ts","notification-preferences-review-summary.ts","index.ts") `
  -Components @("NotificationPreferencesReviewPanel.tsx","index.ts") `
  -Exports @("buildNotificationPreferencesReviewStableKey","buildNotificationPreferencesReview","buildNotificationPreferencesReviews","buildNotificationPreferencesReviewBoundary","buildNotificationPreferencesReviewModel","summarizeNotificationPreferencesReview","NOTIFICATION_PREFERENCES_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Notification preferences review","Notification preferences are not saved from this page","No notifications are sent from this page","Notification delivery requires explicit approval","Notification groups","Urgency cadence preview") `
  -PlainEnglish @("Notification preferences identity","Privacy/redaction rules","Delivery approval gates","Blocked notification risks","Approval policy presets route","Saved review views route","Next recommended action","advanced notification details collapsed/secondary","no notification preference persistence","no notification creation","no notification sending") `
  -ExtraRoutes @("/approval-policy-presets","/saved-review-views","/operator-preferences-review","/workspace-personalization-review") `
  -ProtectedRoutes $protectedRoutes

$source = ((Get-ChildItem -Recurse -File "src\lib\codexforge\notification-preferences-review", "src\app\notification-preferences-review") | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($pattern in @(
  "notificationPreferencePersistenceAllowedFromUi:\s*true|saveNotificationPreference|saveNotificationPreferences|persistNotificationPreference|persistNotificationPreferences",
  "notificationCreationAllowedFromUi:\s*true|createNotification\s*\(|new\s+Notification\s*\(",
  "notificationSendingAllowedFromUi:\s*true|sendNotification\s*\(|deliverNotification\s*\(",
  "approvalPolicyMutationAllowedFromUi:\s*true|approvalPresetPersistenceAllowedFromUi:\s*true|changeApprovalPolicy\s*\(|setApprovalPolicy\s*\(|saveApprovalPreset\s*\(|persistApprovalPreset\s*\(",
  "recoveryExecutionAllowedFromUi:\s*true|recoveryPresetPersistenceAllowedFromUi:\s*true|runRecovery\s*\(|executeRecovery\s*\(|saveRecoveryPreset\s*\(|persistRecoveryPreset\s*\("
)) {
  if ($source -match $pattern) { throw "[FAIL] Unexpected review-only boundary violation: $pattern" }
}

Write-Host "[PASS] notification review phase-specific safety boundaries remain review-only"
