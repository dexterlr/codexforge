param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\global-command-palette-final-polish"
$route = "src\app\global-command-palette-final-polish"
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
  "Global command palette final polish",
  "Global command palette final polish does not execute commands",
  "Command changes require explicit operator approval",
  "Unsafe command shortcuts remain blocked",
  "Command groups",
  "Duplicate command checklist"
)
$plainEnglish = @(
  "command palette polish identity",
  "route discoverability checklist",
  "safety command checklist",
  "denied command actions",
  "unresolved command blockers",
  "release readiness dashboard route",
  "foundation milestone review route",
  "next recommended action",
  "advanced command palette details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 497 Global Command Palette Final Polish" `
  -ScriptFile "smoke-codexforge-global-command-palette-final-polish.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "GlobalCommandPaletteFinalPolishPanel" `
  -CommandLabel "Go to Global Command Palette Final Polish" `
  -Modules @("global-command-palette-final-polish-types.ts","global-command-palette-final-polish-summary.ts","index.ts") `
  -Components @("GlobalCommandPaletteFinalPolishPanel.tsx","index.ts") `
  -Exports @("buildGlobalCommandPaletteFinalPolishStableKey","buildGlobalCommandPaletteFinalPolish","buildGlobalCommandPaletteFinalPolishes","buildGlobalCommandPaletteFinalPolishBoundary","buildGlobalCommandPaletteFinalPolishModel","summarizeGlobalCommandPaletteFinalPolish","GLOBAL_COMMAND_PALETTE_FINAL_POLISH_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/daily-operator-cockpit-final-polish","/readiness","/codexforge-foundation-release-candidate","/provider-local-connector-automation-cohesion-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Global Command Palette Final Polish smoke passed."
