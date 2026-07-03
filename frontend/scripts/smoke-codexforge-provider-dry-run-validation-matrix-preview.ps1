param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2351 Provider Dry Run Validation Matrix Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-validation-matrix-preview.ps1"
  Domain = "provider-dry-run-validation-matrix-preview"
  Route = "provider-dry-run-validation-matrix-preview"
  CommandLabel = "Go to Provider Dry Run Validation Matrix Preview"
  RouteHref = "/provider-dry-run-validation-matrix-preview"
  Phase = 2351
  Title = "Provider Dry Run Validation Matrix Preview"
  Markers = @(
  'Provider dry run validation matrix preview',
  'Provider dry run validation matrix preview defines validation expectations without running provider tests or calling APIs',
  'Provider dry run validation matrix preview checks approval audit redaction privacy cost rate timeout fallback and denial requirements',
  'Provider dry run validation matrix preview keeps validation synthetic',
  'Denied provider dry run validation paths remain blocked',
  'Provider dry run validation checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

