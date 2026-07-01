param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1908 Paper Trading Operator Release Checklist Preview"
  ScriptFile = "smoke-codexforge-paper-trading-operator-release-checklist-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-operator-release-checklist-preview"
  Route = "src\app\paper-trading-operator-release-checklist-preview"
  CommandLabel = "Go to Paper Trading Operator Release Checklist Preview"
  RouteHref = "/paper-trading-operator-release-checklist-preview"
  Markers = @("Paper trading operator release checklist preview", "Paper trading operator release checklist preview does not persist approvals release locks dispatch workers execute paper trades or promote versions from the UI", "Paper trading operator release checklist preview requires backend-owned operator review workflow", "Paper trading operator release checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated version check simulated backend prerequisite check simulated explicit operator approval requirement", "Denied paper trading operator release checklist paths remain blocked", "Paper trading operator release checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

