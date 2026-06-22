param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1205 Cockpit Dev Surface Drawer" `
  -ScriptFile "smoke-codexforge-cockpit-dev-surface-drawer.ps1" `
  -Domain "src\lib\codexforge\cockpit-dev-surface-drawer" `
  -Route "src\app\cockpit-dev-surface-drawer" `
  -MainPanel "CockpitDevSurfaceDrawerPanel" `
  -CommandLabel "Go to Cockpit Dev Surface Drawer" `
  -RouteHref "/cockpit-dev-surface-drawer" `
  -Markers @("Cockpit dev surface drawer", "Cockpit dev surface drawer does not execute phase pages", "Dev surface drawer requires explicit operator intent to browse dev/test routes", "Dev surface drawer labels phase pages as dev/test surfaces only", "Normal users should use the cockpit instead of phase pages", "Cockpit dev surface drawer checklist")
