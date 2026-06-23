param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1622 Cockpit Domain Runner Summary" `
  -ScriptFile "smoke-codexforge-cockpit-domain-runner-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-domain-runner-summary" `
  -Route "src\app\cockpit-domain-runner-summary" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Cockpit Domain Runner Summary" `
  -RouteHref "/cockpit-domain-runner-summary" `
  -Markers @("Cockpit domain runner summary", "Cockpit domain runner summary keeps the cockpit as the normal user surface", "Cockpit domain runner summary does not execute domain packs dispatch workers call models call providers call connectors run commands write files or start runtimes from the cockpit", "Cockpit domain runner summary shows choose domain goal intake classifier worker route plan artifacts commands approvals evidence results audit recovery and hold-before-execution", "Phase pages remain dev test diagnostics only", "Cockpit domain runner checklist")
