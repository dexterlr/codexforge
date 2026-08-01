param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  Assert-True $Haystack.Contains($Needle) $Message
}

function Assert-Matches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  Assert-True ([regex]::IsMatch($Haystack, $Pattern)) $Message
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  Assert-True (-not [regex]::IsMatch($Haystack, $Pattern)) $Message
}

function Assert-InOrder {
  param([AllowEmptyString()][string]$Text, [string[]]$Needles, [string]$Message)
  $previous = -1
  foreach ($needle in $Needles) {
    $next = $Text.IndexOf($needle, $previous + 1, [System.StringComparison]::Ordinal)
    Assert-True ($next -gt $previous) "$($Message): $needle"
    $previous = $next
  }
}

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

function Assert-NoGitDiff {
  param([string]$RelativePath, [string]$Message)
  $worktree = ((& git -c core.safecrlf=false diff --name-only -- $RelativePath 2>$null) | Out-String).Trim()
  $index = ((& git -c core.safecrlf=false diff --cached --name-only -- $RelativePath 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($worktree) -and [string]::IsNullOrWhiteSpace($index)) $Message
}

function Assert-PowerShellParses {
  param([string]$RelativePath)
  $tokens = $null
  $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $RelativePath),
    [ref]$tokens,
    [ref]$errors
  ) | Out-Null
  Assert-True ($errors.Count -eq 0) "PowerShell parses: $RelativePath"
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase C whole-product hardening ==="

$expectedBaseline = "8d30f5c65d5e293ce32d92589277667e37f31dc4"
$expectedDirtyPaths = @(
  "docs/codexforge-macro-phase-c-whole-product-hardening.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "src/app/error.tsx",
  "src/app/files/page.tsx",
  "src/app/files/page-client.tsx",
  "src/app/globals.css",
  "src/app/jarvis-audit/page.tsx",
  "src/app/jarvis-audit/page-client.tsx",
  "src/app/jarvis-safety/page.tsx",
  "src/app/jarvis-safety/page-client.tsx",
  "src/app/jarvis-trading/page.tsx",
  "src/app/jarvis-trading/page-client.tsx",
  "src/app/layout.tsx",
  "src/app/loading.tsx",
  "src/app/not-found.tsx",
  "src/app/page.tsx",
  "src/app/page-client.tsx",
  "src/app/patch-preview-workbench/page.tsx",
  "src/app/patch-preview-workbench/page-client.tsx",
  "src/app/provider-adapters/page.tsx",
  "src/app/provider-adapters/page-client.tsx",
  "src/app/validation/page.tsx",
  "src/app/validation/page-client.tsx",
  "src/app/video-assets/page.tsx",
  "src/app/video-assets/page-client.tsx",
  "src/app/video-projects/page.tsx",
  "src/app/video-projects/page-client.tsx",
  "src/app/video-workflows/page.tsx",
  "src/app/video-workflows/page-client.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApplyApprovalPacketPanel.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApplyExecutionBridgePanel.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApplyValidationCapturePanel.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/command-palette/command-groups.ts",
  "src/lib/codexforge/command-palette/command-registry.ts",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteEmptyState.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteGroup.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteItem.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteSearchBox.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx",
  "src/lib/codexforge/local-project-reader/components/LocalProjectReader.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectFileList.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectReaderEmptyState.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/local-video-workflow-catalog/components/LocalVideoWorkflowCatalogPanel.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeShellBreadcrumbs.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeTopbar.tsx",
  "src/lib/codexforge/navigation-shell/navigation-route-state.ts",
  "src/lib/codexforge/navigation-shell/primary-product-area-model.ts",
  "src/lib/codexforge/normal-product/components/NormalProductFrame.tsx",
  "src/lib/codexforge/normal-product/components/ProductHomePanel.tsx",
  "src/lib/codexforge/normal-product/components/ProductReadinessPanels.tsx",
  "src/lib/codexforge/normal-product/index.ts",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx"
)

