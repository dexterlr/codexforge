param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True { param([bool]$Condition, [string]$Message) if (-not $Condition) { throw "[FAIL] $Message" } Write-Host "[PASS] $Message" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Message) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Message`: $Needle" } Write-Host "[PASS] $Message" }
function Assert-NoGitDiff { param([string]$Path, [string]$Message) $diff = ((& git diff --name-only -- $Path 2>$null) | Out-String).Trim(); Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message }
function Assert-PowerShellParses { param([string]$Path) $tokens = $null; $parseErrors = $null; [System.Management.Automation.Language.Parser]::ParseFile((Join-Path $root $Path), [ref]$tokens, [ref]$parseErrors) | Out-Null; Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $Path" }
function Get-Text { param([string]$Path) Get-Content -Raw -LiteralPath (Join-Path $root $Path) }

Write-Host ""
Write-Host "=== CodexForge Groq provider qualification foundation smoke ==="

Assert-PowerShellParses "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Private-alpha Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production private-alpha data remains untouched"

$typesSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"

Assert-Contains $typesSource '"groq_credential_missing"' "Groq persisted error taxonomy includes credential-missing"
Assert-Contains $typesSource '"groq_authentication_failed"' "Groq persisted error taxonomy includes authentication-failed"
Assert-Contains $typesSource '"groq_rate_limited"' "Groq persisted error taxonomy includes rate-limited"
Assert-Contains $typesSource '"groq_quota_exhausted"' "Groq persisted error taxonomy includes quota-exhausted"
Assert-Contains $typesSource '"groq_model_unavailable"' "Groq persisted error taxonomy includes model-unavailable"
Assert-Contains $typesSource '"groq_empty_response"' "Groq persisted error taxonomy includes empty-response"
Assert-Contains $storeSource 'Groq Cloud execution failed unexpectedly.' "Unknown Groq failures use the bounded safe fallback message"
Assert-Contains $storeSource 'Groq Cloud is unavailable for the approved execution scope.' "Store keeps a safe Groq unavailable fallback message"
