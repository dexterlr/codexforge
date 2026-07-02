param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2175 Consent Expiration Policy Preview"
  ScriptFile = "smoke-codexforge-consent-expiration-policy-preview.ps1"
  Domain = "src\lib\codexforge\consent-expiration-policy-preview"
  Route = "src\app\consent-expiration-policy-preview"
  CommandLabel = "Go to Consent Expiration Policy Preview"
  RouteHref = "/consent-expiration-policy-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Consent expiration policy preview", "Consent expiration policy preview does not expire consent persist state schedule jobs or revoke published content from the UI", "Consent expiration policy preview requires backend-owned consent ledger expiration policy revocation workflow and audit trail", "Consent expiration policy preview shows simulated consent expiry simulated renewal requirement simulated blocked publish state simulated review note simulated denied frontend consent mutation", "Denied consent expiration paths remain blocked", "Consent expiration policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
