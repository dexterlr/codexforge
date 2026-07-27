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
Write-Host "=== CodexForge model-routing policy foundation smoke ==="

Assert-PowerShellParses "scripts/smoke-codexforge-model-routing-policy-foundation.ps1"
Assert-NoGitDiff "src/lib/codexforge/model-routing" "Model-routing source remains unchanged"

$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$policySource = Get-Text "src\lib\codexforge\model-routing\model-routing-policy.server.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"

Assert-Contains $catalogSource '"codexforge-model-routing-v2"' "Catalog remains v2"
Assert-Contains $catalogSource 'routingState: "manual-only"' "Groq catalog entries remain manual-only"
Assert-NotMatches $catalogSource 'providerId:\s*CODEXFORGE_GROQ_PROVIDER_ID,[\s\S]{0,160}routingState:\s*"automatic"' "Automatic routing still cannot select Groq"
Assert-Contains $policySource 'Manual mode requires an exact manualModelKey; no model was evaluated.' "Manual policy still requires an exact manual model key"
Assert-Contains $storeSource 'resolveExecutionTargetFromRequestAndApprovalScope' "Store resolves the exact target from the persisted request and approval scope"
Assert-NotMatches $storeSource 'routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store still does not use routing or retry orchestration"
