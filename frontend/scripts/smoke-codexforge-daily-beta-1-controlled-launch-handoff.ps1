param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 616 Daily Beta 1 Controlled Launch Handoff" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-launch-handoff.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-launch-handoff" `
  -Route "src\app\daily-beta-1-controlled-launch-handoff" `
  -MainPanel "DailyBetaOneControlledLaunchHandoffPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Launch Handoff" `
  -Modules @("daily-beta-1-controlled-launch-handoff-types.ts", "daily-beta-1-controlled-launch-handoff-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledLaunchHandoffPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledLaunchHandoffStableKey", "buildDailyBetaOneControlledLaunchHandoff", "buildDailyBetaOneControlledLaunchHandoffs", "buildDailyBetaOneControlledLaunchHandoffBoundary", "buildDailyBetaOneControlledLaunchHandoffModel", "summarizeDailyBetaOneControlledLaunchHandoff", "DAILY_BETA_ONE_CONTROLLED_LAUNCH_HANDOFF_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled launch handoff", "Daily Beta 1 controlled launch handoff does not send or apply handoff automatically", "Controlled launch handoff requires explicit operator approval", "Unresolved controlled launch handoff blockers stay blocked", "Handoff groups", "Controlled launch limitation summary") `
  -PlainEnglish @("Controlled launch handoff identity", "Operator runbook summary", "Rollback/monitoring summary", "Validation checklist", "Denied handoff actions", "Unresolved handoff blockers", "Controlled launch readiness lock route", "Go/no-go candidate route", "Next recommended action", "no handoff apply behavior", "no file export/write behavior") `
  -RouteHref "/daily-beta-1-controlled-launch-handoff"

Write-Host "[OK] CodexForge Phase 616 Daily Beta 1 controlled launch handoff smoke passed."
