param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2161 Approval Denial Ledger Preview"
  ScriptFile = "smoke-codexforge-approval-denial-ledger-preview.ps1"
  Domain = "src\lib\codexforge\approval-denial-ledger-preview"
  Route = "src\app\approval-denial-ledger-preview"
  CommandLabel = "Go to Approval Denial Ledger Preview"
  RouteHref = "/approval-denial-ledger-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval denial ledger preview", "Approval denial ledger preview does not persist denials mutate approvals retry jobs or trigger actions from the UI", "Approval denial ledger preview requires backend-owned denial ledger reason codes escalation policy and audit trail", "Approval denial ledger preview shows simulated denial code simulated blocked action simulated remediation note simulated operator review simulated denied frontend denial persistence", "Denied approval denial ledger paths remain blocked", "Approval denial ledger checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