Assert-PowerShellParses "scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1"
Assert-True ((& git rev-parse HEAD).Trim() -eq $expectedBaseline) "Macro Phase C remains based on the approved checkpoint"
Assert-True ($expectedDirtyPaths.Count -eq 70) "Phase C manifest declares exactly seventy paths"
Assert-True (@($expectedDirtyPaths | Sort-Object -Unique).Count -eq 70) "Phase C manifest paths are unique"
$changedPaths = @(
  (& git status --short --untracked-files=all 2>$null) |
    Where-Object { $_.Length -ge 4 } |
    ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } |
    Sort-Object -Unique
)
Assert-True ($changedPaths.Count -eq 70) "Git dirty scope contains exactly seventy Phase C paths"
foreach ($path in $changedPaths) { Assert-True ($expectedDirtyPaths -contains $path) "Dirty path is approved: $path" }
foreach ($path in $expectedDirtyPaths) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $path) -PathType Leaf) "Planned path exists: $path"
  Assert-True ($changedPaths -contains $path) "Planned path is present in dirty scope: $path"
}
$cachedPaths = @(& git diff --cached --name-only)
Assert-True ($cachedPaths.Count -eq 0) "Nothing is staged"
Assert-NotMatches ($changedPaths -join "`n") '(?i)(^|/)(package(?:-lock)?\.json|pnpm-lock\.yaml|yarn\.lock|next\.config|tsconfig|\.env|migrations?)(/|$)' "No package, lock, Next, TypeScript, environment, or migration path changed"

$routeModel = Get-Text "src/lib/codexforge/navigation-shell/primary-product-area-model.ts"
$primaryBlock = [regex]::Match($routeModel, '(?s)export const CODEXFORGE_PRIMARY_PRODUCT_AREAS:[^=]+?= \[(.*?)\] as const;').Groups[1].Value
Assert-True (-not [string]::IsNullOrWhiteSpace($primaryBlock)) "Canonical normal-route inventory is extractable"
$inventoryMatches = [regex]::Matches($primaryBlock, '(?m)^\s*\{ label: "[^"]+", href: "([^"]+)"')
$inventoryHrefs = @($inventoryMatches | ForEach-Object { $_.Groups[1].Value })
$expectedRoutes = @(
  "/", "/jarvis", "/video-projects", "/video-assets", "/provider-adapters", "/video-workflows",
  "/jarvis-trading", "/jarvis-audit", "/jarvis-safety", "/files", "/patch-preview-workbench", "/validation"
)
Assert-True ($inventoryHrefs.Count -eq 12) "Canonical normal-route inventory contains exactly twelve routes"
Assert-True (@($inventoryHrefs | Sort-Object -Unique).Count -eq 12) "Canonical normal routes are unique"
Assert-InOrder $primaryBlock $expectedRoutes "Normal-route order is deterministic"
foreach ($route in $expectedRoutes) { Assert-True ($inventoryHrefs -contains $route) "Canonical inventory includes $route" }
Assert-True (@($inventoryHrefs | Where-Object { $_ -eq "/jarvis" }).Count -eq 1) "Normal navigation has one Jarvis entry"
Assert-NotMatches $primaryBlock 'href: "/athena"|label: "Athena"|Developer Diagnostics|phase checkpoint' "Diagnostics and Athena are excluded from the normal route array"
Assert-True (([regex]::Matches($primaryBlock, 'summary: "')).Count -eq 12) "Every normal route declares a purpose"
Assert-True (([regex]::Matches($primaryBlock, 'capabilityState: "')).Count -eq 12) "Every normal route declares an honest capability state"
Assert-True (([regex]::Matches($primaryBlock, 'primaryAction: \{ label: "')).Count -eq 12) "Every normal route declares one primary next action"

