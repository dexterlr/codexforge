param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2384 Provider Mock Result Redaction Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-redaction-review-preview.ps1"
  Domain = "provider-mock-result-redaction-review-preview"
  Route = "provider-mock-result-redaction-review-preview"
  CommandLabel = "Go to Provider Mock Result Redaction Review Preview"
  RouteHref = "/provider-mock-result-redaction-review-preview"
  Phase = 2384
  Title = "Provider Mock Result Redaction Review Preview"
  Markers = @(
  'Provider mock result redaction review preview',
  'Provider mock result redaction review preview defines redaction review checks without inspecting real prompts or transmitting data',
  'Provider mock result redaction review preview keeps redaction backend-owned and approval-gated',
  'Provider mock result redaction review preview blocks prompt or secret leakage',
  'Denied provider mock result redaction paths remain blocked',
  'Provider mock result redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
