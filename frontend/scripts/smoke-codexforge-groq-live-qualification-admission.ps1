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
Write-Host "=== CodexForge Groq live qualification admission smoke ==="

Assert-PowerShellParses "scripts/smoke-codexforge-groq-live-qualification-admission.ps1"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq transport client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production private-alpha data remains untouched"

$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$docSource = Get-Text "docs\codexforge-private-alpha-manual-groq-execution-foundation-v0.md"

Assert-Contains $panelSource 'Creating or approving the request does not contact Groq.' "Creation flow still states that no Groq call occurs"
Assert-Contains $panelSource 'No transfer occurs now, the exact model remains fixed, and no automatic routing occurs.' "Approval flow still states that no Groq call occurs"
Assert-Contains $panelSource 'Only a later explicit execute action can send the approved prompt.' "Only the later explicit execute action can send the prompt"
Assert-Contains $docSource 'The next step is live acceptance of the exact 20B and 120B paths' "Documentation still treats live acceptance as a later step"
Assert-NotMatches $panelSource '\bfetch\s*\(|https?://|process\.env' "UI contains no live-provider call path, external provider URL, or env access"
