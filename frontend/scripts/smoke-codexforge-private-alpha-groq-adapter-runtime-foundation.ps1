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
Write-Host "=== CodexForge Private Alpha Groq adapter runtime foundation smoke ==="

$allowedCount = 17
Assert-PowerShellParses "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1"
$changedPaths = ((& git status --short 2>$null) | Where-Object { $_ }) | ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } | Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedCount) "Git scope contains exactly the seventeen allowed Slice K files"

Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider" "Groq provider transport and credentials remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/model-routing" "Model-routing remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"

$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$runtimeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"

Assert-Contains $storeSource 'createPrivateAlphaProviderAdapterForModelKey' "Store resolves Groq through the exact-model runtime resolver"
Assert-Contains $storeSource 'providerAdapterResolver' "Store accepts the deterministic providerAdapterResolver hook"
Assert-Contains $storeSource 'resolveExecutionTargetModelKey' "Store resolves the exact approved target model key"
Assert-Contains $storeSource 'verifyResolvedProviderAdapterIdentity' "Store verifies adapter identity before availability or generation"
Assert-Contains $runtimeSource 'case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:' "Runtime resolver still supports exact Groq 20B resolution"
Assert-Contains $runtimeSource 'case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:' "Runtime resolver still supports exact Groq 120B resolution"
Assert-NotMatches $storeSource 'routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store introduces no routing or retry orchestration"
Assert-Contains $catalogSource 'routingState: "manual-only"' "Groq catalog entries remain manual-only"
