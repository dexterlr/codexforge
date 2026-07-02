param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2089 Controlled Audio Storage Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-audio-storage-contract-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-audio-storage-contract-release-candidate"
  Route = "src\app\controlled-audio-storage-contract-release-candidate"
  CommandLabel = "Go to Controlled Audio Storage Contract Release Candidate"
  RouteHref = "/controlled-audio-storage-contract-release-candidate"
  Contract = "Audio"
  Markers = @("Controlled audio storage contract release candidate", "Controlled audio storage contract release candidate does not upload audio download audio store media synthesize voice clone voice transcribe audio persist transcripts persist captions persist audio persist consent persist rights create APIs create services bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials persist approvals persist audit events create downloads write files probe localhost write browser storage or guarantee performance from the frontend", "Controlled audio storage contract release requires explicit operator approval", "Release candidate adds the Audio Storage Contract as review-only contract planning without frontend upload download audio persistence transcription voice generation consent persistence rights persistence API creation service deployment provider calls command execution audit persistence approval persistence or file mutation", "Denied controlled audio storage contract paths remain blocked", "Controlled audio storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
