param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2440 Controlled Provider Approval Audit Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-approval-audit-release-candidate.ps1"
  Domain = "controlled-provider-approval-audit-release-candidate"
  Route = "controlled-provider-approval-audit-release-candidate"
  CommandLabel = "Go to Controlled Provider Approval Audit Release Candidate"
  RouteHref = "/controlled-provider-approval-audit-release-candidate"
  Phase = 2440
  Title = "Controlled Provider Approval Audit Release Candidate"
  Markers = @(
  'Controlled provider approval audit release candidate'
  'Controlled provider approval audit release candidate does not call providers call models send prompts stream responses store credentials store tokens persist outputs write browser storage upload download render export publish schedule dispatch queues spawn workers run commands create APIs create services import SDKs or call connectors'
  'Controlled provider approval audit release candidate adds review-only approval audit enforcement diagnostics and synthetic enforcement gates'
  'Controlled provider approval audit release candidate requires controlled provider dry run candidate before future provider execution'
  'Denied controlled provider approval audit paths remain blocked'
  'Controlled provider approval audit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
