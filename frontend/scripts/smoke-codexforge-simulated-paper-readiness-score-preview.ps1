param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1856 Simulated Paper Readiness Score Preview"
  ScriptFile = "smoke-codexforge-simulated-paper-readiness-score-preview.ps1"
  Domain = "src\lib\codexforge\simulated-paper-readiness-score-preview"
  Route = "src\app\simulated-paper-readiness-score-preview"
  CommandLabel = "Go to Simulated Paper Readiness Score Preview"
  RouteHref = "/simulated-paper-readiness-score-preview"
  Markers = @("Simulated paper readiness score preview", "Simulated paper readiness score preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI", "Simulated paper readiness score preview requires deterministic synthetic scoring only", "Simulated paper readiness score preview shows simulated evidence score simulated risk score simulated mandate score simulated review score simulated blocker score and no performance guarantee", "Denied simulated paper readiness score paths remain blocked", "Simulated paper readiness score checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
