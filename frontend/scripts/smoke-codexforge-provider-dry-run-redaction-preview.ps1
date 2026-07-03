param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2355 Provider Dry Run Redaction Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-redaction-preview.ps1"
  Domain = "provider-dry-run-redaction-preview"
  Route = "provider-dry-run-redaction-preview"
  CommandLabel = "Go to Provider Dry Run Redaction Preview"
  RouteHref = "/provider-dry-run-redaction-preview"
  Phase = 2355
  Title = "Provider Dry Run Redaction Preview"
  Markers = @(
  'Provider dry run redaction preview',
  'Provider dry run redaction preview defines synthetic redaction checks without inspecting real prompts or transmitting data',
  'Provider dry run redaction preview keeps redaction backend-owned and approval-gated',
  'Provider dry run redaction preview blocks prompt transmission',
  'Denied provider dry run redaction paths remain blocked',
  'Provider dry run redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

