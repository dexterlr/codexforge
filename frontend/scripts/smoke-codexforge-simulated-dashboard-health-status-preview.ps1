param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1798 Simulated Dashboard Health Status Preview" `
  -ScriptFile "smoke-codexforge-simulated-dashboard-health-status-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-dashboard-health-status-preview" `
  -Route "src\app\simulated-dashboard-health-status-preview" `
  -CommandLabel "Go to Simulated Dashboard Health Status Preview" `
  -RouteHref "/simulated-dashboard-health-status-preview" `
  -Markers @("Simulated dashboard health status preview", "Simulated dashboard health status preview does not probe services call providers check broker connections or monitor live accounts from the UI", "Simulated dashboard health status preview requires deterministic synthetic health indicators only", "Simulated dashboard health status preview shows simulated ledger freshness simulated evidence completeness simulated review backlog simulated risk gate status simulated export hold and denied live probes", "Denied simulated dashboard health status paths remain blocked", "Simulated dashboard health status checklist")
