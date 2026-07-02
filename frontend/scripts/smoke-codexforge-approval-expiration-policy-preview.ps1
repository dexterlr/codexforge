param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2158 Approval Expiration Policy Preview"
  ScriptFile = "smoke-codexforge-approval-expiration-policy-preview.ps1"
  Domain = "src\lib\codexforge\approval-expiration-policy-preview"
  Route = "src\app\approval-expiration-policy-preview"
  CommandLabel = "Go to Approval Expiration Policy Preview"
  RouteHref = "/approval-expiration-policy-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval expiration policy preview", "Approval expiration policy preview does not expire approvals persist state revoke actions or schedule jobs from the UI", "Approval expiration policy preview requires backend-owned expiration policy schedule gateway approval ledger and audit trail", "Approval expiration policy preview shows simulated expiration window simulated stale approval hold simulated renewal requirement simulated audit note simulated denied frontend expiration mutation", "Denied approval expiration paths remain blocked", "Approval expiration policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
