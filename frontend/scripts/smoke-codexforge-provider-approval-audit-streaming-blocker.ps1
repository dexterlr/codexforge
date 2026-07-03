param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2435 Provider Approval Audit Streaming Blocker"
  ScriptFile = "smoke-codexforge-provider-approval-audit-streaming-blocker.ps1"
  Domain = "provider-approval-audit-streaming-blocker"
  Route = "provider-approval-audit-streaming-blocker"
  CommandLabel = "Go to Provider Approval Audit Streaming Blocker"
  RouteHref = "/provider-approval-audit-streaming-blocker"
  Phase = 2435
  Title = "Provider Approval Audit Streaming Blocker"
  Markers = @(
  'Provider approval audit streaming blocker'
  'Provider approval audit streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Provider approval audit streaming blocker keeps streaming backend-owned and future-gated'
  'Provider approval audit streaming blocker blocks live streams'
  'Denied provider approval audit streaming paths remain blocked'
  'Provider approval audit streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
