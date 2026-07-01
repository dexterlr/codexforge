param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1909 Paper Trading Release Readiness Packet Preview"
  ScriptFile = "smoke-codexforge-paper-trading-release-readiness-packet-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-release-readiness-packet-preview"
  Route = "src\app\paper-trading-release-readiness-packet-preview"
  CommandLabel = "Go to Paper Trading Release Readiness Packet Preview"
  RouteHref = "/paper-trading-release-readiness-packet-preview"
  Markers = @("Paper trading release readiness packet preview", "Paper trading release readiness packet preview does not persist approvals persist evidence write files export reports or enable execution from the UI", "Paper trading release readiness packet preview requires backend-owned release packet workflow", "Paper trading release readiness packet preview shows simulated release packet simulated evidence summary simulated risk summary simulated blocker summary simulated backend prerequisite summary simulated no execution note", "Denied paper trading release readiness packet paths remain blocked", "Paper trading release readiness packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

