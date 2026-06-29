param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1726 Approvals Hub Preview" `
  -ScriptFile "smoke-codexforge-approvals-hub-preview.ps1" `
  -Domain "src\lib\codexforge\approvals-hub-preview" `
  -Route "src\app\approvals-hub-preview" `
  -CommandLabel "Go to Approvals Hub Preview" `
  -RouteHref "/approvals-hub-preview" `
  -Markers @("Approvals hub preview", "Approvals hub preview groups operator approval gates risk approvals broker boundary approvals reinvestment approvals and execution holds into one review surface", "Approvals hub preview requires explicit operator approval", "Approvals hub preview does not persist approvals release locks start runtimes run commands or enable execution from the UI", "Denied approvals hub paths remain blocked", "Approvals hub checklist")
