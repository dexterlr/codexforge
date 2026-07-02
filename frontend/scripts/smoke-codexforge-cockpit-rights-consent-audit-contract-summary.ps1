param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2181 Cockpit Rights Consent Audit Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-rights-consent-audit-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-rights-consent-audit-contract-summary"
  Route = "src\app\cockpit-rights-consent-audit-contract-summary"
  CommandLabel = "Go to Cockpit Rights Consent Audit Contract Summary"
  RouteHref = "/cockpit-rights-consent-audit-contract-summary"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Cockpit rights consent audit contract summary", "Cockpit rights consent audit contract summary keeps the cockpit as the normal user surface", "Cockpit rights consent audit contract summary does not clear rights approve consent grant licenses persist rights persist consent persist audit events verify identity authorize accounts export files publish content call providers call models call connectors create APIs create services run commands or write files from the cockpit", "Cockpit rights consent audit contract summary shows rights evidence consent evidence likeness consent music rights brand legal review usage license consent expiration consent revocation immutable audit ledger audit redaction audit retention frontend rights consent persistence blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit rights consent audit contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
