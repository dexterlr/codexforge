param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2387 Provider Mock Result Rejection Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-rejection-preview.ps1"
  Domain = "provider-mock-result-rejection-preview"
  Route = "provider-mock-result-rejection-preview"
  CommandLabel = "Go to Provider Mock Result Rejection Preview"
  RouteHref = "/provider-mock-result-rejection-preview"
  Phase = 2387
  Title = "Provider Mock Result Rejection Preview"
  Markers = @(
  'Provider mock result rejection preview',
  'Provider mock result rejection preview defines synthetic rejection reasons without receiving real model outputs or persisting results',
  'Provider mock result rejection preview keeps rejection backend-owned and auditable',
  'Provider mock result rejection preview blocks automatic acceptance',
  'Denied provider mock result rejection paths remain blocked',
  'Provider mock result rejection checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
