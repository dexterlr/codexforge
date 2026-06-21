param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1077 Guarded Execution Preflight Checklist" `
  -ScriptFile "smoke-codexforge-guarded-execution-preflight-checklist.ps1" `
  -Domain "src\lib\codexforge\guarded-execution-preflight-checklist" `
  -Route "src\app\guarded-execution-preflight-checklist" `
  -MainPanel "GuardedExecutionPreflightChecklistPanel" `
  -CommandLabel "Go to Guarded Execution Preflight Checklist" `
  -Modules @("guarded-execution-preflight-checklist-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedExecutionPreflightChecklistStableKey", "buildGuardedExecutionPreflightChecklist", "buildGuardedExecutionPreflightChecklistItems", "buildGuardedExecutionPreflightChecklistBoundary", "buildGuardedExecutionPreflightChecklistModel", "summarizeGuardedExecutionPreflightChecklist", "GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_LANGUAGE") `
  -PhaseMarkers @("Guarded execution preflight checklist", "Guarded execution preflight checklist does not execute checks", "Preflight checklist review requires explicit operator approval", "Preflight checklists gate files commands runtimes adapters evidence results and recovery", "Denied guarded execution preflight paths remain blocked", "Guarded execution preflight checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded execution preflight checklist does not execute checks", "Preflight checklist review requires explicit operator approval", "Denied guarded execution preflight paths remain blocked") `
  -RouteHref "/guarded-execution-preflight-checklist"

Write-Host "[OK] CodexForge Phase 1077 Guarded Execution Preflight Checklist smoke passed."
