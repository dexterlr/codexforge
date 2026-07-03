param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2029 Audio Storage Contract Preview"
  ScriptFile = "smoke-codexforge-audio-storage-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-storage-contract-preview"
  Route = "src\app\audio-storage-contract-preview"
  CommandLabel = "Go to Audio Storage Contract Preview"
  RouteHref = "/audio-storage-contract-preview"
  Markers = @("Audio storage contract preview", "Audio storage contract preview does not upload audio download audio synthesize voice store media or persist transcripts from the UI", "Audio storage contract preview requires backend-owned audio storage consent review rights tagging approval capture and audit trail", "Audio storage contract preview shows simulated audio storage interface simulated consent prerequisite simulated rights prerequisite simulated transcript prerequisite simulated audit prerequisite and denied frontend persistence", "Denied audio storage contract paths remain blocked", "Audio storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params



