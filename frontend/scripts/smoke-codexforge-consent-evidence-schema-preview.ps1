param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2170 Consent Evidence Schema Preview"
  ScriptFile = "smoke-codexforge-consent-evidence-schema-preview.ps1"
  Domain = "src\lib\codexforge\consent-evidence-schema-preview"
  Route = "src\app\consent-evidence-schema-preview"
  CommandLabel = "Go to Consent Evidence Schema Preview"
  RouteHref = "/consent-evidence-schema-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Consent evidence schema preview", "Consent evidence schema preview does not upload consent files persist consent approve likeness use or verify identity from the UI", "Consent evidence schema preview requires backend-owned consent evidence storage identity binding expiration policy and audit trail", "Consent evidence schema preview shows simulated consent evidence simulated subject placeholder simulated use scope simulated expiry window simulated denied frontend consent persistence", "Denied consent evidence schema paths remain blocked", "Consent evidence schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
