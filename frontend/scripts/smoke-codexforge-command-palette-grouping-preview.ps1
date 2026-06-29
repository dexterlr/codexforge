param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1733 Command Palette Grouping Preview" `
  -ScriptFile "smoke-codexforge-command-palette-grouping-preview.ps1" `
  -Domain "src\lib\codexforge\command-palette-grouping-preview" `
  -Route "src\app\command-palette-grouping-preview" `
  -CommandLabel "Go to Command Palette Grouping Preview" `
  -RouteHref "/command-palette-grouping-preview" `
  -Markers @("Command palette grouping preview", "Command palette grouping preview groups command palette entries into user features and developer diagnostics rather than a flat phase list", "Command palette grouping preview requires explicit operator approval", "Command palette grouping preview preserves diagnostic search and direct phase access while normal users see feature-first commands", "Denied command palette grouping paths remain blocked", "Command palette grouping checklist")
