param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\release-readiness-dashboard"
$route = "src\app\release-readiness-dashboard"
$newRoutes = @(
  "/review-inbox-final-consolidation",
  "/release-readiness-dashboard",
  "/codexforge-foundation-500-milestone-review",
  "/first-real-daily-workflow-candidate",
  "/real-daily-workflow-evidence-review",
  "/real-daily-workflow-result-review",
  "/real-daily-workflow-recovery-review",
  "/real-daily-workflow-hardening-pass"
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
  "Release readiness dashboard",
  "Release readiness dashboard does not approve release",
  "Release readiness requires explicit operator approval",
  "Unresolved release risks stay blocked",
  "Readiness groups",
  "Smoke build docs status checklist"
)
$plainEnglish = @(
  "release readiness dashboard identity",
  "approval evidence result recovery hardening checklist",
  "live-capable lane readiness checklist",
  "denied readiness actions",
  "unresolved release risks",
  "Foundation 500 milestone route",
  "first real daily workflow candidate route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 499 Release Readiness Dashboard" `
  -ScriptFile "smoke-codexforge-release-readiness-dashboard.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ReleaseReadinessDashboardPanel" `
  -CommandLabel "Go to Release Readiness Dashboard" `
  -Modules @("release-readiness-dashboard-types.ts","release-readiness-dashboard-summary.ts","index.ts") `
  -Components @("ReleaseReadinessDashboardPanel.tsx","index.ts") `
  -Exports @("buildReleaseReadinessDashboardStableKey","buildReleaseReadinessDashboard","buildReleaseReadinessDashboards","buildReleaseReadinessDashboardBoundary","buildReleaseReadinessDashboardModel","summarizeReleaseReadinessDashboard","RELEASE_READINESS_DASHBOARD_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/review-inbox-final-consolidation","/codexforge-foundation-500-milestone-review","/first-real-daily-workflow-candidate","/global-command-palette-final-polish")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Release Readiness Dashboard smoke passed."
