param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2192 Asset Checklist Panel Mock"
  ScriptFile = "smoke-codexforge-asset-checklist-panel-mock.ps1"
  Domain = "src\lib\codexforge\asset-checklist-panel-mock"
  Route = "src\app\asset-checklist-panel-mock"
  CommandLabel = "Go to Asset Checklist Panel Mock"
  RouteHref = "/asset-checklist-panel-mock"
  Markers = @("Asset checklist panel mock", "Asset checklist panel mock uses local React state only and does not upload assets download assets store media scan files or persist asset state", "Asset checklist panel mock includes asset needed asset supplied rights needed scan required and storage required indicators", "Asset checklist panel mock makes asset storage backend prerequisites visible", "Denied asset upload and persistence paths remain blocked", "Asset checklist panel mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
