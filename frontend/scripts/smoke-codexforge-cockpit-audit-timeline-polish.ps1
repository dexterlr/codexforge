param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1394 Cockpit Audit Timeline Polish" `
  -ScriptFile "smoke-codexforge-cockpit-audit-timeline-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-audit-timeline-polish" `
  -Route "src\app\cockpit-audit-timeline-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Audit Timeline Polish" `
  -RouteHref "/cockpit-audit-timeline-polish" `
  -Markers @("Cockpit audit timeline polish", "Cockpit audit timeline polish does not persist audit logs from the UI", "Cockpit audit timeline polish requires backend-owned audit capture", "Audit timeline shows goal plan diff command approval evidence result recovery operator and denied-path records", "No direct audit persistence from the cockpit", "Cockpit audit timeline checklist")
