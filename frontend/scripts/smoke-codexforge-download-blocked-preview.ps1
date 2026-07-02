param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2003 Download Blocked Preview"
  ScriptFile = "smoke-codexforge-download-blocked-preview.ps1"
  Domain = "src\lib\codexforge\download-blocked-preview"
  Route = "src\app\download-blocked-preview"
  CommandLabel = "Go to Download Blocked Preview"
  RouteHref = "/download-blocked-preview"
  Markers = @("Download blocked preview", "Download blocked preview does not download files download media download captions download artifacts create object URLs or write files from the UI", "Download blocked preview requires backend-owned export handoff and explicit operator approval", "Denied download paths remain blocked", "Download blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

