param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1725 Build Workspace Hub Preview" `
  -ScriptFile "smoke-codexforge-build-workspace-hub-preview.ps1" `
  -Domain "src\lib\codexforge\build-workspace-hub-preview" `
  -Route "src\app\build-workspace-hub-preview" `
  -CommandLabel "Go to Build Workspace Hub Preview" `
  -RouteHref "/build-workspace-hub-preview" `
  -Markers @("Build workspace hub preview", "Build workspace hub preview groups project builder game server builder domain packs generated plans artifacts commands and evidence into one user-facing build workspace", "Build workspace hub preview requires explicit operator approval", "Build workspace hub preview hides individual build phase pages from normal navigation while preserving diagnostic access", "Denied build workspace hub paths remain blocked", "Build workspace hub checklist")
