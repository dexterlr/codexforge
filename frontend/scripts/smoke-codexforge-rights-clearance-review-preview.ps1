param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1997 Rights Clearance Review Preview"
  ScriptFile = "smoke-codexforge-rights-clearance-review-preview.ps1"
  Domain = "src\lib\codexforge\rights-clearance-review-preview"
  Route = "src\app\rights-clearance-review-preview"
  CommandLabel = "Go to Rights Clearance Review Preview"
  RouteHref = "/rights-clearance-review-preview"
  Markers = @("Rights clearance review preview", "Rights clearance review preview does not clear rights approve usage persist rights upload media publish content or schedule content from the UI", "Rights clearance review preview requires backend-owned rights review and explicit operator approval", "Denied rights clearance paths remain blocked", "Rights clearance review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

