param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2227 Backend Systems Health Wall Preview"
  ScriptFile = "smoke-codexforge-backend-systems-health-wall-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Backend Systems Health Wall Preview"
  RouteHref = "/backend-systems-health-wall-preview"
  Markers = @("Backend systems health wall preview", "Backend systems health wall preview adds a premium systems wall for provider gateway asset storage audio storage render queue worker artifact export publish gateway approval and audit contracts", "Backend systems health wall preview uses static synthetic system status only and does not call services inspect health endpoints create APIs or deploy runtimes", "Backend systems health wall preview keeps backend wiring not implemented", "Denied backend systems wall execution paths remain blocked", "Backend systems health wall checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
