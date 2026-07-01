param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1990 Export Handoff Blocked Preview"
  ScriptFile = "smoke-codexforge-export-handoff-blocked-preview.ps1"
  Domain = "src\lib\codexforge\export-handoff-blocked-preview"
  Route = "src\app\export-handoff-blocked-preview"
  CommandLabel = "Go to Export Handoff Blocked Preview"
  RouteHref = "/export-handoff-blocked-preview"
  Markers = @("Export handoff blocked preview", "Export handoff blocked preview does not export videos download files upload media publish posts schedule content or create artifacts from the UI", "Export handoff blocked preview requires backend-owned export service artifact storage rights review and approval capture", "Export handoff blocked preview shows denied export denied download denied upload denied publish denied schedule denied artifact creation and approval requirement", "Denied export handoff paths remain blocked", "Export handoff blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

