param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Message
  )

  Assert-True $Haystack.Contains($Needle) $Message
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Message
  )

  Assert-True (-not [regex]::IsMatch($Haystack, $Pattern)) $Message
}

function Assert-InOrder {
  param(
    [AllowEmptyString()][string]$Text,
    [string[]]$Needles,
    [string]$Message
  )

  $previousIndex = -1
  foreach ($needle in $Needles) {
    $nextIndex = $Text.IndexOf(
      $needle,
      $previousIndex + 1,
      [System.StringComparison]::Ordinal
    )
    Assert-True ($nextIndex -gt $previousIndex) "$($Message): $needle"
    $previousIndex = $nextIndex
  }
}

function Get-Text {
  param([string]$RelativePath)

  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

function Assert-PowerShellParses {
  param([string]$RelativePath)

  $tokens = $null
  $parseErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $RelativePath),
    [ref]$tokens,
    [ref]$parseErrors
  ) | Out-Null
  Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $RelativePath"
}

function Assert-NoGitDiff {
  param([string]$RelativePath, [string]$Message)

  $worktreeDiff = ((& git -c core.safecrlf=false diff --name-only -- $RelativePath 2>$null) | Out-String).Trim()
  $indexDiff = ((& git -c core.safecrlf=false diff --cached --name-only -- $RelativePath 2>$null) | Out-String).Trim()
  Assert-True (
    [string]::IsNullOrWhiteSpace($worktreeDiff) -and
    [string]::IsNullOrWhiteSpace($indexDiff)
  ) $Message
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase B unified Jarvis product experience ==="

$expectedDirtyPaths = @(
  "src/app/athena/page.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "src/lib/codexforge/navigation-shell/primary-product-area-model.ts",
  "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx",
  "src/lib/codexforge/navigation-shell/navigation-route-registry.ts",
  "src/lib/codexforge/command-palette/command-registry.ts",
  "src/lib/codexforge/navigation/codexforge-routes.ts",
  "src/lib/codexforge/cockpit-navigation-cleanup-user-ux/components/CockpitNavigationCleanupUserUxPanel.tsx",
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1"
)

$requiredFiles = @(
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-command-palette.ps1",
  "src/app/jarvis/page.tsx",
  "src/app/jarvis/page-client.tsx",
  "src/app/athena/page.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "src/lib/codexforge/navigation-shell/primary-product-area-model.ts",
  "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx",
  "src/lib/codexforge/navigation-shell/navigation-route-registry.ts",
  "src/lib/codexforge/command-palette/command-registry.ts",
  "src/lib/codexforge/navigation/codexforge-routes.ts",
  "src/lib/codexforge/cockpit-navigation-cleanup-user-ux/components/CockpitNavigationCleanupUserUxPanel.tsx",
  "src/lib/codexforge/private-alpha/private-alpha-api-client.ts",
  "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
)

foreach ($path in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $path) -PathType Leaf) "Required source fixture exists: $path"
}
Assert-PowerShellParses "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1"

Assert-True ($expectedDirtyPaths.Count -eq 23) "Macro Phase B manifest declares exactly twenty-three paths"
Assert-True (@($expectedDirtyPaths | Sort-Object -Unique).Count -eq 23) "Macro Phase B manifest paths are unique"
$changedPaths = @(
  (& git status --short --untracked-files=all 2>$null) |
    Where-Object { $_.Length -ge 4 } |
    ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } |
    Sort-Object -Unique
)
Assert-True ($changedPaths.Count -eq $expectedDirtyPaths.Count) "Git scope contains exactly the twenty-three Macro Phase B paths"
foreach ($path in $changedPaths) {
  Assert-True ($expectedDirtyPaths -contains $path) "Git dirty path is approved for Macro Phase B: $path"
}
foreach ($path in $expectedDirtyPaths) {
  Assert-True ($changedPaths -contains $path) "Git dirty scope includes the planned path: $path"
}

$privateAlphaTestRoot = Join-Path $root ".codexforge/private-alpha-tests"
$privateAlphaTestInventory = @()
if (Test-Path -LiteralPath $privateAlphaTestRoot -PathType Container) {
  $privateAlphaTestInventory = @(Get-ChildItem -LiteralPath $privateAlphaTestRoot -Force)
}
Assert-True ($privateAlphaTestInventory.Count -eq 0) ".codexforge/private-alpha-tests is absent or empty"

