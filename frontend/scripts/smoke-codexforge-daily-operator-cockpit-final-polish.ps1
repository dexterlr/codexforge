param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-operator-cockpit-final-polish"
$route = "src\app\daily-operator-cockpit-final-polish"
$newRoutes = @(
  "/provider-local-connector-automation-cohesion-review",
  "/unified-approval-policy-final-review",
  "/unified-evidence-policy-final-review",
  "/unified-result-policy-final-review",
  "/unified-recovery-policy-final-review",
  "/unified-settings-preferences-review",
  "/daily-operator-cockpit-final-polish",
  "/global-command-palette-final-polish"
)
$deterministicMarkerFallback = @(
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no appendEvent/saveBrainGraph calls from UI",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text"
)
$phaseMarkers = @(
  "Daily operator cockpit final polish",
  "Daily operator cockpit final polish does not execute actions",
  "Cockpit changes require explicit operator approval",
  "Unresolved cockpit blockers stay blocked",
  "Cockpit readiness groups",
  "Navigation clarity checklist"
)
$plainEnglish = @(
  "daily operator cockpit polish identity",
  "review inbox clarity checklist",
  "approval queue clarity checklist",
  "denied cockpit actions",
  "unresolved cockpit blockers",
  "command palette polish route",
  "release readiness dashboard route",
  "next recommended action",
  "advanced cockpit details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 496 Daily Operator Cockpit Final Polish" `
  -ScriptFile "smoke-codexforge-daily-operator-cockpit-final-polish.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyOperatorCockpitFinalPolishPanel" `
  -CommandLabel "Go to Daily Operator Cockpit Final Polish" `
  -Modules @("daily-operator-cockpit-final-polish-types.ts","daily-operator-cockpit-final-polish-summary.ts","index.ts") `
  -Components @("DailyOperatorCockpitFinalPolishPanel.tsx","index.ts") `
  -Exports @("buildDailyOperatorCockpitFinalPolishStableKey","buildDailyOperatorCockpitFinalPolish","buildDailyOperatorCockpitFinalPolishes","buildDailyOperatorCockpitFinalPolishBoundary","buildDailyOperatorCockpitFinalPolishModel","summarizeDailyOperatorCockpitFinalPolish","DAILY_OPERATOR_COCKPIT_FINAL_POLISH_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/unified-settings-preferences-review","/global-command-palette-final-polish","/readiness","/daily-operator-home")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Daily Operator Cockpit Final Polish smoke passed."
