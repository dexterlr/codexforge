param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2071 Cockpit Asset Storage Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-asset-storage-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-asset-storage-contract-summary"
  Route = "src\app\cockpit-asset-storage-contract-summary"
  CommandLabel = "Go to Cockpit Asset Storage Contract Summary"
  RouteHref = "/cockpit-asset-storage-contract-summary"
  Contract = "Asset"
  Markers = @("Cockpit asset storage contract summary", "Cockpit asset storage contract summary keeps the cockpit as the normal user surface", "Cockpit asset storage contract summary does not upload assets download assets store media create object storage create APIs create services call providers call models call connectors persist assets persist rights persist artifacts persist approvals run commands or write files from the cockpit", "Cockpit asset storage contract summary shows asset intake schema metadata schema rights tagging malware scan deduplication access policy versioning retention redaction handoff audit event frontend asset persistence blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit asset storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
