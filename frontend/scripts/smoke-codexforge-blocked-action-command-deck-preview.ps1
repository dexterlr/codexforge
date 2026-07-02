param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2228 Blocked Action Command Deck Preview"
  ScriptFile = "smoke-codexforge-blocked-action-command-deck-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Blocked Action Command Deck Preview"
  RouteHref = "/blocked-action-command-deck-preview"
  Markers = @("Blocked action command deck preview", "Blocked action command deck preview visually upgrades disabled generate upload render export publish schedule and save actions so they feel intentional and premium", "Blocked action command deck preview does not execute actions call services create jobs upload download render export publish schedule persist state or write browser storage", "Blocked action command deck preview maps each blocked action to the required backend contract", "Denied blocked command deck execution paths remain blocked", "Blocked action command deck checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
