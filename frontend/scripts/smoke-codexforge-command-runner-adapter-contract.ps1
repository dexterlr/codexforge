param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1179 Command-Runner Adapter Contract" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-contract.ps1" `
  -Domain "src\lib\codexforge\command-runner-adapter-contract" `
  -Route "src\app\command-runner-adapter-contract" `
  -MainPanel "CommandRunnerAdapterContractPanel" `
  -CommandLabel "Go to Command Runner Adapter Contract" `
  -Modules @("command-runner-adapter-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandRunnerAdapterContractStableKey", "buildCommandRunnerAdapterContract", "buildCommandRunnerAdapterContractItems", "buildCommandRunnerAdapterContractBoundary", "buildCommandRunnerAdapterContractModel", "summarizeCommandRunnerAdapterContract", "COMMAND_RUNNER_ADAPTER_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command-runner adapter contract", "Command-runner adapter contract does not execute commands", "Command-runner adapter contract requires explicit operator approval", "Adapter contract defines allowlist argument working-directory environment evidence result and recovery gates", "Denied command-runner adapter contract paths remain blocked", "Command-runner adapter contract checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command-runner adapter contract does not execute commands", "Command-runner adapter contract requires explicit operator approval", "Denied command-runner adapter contract paths remain blocked") `
  -RouteHref "/command-runner-adapter-contract"

Write-Host "[OK] CodexForge Phase 1179 Command-Runner Adapter Contract smoke passed."