$routeOwners = @{
  "/" = @("src/app/page.tsx", "src/app/page-client.tsx")
  "/jarvis" = @("src/app/jarvis/page.tsx", "src/app/jarvis/page-client.tsx")
  "/video-projects" = @("src/app/video-projects/page.tsx", "src/app/video-projects/page-client.tsx")
  "/video-assets" = @("src/app/video-assets/page.tsx", "src/app/video-assets/page-client.tsx")
  "/provider-adapters" = @("src/app/provider-adapters/page.tsx", "src/app/provider-adapters/page-client.tsx")
  "/video-workflows" = @("src/app/video-workflows/page.tsx", "src/app/video-workflows/page-client.tsx")
  "/jarvis-trading" = @("src/app/jarvis-trading/page.tsx", "src/app/jarvis-trading/page-client.tsx")
  "/jarvis-audit" = @("src/app/jarvis-audit/page.tsx", "src/app/jarvis-audit/page-client.tsx")
  "/jarvis-safety" = @("src/app/jarvis-safety/page.tsx", "src/app/jarvis-safety/page-client.tsx")
  "/files" = @("src/app/files/page.tsx", "src/app/files/page-client.tsx")
  "/patch-preview-workbench" = @("src/app/patch-preview-workbench/page.tsx", "src/app/patch-preview-workbench/page-client.tsx")
  "/validation" = @("src/app/validation/page.tsx", "src/app/validation/page-client.tsx")
}
foreach ($route in $expectedRoutes) {
  foreach ($owner in $routeOwners[$route]) {
    Assert-True (Test-Path -LiteralPath (Join-Path $root $owner) -PathType Leaf) "Route $route is reachable in source ownership: $owner"
  }
}

$pageClients = @(
  "src/app/page-client.tsx", "src/app/video-projects/page-client.tsx", "src/app/video-assets/page-client.tsx",
  "src/app/provider-adapters/page-client.tsx", "src/app/video-workflows/page-client.tsx",
  "src/app/jarvis-trading/page-client.tsx", "src/app/jarvis-audit/page-client.tsx",
  "src/app/jarvis-safety/page-client.tsx", "src/app/files/page-client.tsx",
  "src/app/patch-preview-workbench/page-client.tsx", "src/app/validation/page-client.tsx"
)
foreach ($path in $pageClients) {
  $source = Get-Text $path
  Assert-Contains $source "CodexForgeAppShell" "Normal page uses the shared product shell: $path"
  Assert-True (
    $source.Contains("NormalProductFrame") -or $source.Contains("ProductHomePanel")
  ) "Normal page uses the shared title/purpose/action contract: $path"
}
$metadataPages = @(
  "src/app/page.tsx", "src/app/video-projects/page.tsx", "src/app/video-assets/page.tsx",
  "src/app/provider-adapters/page.tsx", "src/app/video-workflows/page.tsx", "src/app/jarvis-trading/page.tsx",
  "src/app/jarvis-audit/page.tsx", "src/app/jarvis-safety/page.tsx", "src/app/files/page.tsx",
  "src/app/patch-preview-workbench/page.tsx", "src/app/validation/page.tsx"
)
foreach ($path in $metadataPages) {
  $source = Get-Text $path
  Assert-Contains $source "export const metadata" "Normal route provides metadata: $path"
  Assert-Contains $source "title:" "Normal route provides a title: $path"
  Assert-Contains $source "description:" "Normal route provides a purpose: $path"
}

