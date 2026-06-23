param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1479 Cockpit Queue Summary" `
  -ScriptFile "smoke-codexforge-cockpit-queue-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-queue-summary" `
  -Route "src\app\cockpit-queue-summary" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Cockpit Queue Summary" `
  -RouteHref "/cockpit-queue-summary" `
  -Markers @("Cockpit queue summary", "Cockpit queue summary keeps the cockpit as the normal user surface", "Cockpit queue summary does not create queue jobs from the cockpit", "Cockpit queue summary shows queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and transitions", "Phase pages remain dev test diagnostics only", "Cockpit queue summary checklist")
