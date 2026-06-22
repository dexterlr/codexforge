param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1390 Cockpit Command Preview Polish" `
  -ScriptFile "smoke-codexforge-cockpit-command-preview-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-command-preview-polish" `
  -Route "src\app\cockpit-command-preview-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Command Preview Polish" `
  -RouteHref "/cockpit-command-preview-polish" `
  -Markers @("Cockpit command preview polish", "Cockpit command preview polish does not run commands", "Cockpit command preview polish requires explicit operator approval", "Command preview shows allowlist status arguments working directory timeout stdout stderr and evidence expectations", "No direct command execution from the command preview", "Cockpit command preview checklist")
