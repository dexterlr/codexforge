param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1892 Backend Prerequisite Summary Preview"
  ScriptFile = "smoke-codexforge-backend-prerequisite-summary-preview.ps1"
  Domain = "src\lib\codexforge\backend-prerequisite-summary-preview"
  Route = "src\app\backend-prerequisite-summary-preview"
  CommandLabel = "Go to Backend Prerequisite Summary Preview"
  RouteHref = "/backend-prerequisite-summary-preview"
  Markers = @("Backend prerequisite summary preview", "Backend prerequisite summary preview does not create services spawn workers install packages bind ports deploy runtimes or call providers from the UI", "Backend prerequisite summary preview requires backend-owned implementation outside the frontend", "Backend prerequisite summary preview shows simulated database prerequisite simulated worker prerequisite simulated broker adapter prerequisite simulated audit prerequisite simulated credential vault prerequisite and denied frontend execution", "Denied backend prerequisite summary paths remain blocked", "Backend prerequisite summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
