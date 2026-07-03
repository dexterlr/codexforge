param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2410 Provider Approval Audit Enforcement Map"
  ScriptFile = "smoke-codexforge-provider-approval-audit-enforcement-map.ps1"
  Domain = "provider-approval-audit-enforcement-map"
  Route = "provider-approval-audit-enforcement-map"
  CommandLabel = "Go to Provider Approval Audit Enforcement Map"
  RouteHref = "/provider-approval-audit-enforcement-map"
  Phase = 2410
  Title = "Provider Approval Audit Enforcement Map"
  Markers = @(
  'Provider approval audit enforcement map'
  'Provider approval audit enforcement map defines approval and audit enforcement boundaries without implementing live provider execution'
  'Provider approval audit enforcement map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'Provider approval audit enforcement map keeps provider execution blocked pending controlled provider dry run candidate'
  'Denied provider approval audit enforcement paths remain blocked'
  'Provider approval audit enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
