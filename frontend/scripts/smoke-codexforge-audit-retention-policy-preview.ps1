param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2179 Audit Retention Policy Preview"
  ScriptFile = "smoke-codexforge-audit-retention-policy-preview.ps1"
  Domain = "src\lib\codexforge\audit-retention-policy-preview"
  Route = "src\app\audit-retention-policy-preview"
  CommandLabel = "Go to Audit Retention Policy Preview"
  RouteHref = "/audit-retention-policy-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Audit retention policy preview", "Audit retention policy preview does not delete audit logs persist retention state purge records or mutate ledgers from the UI", "Audit retention policy preview requires backend-owned audit retention policy legal hold purge workflow and audit trail", "Audit retention policy preview shows simulated retention class simulated legal hold simulated purge blocked simulated archive note simulated denied frontend audit deletion", "Denied audit retention paths remain blocked", "Audit retention policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