$jarvisPage = Get-Text "src/app/jarvis/page.tsx"
$jarvisPageClient = Get-Text "src/app/jarvis/page-client.tsx"
$athenaPage = Get-Text "src/app/athena/page.tsx"
$productShell = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx"
$commandCenter = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx"
$livePanel = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx"
$runPanel = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
$productCss = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css"
$primaryAreaModel = Get-Text "src/lib/codexforge/navigation-shell/primary-product-area-model.ts"
$sidebar = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx"
$mobileNav = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx"
$appShell = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx"
$navigationRegistry = Get-Text "src/lib/codexforge/navigation-shell/navigation-route-registry.ts"
$commandRegistry = Get-Text "src/lib/codexforge/command-palette/command-registry.ts"
$routeCatalog = Get-Text "src/lib/codexforge/navigation/codexforge-routes.ts"
$cockpitPanel = Get-Text "src/lib/codexforge/cockpit-navigation-cleanup-user-ux/components/CockpitNavigationCleanupUserUxPanel.tsx"
$apiClient = Get-Text "src/lib/codexforge/private-alpha/private-alpha-api-client.ts"
$storeSource = Get-Text "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
$aggregate = Get-Text "scripts/smoke-codexforge-all.ps1"
$legacyCommandPaletteSmoke = Get-Text "scripts/smoke-codexforge-command-palette.ps1"

Assert-True ($jarvisPage.Trim() -eq 'export { default } from "./page-client";') "/jarvis keeps the canonical page-client render"
Assert-Contains $jarvisPageClient 'return <JarvisUnifiedProductPageClientShell surfaceId="jarvis" />;' "/jarvis selects the Jarvis unified product surface"
Assert-Contains $productShell 'const isPrimaryAthenaSurface = context.surface.id === "jarvis" && !context.route;' "Unified shell recognizes the canonical /jarvis surface"
Assert-True (([regex]::Matches($productShell, 'displayMode="live-product"')).Count -eq 1) "Canonical shell selects live-product exactly once"
Assert-Contains $livePanel 'data-codexforge-jarvis-product-experience="canonical"' "/jarvis renders the canonical Phase B product marker"
Assert-Contains $livePanel 'data-codexforge-athena-display-mode="live-product"' "Internal Athena router identity remains on the live Jarvis product"
Assert-Contains $livePanel '<h1 id="jarvis-workspace-title" className={styles.liveAthenaTitle}>' "Canonical workspace has a labelled product heading"
Assert-Contains $livePanel 'Jarvis Workspace' "Canonical workspace uses the Jarvis product name"
Assert-NotMatches ($jarvisPage + $jarvisPageClient) 'redirect\(' "/jarvis does not redirect away from the canonical product"

Assert-Contains $athenaPage 'import { redirect } from "next/navigation";' "/athena uses the established server redirect primitive"
Assert-True (([regex]::Matches($athenaPage, 'redirect\("/jarvis"\);')).Count -eq 1) "/athena redirects exactly once to /jarvis"
Assert-NotMatches $athenaPage 'redirect\("/athena"\)' "/athena has no self redirect"
Assert-NotMatches $athenaPage '(?m)^\s*"use client";' "/athena compatibility route is server-owned"
Assert-NotMatches $athenaPage '(?m)^\s*export \{ default \}' "/athena no longer executes a duplicate page re-export"
Assert-NotMatches $athenaPage 'PrivateAlphaRunPanel|JarvisUnifiedProductPageClientShell|AthenaLiveCommandCenterPanel' "/athena mounts no product client or run panel"

$liveReturnIndex = $commandCenter.IndexOf('if (displayMode === "live-product") {', [System.StringComparison]::Ordinal)
$liveComponentIndex = $commandCenter.IndexOf('return <AthenaLiveCommandCenterPanel />;', [System.StringComparison]::Ordinal)
$legacyRunPanelIndex = $commandCenter.LastIndexOf('<PrivateAlphaRunPanel />', [System.StringComparison]::Ordinal)
Assert-True (
  $liveReturnIndex -ge 0 -and
  $liveComponentIndex -gt $liveReturnIndex -and
  $legacyRunPanelIndex -gt $liveComponentIndex
) "Live-product route returns before the retained legacy preview branch"
Assert-True (([regex]::Matches($livePanel, '<PrivateAlphaRunPanel\s*/>')).Count -eq 1) "Reachable live Jarvis product mounts PrivateAlphaRunPanel exactly once"
Assert-True (([regex]::Matches($runPanel, 'fetchPrivateAlphaStatus\(\)')).Count -eq 1) "One run panel owns the single status refresh call site"
Assert-Contains $runPanel 'useEffect(() => {' "Status refresh remains effect-owned"
Assert-Contains $runPanel 'void refreshPanel();' "Status loads once when the run panel mounts"
Assert-NotMatches ($athenaPage + $productShell + $commandCenter + $livePanel + $runPanel) 'setInterval\s*\(' "Route consolidation introduces no interval polling"

