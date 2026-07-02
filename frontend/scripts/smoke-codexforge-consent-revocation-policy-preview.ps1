param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2176 Consent Revocation Policy Preview"
  ScriptFile = "smoke-codexforge-consent-revocation-policy-preview.ps1"
  Domain = "src\lib\codexforge\consent-revocation-policy-preview"
  Route = "src\app\consent-revocation-policy-preview"
  CommandLabel = "Go to Consent Revocation Policy Preview"
  RouteHref = "/consent-revocation-policy-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Consent revocation policy preview", "Consent revocation policy preview does not revoke consent persist revocation state delete content or call social APIs from the UI", "Consent revocation policy preview requires backend-owned revocation workflow takedown workflow approval capture and audit trail", "Consent revocation policy preview shows simulated revocation reason simulated affected content simulated takedown prerequisite simulated operator review simulated denied frontend revocation persistence", "Denied consent revocation paths remain blocked", "Consent revocation policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
