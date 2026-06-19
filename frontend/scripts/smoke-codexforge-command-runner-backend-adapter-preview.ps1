param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 812 Command Runner Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-command-runner-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\command-runner-backend-adapter-preview" `
  -Route "src\app\command-runner-backend-adapter-preview" `
  -MainPanel "CommandRunnerBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Command Runner Backend Adapter Preview" `
  -Modules @("command-runner-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("CommandRunnerBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerBackendAdapterPreviewStableKey", "buildCommandRunnerBackendAdapterPreview", "buildCommandRunnerBackendAdapterPreviewItems", "buildCommandRunnerBackendAdapterPreviewBoundary", "buildCommandRunnerBackendAdapterPreviewModel", "summarizeCommandRunnerBackendAdapterPreview", "COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Command runner backend adapter preview", "Command runner backend adapter preview does not execute commands", "Command execution requires explicit operator approval", "Denied command paths remain blocked", "Command adapter groups", "Command preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command runner backend adapter preview does not execute commands", "Command execution requires explicit operator approval", "Denied command paths remain blocked") `
  -RouteHref "/command-runner-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 812 Command runner backend adapter preview smoke passed."
