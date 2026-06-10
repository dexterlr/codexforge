param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/daily-use-onboarding-polish",
  "/operator-preferences-review",
  "/workspace-personalization-review",
  "/saved-review-views",
  "/novice-mode-guided-flow-polish",
  "/expert-mode-fast-path-review"
)

& (Join-Path $PSScriptRoot "codexforge-daily-use-review-smoke-helper.ps1") `
  -PhaseName "Phase 390 Daily Use Onboarding Polish" `
  -ScriptFile "smoke-codexforge-daily-use-onboarding-polish.ps1" `
  -Domain "src\lib\codexforge\daily-use-onboarding-polish" `
  -Route "src\app\daily-use-onboarding-polish" `
  -MainPanel "DailyUseOnboardingPolishPanel" `
  -CommandLabel "Go to Daily Use Onboarding Polish" `
  -Modules @("daily-use-onboarding-polish-types.ts","daily-use-onboarding-polish-summary.ts","index.ts") `
  -Components @("DailyUseOnboardingPolishPanel.tsx","index.ts") `
  -Exports @("buildDailyUseOnboardingPolishStableKey","buildDailyUseOnboardingPolish","buildDailyUseOnboardingPolishes","buildDailyUseOnboardingPolishBoundary","buildDailyUseOnboardingPolishModel","summarizeDailyUseOnboardingPolish","DAILY_USE_ONBOARDING_POLISH_LANGUAGE") `
  -PhaseMarkers @("Daily use onboarding polish","Onboarding polish does not change settings","Onboarding does not run workflows automatically","Approval gates remain visible","First-day operator path","Recommended review sequence") `
  -PlainEnglish @("Onboarding polish identity","Novice/expert entry points","Safety checkpoint reminders","Blocked onboarding risks","Operator preferences route","Saved review views route","Next recommended action","advanced onboarding details collapsed/secondary") `
  -ExtraRoutes @("/operator-preferences-review","/workspace-personalization-review","/saved-review-views","/novice-mode-guided-flow-polish","/expert-mode-fast-path-review") `
  -ProtectedRoutes $protectedRoutes
