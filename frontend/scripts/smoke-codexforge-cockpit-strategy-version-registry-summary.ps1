param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1847 Cockpit Strategy Version Registry Summary"
  ScriptFile = "smoke-codexforge-cockpit-strategy-version-registry-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-strategy-version-registry-summary"
  Route = "src\app\cockpit-strategy-version-registry-summary"
  CommandLabel = "Go to Cockpit Strategy Version Registry Summary"
  RouteHref = "/cockpit-strategy-version-registry-summary"
  Markers = @("Cockpit strategy version registry summary", "Cockpit strategy version registry summary keeps the cockpit as the normal user surface", "Cockpit strategy version registry summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute trades fetch live market data calculate real P&L or persist evidence from the cockpit", "Cockpit strategy version registry summary shows version lineage diff summary evidence links risk status mandate status approval state retirement state rollback note comparison matrix review checklist export boundary no auto promote boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit strategy version registry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
