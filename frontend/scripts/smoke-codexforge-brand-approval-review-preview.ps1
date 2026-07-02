param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1998 Brand Approval Review Preview"
  ScriptFile = "smoke-codexforge-brand-approval-review-preview.ps1"
  Domain = "src\lib\codexforge\brand-approval-review-preview"
  Route = "src\app\brand-approval-review-preview"
  CommandLabel = "Go to Brand Approval Review Preview"
  RouteHref = "/brand-approval-review-preview"
  Markers = @("Brand approval review preview", "Brand approval review preview does not automate approval persist approvals release publish paths or call brand connectors from the UI", "Brand approval review preview requires backend-owned brand approval workflow and explicit operator approval", "Denied brand approval paths remain blocked", "Brand approval review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

