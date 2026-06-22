param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1393 Cockpit Evidence Result Recovery Polish" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-result-recovery-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-result-recovery-polish" `
  -Route "src\app\cockpit-evidence-result-recovery-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Evidence Result Recovery Polish" `
  -RouteHref "/cockpit-evidence-result-recovery-polish" `
  -Markers @("Cockpit evidence result recovery polish", "Cockpit evidence result recovery polish does not persist evidence results or execute recovery from the UI", "Cockpit evidence result recovery polish requires explicit operator approval", "Evidence result recovery shows evidence capture result states recovery options rollback readiness retry readiness and manual review", "No direct recovery execution from the cockpit", "Cockpit evidence result recovery checklist")
