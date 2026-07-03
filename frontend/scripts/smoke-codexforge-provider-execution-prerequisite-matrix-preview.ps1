param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2475 Provider Execution Prerequisite Matrix Preview"
  ScriptFile = "smoke-codexforge-provider-execution-prerequisite-matrix-preview.ps1"
  Domain = "provider-execution-prerequisite-matrix-preview"
  Route = "provider-execution-prerequisite-matrix-preview"
  CommandLabel = "Go to Provider Execution Prerequisite Matrix Preview"
  RouteHref = "/provider-execution-prerequisite-matrix-preview"
  Phase = 2475
  Title = "Provider Execution Prerequisite Matrix Preview"
  Markers = @(
  'Provider execution prerequisite matrix preview'
  'Provider execution prerequisite matrix preview lists approval audit credential token redaction SDK isolation runtime egress rate timeout retry fallback cost safety privacy and observability prerequisites'
  'Provider execution prerequisite matrix preview keeps all prerequisites review-only and synthetic'
  'Provider execution prerequisite matrix preview blocks live execution'
  'Denied provider prerequisite matrix paths remain blocked'
  'Provider execution prerequisite checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
