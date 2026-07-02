param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2088 First Audio Storage Contract Candidate"
  ScriptFile = "smoke-codexforge-first-audio-storage-contract-candidate.ps1"
  Domain = "src\lib\codexforge\first-audio-storage-contract-candidate"
  Route = "src\app\first-audio-storage-contract-candidate"
  CommandLabel = "Go to First Audio Storage Contract Candidate"
  RouteHref = "/first-audio-storage-contract-candidate"
  Contract = "Audio"
  Markers = @("First audio storage contract candidate", "First audio storage contract candidate does not enable upload download audio storage voice generation transcription caption persistence consent persistence rights persistence API creation service deployment provider calls model calls connector calls command execution access mutation audit persistence or file mutation from the UI", "First audio storage contract candidate requires explicit operator approval", "Candidate combines audio intake metadata consent tagging rights tagging transcript link caption link redaction retention access policy handoff audit event frontend persistence blocked cockpit summary and denied paths", "Denied first audio storage contract paths remain blocked", "First audio storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
