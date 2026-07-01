param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1846 No Auto Promote Registry Boundary Preview"
  ScriptFile = "smoke-codexforge-no-auto-promote-registry-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-auto-promote-registry-boundary-preview"
  Route = "src\app\no-auto-promote-registry-boundary-preview"
  CommandLabel = "Go to No Auto Promote Registry Boundary Preview"
  RouteHref = "/no-auto-promote-registry-boundary-preview"
  Markers = @("No auto promote registry boundary preview", "No auto promote registry boundary preview blocks automatic version promotion strategy mutation parameter optimisation rule changes approval persistence and execution routing from the UI", "No auto promote registry boundary preview requires backend-owned version registry and explicit operator approval", "No auto promote registry boundary preview shows denied auto promote denied auto tune denied auto apply denied frontend write denied execution route and operator approval gate", "Denied no auto promote registry paths remain blocked", "No auto promote registry boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
