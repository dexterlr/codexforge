param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1729 Phase Route Grouping Preview" `
  -ScriptFile "smoke-codexforge-phase-route-grouping-preview.ps1" `
  -Domain "src\lib\codexforge\phase-route-grouping-preview" `
  -Route "src\app\phase-route-grouping-preview" `
  -CommandLabel "Go to Phase Route Grouping Preview" `
  -RouteHref "/phase-route-grouping-preview" `
  -Markers @("Phase route grouping preview", "Phase route grouping preview groups phase routes by family build trading research mandate strategy backtest profit cockpit diagnostics and legacy foundations", "Phase route grouping preview requires explicit operator approval", "Phase route grouping preview preserves direct route access smoke coverage and command palette search while reducing normal menu noise", "Denied phase route grouping paths remain blocked", "Phase route grouping checklist")
