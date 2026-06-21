param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1092 Dry-Run Execution Trace Preview" `
  -ScriptFile "smoke-codexforge-dry-run-execution-trace-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-execution-trace-preview" `
  -Route "src\app\dry-run-execution-trace-preview" `
  -MainPanel "DryRunExecutionTracePreviewPanel" `
  -CommandLabel "Go to Dry-Run Execution Trace Preview" `
  -Modules @("dry-run-execution-trace-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunExecutionTracePreviewStableKey", "buildDryRunExecutionTracePreview", "buildDryRunExecutionTracePreviewItems", "buildDryRunExecutionTracePreviewBoundary", "buildDryRunExecutionTracePreviewModel", "summarizeDryRunExecutionTracePreview", "DRY_RUN_EXECUTION_TRACE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Dry-run execution trace preview", "Dry-run execution trace preview does not write traces", "Execution trace previews require explicit operator approval", "Trace previews show expected evidence result and audit flow", "Denied dry-run execution trace paths remain blocked", "Dry-run execution trace checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run execution trace preview does not write traces", "Execution trace previews require explicit operator approval", "Denied dry-run execution trace paths remain blocked") `
  -RouteHref "/dry-run-execution-trace-preview"

Write-Host "[OK] CodexForge Phase 1092 Dry-Run Execution Trace Preview smoke passed."
