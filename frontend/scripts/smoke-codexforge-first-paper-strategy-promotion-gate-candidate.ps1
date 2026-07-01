param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1864 First Paper Strategy Promotion Gate Candidate"
  ScriptFile = "smoke-codexforge-first-paper-strategy-promotion-gate-candidate.ps1"
  Domain = "src\lib\codexforge\first-paper-strategy-promotion-gate-candidate"
  Route = "src\app\first-paper-strategy-promotion-gate-candidate"
  CommandLabel = "Go to First Paper Strategy Promotion Gate Candidate"
  RouteHref = "/first-paper-strategy-promotion-gate-candidate"
  Markers = @("First paper strategy promotion gate candidate", "First paper strategy promotion gate candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement paper execution live execution or dispatch from the UI", "First paper strategy promotion gate candidate requires explicit operator approval", "Candidate combines promotion eligibility evidence sufficiency risk governor mandate compatibility version readiness simulated paper readiness score blocker queue operator promotion review rejection packet hold state approval boundary no auto promote execution boundary cockpit summary and denied paths", "Denied first paper strategy promotion gate paths remain blocked", "First paper strategy promotion gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
