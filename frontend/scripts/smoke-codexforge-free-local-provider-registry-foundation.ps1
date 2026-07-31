$ErrorActionPreference = "Stop"

function Assert-True([bool]$condition, [string]$message) {
  if (-not $condition) { throw "FAILED: $message" }
}

$root = Split-Path -Parent $PSScriptRoot
$registryPath = Join-Path $root "src/lib/codexforge/model-routing/model-routing-provider-registry.ts"
$catalogPath = Join-Path $root "src/lib/codexforge/model-routing/model-routing-catalog.ts"
$typesPath = Join-Path $root "src/lib/codexforge/model-routing/model-routing-types.ts"
$aggregatePath = Join-Path $root "scripts/smoke-codexforge-all.ps1"
$registry = Get-Content -Raw -LiteralPath $registryPath
$catalog = Get-Content -Raw -LiteralPath $catalogPath
$types = Get-Content -Raw -LiteralPath $typesPath
$aggregate = Get-Content -Raw -LiteralPath $aggregatePath
$expectedCatalogSha256 = "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b"

Assert-True ($registry -match 'CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY') "canonical registry is exported"
Assert-True ($registry -match 'getCodexForgeProductionFreeOrLocalProviderRegistry') "frozen clone getter is exported"
Assert-True ($registry -match 'validateCodexForgeFreeOrLocalProviderRegistry') "registry validator is exported"
Assert-True ($registry -match 'ollama-local::gpt-oss:20b') "Ollama inventory is present"
Assert-True ($registry -match 'groq-cloud::openai/gpt-oss-20b') "Groq 20B inventory is present"
Assert-True ($registry -match 'groq-cloud::openai/gpt-oss-120b') "Groq 120B inventory is present"
Assert-True ($registry -match 'catalogApprovedMaximumOutputTokens') "Ollama catalog envelope is projected from qualification"
Assert-True ($registry -match 'acceptedMaximumOutputTokens') "Groq envelopes are projected from acceptance"
Assert-True ($registry -match 'request-scoped-operator-confirmation') "Groq revalidation remains required"
Assert-True ($registry -match 'before-provider-adapter-resolution-or-credential-work') "first kill-switch checkpoint is present"
Assert-True ($registry -match 'immediately-before-provider-generation') "second kill-switch checkpoint is present"
Assert-True ($registry -match 'maximumProviderAttempts: 1') "single attempt is enforced"
Assert-True ($registry -match 'paidExecutionEnabled: false') "paid execution is disabled"
Assert-True ($registry -match 'retryAllowed: false') "retry is disabled"
Assert-True ($registry -match 'fallbackAllowed: false') "fallback is disabled"
Assert-True ($registry -match 'modelSubstitutionAllowed: false') "substitution is disabled"
Assert-True ($registry -notmatch 'fetch\(') "registry has no fetch"
Assert-True ($registry -notmatch 'process\.env') "registry has no environment read"
Assert-True ($registry -notmatch 'private-alpha/') "registry imports no Private Alpha runtime"
Assert-True ($registry -notmatch 'client\.server') "registry imports no provider client"
Assert-True ($catalog -match 'CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY\.map') "catalog providers are registry-composed"
Assert-True ($catalog -match 'CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY\.flatMap') "catalog models are registry-flattened"
Assert-True ($expectedCatalogSha256 -eq "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b") "catalog parity checksum is pinned to the baseline"
Assert-True ($types -match 'CodexForgeFreeOrLocalProviderRegistration') "production registry types are defined"

$releaseBlock = [regex]::Match($aggregate, '(?s)\$currentReleaseGateScripts = @\((.*?)\r?\n\)').Groups[1].Value
$entries = @($releaseBlock -split "`n" | Where-Object { $_ -match '^  @\{' })
Assert-True ($entries.Count -eq 69) "aggregate executable entry count is 69"
$requiredCount = @($entries | Where-Object { $_ -match 'Required = \$true' }).Count
$optionalCount = @($entries | Where-Object { $_ -match 'Required = \$false' }).Count
Assert-True ($requiredCount -eq 66 -and $optionalCount -eq 3) "aggregate split is 66 required and 3 optional"
Assert-True ($releaseBlock -match 'Private Alpha Ollama Local-First Live Acceptance"; File = "smoke-codexforge-private-alpha-ollama-local-first-live-acceptance\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Free/Local Provider Registry Foundation"; File = "smoke-codexforge-free-local-provider-registry-foundation\.ps1"; Required = \$true \},') "registry smoke follows Slice N"
Assert-True ($releaseBlock -match 'Free/Local Provider Registry Foundation"; File = "smoke-codexforge-free-local-provider-registry-foundation\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Registry-Backed Free/Local Provider Onboarding and Admission Foundation"; File = "smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation\.ps1"; Required = \$true \},') "Slice P smoke follows the registry smoke"
Assert-True ($releaseBlock -match 'Registry-Backed Free/Local Provider Onboarding and Admission Foundation"; File = "smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation\.ps1"; Required = \$true \},\r?\n  @\{ Name = "First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},') "Slice Q smoke follows Slice P"
Assert-True ($releaseBlock -match 'First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Exact Qwen 2\.5 Coder 32B Qualification and Controlled Acceptance Contract"; File = "smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract\.ps1"; Required = \$true \},') "Slice R smoke follows Slice Q"

Write-Host "PASS: CodexForge Free/Local Provider Registry Foundation smoke"
