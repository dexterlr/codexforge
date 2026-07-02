param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2068 Asset Handoff Contract Preview"
  ScriptFile = "smoke-codexforge-asset-handoff-contract-preview.ps1"
  Domain = "src\lib\codexforge\asset-handoff-contract-preview"
  Route = "src\app\asset-handoff-contract-preview"
  CommandLabel = "Go to Asset Handoff Contract Preview"
  RouteHref = "/asset-handoff-contract-preview"
  Contract = "Asset"
  Markers = @("Asset handoff contract preview", "Asset handoff contract preview does not export packets download files create artifacts or persist handoffs from the UI", "Asset handoff contract preview requires backend-owned handoff workflow artifact storage approval capture and audit trail", "Asset handoff contract preview shows simulated handoff packet simulated receiving service simulated required checks simulated approval gate simulated denied frontend handoff persistence", "Denied asset handoff paths remain blocked", "Asset handoff contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
