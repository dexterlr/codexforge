param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2074 Audio Storage Contract Boundary"
  ScriptFile = "smoke-codexforge-audio-storage-contract-boundary.ps1"
  Domain = "src\lib\codexforge\audio-storage-contract-boundary"
  Route = "src\app\audio-storage-contract-boundary"
  CommandLabel = "Go to Audio Storage Contract Boundary"
  RouteHref = "/audio-storage-contract-boundary"
  Contract = "Audio"
  Markers = @("Audio storage contract boundary", "Audio storage contract boundary does not upload audio download audio store media synthesize voice clone voice transcribe audio persist transcripts persist captions persist audio persist consent persist rights create APIs create services call providers call models call connectors run commands or write files from the UI", "Audio storage contract boundary requires explicit operator approval", "Audio storage contract boundary prepares deterministic synthetic audio storage contract review without frontend upload download audio persistence transcription voice generation consent persistence API creation service deployment or file mutation", "Denied audio storage contract paths remain blocked", "Audio storage contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
