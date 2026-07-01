param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1940 Brand And Rights Note Preview"
  ScriptFile = "smoke-codexforge-brand-and-rights-note-preview.ps1"
  Domain = "src\lib\codexforge\brand-and-rights-note-preview"
  Route = "src\app\brand-and-rights-note-preview"
  CommandLabel = "Go to Brand And Rights Note Preview"
  RouteHref = "/brand-and-rights-note-preview"
  Markers = @("Brand and rights note preview", "Brand and rights note preview does not clear copyright license music approve brand use or publish content from the UI", "Brand and rights note preview requires backend-owned rights review and operator approval", "Brand and rights note preview shows simulated brand check simulated rights check simulated music note simulated attribution note simulated approval requirement", "Denied brand and rights note paths remain blocked", "Brand and rights note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

