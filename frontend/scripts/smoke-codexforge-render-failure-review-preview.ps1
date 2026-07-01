param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1989 Render Failure Review Preview"
  ScriptFile = "smoke-codexforge-render-failure-review-preview.ps1"
  Domain = "src\lib\codexforge\render-failure-review-preview"
  Route = "src\app\render-failure-review-preview"
  CommandLabel = "Go to Render Failure Review Preview"
  RouteHref = "/render-failure-review-preview"
  Markers = @("Render failure review preview", "Render failure review preview does not retry render jobs dispatch workers inspect logs from services or persist failure state from the UI", "Render failure review preview requires backend-owned render telemetry and operator review", "Render failure review preview shows simulated blocked prerequisite simulated missing asset simulated missing caption simulated rights hold simulated backend failure review required", "Denied render failure review paths remain blocked", "Render failure review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

