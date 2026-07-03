param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2320 Provider Adapter Audit Mapping Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-audit-mapping-preview.ps1"
  Domain = "provider-adapter-audit-mapping-preview"
  Route = "provider-adapter-audit-mapping-preview"
  CommandLabel = "Go to Provider Adapter Audit Mapping Preview"
  RouteHref = "/provider-adapter-audit-mapping-preview"
  Markers = @("Provider adapter audit mapping preview", "Provider adapter audit mapping preview defines future audit metadata for adapter operations without writing audit logs", "Provider adapter audit mapping preview includes approval id privacy class provider family redaction state and denied execution state", "Provider adapter audit mapping preview keeps audit persistence backend-owned", "Denied provider adapter audit mapping paths remain blocked", "Provider adapter audit mapping checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
