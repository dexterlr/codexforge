param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2086 Frontend Audio Persistence Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-audio-persistence-blocked-preview.ps1"
  Domain = "src\lib\codexforge\frontend-audio-persistence-blocked-preview"
  Route = "src\app\frontend-audio-persistence-blocked-preview"
  CommandLabel = "Go to Frontend Audio Persistence Blocked Preview"
  RouteHref = "/frontend-audio-persistence-blocked-preview"
  Contract = "Audio"
  Markers = @("Frontend audio persistence blocked preview", "Frontend audio persistence blocked preview blocks frontend upload frontend download frontend audio storage frontend transcription frontend caption persistence frontend consent persistence frontend rights persistence frontend file writes frontend audit persistence and frontend access mutation", "Frontend audio persistence blocked preview requires backend-owned audio storage consent review rights workflow transcript workflow caption workflow approval capture and audit trail", "Frontend audio persistence blocked preview shows denied audio upload denied audio persistence denied consent persistence denied transcript persistence denied caption persistence and backend prerequisite", "Denied frontend audio persistence paths remain blocked", "Frontend audio persistence blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
