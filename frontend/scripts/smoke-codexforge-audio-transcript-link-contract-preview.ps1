param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2079 Audio Transcript Link Contract Preview"
  ScriptFile = "smoke-codexforge-audio-transcript-link-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-transcript-link-contract-preview"
  Route = "src\app\audio-transcript-link-contract-preview"
  CommandLabel = "Go to Audio Transcript Link Contract Preview"
  RouteHref = "/audio-transcript-link-contract-preview"
  Contract = "Audio"
  Markers = @("Audio transcript link contract preview", "Audio transcript link contract preview does not transcribe audio persist transcripts write files or call transcription providers from the UI", "Audio transcript link contract preview requires backend-owned transcription workflow transcript storage approval capture and audit trail", "Audio transcript link contract preview shows simulated transcript reference simulated speaker labels simulated review state simulated redaction note simulated denied frontend transcript persistence", "Denied audio transcript link paths remain blocked", "Audio transcript link contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
