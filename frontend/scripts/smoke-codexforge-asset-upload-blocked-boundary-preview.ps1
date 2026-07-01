param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1957 Asset Upload Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-asset-upload-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\asset-upload-blocked-boundary-preview"
  Route = "src\app\asset-upload-blocked-boundary-preview"
  CommandLabel = "Go to Asset Upload Blocked Boundary Preview"
  RouteHref = "/asset-upload-blocked-boundary-preview"
  Markers = @("Asset upload blocked boundary preview", "Asset upload blocked boundary preview blocks frontend upload frontend media storage frontend asset persistence frontend rights persistence frontend artifact creation and frontend provider calls", "Asset upload blocked boundary preview requires backend-owned asset storage rights review approval capture and explicit operator approval", "Asset upload blocked boundary preview shows denied asset upload denied media storage denied asset persistence denied rights persistence denied artifact creation and backend prerequisite", "Denied asset upload paths remain blocked", "Asset upload blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

