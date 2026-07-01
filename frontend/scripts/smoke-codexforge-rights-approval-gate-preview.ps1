param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1984 Rights Approval Gate Preview"
  ScriptFile = "smoke-codexforge-rights-approval-gate-preview.ps1"
  Domain = "src\lib\codexforge\rights-approval-gate-preview"
  Route = "src\app\rights-approval-gate-preview"
  CommandLabel = "Go to Rights Approval Gate Preview"
  RouteHref = "/rights-approval-gate-preview"
  Markers = @("Rights approval gate preview", "Rights approval gate preview does not clear copyright license music approve usage persist rights or publish content from the UI", "Rights approval gate preview requires backend-owned rights review consent review and approval capture", "Rights approval gate preview shows simulated source rights simulated music rights simulated likeness consent simulated brand approval simulated denied frontend rights persistence", "Denied rights approval gate paths remain blocked", "Rights approval gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

