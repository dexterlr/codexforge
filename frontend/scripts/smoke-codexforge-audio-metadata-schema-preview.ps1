param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2076 Audio Metadata Schema Preview"
  ScriptFile = "smoke-codexforge-audio-metadata-schema-preview.ps1"
  Domain = "src\lib\codexforge\audio-metadata-schema-preview"
  Route = "src\app\audio-metadata-schema-preview"
  CommandLabel = "Go to Audio Metadata Schema Preview"
  RouteHref = "/audio-metadata-schema-preview"
  Contract = "Audio"
  Markers = @("Audio metadata schema preview", "Audio metadata schema preview does not persist metadata mutate audio files write files or create database records from the UI", "Audio metadata schema preview requires backend-owned metadata persistence validation redaction and audit trail", "Audio metadata schema preview shows simulated title simulated speaker placeholder simulated source note simulated usage note simulated denied frontend metadata persistence", "Denied audio metadata schema paths remain blocked", "Audio metadata schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