$jarvisPage = Get-Text "src/app/jarvis/page.tsx"
$jarvisClient = Get-Text "src/app/jarvis/page-client.tsx"
$athenaPage = Get-Text "src/app/athena/page.tsx"
$livePanel = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx"
$runPanel = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
Assert-True ($jarvisPage.Trim() -eq 'export { default } from "./page-client";') "/jarvis canonical page remains exact"
Assert-Contains $jarvisClient 'return <JarvisUnifiedProductPageClientShell surfaceId="jarvis" />;' "/jarvis remains the single working workspace"
Assert-True (([regex]::Matches($athenaPage, 'redirect\("/jarvis"\);')).Count -eq 1) "/athena redirects exactly once to /jarvis"
Assert-NotMatches $athenaPage 'PrivateAlphaRunPanel|JarvisUnifiedProductPageClientShell|AthenaLiveCommandCenterPanel' "/athena mounts no duplicate workspace"
Assert-True (([regex]::Matches($runPanel, '<PrivateAlphaRunPanel')).Count -eq 0) "Run panel does not recursively duplicate itself"
Assert-InOrder $runPanel @(
  'id="jarvis-task-workspace"',
  'id="jarvis-current-run"',
  'id="jarvis-plan-approval"',
  'id="jarvis-result-output"'
) "Jarvis DOM order remains Task to Current Run to Next Action to Result"
Assert-Contains $livePanel 'href: "/provider-adapters"' "Jarvis provider handoff targets the canonical Providers route"
Assert-NoGitDiff "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx" "Macro A/B run panel and execution system are unchanged"
Assert-NoGitDiff "src/app/jarvis" "Canonical Jarvis route is unchanged"
Assert-NoGitDiff "src/app/athena" "Athena redirect is unchanged"

$sidebar = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx"
$mobileNav = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx"
$breadcrumbs = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeShellBreadcrumbs.tsx"
$topbar = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeTopbar.tsx"
$appShell = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx"
Assert-Contains $sidebar "CODEXFORGE_PRIMARY_PRODUCT_AREAS.map" "Desktop navigation renders the canonical inventory"
Assert-Contains $mobileNav "CODEXFORGE_PRIMARY_PRODUCT_AREAS.flatMap" "Mobile navigation renders the complete canonical inventory"
Assert-Contains $mobileNav 'data-codexforge-mobile-nav-links="all canonical normal routes"' "Narrow navigation keeps all normal routes"
Assert-Contains $sidebar ">Developer Diagnostics</summary>" "Desktop diagnostics remain behind a disclosure"
Assert-Contains $mobileNav ">Developer Diagnostics</summary>" "Mobile diagnostics remain behind a disclosure"
Assert-Contains $breadcrumbs 'aria-current="page"' "Breadcrumb current item is non-circular and announced"
Assert-NotMatches $topbar '<h1' "Shell context does not duplicate the page h1"
Assert-Contains $topbar "@media (max-width: 620px)" "Topbar stacks at narrow widths"
Assert-Contains $appShell "@media (max-width: 520px)" "Product shell has a narrow mobile contract"

$commandRegistry = Get-Text "src/lib/codexforge/command-palette/command-registry.ts"
$commandPalette = Get-Text "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx"
$commandOverlay = Get-Text "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx"
$commandItem = Get-Text "src/lib/codexforge/command-palette/components/CommandPaletteItem.tsx"
$commandSearch = Get-Text "src/lib/codexforge/command-palette/components/CommandPaletteSearchBox.tsx"
$commandEmpty = Get-Text "src/lib/codexforge/command-palette/components/CommandPaletteEmptyState.tsx"
Assert-Contains $commandRegistry 'CODEXFORGE_PRIMARY_PRODUCT_AREAS' "Command palette derives canonical normal targets from the route inventory"
Assert-True (([regex]::Matches($commandRegistry, 'href: "/jarvis"')).Count -eq 1) "Command registry contains one canonical Jarvis action"
Assert-Contains $commandPalette 'command.group === "User features"' "Palette default view is limited to normal user features"
foreach ($route in @("/jarvis", "/jarvis-trading", "/jarvis-audit", "/jarvis-safety")) {
  Assert-Contains $commandRegistry ('"' + $route + '": true') "Dedicated normal command is available by default: $route"
}
Assert-Contains $commandPalette 'startsWith("dev:")' "Diagnostics search requires an explicit developer prefix"
Assert-Contains $commandPalette 'command.group !== "User features"' "Developer search is separated from normal product search"
Assert-Contains $commandPalette 'buildCodexForgeCommandSafetyReport(searchableCommands)' "Palette safety summary describes only the active user or diagnostics command set"
Assert-Contains $commandPalette 'buildCodexForgeCommandPaletteSummary(searchableCommands)' "Palette count describes only the active user or diagnostics command set"
Assert-Contains $commandEmpty '<strong>dev:</strong>' "Empty palette recovery explains the explicit diagnostics prefix"
Assert-Contains $commandRegistry 'group: "Developer diagnostics"' "Historical preview commands are classified as diagnostics"
Assert-Contains $commandOverlay 'role="dialog"' "Command palette exposes dialog semantics"
Assert-Contains $commandOverlay "previousFocus?.focus()" "Command palette restores trigger focus"
Assert-Contains $commandOverlay 'event.key === "Escape"' "Escape closes the command palette"
Assert-Contains $commandOverlay 'event.key !== "Tab"' "Command palette traps focus"
Assert-Contains $commandPalette 'role="listbox"' "Command results expose listbox semantics"
Assert-Contains $commandItem 'role="option"' "Command items expose option semantics"
Assert-Contains $commandItem "scrollIntoView" "Keyboard selection remains visible"
Assert-Contains $commandSearch 'aria-controls="codexforge-command-palette-results"' "Palette search is associated with its results"
Assert-Contains $commandSearch 'role="combobox"' "Palette search exposes combobox semantics"
Assert-Contains $commandSearch 'aria-activedescendant={activeDescendantId}' "Palette announces the active keyboard option"
Assert-InOrder $commandPalette @("rankedCommands", "groups", "visibleCommands") "Keyboard order follows rendered group order"

