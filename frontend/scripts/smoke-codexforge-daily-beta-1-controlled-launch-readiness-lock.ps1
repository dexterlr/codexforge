param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 617 Daily Beta 1 Controlled Launch Readiness Lock" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-launch-readiness-lock.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-launch-readiness-lock" `
  -Route "src\app\daily-beta-1-controlled-launch-readiness-lock" `
  -MainPanel "DailyBetaOneControlledLaunchReadinessLockPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Launch Readiness Lock" `
  -Modules @("daily-beta-1-controlled-launch-readiness-lock-types.ts", "daily-beta-1-controlled-launch-readiness-lock-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledLaunchReadinessLockPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledLaunchReadinessLockStableKey", "buildDailyBetaOneControlledLaunchReadinessLock", "buildDailyBetaOneControlledLaunchReadinessLocks", "buildDailyBetaOneControlledLaunchReadinessLockBoundary", "buildDailyBetaOneControlledLaunchReadinessLockModel", "summarizeDailyBetaOneControlledLaunchReadinessLock", "DAILY_BETA_ONE_CONTROLLED_LAUNCH_READINESS_LOCK_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled launch readiness lock", "Daily Beta 1 controlled launch readiness lock does not lock launch readiness automatically", "Controlled launch readiness lock requires explicit operator approval", "Unresolved controlled launch readiness lock blockers stay blocked", "Lock criteria groups", "Candidate handoff checklist") `
  -PlainEnglish @("Controlled launch readiness lock identity", "Launch review checklist", "Evidence/result/recovery/hardening checklist", "Rollback checklist", "Denied readiness lock actions", "Unresolved readiness lock blockers", "Controlled launch candidate route", "Checkpoint docs route", "Next recommended action", "no readiness lock automation", "no launch readiness lock automation") `
  -RouteHref "/daily-beta-1-controlled-launch-readiness-lock"

Write-Host "[OK] CodexForge Phase 617 Daily Beta 1 controlled launch readiness lock smoke passed."
