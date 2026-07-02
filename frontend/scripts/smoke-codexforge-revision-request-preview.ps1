param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2006 Revision Request Preview"
  ScriptFile = "smoke-codexforge-revision-request-preview.ps1"
  Domain = "src\lib\codexforge\revision-request-preview"
  Route = "src\app\revision-request-preview"
  CommandLabel = "Go to Revision Request Preview"
  RouteHref = "/revision-request-preview"
  Markers = @("Revision request preview", "Revision request preview does not persist revisions dispatch workers retry renders create jobs create artifacts or persist approvals from the UI", "Revision request preview requires backend-owned revision workflow and explicit operator approval", "Denied revision request paths remain blocked", "Revision request checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

