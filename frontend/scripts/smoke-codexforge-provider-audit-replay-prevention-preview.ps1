param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2424 Provider Audit Replay Prevention Preview"
  ScriptFile = "smoke-codexforge-provider-audit-replay-prevention-preview.ps1"
  Domain = "provider-audit-replay-prevention-preview"
  Route = "provider-audit-replay-prevention-preview"
  CommandLabel = "Go to Provider Audit Replay Prevention Preview"
  RouteHref = "/provider-audit-replay-prevention-preview"
  Phase = 2424
  Title = "Provider Audit Replay Prevention Preview"
  Markers = @(
  'Provider audit replay prevention preview'
  'Provider audit replay prevention preview defines replay prevention expectations without storing nonce counters or scheduling execution'
  'Provider audit replay prevention preview keeps replay prevention backend-owned and approval-gated'
  'Provider audit replay prevention preview blocks reused approval execution'
  'Denied provider audit replay paths remain blocked'
  'Provider audit replay prevention checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
