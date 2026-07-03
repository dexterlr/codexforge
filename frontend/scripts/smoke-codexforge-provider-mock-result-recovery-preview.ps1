param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2388 Provider Mock Result Recovery Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-recovery-preview.ps1"
  Domain = "provider-mock-result-recovery-preview"
  Route = "provider-mock-result-recovery-preview"
  CommandLabel = "Go to Provider Mock Result Recovery Preview"
  RouteHref = "/provider-mock-result-recovery-preview"
  Phase = 2388
  Title = "Provider Mock Result Recovery Preview"
  Markers = @(
  'Provider mock result recovery preview',
  'Provider mock result recovery preview defines synthetic recovery paths without retrying providers calling fallback providers or dispatching workers',
  'Provider mock result recovery preview keeps recovery backend-owned and auditable',
  'Provider mock result recovery preview blocks live retry and fallback execution',
  'Denied provider mock result recovery paths remain blocked',
  'Provider mock result recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
