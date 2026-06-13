param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-automation-live-dry-run-replay"
$route = "src\app\first-automation-live-dry-run-replay"
$phaseMarkers = @(
  "First automation live dry-run replay",
  "First automation live dry-run replay does not execute automations",
  "Automation replay requires operator review before live use",
  "Unsafe replay shortcuts remain blocked",
  "Replay stages",
  "Expected actual automation comparison groups"
)
$plainEnglish = @(
  "automation live dry-run replay identity",
  "approval readiness checklist",
  "denied replay actions",
  "blocked replay risks",
  "automation approval trial route",
  "automation release candidate route",
  "next recommended action",
  "no automation rule persistence",
  "advanced replay details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 471 First Automation Live Dry-Run Replay" `
  -ScriptFile "smoke-codexforge-first-automation-live-dry-run-replay.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstAutomationLiveDryRunReplayPanel" `
  -CommandLabel "Go to First Automation Live Dry-Run Replay" `
  -Modules @("first-automation-live-dry-run-replay-types.ts","first-automation-live-dry-run-replay-summary.ts","index.ts") `
  -Components @("FirstAutomationLiveDryRunReplayPanel.tsx","index.ts") `
  -Exports @("buildFirstAutomationLiveDryRunReplayStableKey","buildFirstAutomationLiveDryRunReplay","buildFirstAutomationLiveDryRunReplays","buildFirstAutomationLiveDryRunReplayBoundary","buildFirstAutomationLiveDryRunReplayModel","summarizeFirstAutomationLiveDryRunReplay","FIRST_AUTOMATION_LIVE_DRY_RUN_REPLAY_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/automation-live-execution-guard-review","/first-automation-live-approval-trial","/automation-live-trial-release-candidate","/automation-dry-run-trial-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/first-automation-live-dry-run-replay")

Write-Host "[OK] CodexForge First Automation Live Dry-Run Replay smoke passed."
