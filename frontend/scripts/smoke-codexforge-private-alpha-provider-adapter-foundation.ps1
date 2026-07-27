param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True { param([bool]$Condition, [string]$Message) if (-not $Condition) { throw "[FAIL] $Message" } Write-Host "[PASS] $Message" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Message) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Message`: $Needle" } Write-Host "[PASS] $Message" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Message) if ([regex]::IsMatch($Haystack, $Pattern)) { throw "[FAIL] Unexpected $Message with pattern $Pattern" } Write-Host "[PASS] $Message" }
function Assert-NoGitDiff { param([string]$Path, [string]$Message) $diff = ((& git diff --name-only -- $Path 2>$null) | Out-String).Trim(); Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message }
function Assert-PowerShellParses { param([string]$Path) $tokens = $null; $parseErrors = $null; [System.Management.Automation.Language.Parser]::ParseFile((Join-Path $root $Path), [ref]$tokens, [ref]$parseErrors) | Out-Null; Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $Path" }
function Get-Text { param([string]$Path) Get-Content -Raw -LiteralPath (Join-Path $root $Path) }

Write-Host ""
Write-Host "=== CodexForge Private Alpha provider adapter foundation smoke ==="

Assert-PowerShellParses "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Provider runtime remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"

$providerSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"

Assert-Contains $providerSource 'import "server-only";' 'Provider contract module begins with import "server-only";'
Assert-Contains $providerSource 'PrivateAlphaProviderExecutionErrorCode = PrivateAlphaProviderExecutionErrorCode' "Provider error default generic carries the full provider execution domain"
Assert-Contains $storeSource 'createPrivateAlphaProviderAdapterForModelKey' "Store uses the exact-model adapter resolver"
Assert-Contains $storeSource 'verifyResolvedProviderAdapterIdentity' "Store verifies provider identity before availability or generation"
Assert-Contains $storeSource 'const getLocalStatusAdapter = (): PrivateAlphaProviderAdapter =>' "Store keeps a local-only status adapter path"
Assert-Contains $panelSource 'Execute once on local Ollama' "Local execution control remains present"
Assert-Contains $panelSource 'Execute once on Groq Cloud' "Manual Groq execution control is now present"
Assert-NotMatches $storeSource '\bfetch\s*\(|routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store contains no raw fetch, routing, or retry orchestration"
