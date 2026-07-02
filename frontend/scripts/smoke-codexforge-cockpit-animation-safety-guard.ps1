param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2233 Cockpit Animation Safety Guard"
  ScriptFile = "smoke-codexforge-cockpit-animation-safety-guard.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cockpit Animation Safety Guard"
  RouteHref = "/cockpit-animation-safety-guard"
  Markers = @("Cockpit animation safety guard", "Cockpit animation safety guard verifies visual motion is subtle deterministic and not required for usability", "Cockpit animation safety guard does not add timers that mutate data random animation data browser storage network calls or execution affordances", "Cockpit animation safety guard keeps motion safe and optional", "Denied animation safety regression paths remain blocked", "Cockpit animation safety checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