$frame = Get-Text "src/lib/codexforge/normal-product/components/NormalProductFrame.tsx"
$homeSource = Get-Text "src/lib/codexforge/normal-product/components/ProductHomePanel.tsx"
$readiness = Get-Text "src/lib/codexforge/normal-product/components/ProductReadinessPanels.tsx"
$globals = Get-Text "src/app/globals.css"
$reader = Get-Text "src/lib/codexforge/local-project-reader/components/LocalProjectReader.tsx"
$readerEmpty = Get-Text "src/lib/codexforge/local-project-reader/components/ProjectReaderEmptyState.tsx"
$projectFileList = Get-Text "src/lib/codexforge/local-project-reader/components/ProjectFileList.tsx"
$projectTree = Get-Text "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx"
Assert-Contains $frame '<h1 id={headingId}' "Shared page pattern provides one clear page heading"
Assert-Contains $frame "aria-labelledby={headingId}" "Page regions are labelled"
Assert-Contains $frame 'aria-label={`${area.label} next actions`}' "Primary and secondary actions have a landmark label"
Assert-Contains $frame "@media (max-width: 720px)" "Shared page pattern has a narrow action layout"
Assert-Contains $globals ":focus-visible" "Visible keyboard focus remains global"
Assert-Contains $globals "outline-offset: 2px !important" "Inline component styles cannot suppress keyboard focus"
Assert-Contains $globals "prefers-reduced-motion: reduce" "Reduced motion is respected"
Assert-Contains $globals "button:disabled" "Disabled controls are visibly distinguished"
Assert-Contains $reader 'data-codexforge-project-reader-layout="responsive three-column-to-one-column"' "Files declares a responsive layout"
Assert-Contains $reader "@media (max-width: 760px)" "Files collapses to one column on mobile"
Assert-NotMatches $reader '<main' "Files avoids a nested main landmark"
Assert-Contains $reader "Approved root:" "Files exposes the bounded selected root"
Assert-Contains $reader 'role="status" aria-live="polite"' "Files exposes asynchronous status changes"
Assert-Contains $reader 'aria-busy={loadingSnapshot || loadingPreview}' "Files announces read-only loading activity"
Assert-Contains $reader 'Preview ready for ${selectedPath}.' "Files announces selected-file preview completion"
Assert-Contains $readerEmpty 'role={isError ? "alert" : "status"}' "Files distinguishes announced errors from expected empty state"
Assert-Contains $readerEmpty "Refresh read-only files" "Files empty/error state has a real retry action"
Assert-Contains $readerEmpty 'href="/video-projects"' "Files empty state links to project recovery"
Assert-Contains $projectFileList 'aria-pressed={active}' "File list exposes selected state without relying on colour"
Assert-Contains $projectTree 'aria-pressed={node.selectable ? active : undefined}' "Project tree exposes selected state without relying on colour"
Assert-NotMatches ($frame + $reader + $readiness) '(?m)^\s*order\s*:' "Mobile presentation does not visually reorder DOM content"

