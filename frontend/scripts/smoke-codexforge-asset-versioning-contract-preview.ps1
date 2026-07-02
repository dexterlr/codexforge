param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2065 Asset Versioning Contract Preview"
  ScriptFile = "smoke-codexforge-asset-versioning-contract-preview.ps1"
  Domain = "src\lib\codexforge\asset-versioning-contract-preview"
  Route = "src\app\asset-versioning-contract-preview"
  CommandLabel = "Go to Asset Versioning Contract Preview"
  RouteHref = "/asset-versioning-contract-preview"
  Contract = "Asset"
  Markers = @("Asset versioning contract preview", "Asset versioning contract preview does not create versions persist files mutate assets or write storage records from the UI", "Asset versioning contract preview requires backend-owned version ledger checksum capture retention policy and audit trail", "Asset versioning contract preview shows simulated asset version simulated prior reference simulated change reason simulated rollback note simulated denied frontend version persistence", "Denied asset versioning paths remain blocked", "Asset versioning contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
