param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2168 Rights Consent Audit Contract Boundary"
  ScriptFile = "smoke-codexforge-rights-consent-audit-contract-boundary.ps1"
  Domain = "src\lib\codexforge\rights-consent-audit-contract-boundary"
  Route = "src\app\rights-consent-audit-contract-boundary"
  CommandLabel = "Go to Rights Consent Audit Contract Boundary"
  RouteHref = "/rights-consent-audit-contract-boundary"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Rights consent audit contract boundary", "Rights consent audit contract boundary does not clear rights approve consent grant licenses persist rights persist consent persist audit events verify identity authorize accounts export files publish content call providers call models call connectors create APIs create services run commands or write files from the UI", "Rights consent audit contract boundary requires explicit operator approval", "Rights consent audit contract boundary prepares deterministic synthetic rights consent audit contract review without frontend rights clearance consent approval license grant audit persistence identity verification account authorization export publish command execution or file mutation", "Denied rights consent audit contract paths remain blocked", "Rights consent audit contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