foreach ($boundary in @("src/app/loading.tsx", "src/app/error.tsx", "src/app/not-found.tsx")) {
  $source = Get-Text $boundary
  Assert-Contains $source "CodexForgeAppShell" "Global boundary uses the product shell: $boundary"
  Assert-Contains $source "<h1" "Global boundary has a clear title: $boundary"
  Assert-NotMatches $source 'activePath="/"' "Global boundary does not falsely announce Home as current: $boundary"
}
Assert-Contains $appShell "activeRouteMatched" "Product shell distinguishes an unknown route from Home"
Assert-Contains $topbar 'routeContextAvailable' "Product shell reports an unavailable route without a false Home summary"
Assert-Contains (Get-Text "src/app/loading.tsx") 'role="status"' "Global loading state is announced"
Assert-Contains (Get-Text "src/app/error.tsx") 'role="alert"' "Global error state is announced"
Assert-Contains (Get-Text "src/app/error.tsx") "Try this view again" "Global error state has recovery"
Assert-Contains (Get-Text "src/app/not-found.tsx") 'href="/jarvis"' "Not-found state links back to Jarvis"

Assert-Contains $homeSource 'data-codexforge-first-run-guidance="existing-state-only no-browser-persistence"' "Home includes lightweight first-run guidance using existing state"
foreach ($phrase in @("Confirm a project", "Describe one objective", "Review the boundary", "Approve, then execute", "Inspect and validate")) {
  Assert-Contains $homeSource $phrase "First-run journey explains: $phrase"
}
foreach ($route in @("/video-projects", "/files", "/patch-preview-workbench", "/validation", "/jarvis-audit", "/jarvis-safety")) {
  Assert-Contains $homeSource $route "Home links directly to $route"
}
Assert-Contains $homeSource "Local first, approval required" "Home explains local-first and manual approval"
Assert-Contains $homeSource "Developer Diagnostics" "Home separates diagnostics from normal features"
foreach ($mode in @("General assistant", "Website and app creation", "Browser-game creation", "Server and API creation", "Video creation")) {
  Assert-Contains $homeSource $mode "Home accommodates creator direction honestly: $mode"
}
Assert-Contains $homeSource "Not connected yet" "Unavailable creator modes are not presented as operational"
Assert-Contains $homeSource "Planning only" "Video is clearly planning-only"

Assert-Contains $readiness 'kind: "loading"' "Read-only status panels implement loading state"
Assert-Contains $readiness 'kind: "error"' "Read-only status panels implement bounded error state"
Assert-Contains $readiness 'kind: "ready"' "Read-only status panels implement success state"
Assert-Contains $readiness "No runs yet" "Audit implements a useful empty state"
Assert-Contains $readiness "Try again" "Status and audit errors have recovery"
Assert-Contains $readiness "Kill switch engaged" "Safety represents kill-switch blocked state"
Assert-Contains $readiness "provider is unavailable" "Provider unavailable state is understandable"
Assert-Contains $readiness "model is unavailable" "Local model unavailable state is understandable"
foreach ($state in @("Awaiting approval", "Approved", "Running", "Succeeded", "Failed", "Cancelled", "Blocked")) {
  Assert-Contains $readiness $state "Audit maps run state: $state"
}
Assert-NotMatches $readiness 'run\.runId|approvalScopeHash|idempotencyKeyHash|redactedPreview' "Audit does not expose raw identifiers, hashes, or request previews"

