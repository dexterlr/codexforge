param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 878 Paid Model Connection Test Preview" `
  -ScriptFile "smoke-codexforge-paid-model-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\paid-model-connection-test-preview" `
  -Route "src\app\paid-model-connection-test-preview" `
  -MainPanel "PaidModelConnectionTestPreviewPanel" `
  -CommandLabel "Go to Paid Model Connection Test Preview" `
  -Modules @("paid-model-connection-test-preview-model.ts", "index.ts") `
  -Components @("PaidModelConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelConnectionTestPreviewStableKey", "buildPaidModelConnectionTestPreview", "buildPaidModelConnectionTestPreviewItems", "buildPaidModelConnectionTestPreviewBoundary", "buildPaidModelConnectionTestPreviewModel", "summarizePaidModelConnectionTestPreview", "PAID_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Paid model connection test preview", "Paid model connection test preview does not call paid models", "Paid model connection tests require explicit operator approval", "Paid models share CodexForge memory and knowledge", "Denied paid model connection paths remain blocked", "Paid model connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model connection test preview does not call paid models", "Paid model connection tests require explicit operator approval", "Denied paid model connection paths remain blocked") `
  -RouteHref "/paid-model-connection-test-preview"

Write-Host "[OK] CodexForge Phase 878 Paid model connection test preview smoke passed."