$landmarkBlock = [regex]::Match(
  $livePanel,
  '(?s)const JARVIS_FLOW_LANDMARKS = \[(.*?)\] as const;'
).Groups[1].Value
Assert-True (-not [string]::IsNullOrWhiteSpace($landmarkBlock)) "Jarvis flow landmark fixture is present"
Assert-InOrder $landmarkBlock @(
  '{ href: "#jarvis-task-workspace", label: "Start / Task" }',
  '{ href: "#jarvis-model-data-boundary", label: "Model & Data" }',
  '{ href: "#jarvis-current-run", label: "Current Run" }',
  '{ href: "#jarvis-plan-approval", label: "Next Action / Approval" }',
  '{ href: "#jarvis-result-output", label: "Result / Output" }',
  '{ href: "#jarvis-activity-audit", label: "Activity / Audit" }'
) "Jarvis flow landmarks retain the normal-user sequence"
Assert-Contains $livePanel 'label: "Current project"' "Jarvis identifies the current project"
Assert-Contains $livePanel 'value: "Current CodexForge project"' "Jarvis names the active workspace"
Assert-Contains $runPanel 'id="jarvis-task-workspace"' "Jarvis exposes one task workspace landmark"
Assert-Contains $runPanel 'id="jarvis-start-task"' "Task composer landmark remains directly reachable"
Assert-Contains $runPanel '<p className={styles.panelEyebrow}>Task</p>' "Task input has a feature-level label"
Assert-Contains $runPanel 'Describe one task' "Task input tells the user what to enter"
Assert-Contains $runPanel 'id="jarvis-model-data-boundary"' "Model and data-boundary status remains directly reachable"
Assert-Contains $runPanel 'role="group"' "Model and data-boundary facts are exposed as one labelled group"
Assert-Contains $runPanel 'const displayedProviderId: PrivateAlphaManualProviderId =' "Displayed provider ID remains limited to executable providers"
Assert-Contains $runPanel '? currentRunClassification.target.providerId' "Executable-run badge derives from the persisted classified target"
Assert-Contains $runPanel 'label: "Historical run",' "Historical runs receive a neutral non-executable badge"
Assert-Contains $runPanel 'const displayedProviderLabel = currentRunProviderLabel ?? selectedProviderLabel;' "Active-run status prefers the persisted provider"
Assert-Contains $runPanel 'const displayedModelLabel = currentRunModelLabel ?? selectedModelLabel;' "Active-run status prefers the persisted model"
Assert-Contains $runPanel 'currentRunDataBoundaryLabel ?? selectedDataBoundaryLabel;' "Active-run status prefers the persisted data boundary"
Assert-Contains $runPanel 'currentRunApprovalModeLabel ?? selectedApprovalModeLabel;' "Active-run status prefers the persisted approval mode"
Assert-Contains $runPanel 'id="jarvis-current-run"' "Current execution and progress remains directly reachable"
Assert-Contains $runPanel 'What is happening now' "Current run has an understandable operator heading"
Assert-Contains $runPanel 'id="jarvis-plan-approval"' "Plan and approval action remains directly reachable"
Assert-Contains $runPanel 'Review and take the next action' "Approval panel explains the next operator action"
Assert-Contains $runPanel 'id="jarvis-result-output"' "Result and output remains directly reachable"
Assert-Contains $runPanel 'Output from this run' "Result panel uses an understandable operator heading"
Assert-Contains $runPanel 'id="jarvis-activity-audit"' "Activity and audit remains directly reachable"
Assert-Contains $runPanel 'Run history and audit' "Audit area uses an understandable operator heading"
Assert-Contains $runPanel 'id="jarvis-technical-details"' "Technical details remain available below the normal workflow"
Assert-Contains $runPanel 'data-codexforge-private-alpha-current-run="true"' "Current run has a stable responsive-order marker"
Assert-Contains $livePanel 'href="/jarvis#jarvis-task-workspace"' "Review tools provide a clear return to the always-visible main task workspace"

foreach ($workflowMarker in @(
  'data-codexforge-private-alpha-composer="true"',
  'data-codexforge-private-alpha-current-run="true"',
  'data-codexforge-private-alpha-next-action="true"',
  'data-codexforge-private-alpha-result="true"'
)) {
  Assert-True (([regex]::Matches($runPanel, [regex]::Escape($workflowMarker))).Count -eq 1) "Workflow marker occurs exactly once: $workflowMarker"
}
$workflowStart = $runPanel.IndexOf(
  'data-codexforge-private-alpha-has-current-run=',
  [System.StringComparison]::Ordinal
)
$workflowEnd = $runPanel.IndexOf(
  'id="jarvis-activity-audit"',
  $workflowStart,
  [System.StringComparison]::Ordinal
)
Assert-True ($workflowStart -ge 0 -and $workflowEnd -gt $workflowStart) "Bounded workflow DOM fixture is extractable"
$workflowBlock = $runPanel.Substring($workflowStart, $workflowEnd - $workflowStart)
Assert-InOrder $workflowBlock @(
  'className={styles.privateAlphaTaskColumn}',
  'data-codexforge-private-alpha-composer="true"',
  'className={styles.privateAlphaSideColumn}',
  'data-codexforge-private-alpha-current-run="true"',
  'data-codexforge-private-alpha-next-action="true"',
  'className={styles.privateAlphaResultColumn}',
  'data-codexforge-private-alpha-result="true"'
) "Workflow DOM and screen-reader order is Task, Current Run, Next Action, then Result"
Assert-InOrder $runPanel @(
  'id="jarvis-task-workspace"',
  'id="jarvis-model-data-boundary"',
  'id="jarvis-current-run"',
  'id="jarvis-plan-approval"',
  'id="jarvis-result-output"',
  'id="jarvis-activity-audit"',
  'id="jarvis-technical-details"'
) "Jarvis semantic landmarks keep Task, Model and Data, Current Run, Next Action, Result, and Audit or Technical Details in order"

