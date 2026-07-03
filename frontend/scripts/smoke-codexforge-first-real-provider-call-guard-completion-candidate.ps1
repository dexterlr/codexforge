param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2537 First Real Provider Call Guard Completion Candidate"
  ScriptFile = "smoke-codexforge-first-real-provider-call-guard-completion-candidate.ps1"
  Domain = "first-real-provider-call-guard-completion-candidate"
  Route = "first-real-provider-call-guard-completion-candidate"
  CommandLabel = "Go to First Real Provider Call Guard Completion Candidate"
  RouteHref = "/first-real-provider-call-guard-completion-candidate"
  Phase = 2537
  Title = "First Real Provider Call Guard Completion Candidate"
  Markers = @(
  'First real provider call guard completion candidate'
  'First real provider call guard completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission'
  'First real provider call guard completion candidate closes the first real provider call guard batch and marks readiness for First Approved Provider Trial Mega Batch v1'
  'First real provider call guard completion candidate keeps all provider actions blocked pending first approved provider trial'
  'Denied first real provider call guard completion paths remain blocked'
  'First real provider call guard completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
