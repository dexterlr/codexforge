param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2063 Asset Deduplication Contract Preview"
  ScriptFile = "smoke-codexforge-asset-deduplication-contract-preview.ps1"
  Domain = "src\lib\codexforge\asset-deduplication-contract-preview"
  Route = "src\app\asset-deduplication-contract-preview"
  CommandLabel = "Go to Asset Deduplication Contract Preview"
  RouteHref = "/asset-deduplication-contract-preview"
  Contract = "Asset"
  Markers = @("Asset deduplication contract preview", "Asset deduplication contract preview does not hash files read media persist hashes or mutate asset records from the UI", "Asset deduplication contract preview requires backend-owned checksum capture duplicate detection and audit trail", "Asset deduplication contract preview shows simulated checksum placeholder simulated duplicate policy simulated merge hold simulated retention note simulated denied frontend hash persistence", "Denied asset deduplication paths remain blocked", "Asset deduplication contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
