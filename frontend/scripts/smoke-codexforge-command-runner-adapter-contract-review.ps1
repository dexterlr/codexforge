param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 668 Command Runner Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\command-runner-adapter-contract-review" `
  -Route "src\app\command-runner-adapter-contract-review" `
  -MainPanel "CommandRunnerAdapterContractReviewPanel" `
  -CommandLabel "Go to Command Runner Adapter Contract Review" `
  -Modules @("command-runner-adapter-contract-review-model.ts", "index.ts") `
  -Components @("CommandRunnerAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerAdapterContractReviewStableKey", "buildCommandRunnerAdapterContractReview", "buildCommandRunnerAdapterContractReviews", "buildCommandRunnerAdapterContractReviewBoundary", "buildCommandRunnerAdapterContractReviewModel", "summarizeCommandRunnerAdapterContractReview", "COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Command runner adapter contract review", "Command runner adapter contract review does not run commands", "Command runner adapters require explicit operator approval", "Adapter not executable from UI", "Command preview", "Working directory", "Env/secrets", "Timeout", "Stdout/stderr", "Exit code", "Recovery", "Denied command runner adapter actions") `
  -PlainEnglish @("Command runner adapter contract review identity", "Command preview", "Working directory", "Env/secrets", "Timeout", "Stdout/stderr", "Exit code", "Recovery", "Denied command runner adapter actions", "Unresolved command runner adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/command-runner-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 668 command runner adapter contract review smoke passed."