foreach ($destination in @(
  'href: "/files"',
  'href: "/patch-preview-workbench"',
  'href: "/validation"',
  'href: "/jarvis-audit"',
  'href: "/jarvis-safety"',
  'href: "/jarvis-video"',
  'href: "/ai-providers"'
)) {
  Assert-Contains $livePanel $destination "Jarvis review destination remains available: $destination"
}
Assert-InOrder $livePanel @(
  'title: "Project Files"',
  'title: "Files & Changes"',
  'title: "Validation"',
  'title: "Activity & Audit"',
  'title: "Safety & Settings"',
  'title: "Video Studio"',
  'title: "Provider Details"'
) "Review destinations keep workflow tools ahead of technical details"

$primaryAreaBlock = [regex]::Match(
  $primaryAreaModel,
  '(?s)export const CODEXFORGE_PRIMARY_PRODUCT_AREAS:[^=]+?= \[(.*?)\] as const;'
).Groups[1].Value
Assert-True (-not [string]::IsNullOrWhiteSpace($primaryAreaBlock)) "Primary product-area fixture is extractable"
Assert-True (([regex]::Matches($primaryAreaBlock, 'href: "/jarvis"')).Count -eq 1) "Primary navigation contains one normal Jarvis workspace entry"
Assert-Contains $primaryAreaBlock '{ label: "Build with Jarvis", href: "/jarvis"' "Primary workspace entry uses a feature-level Jarvis label"
Assert-NotMatches $primaryAreaBlock 'href: "/(?:ai|athena)"|label: "Athena"' "Primary navigation contains no competing legacy AI or Athena workspace"
Assert-NotMatches $primaryAreaBlock 'Developer Diagnostics|phase checkpoint' "Developer and phase diagnostics are absent from the primary product array"
Assert-Contains $sidebar 'CODEXFORGE_PRIMARY_PRODUCT_AREAS.map' "Desktop primary navigation is rendered from the bounded product-area model"
Assert-Contains $mobileNav 'CODEXFORGE_PRIMARY_PRODUCT_AREAS.flatMap' "Mobile primary navigation is rendered from the same bounded product-area model"
Assert-Contains $sidebar 'aria-current={route.href === activeHref ? "page" : undefined}' "Desktop navigation exposes the active route"
Assert-Contains $mobileNav 'aria-current={route.href === activeHref ? "page" : undefined}' "Mobile navigation exposes the active route"
Assert-Contains $sidebar '<summary style={advancedSummary}>Developer Diagnostics</summary>' "Desktop diagnostics remain behind an explicit disclosure"
Assert-Contains $mobileNav '<summary style={developerSummary}>Developer Diagnostics</summary>' "Mobile diagnostics remain behind an explicit disclosure"
Assert-Contains $sidebar '!isPhaseDiagnosticRoute(route)' "Phase routes are filtered from normal desktop navigation"
Assert-Contains $sidebar 'DEVELOPER_ONLY_ROUTE_HREFS' "Legacy cockpit and AI routes remain developer-only in the normal shell"

