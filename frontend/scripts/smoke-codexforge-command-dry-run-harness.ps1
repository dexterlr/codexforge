param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1190 Command Dry-Run Harness" `
  -ScriptFile "smoke-codexforge-command-dry-run-harness.ps1" `
  -Domain "src\lib\codexforge\command-dry-run-harness" `
  -Route "src\app\command-dry-run-harness" `
  -MainPanel "CommandDryRunHarnessPanel" `
  -CommandLabel "Go to Command Dry Run Harness" `
  -Modules @("command-dry-run-harness-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandDryRunHarnessStableKey", "buildCommandDryRunHarness", "buildCommandDryRunHarnessItems", "buildCommandDryRunHarnessBoundary", "buildCommandDryRunHarnessModel", "summarizeCommandDryRunHarness", "COMMAND_DRY_RUN_HARNESS_LANGUAGE") `
  -PhaseMarkers @("Command dry-run harness", "Command dry-run harness does not execute commands", "Command dry-run harness requires explicit operator approval before future execution", "Dry-run harness returns command evidence result and recovery previews only", "Denied command dry-run harness paths remain blocked", "Command dry-run harness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command dry-run harness does not execute commands", "Command dry-run harness requires explicit operator approval before future execution", "Denied command dry-run harness paths remain blocked") `
  -RouteHref "/command-dry-run-harness"

Write-Host "[OK] CodexForge Phase 1190 Command Dry-Run Harness smoke passed."
