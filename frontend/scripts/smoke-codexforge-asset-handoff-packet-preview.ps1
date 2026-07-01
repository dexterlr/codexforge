param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1956 Asset Handoff Packet Preview"
  ScriptFile = "smoke-codexforge-asset-handoff-packet-preview.ps1"
  Domain = "src\lib\codexforge\asset-handoff-packet-preview"
  Route = "src\app\asset-handoff-packet-preview"
  CommandLabel = "Go to Asset Handoff Packet Preview"
  RouteHref = "/asset-handoff-packet-preview"
  Markers = @("Asset handoff packet preview", "Asset handoff packet preview does not export packets write files upload assets persist handoffs or create artifacts from the UI", "Asset handoff packet preview requires backend-owned asset storage export service and approval capture", "Asset handoff packet preview shows simulated handoff summary simulated shot list simulated asset list simulated rights note simulated export blocked state", "Denied asset handoff packet paths remain blocked", "Asset handoff packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

