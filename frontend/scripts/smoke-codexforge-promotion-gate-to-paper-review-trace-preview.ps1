param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1875 Promotion Gate To Paper Review Trace Preview"
  ScriptFile = "smoke-codexforge-promotion-gate-to-paper-review-trace-preview.ps1"
  Domain = "src\lib\codexforge\promotion-gate-to-paper-review-trace-preview"
  Route = "src\app\promotion-gate-to-paper-review-trace-preview"
  CommandLabel = "Go to Promotion Gate To Paper Review Trace Preview"
  RouteHref = "/promotion-gate-to-paper-review-trace-preview"
  Markers = @("Promotion gate to paper review trace preview", "Promotion gate to paper review trace preview does not execute paper trades route orders call brokers persist approvals or enable live trading from the UI", "Promotion gate to paper review trace preview requires backend-owned paper workflow and explicit operator approval", "Promotion gate to paper review trace preview shows simulated promotion packet simulated paper review target simulated backend prerequisite simulated risk governor state simulated denied execution bridge", "Denied promotion gate to paper review trace paths remain blocked", "Promotion gate to paper review trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
