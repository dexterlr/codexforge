param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2529 Real Provider Call Recovery Preview"
  ScriptFile = "smoke-codexforge-real-provider-call-recovery-preview.ps1"
  Domain = "real-provider-call-recovery-preview"
  Route = "real-provider-call-recovery-preview"
  CommandLabel = "Go to Real Provider Call Recovery Preview"
  RouteHref = "/real-provider-call-recovery-preview"
  Phase = 2529
  Title = "Real Provider Call Recovery Preview"
  Markers = @(
  'Real provider call recovery preview'
  'Real provider call recovery preview defines recovery paths for guard failure approval denial audit mismatch credential absence token redaction failure SDK isolation failure and egress denial without retrying providers'
  'Real provider call recovery preview keeps recovery backend-owned and auditable'
  'Real provider call recovery preview blocks live retry and fallback execution'
  'Denied real provider call recovery paths remain blocked'
  'Real provider call recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
