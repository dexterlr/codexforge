param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1093 Dry-Run Execution Validation Preview" `
  -ScriptFile "smoke-codexforge-dry-run-execution-validation-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-execution-validation-preview" `
  -Route "src\app\dry-run-execution-validation-preview" `
  -MainPanel "DryRunExecutionValidationPreviewPanel" `
  -CommandLabel "Go to Dry-Run Execution Validation Preview" `
  -Modules @("dry-run-execution-validation-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunExecutionValidationPreviewStableKey", "buildDryRunExecutionValidationPreview", "buildDryRunExecutionValidationPreviewItems", "buildDryRunExecutionValidationPreviewBoundary", "buildDryRunExecutionValidationPreviewModel", "summarizeDryRunExecutionValidationPreview", "DRY_RUN_EXECUTION_VALIDATION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Dry-run execution validation preview", "Dry-run execution validation preview does not run validation", "Execution validation previews require explicit operator approval", "Validation previews show expected checks without execution", "Denied dry-run execution validation paths remain blocked", "Dry-run execution validation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run execution validation preview does not run validation", "Execution validation previews require explicit operator approval", "Denied dry-run execution validation paths remain blocked") `
  -RouteHref "/dry-run-execution-validation-preview"

Write-Host "[OK] CodexForge Phase 1093 Dry-Run Execution Validation Preview smoke passed."
