param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1912 First Controlled Paper Trading Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-controlled-paper-trading-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-controlled-paper-trading-workspace-candidate"
  Route = "src\app\first-controlled-paper-trading-workspace-candidate"
  CommandLabel = "Go to First Controlled Paper Trading Workspace Candidate"
  RouteHref = "/first-controlled-paper-trading-workspace-candidate"
  Markers = @("First controlled paper trading workspace candidate", "First controlled paper trading workspace candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement paper execution live execution broker execution credential storage or dispatch from the UI", "First controlled paper trading workspace candidate requires explicit operator approval", "Candidate combines release map safe state overview review lane evidence lane strategy lane risk lane promotion lane backend prerequisite lane blocked execution lane operator checklist release readiness packet no live transition boundary cockpit summary and denied paths", "Denied first controlled paper trading workspace paths remain blocked", "First controlled paper trading workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

