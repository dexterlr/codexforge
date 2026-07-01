param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1880 First Paper Trading End-to-End Review Candidate"
  ScriptFile = "smoke-codexforge-first-paper-trading-end-to-end-review-candidate.ps1"
  Domain = "src\lib\codexforge\first-paper-trading-end-to-end-review-candidate"
  Route = "src\app\first-paper-trading-end-to-end-review-candidate"
  CommandLabel = "Go to First Paper Trading End-to-End Review Candidate"
  RouteHref = "/first-paper-trading-end-to-end-review-candidate"
  Markers = @("First paper trading end-to-end review candidate", "First paper trading end-to-end review candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement paper execution live execution broker execution or dispatch from the UI", "First paper trading end-to-end review candidate requires explicit operator approval", "Candidate combines research to mandate mandate to strategy strategy to paper adapter paper adapter to ledger ledger to review dashboard review dashboard to change control change control to version registry version registry to promotion gate promotion gate to paper review blocker map operator review no execution bridge cockpit summary and denied paths", "Denied first paper trading end-to-end paths remain blocked", "First paper trading end-to-end checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
