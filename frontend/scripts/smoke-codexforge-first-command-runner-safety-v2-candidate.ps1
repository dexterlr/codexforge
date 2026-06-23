param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1512 First Command Runner Safety v2 Candidate" `
  -ScriptFile "smoke-codexforge-first-command-runner-safety-v2-candidate.ps1" `
  -Domain "src\lib\codexforge\first-command-runner-safety-v2-candidate" `
  -Route "src\app\first-command-runner-safety-v2-candidate" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to First Command Runner Safety v2 Candidate" `
  -RouteHref "/first-command-runner-safety-v2-candidate" `
  -Markers @("First command runner safety v2 candidate", "First command runner safety v2 candidate does not execute commands from the UI", "First command runner safety v2 candidate requires explicit operator approval", "Candidate combines allowlist argument guard working directory guard environment redaction timeout cancellation output capture exit normalization denial evidence and result", "Denied first command runner safety paths remain blocked", "First command runner safety checklist")
