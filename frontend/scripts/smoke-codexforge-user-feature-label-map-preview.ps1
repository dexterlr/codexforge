param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1730 User Feature Label Map Preview" `
  -ScriptFile "smoke-codexforge-user-feature-label-map-preview.ps1" `
  -Domain "src\lib\codexforge\user-feature-label-map-preview" `
  -Route "src\app\user-feature-label-map-preview" `
  -CommandLabel "Go to User Feature Label Map Preview" `
  -RouteHref "/user-feature-label-map-preview" `
  -Markers @("User feature label map preview", "User feature label map preview replaces phase-heavy labels with product labels such as Trading Workspace Build Workspace Approvals Evidence Developer Diagnostics and Next Action", "User feature label map preview requires explicit operator approval", "User feature label map preview keeps phase numbers visible only in diagnostics metadata", "Denied user feature label paths remain blocked", "User feature label map checklist")
