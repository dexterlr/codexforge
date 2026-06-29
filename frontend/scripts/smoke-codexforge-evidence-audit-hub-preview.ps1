param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1727 Evidence Audit Hub Preview" `
  -ScriptFile "smoke-codexforge-evidence-audit-hub-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-audit-hub-preview" `
  -Route "src\app\evidence-audit-hub-preview" `
  -CommandLabel "Go to Evidence Audit Hub Preview" `
  -RouteHref "/evidence-audit-hub-preview" `
  -Markers @("Evidence audit hub preview", "Evidence audit hub preview groups evidence results audit continuity redaction checkpoint status and backend-owned capture notes into one review surface", "Evidence audit hub preview requires backend-owned capture", "Evidence audit hub preview does not persist evidence results audit or memory from the UI", "Denied evidence audit hub paths remain blocked", "Evidence audit hub checklist")
