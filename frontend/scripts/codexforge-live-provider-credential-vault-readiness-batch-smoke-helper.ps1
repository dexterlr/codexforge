function Assert-CodexForgeLiveProviderCredentialVaultReadinessFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeLiveProviderCredentialVaultReadinessContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeLiveProviderCredentialVaultReadinessNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeLiveProviderCredentialVaultReadinessRequiredMarkers = @(
  '3146-3177 - Live Provider Credential Vault Readiness'
  '3146-3177 - Live Provider Credential Vault Readiness Mega Batch v1'
  'Live Provider Credential Vault Readiness'
  'review-only live provider credential vault readiness'
  'synthetic credential vault readiness data only'
  'live provider credential vault readiness remains blocked until explicit operator approval'
  'backend-only credential vault boundary'
  'provider secret reference contract'
  'provider key never exposed to frontend'
  'provider token never exposed to frontend'
  'frontend secret exposure remains blocked'
  'backend-only provider credential reference'
  'credential use requires explicit operator approval'
  'credential scope review remains required'
  'token scope review remains required'
  'secret rotation policy'
  'secret revocation policy'
  'environment isolation'
  'dev prod separation'
  'live provider audit packet'
  'live provider redaction packet'
  'live provider observability trace'
  'live provider cost gate'
  'live provider rate gate'
  'live provider privacy gate'
  'live provider safety gate'
  'live provider region policy'
  'live provider data retention policy'
  'live provider timeout policy'
  'live provider retry policy'
  'live provider fallback policy'
  'live provider kill switch'
  'live call eligibility remains review-only'
  'blocked live provider call candidate'
  'operator review remains required before live credential use'
  'live provider runner handoff remains review-only'
  'live provider readiness gate'
  'live provider credential vault readiness completion does not store credentials'
  'no credential storage'
  'no token storage'
  'no OAuth token storage'
  'no publish token storage'
  'no provider key storage'
  'no secret storage'
  'no plaintext secrets'
  'no environment variable reads from frontend'
  'no process.env provider key reads from frontend'
  'no live provider calls'
  'no model calls'
  'no prompt sending'
  'no streaming'
  'no provider SDK imports'
  'no text provider imports'
  'no image provider imports'
  'no video provider imports'
  'no audio provider imports'
  'no transcription provider imports'
  'no editing/upscale provider imports'
  'no metadata provider imports'
  'no safety provider imports'
  'no network egress'
  'no fetch/network calls'
  'no connector calls'
  'no upload/download'
  'no file export'
  'no artifact export execution'
  'no publish gateway execution'
  'no platform upload'
  'no render execution'
  'no video rendering'
  'no audio rendering'
  'no storyboard execution'
  'no keyframe generation'
  'no render queue dispatch'
  'no worker dispatch'
  'no worker execution'
  'no job execution'
  'no scheduler execution'
  'no orchestration execution'
  'no live workflow execution'
  'no process spawning'
  'no shell execution'
  'no command execution from the app'
  'no file system writes from the app'
  'no frontend persistence'
  'no browser storage writes'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no database writes'
  'no service creation'
  'no API creation from frontend'
  'no port binding'
  'no runtime deploy'
  'next likely batch: 3178-3209 - First Live Text Provider Call Backend Bridge'
)

$CodexForgeLiveProviderCredentialVaultReadinessBannedPatterns = @(
  '\bfetch\s*\('
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'localStorage\.'
  'sessionStorage\.'
  'indexedDB\.'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'process\.env\s*\[[''"][^''"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  'apiKey\s*[:=]'
  'providerKey\s*[:=]'
  'accessToken\s*[:=]'
  'refreshToken\s*[:=]'
  'clientSecret\s*[:=]'
  'plaintextSecret\s*[:=]'
  'sk-[A-Za-z0-9_]{20,}'
  'sk-proj-[A-Za-z0-9_-]{20,}'
  'AIza[0-9A-Za-z_-]{20,}'
  'xox[baprs]-[0-9A-Za-z-]{20,}'
  'gh[pousr]_[A-Za-z0-9_]{20,}'
  'SecretManager'
  'VaultClient'
  'createVault\s*\('
  'createSecret\s*\('
  'provider\.send'
  'provider\.call'
  'provider\.execute'
  'model\.call'
  'prompt\.send'
  'stream\s*\('
  'upload\s*\('
  'download\s*\('
  'renderQueue\.dispatch'
  'worker\.dispatch'
  'artifactExport\.execute'
  'publishGateway\.execute'
  'Worker\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
  'from\s+[''"]openai[''"]'
  'from\s+[''"]@anthropic'
  'from\s+[''"]@google'
  'from\s+[''"]@aws-sdk'
  'from\s+[''"]@azure/keyvault'
  'from\s+[''"]@google-cloud/secret-manager'
  'from\s+[''"]replicate'
  'from\s+[''"]stability'
  'from\s+[''"]elevenlabs'
  'from\s+[''"]assemblyai'
  'from\s+[''"]deepgram'
  'from\s+[''"]runway'
  'from\s+[''"]fal'
)

function Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke {
  param(
    [string]$SmokeName,
    [string]$ScriptFile,
    [string]$Route,
    [string]$CommandLabel,
    [string]$RouteHref,
    [string]$Phase,
    [string]$Title
  )
  $ErrorActionPreference = "Stop"
  $scriptRoot = $PSScriptRoot
  $root = Split-Path -Parent $scriptRoot
  Set-Location $root
  Write-Host "=== $SmokeName ==="
  if ($RouteHref -match "^/codexforge/") { throw "[FAIL] Nested CodexForge route href is not allowed: $RouteHref" }
  if ($Route -match "[\/]" ) { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[\/]" ) { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $unexpectedRoutePath = Join-Path $appRouteDir "route.ts"
  if (Test-Path $unexpectedRoutePath) { throw "[FAIL] API route creation is not allowed for this batch: $unexpectedRoutePath" }
  $unexpectedApiPath = Join-Path $root "src\app\api\codexforge\$Route"
  if (Test-Path $unexpectedApiPath) { throw "[FAIL] API creation is not allowed for this batch: $unexpectedApiPath" }
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\live-provider-credential-vault-readiness-map\live-provider-credential-vault-readiness-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\live-provider-credential-vault-readiness-map\components\LiveProviderCredentialVaultReadinessPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\live-provider-credential-vault-readiness-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\live-provider-credential-vault-readiness-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-live-provider-credential-vault-readiness-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath)) {
    Assert-CodexForgeLiveProviderCredentialVaultReadinessFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $routeSource "LiveProviderCredentialVaultReadinessRoutePanel" "route panel uses shared live provider credential vault readiness panel"
  foreach ($marker in $CodexForgeLiveProviderCredentialVaultReadinessRequiredMarkers) { Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $routeSource $marker "route marker $marker" }
  foreach ($pattern in $CodexForgeLiveProviderCredentialVaultReadinessBannedPatterns) { Assert-CodexForgeLiveProviderCredentialVaultReadinessNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navRegistry "group: `"Creative`"" "navigation group"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navRegistry "safetyPosture: `"review-gated`"" "navigation safety posture"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeLiveProviderCredentialVaultReadinessContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeLiveProviderCredentialVaultReadinessBannedPatterns) { Assert-CodexForgeLiveProviderCredentialVaultReadinessNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
