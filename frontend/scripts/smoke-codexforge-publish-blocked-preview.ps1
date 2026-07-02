param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2004 Publish Blocked Preview"
  ScriptFile = "smoke-codexforge-publish-blocked-preview.ps1"
  Domain = "src\lib\codexforge\publish-blocked-preview"
  Route = "src\app\publish-blocked-preview"
  CommandLabel = "Go to Publish Blocked Preview"
  RouteHref = "/publish-blocked-preview"
  Markers = @("Publish blocked preview", "Publish blocked preview does not publish posts upload videos call connectors call providers send prompts schedule content or persist publish approvals from the UI", "Publish blocked preview requires backend-owned publish workflow and explicit operator approval", "Denied publish paths remain blocked", "Publish blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

