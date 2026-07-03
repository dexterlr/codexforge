param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2263 Command Action Adapter Boundary Preview"
  ScriptFile = "smoke-codexforge-command-action-adapter-boundary-preview.ps1"
  Domain = "command-action-adapter-boundary-preview"
  Route = "command-action-adapter-boundary-preview"
  CommandLabel = "Go to Command Action Adapter Boundary Preview"
  RouteHref = "/command-action-adapter-boundary-preview"
  Markers = @("Command Action Adapter Boundary", "disabled backend adapter layer", "No command execution", "No queue dispatch", "No worker dispatch")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
