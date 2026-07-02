param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2073 Controlled Asset Storage Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-asset-storage-contract-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-asset-storage-contract-release-candidate"
  Route = "src\app\controlled-asset-storage-contract-release-candidate"
  CommandLabel = "Go to Controlled Asset Storage Contract Release Candidate"
  RouteHref = "/controlled-asset-storage-contract-release-candidate"
  Contract = "Asset"
  Markers = @("Controlled asset storage contract release candidate", "Controlled asset storage contract release candidate does not upload assets download assets store media create object storage create APIs create services bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials persist assets persist metadata persist rights persist artifacts persist approvals persist audit events create downloads write files probe localhost write browser storage or guarantee performance from the frontend", "Controlled asset storage contract release requires explicit operator approval", "Release candidate adds the Asset Storage Contract as review-only contract planning without frontend upload download storage persistence API creation service deployment provider calls command execution artifact persistence rights persistence approval persistence or file mutation", "Denied controlled asset storage contract paths remain blocked", "Controlled asset storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
