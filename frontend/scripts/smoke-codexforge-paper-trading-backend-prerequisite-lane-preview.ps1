param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1906 Paper Trading Backend Prerequisite Lane Preview"
  ScriptFile = "smoke-codexforge-paper-trading-backend-prerequisite-lane-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-backend-prerequisite-lane-preview"
  Route = "src\app\paper-trading-backend-prerequisite-lane-preview"
  CommandLabel = "Go to Paper Trading Backend Prerequisite Lane Preview"
  RouteHref = "/paper-trading-backend-prerequisite-lane-preview"
  Markers = @("Paper trading backend prerequisite lane preview", "Paper trading backend prerequisite lane preview does not create services spawn workers install packages bind ports deploy runtimes call brokers or call providers from the UI", "Paper trading backend prerequisite lane preview requires backend-owned implementation outside the frontend", "Paper trading backend prerequisite lane preview shows simulated database prerequisite simulated worker prerequisite simulated broker adapter prerequisite simulated credential vault prerequisite simulated audit trail prerequisite and denied frontend execution", "Denied paper trading backend prerequisite lane paths remain blocked", "Paper trading backend prerequisite lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

