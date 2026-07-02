param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2060 Asset Metadata Schema Preview"
  ScriptFile = "smoke-codexforge-asset-metadata-schema-preview.ps1"
  Domain = "src\lib\codexforge\asset-metadata-schema-preview"
  Route = "src\app\asset-metadata-schema-preview"
  CommandLabel = "Go to Asset Metadata Schema Preview"
  RouteHref = "/asset-metadata-schema-preview"
  Contract = "Asset"
  Markers = @("Asset metadata schema preview", "Asset metadata schema preview does not persist metadata mutate assets write files or create database records from the UI", "Asset metadata schema preview requires backend-owned metadata persistence validation redaction and audit trail", "Asset metadata schema preview shows simulated title simulated source simulated usage note simulated owner placeholder simulated denied frontend metadata persistence", "Denied asset metadata schema paths remain blocked", "Asset metadata schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
