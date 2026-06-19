param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 797 Command Runner Adapter Backend Contract" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-backend-contract.ps1" `
  -Domain "src\lib\codexforge\command-runner-adapter-backend-contract" `
  -Route "src\app\command-runner-adapter-backend-contract" `
  -MainPanel "CommandRunnerAdapterBackendContractPanel" `
  -CommandLabel "Go to Command Runner Adapter Backend Contract" `
  -Modules @("command-runner-adapter-backend-contract-model.ts", "index.ts") `
  -Components @("CommandRunnerAdapterBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerAdapterBackendContractStableKey", "buildCommandRunnerAdapterBackendContract", "buildCommandRunnerAdapterBackendContractItems", "buildCommandRunnerAdapterBackendContractBoundary", "buildCommandRunnerAdapterBackendContractModel", "summarizeCommandRunnerAdapterBackendContract", "COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command Runner Adapter Backend Contract", "Command runner adapter backend contract does not run commands", "Command runner backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "command preview", "working directory", "env/secrets redaction", "timeout", "stdout/stderr", "exit code", "recovery", "audit/evidence/result", "sandbox profile", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Command runner adapter backend contract does not run commands") `
  -RouteHref "/command-runner-adapter-backend-contract"

Write-Host "[OK] CodexForge Phase 797 command runner adapter backend contract smoke passed."
