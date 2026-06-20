param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 940 Command Runner Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-command-runner-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\command-runner-model-routed-execution-preview" `
  -Route "src\app\command-runner-model-routed-execution-preview" `
  -MainPanel "CommandRunnerModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Command Runner Model-Routed Execution Preview" `
  -Modules @("command-runner-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("CommandRunnerModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerModelRoutedExecutionPreviewStableKey", "buildCommandRunnerModelRoutedExecutionPreview", "buildCommandRunnerModelRoutedExecutionPreviewItems", "buildCommandRunnerModelRoutedExecutionPreviewBoundary", "buildCommandRunnerModelRoutedExecutionPreviewModel", "summarizeCommandRunnerModelRoutedExecutionPreview", "COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Command runner model-routed execution preview", "Command runner model-routed execution preview does not run commands", "Command execution requires explicit operator approval", "Command proposals include model selection rationale", "Denied command execution paths remain blocked", "Command runner model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command runner model-routed execution preview does not run commands", "Command execution requires explicit operator approval", "Denied command execution paths remain blocked") `
  -RouteHref "/command-runner-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 940 Command runner model-routed execution preview smoke passed."
