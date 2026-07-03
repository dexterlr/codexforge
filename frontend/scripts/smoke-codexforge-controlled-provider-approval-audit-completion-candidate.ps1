param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2441 Controlled Provider Approval Audit Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-approval-audit-completion-candidate.ps1"
  Domain = "controlled-provider-approval-audit-completion-candidate"
  Route = "controlled-provider-approval-audit-completion-candidate"
  CommandLabel = "Go to Controlled Provider Approval Audit Completion Candidate"
  RouteHref = "/controlled-provider-approval-audit-completion-candidate"
  Phase = 2441
  Title = "Controlled Provider Approval Audit Completion Candidate"
  Markers = @(
  'Controlled provider approval audit completion candidate'
  'Controlled provider approval audit completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission'
  'Controlled provider approval audit completion candidate closes the provider approval audit enforcement boundary batch and marks readiness for First Controlled Provider Dry Run Candidate Mega Batch v1'
  'Controlled provider approval audit completion candidate keeps all provider actions blocked pending controlled provider dry run candidate'
  'Denied provider approval audit completion paths remain blocked'
  'Controlled provider approval audit completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
