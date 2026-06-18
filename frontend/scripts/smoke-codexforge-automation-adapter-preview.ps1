param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 688 Automation Adapter Preview" `
  -ScriptFile "smoke-codexforge-automation-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\automation-adapter-preview" `
  -Route "src\\app\\automation-adapter-preview" `
  -MainPanel "AutomationAdapterPreviewPanel" `
  -CommandLabel "Go to Automation Adapter Preview" `
  -Modules @("automation-adapter-preview-model.ts", "index.ts") `
  -Components @("AutomationAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildAutomationAdapterPreviewStableKey", "buildAutomationAdapterPreview", "buildAutomationAdapterPreviews", "buildAutomationAdapterPreviewBoundary", "buildAutomationAdapterPreviewModel", "summarizeAutomationAdapterPreview", "AUTOMATION_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Automation adapter preview", "Automation adapter preview does not create automations or schedules", "Automation execution requires explicit operator approval", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Automation adapter preview identity", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/automation-adapter-preview"

Write-Host "[OK] CodexForge Phase 688 automation adapter preview smoke passed."
