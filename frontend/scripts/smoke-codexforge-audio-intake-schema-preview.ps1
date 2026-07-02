param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2075 Audio Intake Schema Preview"
  ScriptFile = "smoke-codexforge-audio-intake-schema-preview.ps1"
  Domain = "src\lib\codexforge\audio-intake-schema-preview"
  Route = "src\app\audio-intake-schema-preview"
  CommandLabel = "Go to Audio Intake Schema Preview"
  RouteHref = "/audio-intake-schema-preview"
  Contract = "Audio"
  Markers = @("Audio intake schema preview", "Audio intake schema preview does not upload audio read files persist intake records or create storage objects from the UI", "Audio intake schema preview requires backend-owned audio intake validation consent check rights review approval capture and audit trail", "Audio intake schema preview shows simulated audio file name simulated content type simulated duration limit simulated speaker note simulated denied frontend upload", "Denied audio intake schema paths remain blocked", "Audio intake schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
