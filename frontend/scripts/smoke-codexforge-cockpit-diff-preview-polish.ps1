param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1389 Cockpit Diff Preview Polish" `
  -ScriptFile "smoke-codexforge-cockpit-diff-preview-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-diff-preview-polish" `
  -Route "src\app\cockpit-diff-preview-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Diff Preview Polish" `
  -RouteHref "/cockpit-diff-preview-polish" `
  -Markers @("Cockpit diff preview polish", "Cockpit diff preview polish does not write files or apply diffs", "Cockpit diff preview polish requires explicit operator approval", "Diff preview shows proposed file changes path guard status rollback readiness and denied paths", "No direct file mutation from the diff preview", "Cockpit diff preview checklist")
