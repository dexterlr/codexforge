param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$Interactive,
  [switch]$ContinueOnMissingOptional,
  [switch]$StopOnFirstFailure
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Memory Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Interactive:$Interactive -ContinueOnMissingOptional:$ContinueOnMissingOptional -StopOnFirstFailure:$StopOnFirstFailure -Scripts @(
  @{ Name = "Cognitive Memory"; File = "smoke-codexforge-cognitive-memory.ps1"; Required = $true },
  @{ Name = "Cognitive Memory Runtime Integration"; File = "smoke-codexforge-cognitive-memory-runtime-integration.ps1"; Required = $true },
  @{ Name = "Memory Review"; File = "smoke-codexforge-memory-review.ps1"; Required = $true },
  @{ Name = "Memory Promotion Gate"; File = "smoke-codexforge-memory-promotion-gate.ps1"; Required = $true },
  @{ Name = "Memory Persistence"; File = "smoke-codexforge-memory-persistence.ps1"; Required = $true },
  @{ Name = "Evidence Memory"; File = "smoke-codexforge-evidence-memory.ps1"; Required = $true },
  @{ Name = "Evidence-Grounded Chat"; File = "smoke-codexforge-evidence-grounded-chat.ps1"; Required = $true },
  @{ Name = "Chat Recall Context"; File = "smoke-codexforge-chat-recall-context.ps1"; Required = $true }
)