$filesPage = Get-Text "src/app/files/page-client.tsx"
$patchPage = Get-Text "src/app/patch-preview-workbench/page-client.tsx"
$validationPage = Get-Text "src/app/validation/page-client.tsx"
$auditPage = Get-Text "src/app/jarvis-audit/page-client.tsx"
Assert-Contains $filesPage 'href="/patch-preview-workbench"' "Files points directly to canonical Patch Review"
Assert-Contains $filesPage 'href: "/files#prepare-patch-review"' "Files primary action reaches the real inline patch preview"
Assert-Contains $reader 'id="prepare-patch-review"' "Files exposes a stable patch-review journey target"
Assert-Contains $patchPage 'href: "/validation"' "Patch Review points directly to Validation"
Assert-Contains $validationPage 'href: "/jarvis-audit"' "Validation points directly to Audit"
Assert-Contains $auditPage 'href: "/files"' "Audit can return to Files"
Assert-Contains $patchPage "No active proposed change" "Patch Review has an honest no-change state"
Assert-Contains $patchPage "requires its own exact approval" "Patch application remains separately approved"
Assert-Contains $patchPage "files remain unchanged" "Patch failure preserves files"
Assert-Contains $patchPage "separately approved application" "Patch completed state cannot be fabricated"

$validationRunner = Get-Text "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx"
$validationCatalog = Get-Text "src/lib/codexforge/validation-runner/validation-command-catalog.ts"
$validationPolicy = Get-Text "src/lib/codexforge/validation-runner/validation-run-policy.ts"
Assert-Contains $validationRunner 'guardedRunApiAvailable: false' "Validation does not pretend guarded execution is connected"
Assert-Contains $validationRunner "Choose allowlisted checks" "Validation explains the available manual workflow"
Assert-Contains $validationRunner "paste bounded output back" "Validation supports readable supplied-output review"
Assert-Contains $validationRunner 'role={copyStatus.tone === "error" ? "alert" : "status"}' "Validation copy handoff reports success or failure accessibly"
Assert-Contains $validationCatalog "isValidationCommandAllowlisted" "Validation choices remain allowlisted"
Assert-Contains $validationPolicy "Policy blocks arbitrary shell" "Validation blocks arbitrary shell"
Assert-Contains $validationPage "claim a command ran or a validation succeeded" "Validation avoids fake success"

$approvedApply = Get-Text "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx"
$applyBridge = Get-Text "src/lib/codexforge/approved-patch-apply/components/ApplyExecutionBridgePanel.tsx"
Assert-Contains $approvedApply 'disabled={!bridge.canRequestApply}' "Unavailable guarded patch application cannot appear executable"
Assert-Contains $approvedApply "Guarded patch application is not connected" "Unavailable patch application has an honest explanation"
Assert-Contains $applyBridge 'aria-describedby="approved-patch-apply-bridge-status"' "Patch application disabled reason is associated with its control"

$trading = Get-Text "src/app/jarvis-trading/page-client.tsx"
foreach ($phrase in @("research-only", "no-broker", "no-orders", "no-advice", "no-automation", "no-live-money")) {
  Assert-Contains $readiness $phrase "Trading preserves safe boundary: $phrase"
}
Assert-NotMatches $trading 'broker-execution|placeOrder|submitOrder|autoTrade' "Trading route exposes no execution action"

$normalProductSource = $frame + $homeSource + $readiness + (Get-Text "src/lib/codexforge/normal-product/index.ts")
Assert-NotMatches $normalProductSource '(?i)\b(localStorage|sessionStorage|indexedDB)\b|process\.env|https?://' "Normal product UI has no browser persistence, credential read, or external URL"
Assert-NotMatches $readiness 'createPrivateAlphaRun|approvePrivateAlphaRun|executePrivateAlphaRun|cancelPrivateAlphaRun|fetch\(' "Readiness, Audit, and Safety use read-only existing APIs only"
Assert-Contains $readiness "fetchPrivateAlphaStatus" "Provider and Safety use server-owned status data"
Assert-Contains $readiness "listPrivateAlphaRuns" "Audit uses existing run data"
Assert-Contains $readiness "ollama-local::gpt-oss:20b" "Providers show the exact admitted local identity"
Assert-Contains $readiness "4,096 tokens" "Providers show the local token ceiling"
Assert-Contains $readiness "512-token envelope" "Providers show the Groq envelope"
Assert-Contains $readiness "Paid execution is disabled" "Providers show paid execution disabled"
Assert-Contains $readiness "Credentials remain server-side" "Providers show the server-only credential boundary"
Assert-Contains $readiness "No retry, fallback" "Safety disallows retry and fallback"
Assert-Contains $readiness "never downloaded automatically" "Providers disallow automatic model download"

