param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Execution Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Scripts @(
  @{ Name = "Operator Run Center"; File = "smoke-codexforge-operator-run-center.ps1"; Required = $true },
  @{ Name = "Execution Readiness"; File = "smoke-codexforge-execution-readiness.ps1"; Required = $true },
  @{ Name = "Step Runner Preview"; File = "smoke-codexforge-step-runner-preview.ps1"; Required = $true },
  @{ Name = "Read-Only Step Execution"; File = "smoke-codexforge-read-only-step-execution.ps1"; Required = $true },
  @{ Name = "Patch Application Gate"; File = "smoke-codexforge-patch-application-gate.ps1"; Required = $true },
  @{ Name = "Apply-Diff Dry Run"; File = "smoke-codexforge-apply-diff-dry-run.ps1"; Required = $true },
  @{ Name = "Tool Policy UI"; File = "smoke-codexforge-tool-policy-ui.ps1"; Required = $true },
  @{ Name = "Tool Approval Retry API"; File = "smoke-codexforge-tool-approval-retry-api.ps1"; Required = $true },
  @{ Name = "Capability Cockpit"; File = "smoke-codexforge-capability-cockpit.ps1"; Required = $true },
  @{ Name = "Capability Bridge"; File = "smoke-codexforge-capability-bridge.ps1"; Required = $true },
  @{ Name = "Capability Routing"; File = "smoke-codexforge-capability-routing.ps1"; Required = $false },
  @{ Name = "Local Bridge"; File = "smoke-codexforge-local-bridge.ps1"; Required = $true },
  @{ Name = "Agent Runtime"; File = "smoke-codexforge-agent-runtime.ps1"; Required = $true },
  @{ Name = "Mission Control"; File = "smoke-codexforge-mission-control.ps1"; Required = $true }
)
