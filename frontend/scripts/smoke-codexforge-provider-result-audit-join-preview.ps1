param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2575 Provider Result Audit Join Preview"
  ScriptFile = "smoke-codexforge-provider-result-audit-join-preview.ps1"
  Domain = "provider-result-audit-join-preview"
  Route = "provider-result-audit-join-preview"
  CommandLabel = "Go to Provider Result Audit Join Preview"
  RouteHref = "/provider-result-audit-join-preview"
  Phase = 2575
  Title = "Provider Result Audit Join Preview"
  Markers = @(
  'Provider result audit join preview'
  'Provider result audit join preview maps synthetic audit metadata to result review without writing audit logs databases files or telemetry'
  'Provider result audit join preview keeps audit persistence backend-owned and redacted'
  'Provider result audit join preview blocks unverifiable result claims'
  'Denied provider result audit join paths remain blocked'
  'Provider result audit join checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