$primaryRegistryBlock = [regex]::Match(
  $navigationRegistry,
  '(?s)const JARVIS_UNIFIED_PRODUCT_PRIMARY_ROUTE_INPUTS = \[(.*?)\] as const'
).Groups[1].Value
Assert-True (-not [string]::IsNullOrWhiteSpace($primaryRegistryBlock)) "Unified primary route fixture remains registered"
Assert-True (([regex]::Matches($primaryRegistryBlock, 'href: "/jarvis"')).Count -eq 1) "Unified route registry contains one canonical Jarvis route"
Assert-Contains $primaryRegistryBlock 'label: "Build with Jarvis"' "Unified route registry uses the canonical Jarvis label"
Assert-NotMatches $primaryRegistryBlock 'href: "/athena"' "Unified primary route registry has no Athena duplicate"
Assert-Contains $navigationRegistry '"/developer-diagnostics-hub-preview": {' "Developer diagnostics deep link remains registered"
Assert-Contains $navigationRegistry '"/phase-route-grouping-preview": {' "Historical phase-route grouping remains registered"
Assert-True (([regex]::Matches($commandRegistry, 'href: "/jarvis"')).Count -eq 1) "Command palette contains one canonical Jarvis workspace command"
Assert-Contains $commandRegistry 'label: "Build with Jarvis"' "Command palette uses the normal Jarvis product label"
Assert-Contains $commandRegistry 'group: "User features"' "Jarvis command is grouped with user features"
Assert-NotMatches $commandRegistry 'href: "/athena"' "Command palette contains no duplicate Athena route command"
Assert-Contains $commandRegistry 'group: "Developer diagnostics"' "Diagnostic commands remain available in the developer group"
$canonicalJarvisCommandBlock = [regex]::Match(
  $commandRegistry,
  '(?s)buildRouteCommand\(availability, \{\s*id: "open-jarvis-command-center",.*?\}\),'
).Value
Assert-True (-not [string]::IsNullOrWhiteSpace($canonicalJarvisCommandBlock)) "Canonical Jarvis command fixture is extractable"
Assert-Contains $canonicalJarvisCommandBlock 'label: "Build with Jarvis"' "Canonical Jarvis command keeps the product label"
Assert-Contains $canonicalJarvisCommandBlock 'group: "User features"' "Canonical Jarvis command remains a user feature"
Assert-Contains $canonicalJarvisCommandBlock 'href: "/jarvis"' "Canonical Jarvis command targets /jarvis"
$legacyWorkspaceCommandBlock = [regex]::Match(
  $commandRegistry,
  '(?s)const JARVIS_UNIFIED_WORKSPACE_SHELL_PRIMARY_ROUTE_COMMANDS =(.*?)const JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_AVAILABILITY ='
).Groups[1].Value
Assert-True (-not [string]::IsNullOrWhiteSpace($legacyWorkspaceCommandBlock)) "Legacy workspace command expansion is extractable"
Assert-InOrder $legacyWorkspaceCommandBlock @(
  'JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES.filter(',
  '(workspace) => workspace.routeHref !== "/jarvis"',
  ').map((workspace) => ({'
) "Legacy workspace command expansion excludes the canonical Jarvis route before mapping commands"
$compatibilityMarker = '// Historical source-smoke marker only: Go to AI Workspace.'
Assert-True (([regex]::Matches($commandRegistry, [regex]::Escape('Go to AI Workspace'))).Count -eq 1) "Historical command-palette phrase occurs exactly once"
Assert-True (
  ([regex]::Matches(
    $commandRegistry,
    '(?m)^\s*// Historical source-smoke marker only: Go to AI Workspace\.\s*$'
  )).Count -eq 1
) "Historical command-palette phrase is anchored to one inert comment"
Assert-Contains $commandRegistry $compatibilityMarker "Compatibility marker text remains explicit"
Assert-True (([regex]::Matches($commandRegistry, 'id: "go-ai-workspace"')).Count -eq 1) "Legacy AI workspace command ID occurs exactly once"
$legacyAiCommandBlock = [regex]::Match(
  $commandRegistry,
  '(?s)buildRouteCommand\(availability, \{\s*id: "go-ai-workspace",.*?\}\),'
).Value
Assert-True (-not [string]::IsNullOrWhiteSpace($legacyAiCommandBlock)) "Legacy AI workspace command fixture is extractable"
Assert-NotMatches $legacyAiCommandBlock '"Go to AI Workspace"' "Compatibility marker creates no executable command label"
Assert-Contains $legacyAiCommandBlock 'label: "Open legacy AI Workspace"' "Legacy AI command uses an explicit diagnostic label"
Assert-Contains $legacyAiCommandBlock 'group: "Developer diagnostics"' "Legacy AI command stays in developer diagnostics"
Assert-Contains $legacyAiCommandBlock 'href: "/ai"' "Legacy AI command targets only the retained /ai route"
Assert-Contains $legacyCommandPaletteSmoke '"Go to AI Workspace",' "Historical command-palette smoke assertion remains present"
Assert-NoGitDiff "scripts/smoke-codexforge-command-palette.ps1" "Historical command-palette smoke is unmodified, so its assertion is not weakened"
Assert-True (([regex]::Matches($routeCatalog, 'path: "/jarvis"')).Count -eq 1) "Global route catalog contains one canonical Jarvis route"
Assert-Contains $routeCatalog 'label: "Build with Jarvis"' "Global route catalog uses the Jarvis product label"
Assert-NotMatches $routeCatalog 'path: "/athena"' "Global normal route catalog contains no Athena duplicate"
Assert-True (
  [regex]::IsMatch(
    $routeCatalog,
    '(?s)id: "cockpit".*?path: "/codexforge-cockpit".*?showInGlobalNav: false'
  ) -and
  [regex]::IsMatch(
    $routeCatalog,
    '(?s)id: "workspace".*?path: "/ai".*?showInGlobalNav: false'
  )
) "Historical cockpit and AI workspace routes remain accessible but hidden from global navigation"
Assert-Contains $cockpitPanel '<summary style={diagnosticsSummary}>Developer Diagnostics</summary>' "Cockpit retains an explicit diagnostics area"
Assert-Contains $cockpitPanel 'href="/developer-diagnostics-hub-preview"' "Cockpit retains the diagnostic hub deep link"
Assert-Contains $cockpitPanel 'href: "/jarvis",' "Cockpit provides a clear route back to Jarvis"
Assert-Contains $cockpitPanel 'label: "Return to Jarvis",' "Cockpit labels the return to the main Jarvis task flow"

