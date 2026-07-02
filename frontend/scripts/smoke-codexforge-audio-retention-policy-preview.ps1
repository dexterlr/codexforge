param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2082 Audio Retention Policy Preview"
  ScriptFile = "smoke-codexforge-audio-retention-policy-preview.ps1"
  Domain = "src\lib\codexforge\audio-retention-policy-preview"
  Route = "src\app\audio-retention-policy-preview"
  CommandLabel = "Go to Audio Retention Policy Preview"
  RouteHref = "/audio-retention-policy-preview"
  Contract = "Audio"
  Markers = @("Audio retention policy preview", "Audio retention policy preview does not delete audio persist retention state mutate storage or purge media from the UI", "Audio retention policy preview requires backend-owned retention policy legal hold deletion workflow and audit trail", "Audio retention policy preview shows simulated retention period simulated consent expiry simulated legal hold simulated purge blocked simulated denied frontend deletion", "Denied audio retention paths remain blocked", "Audio retention policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
