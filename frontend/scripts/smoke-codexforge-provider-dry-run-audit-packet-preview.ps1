param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2353 Provider Dry Run Audit Packet Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-audit-packet-preview.ps1"
  Domain = "provider-dry-run-audit-packet-preview"
  Route = "provider-dry-run-audit-packet-preview"
  CommandLabel = "Go to Provider Dry Run Audit Packet Preview"
  RouteHref = "/provider-dry-run-audit-packet-preview"
  Phase = 2353
  Title = "Provider Dry Run Audit Packet Preview"
  Markers = @(
  'Provider dry run audit packet preview',
  'Provider dry run audit packet preview defines synthetic audit packet metadata without writing audit logs or sending telemetry',
  'Provider dry run audit packet preview includes operator approval state privacy class provider family dry run fixture id and denied execution state',
  'Provider dry run audit packet preview keeps audit persistence backend-owned',
  'Denied provider dry run audit paths remain blocked',
  'Provider dry run audit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