Assert-Contains $livePanel 'aria-labelledby="jarvis-workspace-title"' "Jarvis product heading labels its workspace region"
Assert-Contains $livePanel 'aria-label="Jarvis workspace sections"' "Jarvis flow navigation has an accessible label"
Assert-Contains $livePanel 'aria-label="Jarvis review destinations"' "Jarvis review shortcuts have an accessible label"
Assert-Contains $livePanel '<nav' "Detailed review destinations use navigation semantics"
Assert-Contains $livePanel 'aria-label="Jarvis project and review tools"' "Detailed review destinations have an accessible label"
Assert-Contains $runPanel 'aria-label="Jarvis task, approval, and execution workspace"' "Task workspace has an accessible label"
Assert-Contains $runPanel 'aria-busy={loadState === "loading" || actionInFlight !== null}' "Loading and action state is exposed accessibly"
Assert-Contains $runPanel '<label className={styles.privateAlphaField} htmlFor={requestFieldId}>' "Task textarea has a programmatic label"
Assert-Contains $runPanel '<textarea' "Jarvis exposes one real task textarea"
Assert-Contains $runPanel 'hidden={currentRun !== null}' "Active runs remove the locked composer from visual, accessibility, and keyboard order"
Assert-Contains $productCss '.privateAlphaSection[hidden] {' "Hidden workflow sections have an explicit CSS contract"
Assert-Contains $productCss 'display: none;' "Hidden composer is removed from layout"
Assert-Contains $runPanel 'aria-live="assertive"' "Error state is announced assertively"
Assert-Contains $runPanel 'aria-live="polite"' "Loading and success state is announced politely"
Assert-Contains $runPanel 'role="tablist"' "Run views use tab-list semantics"
Assert-Contains $runPanel 'role="tab"' "Run view controls use tab semantics"
Assert-Contains $runPanel 'role="tabpanel"' "Run view content uses tab-panel semantics"
Assert-Contains $runPanel 'aria-selected={isSelected}' "Selected tab state is exposed"
Assert-True ([regex]::IsMatch($runPanel, 'aria-controls=\{\x60\$\{tabBaseId\}-panel\x60\}')) "Every tab identifies the stable mounted panel"
Assert-True ([regex]::IsMatch($runPanel, 'id=\{\x60\$\{tabBaseId\}-panel\x60\}')) "Run views keep one stable mounted panel ID"
Assert-Contains $runPanel 'tabIndex={isSelected ? 0 : -1}' "Tabs implement roving focus"
Assert-Contains $runPanel 'function handlePanelTabKeyDown(' "Tabs provide a bounded keyboard handler"
foreach ($key in @('"ArrowRight"', '"ArrowLeft"', '"Home"', '"End"')) {
  Assert-Contains $runPanel ('event.key === ' + $key) "Tab keyboard navigation supports $key"
}
Assert-Contains $productCss '.jarvisFlowLink:focus-visible,' "Flow links retain visible keyboard focus"
Assert-Contains $productCss '.privateAlphaTab:focus-visible,' "Run-view tabs retain visible keyboard focus"
Assert-Contains $productCss '@media (prefers-reduced-motion: reduce)' "Reduced-motion preferences are respected"