$normalFacingSources = $primaryBlock + $normalProductSource + ($pageClients | ForEach-Object { Get-Text $_ } | Out-String)
Assert-NotMatches $normalFacingSources '(?i)qwen' "Parked candidate is absent from normal production selection and UI"
Assert-NotMatches $normalFacingSources '(?i)paid execution enabled|automatic retry|automatic fallback|silent substitution|automatic model download' "Normal UI does not advertise prohibited execution behavior"

foreach ($protected in @(
  "src/lib/codexforge/model-routing",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "src/lib/codexforge/private-alpha",
  "src/app/api/codexforge/private-alpha"
)) {
  Assert-NoGitDiff $protected "Protected backend/runtime scope is unchanged: $protected"
}
Assert-NoGitDiff "src/lib/codexforge/provider-adapters" "Provider adapters are unchanged"
Assert-NoGitDiff "src/lib/codexforge/model-routing/model-routing-catalog.ts" "Production model catalog is unchanged"

$doc = Get-Text "docs/codexforge-macro-phase-c-whole-product-hardening.md"
foreach ($heading in @("Current capability inventory", "Master-charter gap analysis", "Dependency-ordered implementation sequence", "Proposed next macro phase", "Required Phase D acceptance tests", "Preserved safety invariants")) {
  Assert-Contains $doc $heading "Phase C handoff documents $heading"
}
foreach ($phase in @("D1", "D2", "D3", "D4", "D5", "D6")) { Assert-Contains $doc $phase "Creator roadmap includes $phase" }
Assert-Contains $doc "shared creator lifecycle plus a genuinely working frontend website/application builder" "Next macro phase delivers a coherent block of real user value"

$allSmoke = Get-Text "scripts/smoke-codexforge-all.ps1"
$releaseBlock = [regex]::Match($allSmoke, '(?s)\$currentReleaseGateScripts\s*=\s*@\((.*?)\)\s*# Current release gate wording:').Groups[1].Value
$releaseEntries = [regex]::Matches($releaseBlock, '@\{\s*Name\s*=.*?Required\s*=\s*\$(?:true|false)\s*\}')
Assert-True ($releaseEntries.Count -eq 71) "Aggregate executable count is 71"
Assert-True (@($releaseEntries | Where-Object { $_.Value -match 'Required\s*=\s*\$true' }).Count -eq 68) "Aggregate required count is 68"
Assert-True (@($releaseEntries | Where-Object { $_.Value -match 'Required\s*=\s*\$false' }).Count -eq 3) "Aggregate optional count remains 3"
$phaseANeedle = 'File = "smoke-codexforge-local-first-jarvis-working-product-loop.ps1"; Required = $true'
$phaseBNeedle = 'File = "smoke-codexforge-unified-jarvis-product-experience.ps1"; Required = $true'
$phaseCNeedle = 'File = "smoke-codexforge-macro-phase-c-whole-product-hardening.ps1"; Required = $true'
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($phaseCNeedle))).Count -eq 1) "Macro Phase C is registered exactly once as required"
Assert-InOrder $releaseBlock @($phaseANeedle, $phaseBNeedle, $phaseCNeedle) "Aggregate order is Macro A to Macro B to Macro C"

Write-Host ""
Write-Host "Macro Phase C whole-product hardening smoke passed."
