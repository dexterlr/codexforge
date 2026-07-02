param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2240 Cockpit Mobile Command Layout Preview"
  ScriptFile = "smoke-codexforge-cockpit-mobile-command-layout-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cockpit Mobile Command Layout Preview"
  RouteHref = "/cockpit-mobile-command-layout-preview"
  Markers = @("Cockpit mobile command layout preview", "Cockpit mobile command layout preview improves mobile and narrow screen command centre layout with stacked readable panels", "Cockpit mobile command layout preview does not hide critical blocked action status safety gates or backend wiring required messaging", "Cockpit mobile command layout preview keeps local state interactions usable", "Denied mobile command layout regression paths remain blocked", "Cockpit mobile command layout checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
