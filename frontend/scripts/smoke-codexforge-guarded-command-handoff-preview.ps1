param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1069 Guarded Command Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-command-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-command-handoff-preview" `
  -Route "src\app\guarded-command-handoff-preview" `
  -MainPanel "GuardedCommandHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Command Handoff Preview" `
  -Modules @("guarded-command-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedCommandHandoffPreviewStableKey", "buildGuardedCommandHandoffPreview", "buildGuardedCommandHandoffPreviewItems", "buildGuardedCommandHandoffPreviewBoundary", "buildGuardedCommandHandoffPreviewModel", "summarizeGuardedCommandHandoffPreview", "GUARDED_COMMAND_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded command handoff preview", "Guarded command handoff preview does not run commands", "Command handoff requires explicit operator approval", "Command handoffs show planned commands without execution", "Denied guarded command handoff paths remain blocked", "Guarded command handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded command handoff preview does not run commands", "Command handoff requires explicit operator approval", "Denied guarded command handoff paths remain blocked") `
  -RouteHref "/guarded-command-handoff-preview"

Write-Host "[OK] CodexForge Phase 1069 Guarded Command Handoff Preview smoke passed."
