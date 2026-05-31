param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$Interactive,
  [switch]$ContinueOnMissingOptional,
  [switch]$StopOnFirstFailure
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Core" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Interactive:$Interactive -ContinueOnMissingOptional:$ContinueOnMissingOptional -StopOnFirstFailure:$StopOnFirstFailure -Scripts @(
  @{ Name = "Global Navigation"; File = "smoke-codexforge-global-navigation.ps1"; Required = $true },
  @{ Name = "Header Dedupe"; File = "smoke-codexforge-header-dedupe.ps1"; Required = $true },
  @{ Name = "Product Surface UI"; File = "smoke-codexforge-product-surface-ui.ps1"; Required = $true },
  @{ Name = "Product Surface Planning"; File = "smoke-codexforge-product-surface-planning.ps1"; Required = $true },
  @{ Name = "Brand Cleanup"; File = "smoke-codexforge-brand-clean.ps1"; Required = $true },
  @{ Name = "No Health Harness"; File = "smoke-codexforge-no-health-harness.ps1"; Required = $true },
  @{ Name = "Domain Alignment"; File = "smoke-codexforge-domain-alignment.ps1"; Required = $true },
  @{ Name = "Model Router"; File = "smoke-codexforge-model-router.ps1"; Required = $false },
  @{ Name = "Tool Adapter Registry"; File = "smoke-codexforge-tool-adapter-registry.ps1"; Required = $true },
  @{ Name = "Premium Response Composer"; File = "smoke-codexforge-premium-response-composer.ps1"; Required = $true },
  @{ Name = "Final Response Validation"; File = "smoke-codexforge-final-response-validation.ps1"; Required = $true },
  @{ Name = "Latest Message Authority"; File = "smoke-codexforge-latest-message-authority.ps1"; Required = $false },
  @{ Name = "Web Research Executor"; File = "smoke-codexforge-web-research.ps1"; Required = $true },
  @{ Name = "Self Upgrade"; File = "smoke-codexforge-self-upgrade.ps1"; Required = $true }
)
