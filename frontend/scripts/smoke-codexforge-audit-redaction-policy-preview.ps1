param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2178 Audit Redaction Policy Preview"
  ScriptFile = "smoke-codexforge-audit-redaction-policy-preview.ps1"
  Domain = "src\lib\codexforge\audit-redaction-policy-preview"
  Route = "src\app\audit-redaction-policy-preview"
  CommandLabel = "Go to Audit Redaction Policy Preview"
  RouteHref = "/audit-redaction-policy-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Audit redaction policy preview", "Audit redaction policy preview does not redact real logs persist audit changes inspect secrets or mutate ledgers from the UI", "Audit redaction policy preview requires backend-owned redaction policy privacy review immutable ledger constraints and audit trail", "Audit redaction policy preview shows simulated redaction class simulated protected field simulated reviewer note simulated retention exception simulated denied frontend audit mutation", "Denied audit redaction paths remain blocked", "Audit redaction policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