$media1180Start = $productCss.IndexOf('@media (max-width: 1180px)', [System.StringComparison]::Ordinal)
$media920Start = $productCss.IndexOf('@media (max-width: 920px)', [System.StringComparison]::Ordinal)
$media640Start = $productCss.IndexOf('@media (max-width: 640px)', [System.StringComparison]::Ordinal)
$media380Start = $productCss.IndexOf('@media (max-width: 380px)', [System.StringComparison]::Ordinal)
Assert-True ($media1180Start -ge 0 -and $media920Start -gt $media1180Start -and $media640Start -gt $media920Start -and $media380Start -gt $media640Start) "Jarvis CSS defines ordered 1180px, 920px, 640px, and 380px responsive contracts"
$media1180Block = $productCss.Substring($media1180Start, $media920Start - $media1180Start)
$media920Block = $productCss.Substring($media920Start, $media640Start - $media920Start)
$media640Block = $productCss.Substring($media640Start, $media380Start - $media640Start)
$media380Block = $productCss.Substring($media380Start)
$desktopCssBlock = $productCss.Substring(0, $media1180Start)
Assert-True (
  [regex]::IsMatch(
    $desktopCssBlock,
    '(?s)\.privateAlphaWorkspace\s*\{\s*display:\s*grid;\s*grid-template-columns:[^;]+;\s*grid-template-areas:\s*"task side"\s*"result side";'
  )
) "Desktop workflow preserves independent task/result and current/action columns with CSS grid areas"
foreach ($gridAreaContract in @(
  @{ ClassName = "privateAlphaTaskColumn"; Area = "task" },
  @{ ClassName = "privateAlphaSideColumn"; Area = "side" },
  @{ ClassName = "privateAlphaResultColumn"; Area = "result" }
)) {
  Assert-True (
    [regex]::IsMatch(
      $desktopCssBlock,
      ('(?s)\.' + $gridAreaContract.ClassName + '\s*\{\s*grid-area:\s*' + $gridAreaContract.Area + ';\s*\}')
    )
  ) "Desktop workflow maps $($gridAreaContract.ClassName) to $($gridAreaContract.Area)"
}
Assert-True (
  [regex]::IsMatch(
    $desktopCssBlock,
    '(?s)\.privateAlphaWorkspace\[data-codexforge-private-alpha-has-current-run="true"\]\s*\{\s*grid-template-areas:\s*"result side";\s*\}'
  )
) "Active-run desktop layout removes the empty task row"
Assert-True (
  [regex]::IsMatch(
    $desktopCssBlock,
    '(?s)\.privateAlphaWorkspace\[data-codexforge-private-alpha-has-current-run="true"\]\s*\.privateAlphaTaskColumn\s*\{\s*display:\s*none;\s*\}'
  )
) "Active-run desktop layout hides the empty task wrapper"
Assert-Contains $media920Block '.privateAlphaWorkspace {' "Narrow desktop contract targets the workflow layout"
Assert-Contains $media920Block 'display: flex;' "Narrow workflow uses a single flex column"
Assert-Contains $media920Block 'flex-direction: column;' "Narrow workflow follows the corrected DOM order"
Assert-InOrder $media920Block @(
  '.privateAlphaTaskColumn,',
  '.privateAlphaSideColumn,',
  '.privateAlphaResultColumn {',
  'display: contents;'
) "Responsive column wrappers release Task, Current Run, Next Action, and Result in DOM order"
Assert-NotMatches $media920Block '(?m)^\s*order\s*:' "Responsive workflow contains no CSS order override that could diverge from screen-reader order"
Assert-Contains $media1180Block '.jarvisWorkspaceHeroLayout {' "Medium desktop contract stacks the workspace hero"
Assert-Contains $media1180Block 'grid-template-columns: repeat(3, minmax(0, 1fr));' "Medium desktop flow landmarks use three readable columns"
Assert-Contains $media640Block 'grid-template-columns: repeat(2, minmax(0, 1fr));' "Mobile facts and flow remain compact without clipping"
Assert-Contains $media640Block 'width: 100%;' "Mobile controls expand to usable width"
Assert-Contains $media640Block 'flex: 1 1 120px;' "Mobile run-view tabs stay horizontal and wrapping for Left/Right semantics"
Assert-Contains $media380Block 'grid-template-columns: 1fr;' "Very narrow screens collapse facts and flow to one column"
Assert-Contains $appShell '@media (max-width: 859px)' "Unified shell defines its narrow-screen breakpoint"
Assert-Contains $appShell 'grid-template-columns: minmax(0, 1fr) !important;' "Unified shell becomes one column on narrow screens"
Assert-Contains $mobileNav '@media (min-width: 860px)' "Mobile navigation is bounded to compact screens"

Assert-Contains $livePanel 'value: "ollama-local::gpt-oss:20b"' "Jarvis displays the exact default local model"
Assert-Contains $livePanel 'value: "Local machine by default"' "Jarvis displays the local-machine data boundary"
Assert-Contains $livePanel 'value: "Manual approval, then separate execute"' "Jarvis displays the approval and execution boundary"
Assert-Contains $livePanel '4096-token ceiling' "Jarvis displays the exact local output ceiling"
Assert-Contains $livePanel 'capped at 512' "Jarvis displays the Groq 512-token envelope"
Assert-Contains $livePanel 'Nothing approves or runs automatically.' "Jarvis displays the no-automatic-action safety posture"
Assert-Contains $runPanel 'role="note"' "Always-visible safety invariants are exposed as a note"
Assert-Contains $runPanel 'One execution attempt only. No paid execution, retry, fallback, rerouting' "Always-visible safety note preserves one attempt and no paid/retry/fallback/rerouting"
Assert-Contains $runPanel 'after persistence, or provider/model substitution. Both kill-switch' "Always-visible safety note preserves no substitution and both checkpoints"
Assert-Contains $runPanel 'checkpoints remain active, provider and credential checks stay server-only,' "Always-visible safety note preserves server-only checks"
Assert-Contains $runPanel 'and approval and execution always require separate manual actions.' "Always-visible safety note preserves separate manual actions"
Assert-Contains $runPanel 'Approval and' "Jarvis keeps approval guidance visible"
Assert-Contains $runPanel 'execution remain two separate operator actions.' "Jarvis keeps execution separate from approval"
Assert-Contains $runPanel 'data-codexforge-private-alpha-cloud-acknowledgement="required"' "Cloud-transfer acknowledgement remains explicit"
Assert-Contains $runPanel 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Cloud execution acknowledgement remains explicit and separate"
Assert-Contains $runPanel 'data-codexforge-private-alpha-groq-free-tier-execution-confirmation="required"' "Groq Free-tier execution confirmation remains explicit"
Assert-Contains $runPanel 'this run allows one execution attempt' "Local execution states the one-attempt boundary"
Assert-Contains $runPanel 'local-machine data boundary' "Local execution names its data boundary"
Assert-Contains $runPanel 'Nothing retries or reroutes automatically.' "Failure guidance preserves no retry or reroute"
Assert-Contains $runPanel 'there is no automatic routing, retry, or fallback.' "Cloud execution preserves no routing, retry, or fallback"
Assert-Contains $runPanel 'data-codexforge-jarvis-start-another-task="isolated-reset"' "Start another task remains a deliberate isolated reset"
Assert-Contains $runPanel 'Start another task' "Jarvis tells the user how to continue after a terminal run"
Assert-True (([regex]::Matches($runPanel, 'Refresh run status')).Count -ge 2) "Both read-only refresh actions use normal product language"
Assert-True (([regex]::Matches($runPanel, 'disabled=\{loadState === "loading" \|\| actionInFlight !== null\}')).Count -ge 2) "Both refresh actions disable while status is loading"
Assert-Contains $runPanel 'className={styles.privateAlphaButton}' "Terminal Start another task remains a primary action"

