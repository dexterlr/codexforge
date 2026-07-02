param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2069 Asset Storage Audit Event Preview"
  ScriptFile = "smoke-codexforge-asset-storage-audit-event-preview.ps1"
  Domain = "src\lib\codexforge\asset-storage-audit-event-preview"
  Route = "src\app\asset-storage-audit-event-preview"
  CommandLabel = "Go to Asset Storage Audit Event Preview"
  RouteHref = "/asset-storage-audit-event-preview"
  Contract = "Asset"
  Markers = @("Asset storage audit event preview", "Asset storage audit event preview does not persist audit logs transmit telemetry inspect files or mutate audit trails from the UI", "Asset storage audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Asset storage audit event preview shows simulated event type simulated actor binding simulated asset reference placeholder simulated redaction state simulated denied frontend audit persistence", "Denied asset storage audit event paths remain blocked", "Asset storage audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
