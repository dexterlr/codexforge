param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2509 Real Provider Backend Only Gate Preview"
  ScriptFile = "smoke-codexforge-real-provider-backend-only-gate-preview.ps1"
  Domain = "real-provider-backend-only-gate-preview"
  Route = "real-provider-backend-only-gate-preview"
  CommandLabel = "Go to Real Provider Backend Only Gate Preview"
  RouteHref = "/real-provider-backend-only-gate-preview"
  Phase = 2509
  Title = "Real Provider Backend Only Gate Preview"
  Markers = @(
  'Real provider backend only gate preview'
  'Real provider backend only gate preview defines backend-only call ownership without creating frontend APIs server actions SDK clients or provider calls'
  'Real provider backend only gate preview keeps provider execution outside frontend diagnostics'
  'Real provider backend only gate preview blocks frontend execution'
  'Denied real provider backend only paths remain blocked'
  'Real provider backend only checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
