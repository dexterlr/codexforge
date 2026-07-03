param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2570 Provider Result Review Recovery Map"
  ScriptFile = "smoke-codexforge-provider-result-review-recovery-map.ps1"
  Domain = "provider-result-review-recovery-map"
  Route = "provider-result-review-recovery-map"
  CommandLabel = "Go to Provider Result Review Recovery Map"
  RouteHref = "/provider-result-review-recovery-map"
  Phase = 2570
  Title = "Provider Result Review Recovery Map"
  Markers = @(
  'Provider result review recovery map'
  'Provider result review recovery map defines review and recovery boundaries for future provider results without implementing live provider execution or processing real model outputs'
  'Provider result review recovery map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'Provider result review recovery map keeps provider result promotion blocked pending provider gateway hardening'
  'Denied provider result review recovery paths remain blocked'
  'Provider result review recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
