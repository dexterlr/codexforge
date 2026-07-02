param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2085 Audio Storage Audit Event Preview"
  ScriptFile = "smoke-codexforge-audio-storage-audit-event-preview.ps1"
  Domain = "src\lib\codexforge\audio-storage-audit-event-preview"
  Route = "src\app\audio-storage-audit-event-preview"
  CommandLabel = "Go to Audio Storage Audit Event Preview"
  RouteHref = "/audio-storage-audit-event-preview"
  Contract = "Audio"
  Markers = @("Audio storage audit event preview", "Audio storage audit event preview does not persist audit logs transmit telemetry inspect audio or mutate audit trails from the UI", "Audio storage audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Audio storage audit event preview shows simulated event type simulated actor binding simulated audio reference placeholder simulated redaction state simulated denied frontend audit persistence", "Denied audio storage audit event paths remain blocked", "Audio storage audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
