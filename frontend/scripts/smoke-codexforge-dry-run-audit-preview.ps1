param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1348 Dry-Run Audit Preview" `
  -ScriptFile "smoke-codexforge-dry-run-audit-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-audit-preview" `
  -Route "src\app\dry-run-audit-preview" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Audit Preview" `
  -RouteHref "/dry-run-audit-preview" `
  -Markers @("Dry-run audit preview", "Dry-run audit preview does not persist audit logs", "Dry-run audit preview requires explicit operator approval", "Audit preview shows goal plan diff apply command approval evidence result recovery queue operator and denied-path records without persistence", "Denied dry-run audit paths remain blocked", "Dry-run audit checklist")
