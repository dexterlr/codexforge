param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1445 Audit Timeline Preview" `
  -ScriptFile "smoke-codexforge-audit-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\audit-timeline-preview" `
  -Route "src\app\audit-timeline-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Audit Timeline Preview" `
  -RouteHref "/audit-timeline-preview" `
  -Markers @("Audit timeline preview", "Audit timeline preview does not persist audit logs from the UI", "Audit timeline preview requires backend-owned audit capture", "Audit timeline preview shows goal context plan diff command approval evidence result recovery model tool and denied-path records", "Denied audit timeline paths remain blocked", "Audit timeline checklist")
