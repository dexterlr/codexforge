param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 684 Command Runner Adapter Preview" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\command-runner-adapter-preview" `
  -Route "src\\app\\command-runner-adapter-preview" `
  -MainPanel "CommandRunnerAdapterPreviewPanel" `
  -CommandLabel "Go to Command Runner Adapter Preview" `
  -Modules @("command-runner-adapter-preview-model.ts", "index.ts") `
  -Components @("CommandRunnerAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerAdapterPreviewStableKey", "buildCommandRunnerAdapterPreview", "buildCommandRunnerAdapterPreviews", "buildCommandRunnerAdapterPreviewBoundary", "buildCommandRunnerAdapterPreviewModel", "summarizeCommandRunnerAdapterPreview", "COMMAND_RUNNER_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Command runner adapter preview", "Command runner adapter preview does not run commands", "Command runner execution requires explicit operator approval", "Command", "Working directory", "Env/secrets handling", "Timeout", "Stdout/stderr", "Exit code", "Recovery plan", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Command runner adapter preview identity", "Command", "Working directory", "Env/secrets handling", "Timeout", "Stdout/stderr", "Exit code", "Recovery plan", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/command-runner-adapter-preview"

Write-Host "[OK] CodexForge Phase 684 command runner adapter preview smoke passed."
