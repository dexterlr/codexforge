param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2427 Provider Approval Audit Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-approval-audit-cockpit-readiness-rail.ps1"
  Domain = "provider-approval-audit-cockpit-readiness-rail"
  Route = "provider-approval-audit-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Approval Audit Cockpit Readiness Rail"
  RouteHref = "/provider-approval-audit-cockpit-readiness-rail"
  Phase = 2427
  Title = "Provider Approval Audit Cockpit Readiness Rail"
  Markers = @(
  'Provider approval audit cockpit readiness rail'
  'Provider approval audit cockpit readiness rail shows cockpit readiness for approval and audit enforcement without executing providers'
  'Provider approval audit cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Provider approval audit cockpit readiness rail keeps provider execution blocked'
  'Denied provider approval audit cockpit readiness paths remain blocked'
  'Provider approval audit cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
