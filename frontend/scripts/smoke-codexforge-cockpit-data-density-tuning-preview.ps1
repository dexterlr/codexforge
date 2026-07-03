param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2239 Cockpit Data Density Tuning Preview"
  ScriptFile = "smoke-codexforge-cockpit-data-density-tuning-preview.ps1"
  Domain = "cockpit-data-density-tuning-preview"
  Route = "cockpit-data-density-tuning-preview"
  CommandLabel = "Go to Cockpit Data Density Tuning Preview"
  RouteHref = "/cockpit-data-density-tuning-preview"
  Markers = @("Cockpit data density tuning preview", "Cockpit data density tuning preview improves spacing grouping and hierarchy so the cockpit feels premium instead of crowded", "Cockpit data density tuning preview does not remove important safety gates contract status or diagnostics", "Cockpit data density tuning preview keeps normal user workflow primary", "Denied data density regression paths remain blocked", "Cockpit data density checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
