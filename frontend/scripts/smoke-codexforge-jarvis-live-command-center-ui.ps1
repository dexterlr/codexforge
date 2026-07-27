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
Write-Host "=== CodexForge Jarvis live command center UI smoke ==="

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

Assert-PowerShellParses "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1"
$changedPaths = ((& git status --short 2>$null) | Where-Object { $_ }) | ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } | Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git scope contains exactly the seventeen allowed Slice K files"
foreach ($path in $changedPaths) { Assert-True ($allowedChangedFiles -contains $path) "Git scope stays within the allowed Slice K files: $path" }

Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "API client remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production private-alpha data remains untouched"

$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$cssSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$athenaAliasSource = Get-Text "src\app\athena\page.tsx"
$jarvisVideoSource = Get-Text "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Text "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"

Assert-Contains $panelSource 'Manual cloud execution' "Groq UI uses the manual cloud execution wording"
Assert-Contains $panelSource 'No provider generation call has occurred.' "Approved or awaiting Groq runs state that no generation call has happened"
Assert-Contains $panelSource 'Generation is in progress for the exact approved Groq execution.' "Groq executing state is described safely"
Assert-Contains $panelSource 'The exact Groq output and metrics are persisted locally.' "Groq succeeded state is described safely"
Assert-Contains $panelSource 'Cloud-provider boundary. No prompt was sent to Groq yet.' "Current run summary states that no prompt has been sent yet"
Assert-Contains $panelSource 'Availability and credential checks occur server-side' "UI states that server-side checks happen only after explicit execute"
Assert-Contains $panelSource 'Cloud provider' "Target summaries still show the cloud-provider boundary"
Assert-Contains $cssSource '.privateAlphaCloudExecutionNotice' "CSS includes cloud execution notice styling"
Assert-Contains $cssSource '.privateAlphaCloudExecutionMeta' "CSS includes cloud execution metadata styling"
Assert-Contains $cssSource '@media (max-width: 920px)' "CSS retains the 920px responsive layout"
Assert-NotMatches $panelSource '\bfetch\s*\(|https?://|process\.env|localStorage|sessionStorage|indexedDB' "UI contains no raw fetch, provider URL, env access, or browser storage"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"
foreach ($marker in @("Mission brief", "Blocked action command deck", "Release summary")) { Assert-Contains $jarvisVideoSource $marker "/jarvis-video retains marker $marker" }
Assert-Contains $navigationTypesSource 'commandDeckRole: CodexForgeCommandDeckRole;' "commandDeckRole remains strongly typed"
