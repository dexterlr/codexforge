param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2000 Export Readiness Summary Preview"
  ScriptFile = "smoke-codexforge-export-readiness-summary-preview.ps1"
  Domain = "src\lib\codexforge\export-readiness-summary-preview"
  Route = "src\app\export-readiness-summary-preview"
  CommandLabel = "Go to Export Readiness Summary Preview"
  RouteHref = "/export-readiness-summary-preview"
  Markers = @("Export readiness summary preview", "Export readiness summary preview does not export videos create artifacts persist readiness status or start render jobs from the UI", "Export readiness summary preview requires backend-owned export service and artifact storage", "Denied export readiness paths remain blocked", "Export readiness summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

