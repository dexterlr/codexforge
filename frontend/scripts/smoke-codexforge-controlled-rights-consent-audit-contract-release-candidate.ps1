param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2183 Controlled Rights Consent Audit Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-rights-consent-audit-contract-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-rights-consent-audit-contract-release-candidate"
  Route = "src\app\controlled-rights-consent-audit-contract-release-candidate"
  CommandLabel = "Go to Controlled Rights Consent Audit Contract Release Candidate"
  RouteHref = "/controlled-rights-consent-audit-contract-release-candidate"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Controlled rights consent audit contract release candidate", "Controlled rights consent audit contract release candidate does not clear rights approve consent grant licenses persist rights persist consent persist audit events verify identity authorize accounts export files publish content call providers call models call connectors create APIs create services bind ports spawn workers run commands deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled rights consent audit contract release requires explicit operator approval", "Release candidate adds the Rights Consent Audit Contract as review-only contract planning without frontend rights clearance consent approval license grant audit persistence legal approval identity verification service deployment command execution provider calls or browser storage writes", "Denied controlled rights consent audit contract paths remain blocked", "Controlled rights consent audit contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
