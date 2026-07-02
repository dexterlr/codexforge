param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2116 Worker Audit Event Preview"
  ScriptFile = "smoke-codexforge-worker-audit-event-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-audit-event-preview"
  Route = "src\\app\\worker-audit-event-preview"
  CommandLabel = "Go to Worker Audit Event Preview"
  RouteHref = "/worker-audit-event-preview"
  ContractFamily = "Worker"
  Markers = @("Worker audit event preview", "Worker audit event preview does not persist audit logs transmit telemetry inspect workers or read secrets from the UI", "Worker audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Worker audit event preview shows simulated worker event simulated actor binding simulated job reference placeholder simulated redaction state simulated denied frontend audit persistence", "Denied worker audit event paths remain blocked", "Worker audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
