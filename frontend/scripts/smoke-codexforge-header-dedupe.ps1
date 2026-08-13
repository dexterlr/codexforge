param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Message
  )

  Assert-True ($Haystack.Contains($Needle)) $Message
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Message
  )

  Assert-True (-not $Haystack.Contains($Needle)) $Message
}

Write-Host "=== CodexForge Header Dedupe smoke ==="

$globalNavPath = ".\src\lib\codexforge\navigation\CodexForgeGlobalNav.tsx"
$localActionBarPath = ".\src\lib\codexforge\navigation\CodexForgeLocalActionBar.tsx"
$routeRegistryPath = ".\src\lib\codexforge\navigation\codexforge-routes.ts"
$indexPath = ".\src\lib\codexforge\navigation\index.ts"
$suitePath = ".\scripts\smoke-codexforge-all.ps1"

$homePath = ".\src\app\page.tsx"
$aiPagePath = ".\src\app\ai\page.tsx"
$aiTopBarPath = ".\src\lib\codexforge\chat\components\top-bar.tsx"
$brainPath = ".\src\app\brain\page-client.tsx"
$filesPagePath = ".\src\app\files\page-client.tsx"
$filesCenterPath = ".\src\lib\codexforge\files\components\files-command-center.tsx"
$historyPath = ".\src\app\history\page.tsx"
$capabilitiesPath = ".\src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx"
$creativePath = ".\src\lib\codexforge\creative\components\CreativeProductionStudio.tsx"
$runsPath = ".\src\lib\codexforge\operator-run\components\OperatorRunCenter.tsx"
$entryPath = ".\src\app\entry\page.tsx"
$clawdPath = ".\src\app\clawd\page.tsx"

$requiredFiles = @(
  $globalNavPath,
  $localActionBarPath,
  $routeRegistryPath,
  $indexPath,
  $suitePath,
  $homePath,
  $aiPagePath,
  $aiTopBarPath,
  $brainPath,
  $filesPagePath,
  $filesCenterPath,
  $historyPath,
  $capabilitiesPath,
  $creativePath,
  $runsPath,
  $entryPath,
  $clawdPath
)

foreach ($path in $requiredFiles) {
  Assert-True (Test-Path $path) "$path exists"
}

$globalNav = Get-Content -Raw $globalNavPath
$localActionBar = Get-Content -Raw $localActionBarPath
$routes = Get-Content -Raw $routeRegistryPath
$indexSource = Get-Content -Raw $indexPath
$suite = Get-Content -Raw $suitePath

$homeSource = Get-Content -Raw $homePath
$aiPage = Get-Content -Raw $aiPagePath
$aiTopBar = Get-Content -Raw $aiTopBarPath
$brain = Get-Content -Raw $brainPath
$filesPage = Get-Content -Raw $filesPagePath
$filesCenter = Get-Content -Raw $filesCenterPath
$history = Get-Content -Raw $historyPath
$capabilities = Get-Content -Raw $capabilitiesPath
$creative = Get-Content -Raw $creativePath
$runs = Get-Content -Raw $runsPath
$entry = Get-Content -Raw $entryPath
$clawd = Get-Content -Raw $clawdPath

Assert-Contains $globalNav "data-codexforge-global-nav" "global nav component marker exists"
Assert-Contains $globalNav "primaryRoutes" "global nav owns primary route rendering"
Assert-Contains $globalNav "secondaryRoutes" "global nav owns secondary route rendering"
Assert-Contains $globalNav "href={route.path}" "global nav keeps registry-backed route hrefs"
Assert-Contains $globalNav "aria-current={active ? `"page`" : undefined}" "global nav keeps active route aria-current"
Assert-Contains $globalNav "local-first / preview-safe / approval-gated" "global nav keeps posture pill"
Assert-NotContains $globalNav "groupLabel" "global nav does not render per-route group badge styles"
Assert-NotContains $globalNav "route.group}</span>" "global nav does not render group badge on every route"
Assert-Contains $localActionBar "data-codexforge-local-action-bar" "local action bar component marker exists"
Assert-Contains $indexSource "CodexForgeLocalActionBar" "navigation index exports local action bar"

foreach ($route in @("/ai", "/brain", "/files", "/runs", "/capabilities", "/creative", "/history", "/clawd", "/entry")) {
  Assert-Contains $routes "path: `"$route`"" "route registry keeps $route"
}

foreach ($primaryId in @("workspace", "brain", "files", "runs")) {
  $pattern = 'id:\s+"' + [regex]::Escape($primaryId) + '"[\s\S]*?priority:\s+"primary"'
  Assert-True ([regex]::IsMatch($routes, $pattern)) "route registry keeps $primaryId primary"
}

foreach ($secondaryId in @("home", "capabilities", "creative", "history", "entry", "operator")) {
  $pattern = 'id:\s+"' + [regex]::Escape($secondaryId) + '"[\s\S]*?priority:\s+"secondary"'
  Assert-True ([regex]::IsMatch($routes, $pattern)) "route registry keeps $secondaryId secondary"
}

