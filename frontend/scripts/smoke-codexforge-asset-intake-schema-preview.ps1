param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2059 Asset Intake Schema Preview"
  ScriptFile = "smoke-codexforge-asset-intake-schema-preview.ps1"
  Domain = "src\lib\codexforge\asset-intake-schema-preview"
  Route = "src\app\asset-intake-schema-preview"
  CommandLabel = "Go to Asset Intake Schema Preview"
  RouteHref = "/asset-intake-schema-preview"
  Contract = "Asset"
  Markers = @("Asset intake schema preview", "Asset intake schema preview does not upload assets read files persist intake records or create storage objects from the UI", "Asset intake schema preview requires backend-owned upload intake validation scanning approval capture and audit trail", "Asset intake schema preview shows simulated file name simulated content type simulated size limit simulated source note simulated denied frontend upload", "Denied asset intake schema paths remain blocked", "Asset intake schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
