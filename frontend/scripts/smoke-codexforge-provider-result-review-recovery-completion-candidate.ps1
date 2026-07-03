param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2601 Provider Result Review Recovery Completion Candidate"
  ScriptFile = "smoke-codexforge-provider-result-review-recovery-completion-candidate.ps1"
  Domain = "provider-result-review-recovery-completion-candidate"
  Route = "provider-result-review-recovery-completion-candidate"
  CommandLabel = "Go to Provider Result Review Recovery Completion Candidate"
  RouteHref = "/provider-result-review-recovery-completion-candidate"
  Phase = 2601
  Title = "Provider Result Review Recovery Completion Candidate"
  Markers = @(
  'Provider result review recovery completion candidate'
  'Provider result review recovery completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services telemetry transmission result persistence export or publish'
  'Provider result review recovery completion candidate closes the provider result review and recovery batch and marks readiness for Provider Gateway Hardening Mega Batch v1'
  'Provider result review recovery completion candidate keeps all provider result actions blocked pending provider gateway hardening'
  'Denied provider result review recovery completion paths remain blocked'
  'Provider result review recovery completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
