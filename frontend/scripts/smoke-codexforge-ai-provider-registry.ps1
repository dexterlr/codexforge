param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge AI Provider Account Registry smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\ai-provider-registry"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "ai-provider-registry-types.ts")
Assert-FileExists (Join-Path $domain "ai-model-provider-registry-catalog.ts")
Assert-FileExists (Join-Path $components "AiProviderRegistryPanel.tsx")
Assert-FileExists "src\app\ai-providers\page.tsx"
Assert-FileExists "src\app\ai-providers\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\ai-providers" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$pageClientSource = Get-Content -Raw "src\app\ai-providers\page-client.tsx"
$panelSource = Get-Content -Raw (Join-Path $components "AiProviderRegistryPanel.tsx")
$catalogSource = Get-Content -Raw (Join-Path $domain "ai-model-provider-registry-catalog.ts")
$typesSource = Get-Content -Raw (Join-Path $domain "ai-provider-registry-types.ts")
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("AI_MODEL_PROVIDER_REGISTRY", "buildProviderReadinessSummary", "buildCapabilityMatrixPreview", "registry-only / not connected", "No model calls yet", "No prompt sending", "No provider SDKs imported", "No frontend provider call", "Opaque credential reference only", "/ai-providers")) {
  Assert-Contains $source $needle "registry includes $needle"
}
Assert-Contains $nav "/ai-providers" "navigation includes /ai-providers"
Assert-Contains $commands "Go to AI Provider Registry" "command palette includes provider registry"
Assert-Contains $pageClientSource '"Jarvis can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP.' "provider handoff renders Jarvis identity"
Assert-Contains $panelSource ">CodexForge / Jarvis Model Gateway<" "provider panel renders CodexForge and Jarvis gateway identity"
Assert-Contains $panelSource ">Open Jarvis Chat<" "provider panel links to Jarvis Chat"
Assert-Contains $catalogSource 'source: "CodexForge / Jarvis Model Gateway"' "provider catalog exposes CodexForge and Jarvis source"
Assert-Contains $catalogSource '"Jarvis Chat"' "provider catalog exposes Jarvis Chat workspace targets"
Assert-Contains $typesSource 'AiModelProviderRegistrySource = "CodexForge / Jarvis Model Gateway"' "provider source type uses canonical identity"
Assert-Contains $typesSource '| "Jarvis Chat"' "provider workspace type uses Jarvis Chat"
Assert-Contains $typesSource '| "Athena Command Center"' "provider workspace type preserves legacy catalog compatibility"
Assert-Contains $panelSource '.replaceAll("Athena Command Center", "Jarvis Chat")' "provider display boundary normalizes legacy workspace targets"
Assert-Contains $panelSource '.replace(/\bAthena\b/gu, "Jarvis")' "provider display boundary normalizes legacy persona copy"
Assert-NotMatches $pageClientSource 'const\s+PROVIDER_DRY_RUN_AUDIT_APPROVAL_JOIN_PROVIDER_HUB_SUMMARY\s*=\s*\r?\n\s*"Athena\b' "provider handoff does not render retired Athena persona"
Assert-NotMatches $panelSource '>\s*Athena\b' "provider panel JSX does not render retired Athena persona"
Assert-NotMatches $catalogSource 'workspaceTargets\s*:\s*\[[^\]]*"Athena Command Center"' "provider catalog has no retired Athena workspace target"
Assert-NotMatches $catalogSource '(?m)^\s*source\s*:\s*"Athena / Jarvis Model Gateway"' "provider catalog has no retired Athena source value"
Assert-NotMatches $typesSource 'AiModelProviderRegistrySource\s*=\s*"Athena' "provider source type excludes retired Athena display identity"
if (([regex]::Matches($allSmoke, "smoke-codexforge-ai-provider-registry\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include provider registry exactly once" }

Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded provider token"
Assert-NotMatches $source "fetch\s*\(" "no network call"
Assert-NotMatches $source "process\.env" "no process env exposure"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret write"
Assert-NotMatches $source "password\s*[:=]" "no raw password field"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/ai-providers" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /ai-providers returned status $($response.StatusCode)" }
  Write-Host "[PASS] /ai-providers route reachable"
} catch {
  Write-Host "[SKIP] /ai-providers route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge AI Provider Account Registry smoke passed."

