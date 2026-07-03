param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2476 Provider Backend Execution Contract Preview"
  ScriptFile = "smoke-codexforge-provider-backend-execution-contract-preview.ps1"
  Domain = "provider-backend-execution-contract-preview"
  Route = "provider-backend-execution-contract-preview"
  CommandLabel = "Go to Provider Backend Execution Contract Preview"
  RouteHref = "/provider-backend-execution-contract-preview"
  Phase = 2476
  Title = "Provider Backend Execution Contract Preview"
  Markers = @(
  'Provider backend execution contract preview'
  'Provider backend execution contract preview defines backend-owned execution contract shape without route handlers server actions SDK clients or provider calls'
  'Provider backend execution contract preview keeps execution implementation deferred'
  'Provider backend execution contract preview blocks frontend API creation'
  'Denied provider backend execution contract paths remain blocked'
  'Provider backend execution contract checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
