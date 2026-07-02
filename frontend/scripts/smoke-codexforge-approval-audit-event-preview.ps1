param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2163 Approval Audit Event Preview"
  ScriptFile = "smoke-codexforge-approval-audit-event-preview.ps1"
  Domain = "src\lib\codexforge\approval-audit-event-preview"
  Route = "src\app\approval-audit-event-preview"
  CommandLabel = "Go to Approval Audit Event Preview"
  RouteHref = "/approval-audit-event-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval audit event preview", "Approval audit event preview does not persist audit logs transmit telemetry inspect secrets or mutate approval state from the UI", "Approval audit event preview requires backend-owned audit event schema redaction policy retention policy and operator review", "Approval audit event preview shows simulated approval event simulated actor binding simulated action reference simulated redaction state simulated denied frontend audit persistence", "Denied approval audit event paths remain blocked", "Approval audit event checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
