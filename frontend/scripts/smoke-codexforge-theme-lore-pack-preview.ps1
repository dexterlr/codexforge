param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1597 Theme Lore Pack Preview" `
  -ScriptFile "smoke-codexforge-theme-lore-pack-preview.ps1" `
  -Domain "src\lib\codexforge\theme-lore-pack-preview" `
  -Route "src\app\theme-lore-pack-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Theme Lore Pack Preview" `
  -RouteHref "/theme-lore-pack-preview" `
  -Markers @("Theme lore pack preview", "Theme lore pack preview does not generate or write final assets from the UI", "Theme lore pack preview requires explicit operator approval", "Theme lore pack preview shapes Westeros kingdoms houses regions ranks rules quests events economy and roleplay lore as review-only content", "Denied theme lore pack paths remain blocked", "Theme lore pack checklist")
