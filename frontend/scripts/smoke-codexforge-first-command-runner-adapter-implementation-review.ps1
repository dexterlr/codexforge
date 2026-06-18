param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 747 First Command Runner Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-command-runner-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-command-runner-adapter-implementation-review" `
  -Route "src\app\first-command-runner-adapter-implementation-review" `
  -MainPanel "FirstCommandRunnerAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Command Runner Adapter Implementation Review" `
  -Modules @("first-command-runner-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstCommandRunnerAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstCommandRunnerAdapterImplementationReviewStableKey", "buildFirstCommandRunnerAdapterImplementationReview", "buildFirstCommandRunnerAdapterImplementationReviewItems", "buildFirstCommandRunnerAdapterImplementationReviewBoundary", "buildFirstCommandRunnerAdapterImplementationReviewModel", "summarizeFirstCommandRunnerAdapterImplementationReview", "FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Command Runner Adapter Implementation Review", "First command runner adapter implementation review does not run commands", "Command runner adapter implementation requires explicit operator approval", "Implementation review", "Command policy", "Working directory", "Env/secrets", "Timeout", "Stdout/stderr", "Exit-code", "Recovery", "Evidence", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Command Runner Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "command profile", "operator-terminal steps") `
  -RouteHref "/first-command-runner-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 747 first command runner adapter implementation review smoke passed."