Assert-Contains $aiPage 'redirect("/jarvis")' "/ai is the one server-owned compatibility redirect"
Assert-Contains $aiTopBar "AI Workspace" "retained historical chat top bar keeps its unique title fixture"
Assert-Contains $aiTopBar "Add system note" "retained historical chat top bar keeps system-note source coverage"
Assert-Contains $aiTopBar "Clear" "retained historical chat top bar keeps clear-action source coverage"
Assert-NotContains $aiTopBar "styles.brandWrap" "retained historical top bar renders no duplicate brand block"
Assert-NotContains $aiTopBar "styles.brandOrb" "retained historical top bar renders no duplicate logo block"

Assert-Contains $brain "Brain Command Center" "/brain local row keeps title"
Assert-Contains $brain "Refresh" "/brain keeps Refresh action"
Assert-Contains $brain "Copy graph JSON" "/brain keeps Copy graph JSON action"
Assert-Contains $brain "Export graph" "/brain keeps Export graph action"
Assert-Contains $brain "Reset graph" "/brain keeps Reset graph action"
Assert-NotContains $brain "CodexForge Brain" "/brain removed duplicate CodexForge route header"

Assert-True (($filesPage.Contains("CodexForgeGlobalNav")) -or ($filesPage.Contains("CodexForgeAppShell"))) "/files keeps global nav or canonical shell"
Assert-Contains $filesCenter "Files Command Center" "/files keeps Files Command Center identity"
Assert-Contains $filesCenter "Command search" "/files keeps command search control"
Assert-NotContains $filesCenter "CodexForge Files" "/files removed duplicate CodexForge files eyebrow"

Assert-Contains $history "Activity Intelligence" "/history keeps activity title"
Assert-Contains $history "Reload" "/history keeps reload action"
Assert-Contains $history "Export" "/history keeps export action"
Assert-Contains $history "Import JSON" "/history keeps import action"
Assert-NotContains $history "<div style={navGroup}>" "/history removed local route nav block"

Assert-Contains $capabilities "Capability Cockpit" "/capabilities keeps cockpit title"
Assert-Contains $capabilities "Open Operator Run Center" "/capabilities keeps run center action"
Assert-NotContains $capabilities "CodexForge Capabilities" "/capabilities removed duplicate CodexForge capabilities eyebrow"

Assert-Contains $creative "Creative Production Studio" "/creative keeps studio title"
Assert-Contains $creative "Artifact Executor" "/creative keeps artifact action"
Assert-NotContains $creative "CodexForge Phase 7" "/creative removed duplicate phase brand header"

Assert-Contains $runs "Operator Run Center" "/runs keeps run center title"
Assert-Contains $runs "Open Jarvis Local Bridge" "/runs keeps bridge action"
Assert-NotContains $runs "CodexForge Phase 8" "/runs removed duplicate phase brand header"

Assert-Contains $entry "CodexForgeGlobalNav" "/entry keeps global nav"
Assert-Contains $entry "Create chat in Jarvis" "/entry keeps its canonical visible quick-launch action"
Assert-Contains $entry "best-effort browser-local activity update" "/entry labels local activity recording honestly"
Assert-Contains $entry "Reset form" "/entry keeps reset action"
Assert-NotContains $entry "<div style={topNav}>" "/entry removed local route nav block"
Assert-NotContains $entry "brandOrb" "/entry removed duplicate brand orb"

Assert-Contains $clawd "Operator Control" "/clawd keeps operator local title"
Assert-Contains $clawd "Snapshot" "/clawd keeps snapshot action"
Assert-Contains $clawd "Start plan" "/clawd keeps start plan action"
Assert-NotContains $clawd "<div style={navCluster}>" "/clawd removed local route nav block"
Assert-NotContains $clawd "Back Home" "/clawd removed duplicate route links"

Assert-NotContains $homeSource "<header style={topBar}>" "home removed duplicate old topBar"
Assert-NotContains $homeSource "aria-label=`"Primary navigation`"" "home removed duplicate primary route nav"
Assert-NotContains $homeSource "linkPillPrimary" "home removed old route pill styles"

$combined = @(
  $globalNav,
  $localActionBar,
  $homeSource,
  $aiPage,
  $aiTopBar,
  $brain,
  $filesPage,
  $filesCenter,
  $history,
  $capabilities,
  $creative,
  $runs,
  $entry,
  $clawd
) -join "`n"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  ([string][char]0x00E2 + [string][char]0x20AC),
  ([string][char]0x00EF + [string][char]0x00BF + [string][char]0x00BD),
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  $codepoints = (($needle.ToCharArray() | ForEach-Object { "U+{0:X4}" -f [int][char]$_ }) -join " ")
  Assert-NotContains $combined $needle "header dedupe surfaces exclude mojibake marker $codepoints"
}

$headerDedupeCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-header-dedupe.ps1")).Count
Assert-True ($headerDedupeCount -eq 1) "smoke suite includes Header Dedupe exactly once"

$globalNavigationCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-global-navigation.ps1")).Count
Assert-True ($globalNavigationCount -eq 1) "smoke suite includes Global Navigation exactly once"

Write-Host "[OK] CodexForge Header Dedupe smoke passed."
