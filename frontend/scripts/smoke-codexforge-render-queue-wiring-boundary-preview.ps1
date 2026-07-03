param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2257 Render Queue Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-render-queue-wiring-boundary-preview.ps1"
  Domain = "render-queue-wiring-boundary-preview"
  Route = "render-queue-wiring-boundary-preview"
  CommandLabel = "Go to Render Queue Wiring Boundary Preview"
  RouteHref = "/render-queue-wiring-boundary-preview"
  Markers = @("Render Queue Wiring Boundary", "render queue boundary", "No render", "No queue dispatch", "No worker dispatch")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
