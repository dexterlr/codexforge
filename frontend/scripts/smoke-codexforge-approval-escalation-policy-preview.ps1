param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2162 Approval Escalation Policy Preview"
  ScriptFile = "smoke-codexforge-approval-escalation-policy-preview.ps1"
  Domain = "src\lib\codexforge\approval-escalation-policy-preview"
  Route = "src\app\approval-escalation-policy-preview"
  CommandLabel = "Go to Approval Escalation Policy Preview"
  RouteHref = "/approval-escalation-policy-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval escalation policy preview", "Approval escalation policy preview does not dispatch notifications persist escalations schedule jobs or approve actions from the UI", "Approval escalation policy preview requires backend-owned escalation policy identity routing approval ledger and audit trail", "Approval escalation policy preview shows simulated escalation reason simulated reviewer role simulated SLA placeholder simulated manual hold simulated denied frontend escalation persistence", "Denied approval escalation paths remain blocked", "Approval escalation policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
