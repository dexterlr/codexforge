param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2072 First Asset Storage Contract Candidate"
  ScriptFile = "smoke-codexforge-first-asset-storage-contract-candidate.ps1"
  Domain = "src\lib\codexforge\first-asset-storage-contract-candidate"
  Route = "src\app\first-asset-storage-contract-candidate"
  CommandLabel = "Go to First Asset Storage Contract Candidate"
  RouteHref = "/first-asset-storage-contract-candidate"
  Contract = "Asset"
  Markers = @("First asset storage contract candidate", "First asset storage contract candidate does not enable upload download storage API creation service deployment provider calls model calls connector calls command execution asset persistence rights persistence artifact persistence access mutation audit persistence or file mutation from the UI", "First asset storage contract candidate requires explicit operator approval", "Candidate combines asset intake metadata rights tagging malware scan deduplication access policy versioning retention redaction handoff audit event frontend persistence blocked cockpit summary and denied paths", "Denied first asset storage contract paths remain blocked", "First asset storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
