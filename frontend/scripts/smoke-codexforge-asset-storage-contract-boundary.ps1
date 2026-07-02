param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2058 Asset Storage Contract Boundary"
  ScriptFile = "smoke-codexforge-asset-storage-contract-boundary.ps1"
  Domain = "src\lib\codexforge\asset-storage-contract-boundary"
  Route = "src\app\asset-storage-contract-boundary"
  CommandLabel = "Go to Asset Storage Contract Boundary"
  RouteHref = "/asset-storage-contract-boundary"
  Contract = "Asset"
  Markers = @("Asset storage contract boundary", "Asset storage contract boundary does not upload assets download assets store media create object storage create APIs create services call providers call models call connectors persist assets persist rights persist artifacts persist approvals run commands or write files from the UI", "Asset storage contract boundary requires explicit operator approval", "Asset storage contract boundary prepares deterministic synthetic asset storage contract review without frontend upload download storage persistence API creation service deployment provider calls or file mutation", "Denied asset storage contract paths remain blocked", "Asset storage contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
