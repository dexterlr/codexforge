param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2385 Provider Mock Result Audit Packet Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-audit-packet-preview.ps1"
  Domain = "provider-mock-result-audit-packet-preview"
  Route = "provider-mock-result-audit-packet-preview"
  CommandLabel = "Go to Provider Mock Result Audit Packet Preview"
  RouteHref = "/provider-mock-result-audit-packet-preview"
  Phase = 2385
  Title = "Provider Mock Result Audit Packet Preview"
  Markers = @(
  'Provider mock result audit packet preview',
  'Provider mock result audit packet preview defines synthetic audit metadata for mock result handling without writing audit logs or sending telemetry',
  'Provider mock result audit packet preview includes fixture id approval state privacy class safety state and denied execution state',
  'Provider mock result audit packet preview keeps audit persistence backend-owned',
  'Denied provider mock result audit paths remain blocked',
  'Provider mock result audit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
