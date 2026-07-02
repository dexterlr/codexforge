param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2182 First Rights Consent Audit Contract Candidate"
  ScriptFile = "smoke-codexforge-first-rights-consent-audit-contract-candidate.ps1"
  Domain = "src\lib\codexforge\first-rights-consent-audit-contract-candidate"
  Route = "src\app\first-rights-consent-audit-contract-candidate"
  CommandLabel = "Go to First Rights Consent Audit Contract Candidate"
  RouteHref = "/first-rights-consent-audit-contract-candidate"
  ContractFamily = "RightsConsentAudit"
  Markers = @("First rights consent audit contract candidate", "First rights consent audit contract candidate does not enable rights clearance consent approval likeness approval music clearance legal approval license grant audit persistence evidence storage revocation persistence API creation service deployment command execution or frontend persistence from the UI", "First rights consent audit contract candidate requires explicit operator approval", "Candidate combines rights evidence consent evidence likeness consent music rights brand legal review license policy expiration revocation audit ledger redaction retention frontend blocked cockpit summary and denied paths", "Denied first rights consent audit contract paths remain blocked", "First rights consent audit contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
