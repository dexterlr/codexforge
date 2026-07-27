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
Write-Host "=== CodexForge Private Alpha cloud approval binding foundation smoke ==="

$allowedChangedFiles = @(
  "src/lib/codexforge/private-alpha/private-alpha-types.ts",
  "src/lib/codexforge/private-alpha/private-alpha-validation.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "docs/codexforge-private-alpha-manual-groq-execution-foundation-v0.md",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1"
)

Assert-PowerShellParses "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1"
$changedPaths = ((& git status --short 2>$null) | Where-Object { $_ }) | ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } | Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git scope contains exactly the seventeen allowed Slice K files"
foreach ($path in $changedPaths) { Assert-True ($allowedChangedFiles -contains $path) "Git scope stays within the allowed Slice K files: $path" }

Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Runtime resolver remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production private-alpha data remains untouched"

$typesSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$validationSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-validation.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$indexSource = Get-Text "src\lib\codexforge\private-alpha\index.ts"

Assert-Contains $typesSource 'export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;' "Record version remains 1"
Assert-Contains $typesSource 'export const PRIVATE_ALPHA_APPROVAL_BINDING_VERSION = 1 as const;' "Approval binding version remains 1"
Assert-Contains $typesSource '"manual-approved-cloud-provider-locked"' "The existing Groq execution-mode string is preserved"
Assert-Contains $typesSource 'PrivateAlphaCloudExecutionAcknowledgement' "Cloud execution acknowledgement type is exported"
Assert-Contains $validationSource 'isPrivateAlphaCloudExecutionConfiguration' "Cloud execution configuration predicate is exported"
Assert-Contains $validationSource 'cloudExecutionAcknowledgement must be exactly true when provided.' "Execute input validation enforces exact cloud acknowledgement true"
Assert-Contains $validationSource 'Execution still requires a separate explicit operator acknowledgement and action.' "Cloud approval statement now requires a later execute action"
Assert-Contains $storeSource 'Cloud execution acknowledgement is required for this exact approved scope.' "Store requires the separate cloud execution acknowledgement"
Assert-Contains $storeSource 'Cloud transfer consent is not recorded for this exact approved scope.' "Store enforces persisted transfer consent"
Assert-Contains $storeSource 'Cloud execution acknowledgement is not allowed for local execution.' "Local execution rejects the cloud execution acknowledgement"
Assert-Contains $storeSource 'validateExecutionAcknowledgementOrThrow(existingRun, target, executeInput);' "Contextual acknowledgement validation occurs inside executeRun"
Assert-Contains $storeSource 'const killSwitchBeforeResolver = await readSafeKillSwitchState(paths);' "The first kill-switch check still occurs before adapter work"
Assert-Contains $storeSource 'const killSwitchBeforeGeneration = await readSafeKillSwitchState(paths);' "The second kill-switch check occurs before generation"
Assert-Contains $indexSource 'isPrivateAlphaCloudExecutionConfiguration' "Client-safe index exports the cloud execution predicate"
