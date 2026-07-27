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
Write-Host "=== CodexForge Jarvis manual provider model selector smoke ==="

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
$productFiles = $allowedChangedFiles | Where-Object { $_ -like "src/*" }

Assert-PowerShellParses "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1"
$changedPaths = ((& git status --short 2>$null) | Where-Object { $_ }) | ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } | Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git scope contains exactly the seventeen allowed Slice K files"
foreach ($path in $changedPaths) { Assert-True ($allowedChangedFiles -contains $path) "Git scope stays within the allowed Slice K files: $path" }
Assert-True ((@($changedPaths | Where-Object { $productFiles -contains $_ })).Count -eq $productFiles.Count) "Only the intended seven product files changed"

Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/model-routing" "Model-routing remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production private-alpha data remains untouched"

$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$cssSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"

Assert-Contains $panelSource 'data-codexforge-private-alpha-provider-selector="manual"' "Panel exposes the manual provider selector"
Assert-Contains $panelSource 'data-codexforge-private-alpha-model-selector="manual"' "Panel exposes the manual model selector"
Assert-Contains $panelSource 'useState<PrivateAlphaManualProviderId>(PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID)' "Initial provider remains Local Ollama"
Assert-Contains $panelSource 'selectedTarget?.modelKey ?? ""' "No default Groq model is assigned"
Assert-Contains $panelSource 'setSelectedModelKey(null);' "Switching to Groq clears the previous model selection"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-acknowledgement="required"' "Groq approval keeps the transfer acknowledgement"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Groq execution adds a separate execution acknowledgement"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Approved Groq UI exposes the manual cloud execute control"
Assert-Contains $panelSource 'Execute once on Groq Cloud' "Approved Groq UI renders the cloud execute button"
Assert-Contains $panelSource 'Execute once on local Ollama' "Approved local UI still renders the local execute button"
Assert-Contains $panelSource 'cloudExecutionAcknowledgement: true' "Cloud execute payload includes cloudExecutionAcknowledgement true"
Assert-NotMatches $panelSource 'cloudExecutionAcknowledgement:\s*undefined' "Local execute payload omits the cloud field"
Assert-Contains $panelSource 'status?.killSwitchEngaged === false' "Cloud execute gating respects only the global kill switch"
Assert-NotMatches $panelSource 'status\?\.providerAvailable|status\?\.modelAvailable' "Cloud execute gating ignores local provider and model availability"
Assert-Contains $panelSource 'Checked server-side at execution' "UI does not claim Groq availability"
Assert-Contains $cssSource '.privateAlphaCloudExecutionToggle' "CSS includes the cloud execution toggle styling"
Assert-Contains $catalogSource 'routingState: "manual-only"' "Groq catalog entries remain manual-only"
Assert-NotMatches $panelSource '\bfetch\s*\(|https?://|process\.env|localStorage|sessionStorage|indexedDB' "Panel contains no raw provider call, env access, or browser storage"
