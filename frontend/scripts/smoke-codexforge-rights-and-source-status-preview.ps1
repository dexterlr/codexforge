param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1954 Rights And Source Status Preview"
  ScriptFile = "smoke-codexforge-rights-and-source-status-preview.ps1"
  Domain = "src\lib\codexforge\rights-and-source-status-preview"
  Route = "src\app\rights-and-source-status-preview"
  CommandLabel = "Go to Rights And Source Status Preview"
  RouteHref = "/rights-and-source-status-preview"
  Markers = @("Rights and source status preview", "Rights and source status preview does not clear copyright license music approve usage persist rights or publish content from the UI", "Rights and source status preview requires backend-owned rights review and approval capture", "Rights and source status preview shows simulated source status simulated license note simulated attribution need simulated approval state simulated denied frontend rights persistence", "Denied rights and source status paths remain blocked", "Rights and source status checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

