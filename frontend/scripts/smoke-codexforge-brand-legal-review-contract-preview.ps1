param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2173 Brand Legal Review Contract Preview"
  ScriptFile = "smoke-codexforge-brand-legal-review-contract-preview.ps1"
  Domain = "src\lib\codexforge\brand-legal-review-contract-preview"
  Route = "src\app\brand-legal-review-contract-preview"
  CommandLabel = "Go to Brand Legal Review Contract Preview"
  RouteHref = "/brand-legal-review-contract-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Brand legal review contract preview", "Brand legal review contract preview does not approve legal review persist decisions publish content export files or call platforms from the UI", "Brand legal review contract preview requires backend-owned legal review workflow approval capture evidence packet and audit trail", "Brand legal review contract preview shows simulated brand risk simulated legal note simulated reviewer role simulated approval hold simulated denied frontend legal approval", "Denied brand legal review paths remain blocked", "Brand legal review contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
