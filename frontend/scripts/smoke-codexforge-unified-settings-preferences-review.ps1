param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-settings-preferences-review"
$route = "src\app\unified-settings-preferences-review"
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
  "Unified settings and preferences review",
  "Unified settings and preferences review does not persist settings",
  "Settings changes require explicit operator approval",
  "Unsafe preference defaults remain blocked",
  "Preferences groups",
  "Privacy defaults checklist"
)
$plainEnglish = @(
  "unified settings identity",
  "provider/local/connector/automation preference checklist",
  "denied settings shortcuts",
  "unresolved settings blockers",
  "cockpit final polish route",
  "command palette polish route",
  "next recommended action",
  "no settings mutation",
  "advanced settings details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 495 Unified Settings and Preferences Review" `
  -ScriptFile "smoke-codexforge-unified-settings-preferences-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedSettingsPreferencesReviewPanel" `
  -CommandLabel "Go to Unified Settings and Preferences Review" `
  -Modules @("unified-settings-preferences-review-types.ts","unified-settings-preferences-review-summary.ts","index.ts") `
  -Components @("UnifiedSettingsPreferencesReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedSettingsPreferencesReviewStableKey","buildUnifiedSettingsPreferencesReview","buildUnifiedSettingsPreferencesReviews","buildUnifiedSettingsPreferencesReviewBoundary","buildUnifiedSettingsPreferencesReviewModel","summarizeUnifiedSettingsPreferencesReview","UNIFIED_SETTINGS_PREFERENCES_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/unified-recovery-policy-final-review","/daily-operator-cockpit-final-polish","/global-command-palette-final-polish","/operator-preferences-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Settings and Preferences Review smoke passed."
