param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2159 Approval Revocation Policy Preview"
  ScriptFile = "smoke-codexforge-approval-revocation-policy-preview.ps1"
  Domain = "src\lib\codexforge\approval-revocation-policy-preview"
  Route = "src\app\approval-revocation-policy-preview"
  CommandLabel = "Go to Approval Revocation Policy Preview"
  RouteHref = "/approval-revocation-policy-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval revocation policy preview", "Approval revocation policy preview does not revoke approvals persist revocation state cancel jobs or call social APIs from the UI", "Approval revocation policy preview requires backend-owned revocation workflow protected action rollback and audit trail", "Approval revocation policy preview shows simulated revocation reason simulated protected action simulated rollback note simulated operator review simulated denied frontend revocation persistence", "Denied approval revocation paths remain blocked", "Approval revocation policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
