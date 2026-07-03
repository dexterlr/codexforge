param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2493 Provider Dry Run To Real Bridge Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-to-real-bridge-preview.ps1"
  Domain = "provider-dry-run-to-real-bridge-preview"
  Route = "provider-dry-run-to-real-bridge-preview"
  CommandLabel = "Go to Provider Dry Run To Real Bridge Preview"
  RouteHref = "/provider-dry-run-to-real-bridge-preview"
  Phase = 2493
  Title = "Provider Dry Run To Real Bridge Preview"
  Markers = @(
  'Provider dry run to real bridge preview'
  'Provider dry run to real bridge preview maps controlled dry run diagnostics to future real provider guard requirements without enabling real calls'
  'Provider dry run to real bridge preview keeps bridge review-only and synthetic'
  'Provider dry run to real bridge preview blocks execution promotion'
  'Denied provider dry run to real bridge paths remain blocked'
  'Provider dry run to real bridge checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
