param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1095 Dry-Run Execution Hold Release Preview" `
  -ScriptFile "smoke-codexforge-dry-run-execution-hold-release-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-execution-hold-release-preview" `
  -Route "src\app\dry-run-execution-hold-release-preview" `
  -MainPanel "DryRunExecutionHoldReleasePreviewPanel" `
  -CommandLabel "Go to Dry-Run Execution Hold Release Preview" `
  -Modules @("dry-run-execution-hold-release-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunExecutionHoldReleasePreviewStableKey", "buildDryRunExecutionHoldReleasePreview", "buildDryRunExecutionHoldReleasePreviewItems", "buildDryRunExecutionHoldReleasePreviewBoundary", "buildDryRunExecutionHoldReleasePreviewModel", "summarizeDryRunExecutionHoldReleasePreview", "DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Dry-run execution hold release preview", "Dry-run execution hold release preview does not release execution", "Hold release requires explicit operator approval", "Hold release previews keep every real action blocked", "Denied dry-run execution hold release paths remain blocked", "Dry-run execution hold release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run execution hold release preview does not release execution", "Hold release requires explicit operator approval", "Denied dry-run execution hold release paths remain blocked") `
  -RouteHref "/dry-run-execution-hold-release-preview"

Write-Host "[OK] CodexForge Phase 1095 Dry-Run Execution Hold Release Preview smoke passed."
