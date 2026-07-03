param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2248 First Backend Wiring Readiness After Visual Upgrade"
  ScriptFile = "smoke-codexforge-first-backend-wiring-readiness-after-visual-upgrade.ps1"
  Domain = "first-backend-wiring-readiness-after-visual-upgrade"
  Route = "first-backend-wiring-readiness-after-visual-upgrade"
  CommandLabel = "Go to First Backend Wiring Readiness After Visual Upgrade"
  RouteHref = "/first-backend-wiring-readiness-after-visual-upgrade"
  Markers = @("First backend wiring readiness after visual upgrade", "First backend wiring readiness after visual upgrade does not create APIs create services call providers dispatch jobs persist data or execute backend actions", "First backend wiring readiness after visual upgrade lists the premium cockpit surfaces that will connect to provider gateway asset storage audio storage render queue worker orchestration artifact export publish gateway approval capture rights consent and audit ledger wiring", "First backend wiring readiness after visual upgrade prepares for the next backend wiring batch without implementing it", "Denied backend wiring preview execution paths remain blocked", "First backend wiring readiness after visual upgrade checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
