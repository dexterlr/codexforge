param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2002 Export Artifact Blocked Preview"
  ScriptFile = "smoke-codexforge-export-artifact-blocked-preview.ps1"
  Domain = "src\lib\codexforge\export-artifact-blocked-preview"
  Route = "src\app\export-artifact-blocked-preview"
  CommandLabel = "Go to Export Artifact Blocked Preview"
  RouteHref = "/export-artifact-blocked-preview"
  Markers = @("Export artifact blocked preview", "Export artifact blocked preview does not create artifacts persist artifacts store media write browser storage upload media download files or write files from the UI", "Export artifact blocked preview requires backend-owned artifact storage and explicit operator approval", "Denied export artifact paths remain blocked", "Export artifact blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

