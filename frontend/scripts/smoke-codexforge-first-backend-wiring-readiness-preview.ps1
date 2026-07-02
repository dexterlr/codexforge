param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2216 First Backend Wiring Readiness Preview"
  ScriptFile = "smoke-codexforge-first-backend-wiring-readiness-preview.ps1"
  Domain = "src\lib\codexforge\first-backend-wiring-readiness-preview"
  Route = "src\app\first-backend-wiring-readiness-preview"
  CommandLabel = "Go to First Backend Wiring Readiness Preview"
  RouteHref = "/first-backend-wiring-readiness-preview"
  Markers = @("First backend wiring readiness preview", "First backend wiring readiness preview does not create APIs create services call providers dispatch jobs persist data or execute backend actions", "First backend wiring readiness preview lists prerequisites for provider gateway asset storage audio storage render queue worker orchestration artifact export publish gateway approval capture rights consent and audit ledger wiring", "First backend wiring readiness preview prepares for the next backend wiring batch without implementing it", "Denied backend wiring preview execution paths remain blocked", "First backend wiring readiness preview checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
