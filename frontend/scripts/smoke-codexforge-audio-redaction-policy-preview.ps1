param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2081 Audio Redaction Policy Preview"
  ScriptFile = "smoke-codexforge-audio-redaction-policy-preview.ps1"
  Domain = "src\lib\codexforge\audio-redaction-policy-preview"
  Route = "src\app\audio-redaction-policy-preview"
  CommandLabel = "Go to Audio Redaction Policy Preview"
  RouteHref = "/audio-redaction-policy-preview"
  Contract = "Audio"
  Markers = @("Audio redaction policy preview", "Audio redaction policy preview does not edit audio redact media write derivatives or persist redacted audio from the UI", "Audio redaction policy preview requires backend-owned redaction workflow artifact storage approval capture and audit trail", "Audio redaction policy preview shows simulated redaction reason simulated muted segment placeholder simulated approval need simulated audit note simulated denied frontend file mutation", "Denied audio redaction paths remain blocked", "Audio redaction policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
