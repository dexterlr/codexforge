param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2180 Frontend Rights Consent Persistence Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-rights-consent-persistence-blocked-preview.ps1"
  Domain = "src\lib\codexforge\frontend-rights-consent-persistence-blocked-preview"
  Route = "src\app\frontend-rights-consent-persistence-blocked-preview"
  CommandLabel = "Go to Frontend Rights Consent Persistence Blocked Preview"
  RouteHref = "/frontend-rights-consent-persistence-blocked-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Frontend rights consent persistence blocked preview", "Frontend rights consent persistence blocked preview blocks frontend rights clearance frontend consent approval frontend likeness approval frontend music clearance frontend license grant frontend audit persistence frontend legal approval frontend revocation persistence and frontend evidence storage", "Frontend rights consent persistence blocked preview requires backend-owned rights workflow consent workflow legal review immutable audit ledger and approval capture", "Frontend rights consent persistence blocked preview shows denied rights clearance denied consent persistence denied license grant denied audit persistence denied evidence storage and backend prerequisite", "Denied frontend rights consent persistence paths remain blocked", "Frontend rights consent persistence blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
