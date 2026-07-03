param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2477 Provider Server Runtime Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-server-runtime-boundary-preview.ps1"
  Domain = "provider-server-runtime-boundary-preview"
  Route = "provider-server-runtime-boundary-preview"
  CommandLabel = "Go to Provider Server Runtime Boundary Preview"
  RouteHref = "/provider-server-runtime-boundary-preview"
  Phase = 2477
  Title = "Provider Server Runtime Boundary Preview"
  Markers = @(
  'Provider server runtime boundary preview'
  'Provider server runtime boundary preview defines server-only runtime requirements without starting services binding ports spawning workers or creating routes'
  'Provider server runtime boundary preview keeps runtime ownership backend-only'
  'Provider server runtime boundary preview blocks live runtime creation'
  'Denied provider server runtime paths remain blocked'
  'Provider server runtime checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
