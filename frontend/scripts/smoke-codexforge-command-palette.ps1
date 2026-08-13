param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$SkipRouteProbe
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -notmatch $Pattern) { throw "[FAIL] Missing $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-InOrder {
  param([AllowEmptyString()][string]$Haystack, [string[]]$Needles, [string]$Name)
  $previous = -1
  foreach ($needle in $Needles) {
    $next = $Haystack.IndexOf($needle, $previous + 1, [System.StringComparison]::Ordinal)
    if ($next -le $previous) { throw "[FAIL] $Name`: $needle" }
    $previous = $next
  }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Command Palette smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\command-palette"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$shellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$operatorHomePath = "src\lib\codexforge\operator-home\components\OperatorHomeDashboard.tsx"
$stabilizationPath = "src\lib\codexforge\stabilization-command-center\components\StabilizationCommandCenter.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$paletteComponentPath = Join-Path $componentDir "CodexForgeCommandPalette.tsx"
$overlayComponentPath = Join-Path $componentDir "CommandPaletteOverlay.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "command-palette-types.ts",
  "command-registry.ts",
  "command-search.ts",
  "command-groups.ts",
  "command-safety.ts",
  "command-shortcuts.ts",
  "command-copy-payloads.ts",
  "command-next-action.ts",
  "command-palette-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "CodexForgeCommandPalette.tsx",
  "CommandPaletteTrigger.tsx",
  "CommandPaletteOverlay.tsx",
  "CommandPaletteSearchBox.tsx",
  "CommandPaletteGroup.tsx",
  "CommandPaletteItem.tsx",
  "CommandPaletteShortcutHint.tsx",
  "CommandPaletteSafetyPanel.tsx",
  "CommandPaletteEmptyState.tsx",
  "CommandPaletteFooter.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$shellSource = Get-Content -Raw $shellPath
$operatorHomeSource = Get-Content -Raw $operatorHomePath
$stabilizationSource = Get-Content -Raw $stabilizationPath
$allSmoke = Get-Content -Raw $allSmokePath
$paletteComponentSource = Get-Content -Raw $paletteComponentPath
$overlayComponentSource = Get-Content -Raw $overlayComponentPath
$triggerComponentSource = Get-Content -Raw (Join-Path $componentDir "CommandPaletteTrigger.tsx")
$paletteSource = $domainSource + "`n" + $uiSource

foreach ($export in @(
  "buildCodexForgeCommands",
  "buildCodexForgeCommand",
  "searchCodexForgeCommands",
  "scoreCodexForgeCommandMatch",
  "normalizeCommandSearchQuery",
  "buildCodexForgeCommandGroups",
  "buildCodexForgeCommandGroup",
  "buildCodexForgeCommandSafetyReport",
  "isCodexForgeCommandMutationBlocked",
  "buildCodexForgeCommandShortcuts",
  "getCodexForgeCommandPaletteShortcutLabel",
  "buildCodexForgeValidationChecklistPayload",
  "buildCodexForgeSafePatchPromptPayload",
  "buildCodexForgeStabilizationHandoffPayload",
  "selectCodexForgePaletteNextAction",
  "buildCodexForgePaletteNextActionCommand",
  "buildCodexForgeCommandPaletteSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "CodexForgeCommandPalette renders",
  "CommandPaletteTrigger renders",
  "CommandPaletteOverlay renders",
  "CommandPaletteSearchBox renders",
  "CommandPaletteGroup renders",
  "CommandPaletteItem renders",
  "CommandPaletteShortcutHint renders",
  "CommandPaletteSafetyPanel renders",
  "CommandPaletteEmptyState renders",
  "CommandPaletteFooter renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $shellSource "CodexForgeCommandPalette" "Navigation Shell imports/renders CommandPaletteTrigger or CodexForgeCommandPalette if integrated"
Assert-Contains $operatorHomeSource "Command Palette" "Operator Home references Command Palette if integrated"
Assert-Contains $stabilizationSource "Command Palette" "Stabilization references Command Palette if integrated"

foreach ($text in @(
  "Ctrl+K",
  "Cmd+K",
  "Escape",
  "no command execution without approval",
  "no file writes without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI references $text"
}

Assert-InOrder $paletteComponentSource @(
  "const activeElement = document.activeElement;",
  "returnFocusTargetRef.current = activeElement instanceof HTMLElement ? activeElement : null;",
  "fallbackFocusTargetRef.current = paletteRootRef.current?.querySelector<HTMLElement>(",
  "paletteOpenRef.current = true;",
  "setOpen(true);"
) "focus target is captured before the palette opens"
Assert-Contains $paletteComponentSource "if (paletteOpenRef.current) return;" "repeated open cannot replace the captured focus target"
Assert-Contains $paletteComponentSource "ref={paletteRootRef}" "palette root owns the fallback query boundary"
Assert-Contains $triggerComponentSource "data-codexforge-command-palette-trigger" "stable palette opener exposes the fallback selector"
Assert-Contains $paletteComponentSource "<CommandPaletteTrigger onOpen={openPalette} />" "trigger uses the pre-open focus capture lifecycle"
Assert-Matches $paletteComponentSource '(?s)if \(\(event\.ctrlKey \|\| event\.metaKey\).*?event\.preventDefault\(\);\s*openPalette\(\);' "Ctrl or Cmd K uses the pre-open focus capture lifecycle"
Assert-Contains $paletteComponentSource "returnFocusTarget={returnFocusTargetRef.current}" "captured focus target is passed to the overlay"
Assert-Contains $paletteComponentSource "fallbackFocusTarget={fallbackFocusTargetRef.current}" "stable palette opener fallback is passed to the overlay"
Assert-Matches $overlayComponentSource '(?s)if \(event\.key === "Escape"\) \{\s*event\.preventDefault\(\);\s*event\.stopPropagation\(\);\s*onClose\(\);' "Escape prevents propagation and invokes the close lifecycle"
Assert-InOrder $overlayComponentSource @(
  "return () => {",
  "window.cancelAnimationFrame(frame);",
  "const restoreTarget = isRestorableFocusTarget(returnFocusTarget)",
  "restoreTarget?.focus({ preventScroll: true });"
) "focus restoration occurs in the overlay close-unmount lifecycle"
Assert-InOrder $paletteComponentSource @(
  "const closePalette = useCallback(() => {",
  "paletteOpenRef.current = false;",
  "setOpen(false);"
) "closing resets the synchronous open guard before the next open"
Assert-Contains $overlayComponentSource "target.isConnected" "return focus requires a connected target"
Assert-Contains $overlayComponentSource 'target.matches(":disabled")' "return focus rejects disabled targets"
Assert-Contains $overlayComponentSource "target.tabIndex < 0" "return focus rejects targets outside the focus order"
Assert-Contains $overlayComponentSource 'target.getAttribute("aria-disabled") === "true"' "return focus rejects aria-disabled targets"
Assert-Contains $overlayComponentSource 'target.closest(''[inert], [hidden], [aria-hidden="true"]'')' "return focus rejects hidden or inert targets"
Assert-Contains $overlayComponentSource "target.getClientRects().length === 0" "return focus rejects non-rendered targets"
Assert-Contains $overlayComponentSource 'style.display !== "none" && style.visibility !== "hidden"' "return focus requires visible computed styling"
Assert-Contains $overlayComponentSource "isRestorableFocusTarget(fallbackFocusTarget)" "invalid captured focus falls back to the stable opener"
Assert-Contains $overlayComponentSource "target === document.body" "body is rejected as a return-focus target"
Assert-NotMatches $overlayComponentSource 'document\.body\.focus\s*\(' "focus never intentionally falls through to body"
Assert-InOrder $overlayComponentSource @(
  '"[data-codexforge-command-palette-search-box]"',
  "const first = preferred ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);",
  "first?.focus();"
) "initial focus resolves and focuses the command search box before a fallback"
Assert-Matches $overlayComponentSource '(?s)if \(event\.key !== "Tab"\) return;.*?if \(event\.shiftKey && document\.activeElement === first\) \{\s*event\.preventDefault\(\);\s*last\.focus\(\);\s*\} else if \(!event\.shiftKey && document\.activeElement === last\) \{\s*event\.preventDefault\(\);\s*first\.focus\(\);' "Tab focus trap retains both wrap directions"
Assert-Matches $paletteComponentSource '(?s)if \(event\.key === "ArrowDown"\).*?setSelectedIndex\(\(current\) => Math\.min' "ArrowDown advances bounded keyboard selection"
Assert-Matches $paletteComponentSource '(?s)if \(event\.key === "ArrowUp"\).*?setSelectedIndex\(\(current\) => Math\.max' "ArrowUp reverses bounded keyboard selection"
Assert-Matches $paletteComponentSource '(?s)if \(event\.key === "Enter" && selectedCommand\).*?selectCommand\(selectedCommand\);' "Enter preserves keyboard command selection"
Assert-NotContains ($paletteComponentSource + "`n" + $overlayComponentSource) "setTimeout" "focus lifecycle uses no arbitrary delay"
Assert-NotMatches ($paletteComponentSource + "`n" + $overlayComponentSource) '(?i)(\bas\s+any\b|\bas\s+unknown\s+as\b)' "focus repair introduces no unsafe cast"

foreach ($text in @(
  "Go to Operator Home",
  "Build with Jarvis",
  "Create static website or browser app",
  "Legacy AI Workspace unavailable",
  "Go to Brain",
  "Go to Files",
  "Go to Stabilization",
  "Copy full validation checklist",
  "Review regression triage",
  "Prepare Safe Patch Preview",
  "Compose Preview Diff"
)) {
  Assert-Contains $domainSource $text "command registry includes $text"
}
Assert-Matches $domainSource '(?s)label:\s*"Build with Jarvis".*?href:\s*"/jarvis"' "command palette reaches canonical Jarvis directly"
Assert-Matches $domainSource '(?s)label:\s*"Create static website or browser app".*?href:\s*"/jarvis-websites"' "command palette reaches Website/Browser App creation directly"
Assert-Matches $domainSource '(?s)label:\s*"Legacy AI Workspace unavailable".*?redirects to the canonical Jarvis workspace.*?href:\s*"/ai"' "command palette labels /ai as a retired compatibility redirect"

foreach ($text in @(
  "apply-diff",
  "write-file",
  "run-command",
  "broker-execution"
)) {
  Assert-Contains $domainSource $text "command safety blocks $text"
}

Assert-Contains $domainSource "label" "search supports label"
Assert-Contains $domainSource "keywords" "search supports keywords"

foreach ($text in @(
  "npm run build",
  "npm run smoke:codexforge:server",
  "git diff --check"
)) {
  Assert-Contains $domainSource $text "validation checklist includes $text"
}

foreach ($text in @(
  "Inspect first",
  "no file writes without approval",
  "Preserve latest-message authority"
)) {
  Assert-Contains $domainSource $text "safe patch payload says $text"
}

Assert-Contains $domainSource "commit clean checkpoint" "next action can recommend commit clean checkpoint"

Assert-NotMatches $paletteSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource "brokerExecution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $paletteSource "Math.random" "no Math.random"
Assert-NotContains $paletteSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $paletteSource "d3-force" "no d3-force"
Assert-NotMatches $paletteSource "https?://" "no external network dependency"
Assert-NotMatches $paletteSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $paletteSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $paletteSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $paletteSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic command-palette files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $paletteSource $mojibakePattern "no mojibake"
Assert-Contains $uiSource "buildCodexForgeCommandPaletteStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-command-palette\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Command Palette exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Command Palette" "managed smoke suite includes Command Palette exactly once"

if ($SkipRouteProbe) {
  Write-Host "Route probe omitted for nested deterministic execution."
} else {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
    if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
      throw "[FAIL] / returned status $($response.StatusCode)"
    }
    Write-Host "[PASS] / route reachable"
  } catch {
    Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
  }
}

Write-Host "[OK] CodexForge Command Palette smoke passed."
