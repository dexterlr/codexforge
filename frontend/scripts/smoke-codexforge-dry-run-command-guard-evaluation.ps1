param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1343 Dry-Run Command Guard Evaluation" `
  -ScriptFile "smoke-codexforge-dry-run-command-guard-evaluation.ps1" `
  -Domain "src\lib\codexforge\dry-run-command-guard-evaluation" `
  -Route "src\app\dry-run-command-guard-evaluation" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Command Guard Evaluation" `
  -RouteHref "/dry-run-command-guard-evaluation" `
  -Markers @("Dry-run command guard evaluation", "Dry-run command guard evaluation does not run commands", "Dry-run command guard evaluation requires explicit operator approval", "Command guard evaluation previews allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture", "Denied dry-run command guard paths remain blocked", "Dry-run command guard checklist")
