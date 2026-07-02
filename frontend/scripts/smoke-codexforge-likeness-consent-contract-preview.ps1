param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2171 Likeness Consent Contract Preview"
  ScriptFile = "smoke-codexforge-likeness-consent-contract-preview.ps1"
  Domain = "src\lib\codexforge\likeness-consent-contract-preview"
  Route = "src\app\likeness-consent-contract-preview"
  CommandLabel = "Go to Likeness Consent Contract Preview"
  RouteHref = "/likeness-consent-contract-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Likeness consent contract preview", "Likeness consent contract preview does not approve likeness use clone voices generate media persist consent or verify identity from the UI", "Likeness consent contract preview requires backend-owned likeness consent review identity binding approval capture and audit trail", "Likeness consent contract preview shows simulated likeness subject simulated approved use scope simulated expiry note simulated revocation state simulated denied frontend likeness approval", "Denied likeness consent paths remain blocked", "Likeness consent contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
