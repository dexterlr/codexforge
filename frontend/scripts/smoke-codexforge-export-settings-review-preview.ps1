param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2001 Export Settings Review Preview"
  ScriptFile = "smoke-codexforge-export-settings-review-preview.ps1"
  Domain = "src\lib\codexforge\export-settings-review-preview"
  Route = "src\app\export-settings-review-preview"
  CommandLabel = "Go to Export Settings Review Preview"
  RouteHref = "/export-settings-review-preview"
  Markers = @("Export settings review preview", "Export settings review preview does not transcode video render media export files persist settings or create artifacts from the UI", "Export settings review preview requires backend-owned export service", "Denied export settings paths remain blocked", "Export settings review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