$browserProductSources = ($jarvisPageClient, $livePanel, $runPanel) -join [Environment]::NewLine
Assert-NotMatches $browserProductSources 'qwen2\.5-coder|ollama-local::qwen|Qwen' "Qwen remains absent from Jarvis and its selectors"
Assert-NotMatches $browserProductSources '127\.0\.0\.1:11434|/api/chat|api\.groq\.com' "Browser product source contains no direct provider endpoint"
Assert-NotMatches $browserProductSources 'GROQ_API_KEY|OLLAMA_API_KEY|process\.env|Authorization\s*:|Bearer\s+' "Browser product source contains no provider credential access"
Assert-NotMatches $browserProductSources '\bfetch\s*\(' "Jarvis UI components make no raw browser fetch call"
Assert-NotMatches $browserProductSources 'localStorage|sessionStorage|indexedDB|document\.cookie' "Jarvis UI stores no provider or run state in browser storage"
Assert-Contains $apiClient 'const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";' "Browser API client remains same-origin and server-owned"
Assert-NotMatches $apiClient '127\.0\.0\.1:11434|/api/chat|api\.groq\.com|GROQ_API_KEY|process\.env' "Browser API client remains provider- and credential-agnostic"

foreach ($protectedPath in @(
  "src/app/api/codexforge/private-alpha",
  "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-free-first-routing.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts",
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "src/lib/codexforge/model-routing/model-routing-policy.server.ts",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json"
)) {
  Assert-NoGitDiff $protectedPath "Protected backend/configuration ownership remains unchanged: $protectedPath"
}
Assert-Contains $apiClient 'approvePrivateAlphaRun' "Browser client preserves a separate explicit approval action"
Assert-Contains $apiClient 'executePrivateAlphaRun' "Browser client preserves a separate explicit execution action"
Assert-Contains $storeSource '"This run has already started its one allowed execution attempt."' "Server store still rejects a second execution attempt"
Assert-True (([regex]::Matches($storeSource, 'readSafeKillSwitchState\(paths\)')).Count -ge 3) "Server store preserves status and both execution kill-switch checkpoints"

$releaseBlock = [regex]::Match(
  $aggregate,
  '(?s)\$currentReleaseGateScripts = @\((.*?)\r?\n\)'
).Groups[1].Value
$releaseEntries = @(
  $releaseBlock -split "\r?\n" |
    Where-Object { $_ -match '^\s*@\{ Name = ".*"; File = .*; Required = \$(?:true|false) \},?$' }
)
Assert-True ($releaseEntries.Count -eq 70) "Aggregate executable count is 70"
Assert-True (@($releaseEntries | Where-Object { $_ -match 'Required = \$true' }).Count -eq 67) "Aggregate required count is 67"
Assert-True (@($releaseEntries | Where-Object { $_ -match 'Required = \$false' }).Count -eq 3) "Aggregate optional count remains 3"
$phaseBNeedle = 'File = "smoke-codexforge-unified-jarvis-product-experience.ps1"; Required = $true'
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($phaseBNeedle))).Count -eq 1) "Macro Phase B smoke is registered exactly once as required"
Assert-True (
  [regex]::IsMatch(
    $releaseBlock,
    'Local-First Jarvis Working Product Loop"; File = "smoke-codexforge-local-first-jarvis-working-product-loop\.ps1"; Required = \$true \},\r?\n\s*@\{ Name = "Unified Jarvis Product Experience"; File = "smoke-codexforge-unified-jarvis-product-experience\.ps1"; Required = \$true'
  )
) "Macro Phase B is registered immediately after Macro Phase A"
Assert-NotMatches $releaseBlock 'qualify-codexforge-qwen2-5-coder-32b-installed-candidate|run-codexforge-qwen2-5-coder-32b-controlled-live-acceptance|smoke-codexforge-private-alpha-manual-groq-execution-foundation|smoke-codexforge-groq-live-qualification-admission' "Live and manual provider scripts remain outside the aggregate gate"

Write-Host ""
Write-Host "[PASS] CodexForge Macro Phase B unified Jarvis product experience smoke complete."
