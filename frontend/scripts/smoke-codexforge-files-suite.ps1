param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$Interactive,
  [switch]$ContinueOnMissingOptional,
  [switch]$StopOnFirstFailure
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Files Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Interactive:$Interactive -ContinueOnMissingOptional:$ContinueOnMissingOptional -StopOnFirstFailure:$StopOnFirstFailure -Scripts @(
  @{ Name = "Files UX"; File = "smoke-codexforge-files-ux.ps1"; Required = $true },
  @{ Name = "Files Runtime"; File = "smoke-codexforge-files-runtime.ps1"; Required = $true },
  @{ Name = "Files Command Center"; File = "smoke-codexforge-files-command-center.ps1"; Required = $true },
  @{ Name = "Local Project Reader"; File = "smoke-codexforge-local-project-reader.ps1"; Required = $true },
  @{ Name = "File Workflow"; File = "smoke-codexforge-file-workflow.ps1"; Required = $true },
  @{ Name = "File Brain Chat Workflow"; File = "smoke-codexforge-file-brain-chat-workflow.ps1"; Required = $true },
  @{ Name = "Patch Preview"; File = "smoke-codexforge-patch-preview.ps1"; Required = $true },
  @{ Name = "Patch Preview Queue"; File = "smoke-codexforge-patch-preview-queue.ps1"; Required = $true },
  @{ Name = "Preview Diff Composer"; File = "smoke-codexforge-preview-diff-composer.ps1"; Required = $true },
  @{ Name = "Grounded Fix Recommendation"; File = "smoke-codexforge-grounded-fix-recommendation.ps1"; Required = $true }
)
