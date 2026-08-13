param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root
$expectedBaselineTag = "codexforge-rendered-product-accessibility-acceptance-clean"
$expectedBaseline = "fe74ece00629cd6cdcbeba0a35e31d0a4ab54f58"
$expectedCreatorCheckpointTag = "codexforge-approved-static-website-creator-foundation-clean"
$expectedCreatorCheckpoint = "a8ea7b5a4b91937152d16279f876364187a2c318"

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
  $checkpointDiff = ((& git -c core.safecrlf=false diff --relative --name-only "$expectedBaselineTag..$expectedCreatorCheckpointTag" -- $RelativePath 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($checkpointDiff)) $Message
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

function Get-AssertionMetrics {
  param([string]$RelativePath)
  $path = Join-Path $root $RelativePath
  $tokens = $null
  $errors = $null
  $ast = [System.Management.Automation.Language.Parser]::ParseFile($path, [ref]$tokens, [ref]$errors)
  Assert-True ($errors.Count -eq 0) "Retention target parses: $RelativePath"

  $powerShellExecutable = 0
  foreach ($command in $ast.FindAll({ param($node) $node -is [System.Management.Automation.Language.CommandAst] }, $true)) {
    $name = $command.GetCommandName()
    if ($name -notmatch '^(?:Assert-[A-Za-z0-9-]+|Add-Result)$') { continue }
    $insideFunction = $false
    $parent = $command.Parent
    while ($null -ne $parent) {
      if ($parent -is [System.Management.Automation.Language.FunctionDefinitionAst]) {
        $insideFunction = $true
        break
      }
      $parent = $parent.Parent
    }
    if (-not $insideFunction) { $powerShellExecutable += 1 }
  }

  $text = Get-Content -Raw -LiteralPath $path
  $javascriptAssertions = [regex]::Matches($text, '\bassert\s*\(').Count
  $javascriptDefinitions = [regex]::Matches($text, '\bfunction\s+assert\s*\(').Count
  $textual = [regex]::Matches(
    $text,
    '(?i)\b(?:Assert-[A-Za-z0-9-]+|Add-Result)\b|\bassert\s*\('
  ).Count

  return [pscustomobject]@{
    Lines = @(Get-Content -LiteralPath $path).Count
    Executable = $powerShellExecutable + $javascriptAssertions - $javascriptDefinitions
    Textual = $textual
  }
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase C.1 rendered accessibility repair ==="

$expectedHistoricalPaths = @(
  "docs/codexforge-macro-phase-c-1-rendered-accessibility-repair.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-command-palette.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts/smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1",
  "scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1",
  "scripts/smoke-codexforge-openai-compatible-adapter.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "src/app/patch-preview-workbench/page-client.tsx",
  "src/app/provider-adapters/page-client.tsx",
  "src/app/video-assets/page-client.tsx",
  "src/app/video-projects/page-client.tsx",
  "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx",
  "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx",
  "src/lib/codexforge/video-foundation-ui.tsx",
  "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"
)

Assert-PowerShellParses "scripts/smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1"
Assert-True ((& git rev-parse "$expectedBaselineTag^{}").Trim() -eq $expectedBaseline) "Macro Phase C.1 annotated tag peels to the exact approved baseline"
Assert-True ((& git rev-parse "$expectedCreatorCheckpointTag^{}").Trim() -eq $expectedCreatorCheckpoint) "Macro Phase D annotated tag peels to the exact approved creator commit"
Assert-True ((& git rev-parse "$expectedCreatorCheckpoint^").Trim() -eq $expectedBaseline) "Macro Phase D checkpoint has the exact approved Macro Phase C.1 parent"
Assert-True ($expectedHistoricalPaths.Count -eq 30) "Historical C.1 source inventory declares exactly thirty paths"
Assert-True (@($expectedHistoricalPaths | Sort-Object -Unique).Count -eq 30) "Historical C.1 source inventory paths are unique"

$changedPaths = @(
  (& git diff --relative --name-only "$expectedBaselineTag..$expectedCreatorCheckpointTag" 2>$null) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    Sort-Object -Unique
)
Assert-True ($changedPaths.Count -eq 78) "Macro Phase D committed checkpoint contains exactly 78 paths"
foreach ($path in $expectedHistoricalPaths) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $path) -PathType Leaf) "Historical C.1 source remains present: $path"
}
Assert-NotMatches ($changedPaths -join "`n") '(?im)(^|/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|next\.config|tsconfig|\.env|migrations?|schema)(/|$)' "No lock, configuration, environment, migration, or schema path changed"
$packageManifest = Get-Text "package.json" | ConvertFrom-Json
Assert-True ($packageManifest.scripts.'native:build' -eq 'node ./scripts/build-codexforge-creator-native.cjs') "Authorized package change adds only the repository-owned creator native build boundary"
Assert-True ($packageManifest.scripts.build -eq 'npm run native:build && next build') "Production build fails closed unless the creator native boundary builds"

foreach ($script in @($changedPaths | Where-Object { $_ -like "*.ps1" })) {
  Assert-PowerShellParses $script
}

foreach ($protected in @(
  "src/lib/codexforge/model-routing",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "src/lib/codexforge/provider-adapters",
  "src/lib/codexforge/private-alpha/private-alpha-free-first-routing.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts"
)) {
  Assert-NoGitDiff $protected "Protected provider/runtime/catalog/registry scope is unchanged: $protected"
}

$expectedPrivateAlphaHttpRouteChanges = @(
  "src/app/api/codexforge/private-alpha/routing/free-first/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
  "src/app/api/codexforge/private-alpha/runs/route.ts",
  "src/app/api/codexforge/private-alpha/status/route.ts"
)
$actualPrivateAlphaHttpRouteChanges = @(
  $changedPaths |
    Where-Object { $_ -like "src/app/api/codexforge/private-alpha/*" } |
    Sort-Object
)
$privateAlphaHttpRouteDifference = @(
  Compare-Object -ReferenceObject @($expectedPrivateAlphaHttpRouteChanges | Sort-Object) -DifferenceObject $actualPrivateAlphaHttpRouteChanges
)
Assert-True ($privateAlphaHttpRouteDifference.Count -eq 0) "Authorized Private Alpha HTTP ownership migration is limited to the exact seven routes"

foreach ($route in $expectedPrivateAlphaHttpRouteChanges) {
  $routeSource = Get-Text $route
  Assert-Contains $routeSource 'from "@/lib/codexforge/private-alpha/private-alpha-http.server";' "Private Alpha route uses the shared fail-closed HTTP boundary: $route"
  Assert-Contains $routeSource 'assertPrivateAlphaLoopbackRequest(request' "Private Alpha route enforces the shared loopback Host and Origin boundary: $route"
  Assert-Contains $routeSource 'privateAlphaHttpErrorResponse(error)' "Private Alpha route preserves bounded HTTP error classification: $route"
}

foreach ($mutationRoute in @(
  "src/app/api/codexforge/private-alpha/routing/free-first/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
  "src/app/api/codexforge/private-alpha/runs/route.ts"
)) {
  $mutationRouteSource = Get-Text $mutationRoute
  Assert-Contains $mutationRouteSource 'assertPrivateAlphaLoopbackRequest(request, true);' "Private Alpha mutation requires an exact same-origin request: $mutationRoute"
  Assert-Contains $mutationRouteSource 'readPrivateAlphaJsonBody(request)' "Private Alpha mutation retains bounded strict JSON body handling: $mutationRoute"
}

$privateAlphaHttpBoundary = Get-Text "src/lib/codexforge/private-alpha/private-alpha-http.server.ts"
Assert-Contains $privateAlphaHttpBoundary 'export function assertPrivateAlphaLoopbackRequest' "Private Alpha HTTP ownership moved to one server-only fail-closed boundary"
Assert-Contains $privateAlphaHttpBoundary 'export async function readPrivateAlphaJsonBody' "Private Alpha HTTP boundary owns bounded strict JSON mutation bodies"
$privateAlphaStore = Get-Text "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
Assert-Contains $privateAlphaStore 'withPrivateAlphaNativeRootLease' "Authorized Private Alpha persistence repair remains bound to a native trusted-root lease"
Assert-Contains $privateAlphaStore 'assertSecurePrivateAlphaMutationPlatform();' "Private Alpha mutation fails closed when the secure native boundary is unavailable"
Assert-NoGitDiff "src/lib/codexforge/model-routing/model-routing-catalog.ts" "Production model catalog source is unchanged"
Assert-NoGitDiff "src/lib/codexforge/model-routing/model-routing-provider-registry.ts" "Provider registry source is unchanged"
Assert-NoGitDiff "src/lib/codexforge/model-routing/onboarding" "Onboarding behavior is unchanged"
Assert-NoGitDiff "src/app/jarvis" "Jarvis execution and approval behavior is unchanged"
Assert-NoGitDiff "src/app/athena" "Athena redirect behavior is unchanged"

$normalFrame = Get-Text "src/lib/codexforge/normal-product/components/NormalProductFrame.tsx"
Assert-True (([regex]::Matches($normalFrame, '<h1\s+id=\{headingId\}')).Count -eq 1) "NormalProductFrame owns exactly one primary H1 contract"
Assert-Contains $normalFrame 'aria-labelledby={headingId}' "Normal page content remains labelled by its primary H1"

$headingOwners = @(
  @{ Route = "src/app/video-projects/page-client.tsx"; Historical = '<VideoProjectWorkspacePanel headingLevel="h2" />'; Marker = "data-codexforge-historical-project-preview"; Secondary = '<h2 id="project-selection-title">' },
  @{ Route = "src/app/video-assets/page-client.tsx"; Historical = '<AssetDependencyTrackerPanel headingLevel="h2" />'; Marker = "data-codexforge-asset-diagnostics-preview"; Secondary = '<h2 id="asset-groups-title">' },
  @{ Route = "src/app/patch-preview-workbench/page-client.tsx"; Historical = '<PatchPreviewWorkbenchPanel headingLevel="h2" />'; Marker = "data-codexforge-historical-patch-preview"; Secondary = '<h2 id="patch-lifecycle-title">' }
)
foreach ($owner in $headingOwners) {
  $source = Get-Text $owner.Route
  Assert-Contains $source "NormalProductFrame" "Normal route retains shared primary H1 ownership: $($owner.Route)"
  Assert-NotMatches $source '<h1\b' "Normal route declares no competing H1: $($owner.Route)"
  Assert-Contains $source $owner.Marker "Normal route retains historical diagnostic ownership: $($owner.Route)"
  Assert-Contains $source $owner.Historical "Historical panel is explicitly embedded at H2: $($owner.Route)"
  Assert-NotMatches $source 'aria-hidden=' "Normal route does not conceal historical interactive content with aria-hidden: $($owner.Route)"
  Assert-Contains $source $owner.Secondary "Normal route retains useful secondary heading/content hierarchy: $($owner.Route)"
}
$providerRoute = Get-Text "src/app/provider-adapters/page-client.tsx"
Assert-Contains $providerRoute "NormalProductFrame" "Providers route retains shared primary H1 ownership"
Assert-NotMatches $providerRoute '<h1\b|ProviderAdaptersPanel|data-codexforge-historical-provider-adapter-reference|aria-hidden=' "Historical provider panel cannot add an H1 or concealed interaction to the normal route"
Assert-Contains $providerRoute "<ProviderReadinessPanel />" "Providers route retains its normal-product readiness hierarchy"

$previewFoundation = Get-Text "src/lib/codexforge/video-foundation-ui.tsx"
Assert-Contains $previewFoundation 'headingLevel?: "h1" | "h2";' "Historical preview hero exposes a bounded semantic heading contract"
Assert-Contains $previewFoundation 'headingLevel = "h1"' "Standalone historical preview hero defaults to H1 ownership"
Assert-Contains $previewFoundation '<Heading style={previewStyles.headline}>{title}</Heading>' "Historical preview hero renders the selected semantic level"
Assert-True (([regex]::Matches($previewFoundation, '<h2\s+style=\{previewStyles\.(?:title|headline)\}>')).Count -ge 2) "Historical preview cards retain semantic H2 hierarchy"
foreach ($historical in @(
  @{ Path = "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"; Name = "VideoProjectWorkspacePanel" },
  @{ Path = "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx"; Name = "AssetDependencyTrackerPanel" },
  @{ Path = "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx"; Name = "PatchPreviewWorkbenchPanel" }
)) {
  $historicalSource = Get-Text $historical.Path
  Assert-Contains $historicalSource "$($historical.Name)({ headingLevel = `"h1`" }" "Historical diagnostic panel defaults to standalone H1 ownership: $($historical.Path)"
  Assert-Contains $historicalSource 'headingLevel={headingLevel}' "Historical diagnostic panel passes its semantic level to the hero: $($historical.Path)"
}
$providerHistorical = Get-Text "src/lib/codexforge/provider-adapters/components/ProviderAdaptersPanel.tsx"
Assert-True (([regex]::Matches($providerHistorical, '<h1\s+style=\{headline\}>Providers</h1>')).Count -eq 1) "Historical provider panel retains its standalone H1"
Assert-True (([regex]::Matches($providerHistorical, '<h2\s+style=\{smallTitle\}>')).Count -eq 3) "Historical provider panel retains its H2 hierarchy"

$projectTree = Get-Text "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx"
Assert-Contains $projectTree 'disabled={!node.selectable}' "Project tree unavailable rows remain natively disabled"
Assert-Contains $projectTree 'aria-describedby={unavailableExplanationId}' "Project tree disabled rows reference their exact explanation"
Assert-Contains $projectTree 'id={unavailableExplanationId}' "Project tree renders each referenced explanation target"
Assert-Contains $projectTree '`codexforge-files-project-tree-${encodeURIComponent(node.path)}-explanation`' "Project tree explanation IDs are stable and path-specific"
Assert-Contains $projectTree 'is a directory grouping and cannot be selected. Choose a file inside' "Directory explanations visibly state why selection is unavailable"
Assert-Contains $projectTree 'for a read-only preview.' "Directory explanations preserve the read-only boundary"
$directoryEvidencePaths = @("docs", "logs", "scripts")
$directoryExplanationIds = @($directoryEvidencePaths | ForEach-Object { "codexforge-files-project-tree-$([uri]::EscapeDataString($_))-explanation" })
Assert-True (@($directoryExplanationIds | Sort-Object -Unique).Count -eq 3) "Evidence directory controls derive three unique explanation IDs"
Assert-InOrder ($directoryExplanationIds -join "`n") @(
  "codexforge-files-project-tree-docs-explanation",
  "codexforge-files-project-tree-logs-explanation",
  "codexforge-files-project-tree-scripts-explanation"
) "Exact directory explanation relationships remain deterministic"

$patchRequest = Get-Text "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx"
Assert-Contains $patchRequest 'disabled={!selectedPath || !requestedChangeText.trim()}' "Prepare preview remains disabled until both prerequisites exist"
Assert-Contains $patchRequest 'aria-describedby="codexforge-files-prepare-preview-explanation"' "Prepare preview references its stable explanation"
Assert-True (([regex]::Matches($patchRequest, 'id="codexforge-files-prepare-preview-explanation"')).Count -eq 1) "Prepare preview explanation target exists exactly once"
Assert-Contains $patchRequest "Choose a project file before preparing a preview." "Prepare preview explains the missing-file state"
Assert-Contains $patchRequest "Enter requested change text before preparing a preview." "Prepare preview explains the missing-change state"
Assert-Contains $patchRequest "does not write files or execute commands." "Prepare preview explanation remains truthful"

$approvedApply = Get-Text "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx"
Assert-Contains $approvedApply 'disabled={!previewReady}' "Prepare apply request remains disabled without a preview"
Assert-Contains $approvedApply 'aria-describedby={!previewReady ? "codexforge-files-prepare-apply-request-explanation" : undefined}' "Prepare apply request conditionally references its exact explanation"
Assert-True (([regex]::Matches($approvedApply, 'id="codexforge-files-prepare-apply-request-explanation"')).Count -eq 1) "Prepare apply explanation target exists exactly once"
Assert-Contains $approvedApply "Preview diff required before approved patch apply can be prepared." "Prepare apply explanation remains visible and truthful"
Assert-Contains $approvedApply 'disabled={!bridge.canRequestApply}' "Guarded patch application remains disabled by policy"
Assert-Contains $approvedApply 'guardedApiAvailable: false' "Patch application capability remains unavailable"

$validation = Get-Text "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx"
Assert-Contains $validation 'disabled={!prepared}' "Full validation checklist remains disabled until prepared"
Assert-Contains $validation 'aria-describedby={!prepared ? "codexforge-validation-copy-full-checklist-explanation" : undefined}' "Full validation checklist conditionally references its exact explanation"
Assert-True (([regex]::Matches($validation, 'id="codexforge-validation-copy-full-checklist-explanation"')).Count -eq 1) "Full checklist explanation target exists exactly once"
Assert-Contains $validation "Prepare an allowlisted validation request before copying the full checklist." "Full checklist explanation remains visible and accurate"
Assert-Contains $validation "does not run a command or persist approval." "Full checklist explanation preserves execution and persistence boundaries"
Assert-Contains $validation 'disabled={bridge.status !== "manual-only"}' "Approved-command handoff remains disabled until manual-only readiness"
Assert-Contains $validation 'aria-describedby={bridge.status !== "manual-only" ? "codexforge-validation-copy-approved-commands-explanation" : undefined}' "Journey-only disabled validation handoff has an exact explanation"
Assert-True (([regex]::Matches($validation, 'id="codexforge-validation-copy-approved-commands-explanation"')).Count -eq 1) "Journey-only validation explanation target exists exactly once"
Assert-Contains $validation 'guardedRunApiAvailable: false' "Validation execution remains unavailable"

$exactEvidenceControls = @(
  "docs", "logs", "scripts", "Prepare preview", "Prepare apply request", "Copy full validation checklist"
)
Assert-True ($exactEvidenceControls.Count -eq 6) "The six evidence controls are enumerated exactly"
Assert-True (@($exactEvidenceControls | Sort-Object -Unique).Count -eq 6) "The six evidence controls are unique"

$changedProductionSources = @(
  "src/app/patch-preview-workbench/page-client.tsx",
  "src/app/provider-adapters/page-client.tsx",
  "src/app/video-assets/page-client.tsx",
  "src/app/video-projects/page-client.tsx",
  "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx",
  "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx",
  "src/lib/codexforge/video-foundation-ui.tsx",
  "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"
)
$productionSource = ($changedProductionSources | ForEach-Object { Get-Text $_ }) -join "`n"
Assert-NotMatches $productionSource '(?i)(:\s*any\b|<any>|\bas\s+any\b|\bas\s+unknown\s+as\b|mock success|compatibility bypass)' "No any, unsafe cast, mock success, or compatibility bypass was introduced"
Assert-NotMatches $productionSource '(?i)(/api/chat|/api/generate|/api/pull|createPrivateAlphaRun|approvePrivateAlphaRun|executePrivateAlphaRun|applyDiff\s*\(|runCommand\s*\(|deploy\s*\()' "Repair sources activate no generation, approval, patch, command, or deployment behavior"

$allSmoke = Get-Text "scripts/smoke-codexforge-all.ps1"
$releaseBlock = [regex]::Match($allSmoke, '(?s)\$currentReleaseGateScripts\s*=\s*@\((.*?)\)\s*# Current release gate wording:').Groups[1].Value
$releaseEntries = [regex]::Matches($releaseBlock, '@\{\s*Name\s*=.*?Required\s*=\s*\$(?:true|false)\s*\}')
Assert-True ($releaseEntries.Count -eq 75) "Aggregate executable count is 75"
Assert-True (@($releaseEntries | Where-Object { $_.Value -match 'Required\s*=\s*\$true' }).Count -eq 72) "Aggregate required count is 72"
Assert-True (@($releaseEntries | Where-Object { $_.Value -match 'Required\s*=\s*\$false' }).Count -eq 3) "Aggregate optional count remains 3"
$phaseANeedle = 'File = "smoke-codexforge-local-first-jarvis-working-product-loop.ps1"; Required = $true'
$phaseBNeedle = 'File = "smoke-codexforge-unified-jarvis-product-experience.ps1"; Required = $true'
$phaseCNeedle = 'File = "smoke-codexforge-macro-phase-c-whole-product-hardening.ps1"; Required = $true'
$phaseC1Needle = 'File = "smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1"; Required = $true'
$phaseD1Needle = 'File = "smoke-codexforge-macro-phase-d1-shared-creator-lifecycle-foundation.ps1"; Required = $true'
$phaseD2Needle = 'File = "smoke-codexforge-macro-phase-d2-static-website-browser-app-builder-foundation.ps1"; Required = $true'
$chatNeedle = 'File = "smoke-codexforge-canonical-local-first-jarvis-chat-lifecycle.ps1"; Required = $true'
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($phaseC1Needle))).Count -eq 1) "Macro Phase C.1 is registered exactly once as required"
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($phaseD1Needle))).Count -eq 1) "Macro Phase D1 is registered exactly once as required"
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($phaseD2Needle))).Count -eq 1) "Macro Phase D2 is registered exactly once as required"
Assert-True (([regex]::Matches($releaseBlock, [regex]::Escape($chatNeedle))).Count -eq 1) "Canonical Jarvis chat is registered exactly once as required"
Assert-InOrder $releaseBlock @($phaseANeedle, $phaseBNeedle, $phaseCNeedle, $phaseC1Needle, $phaseD1Needle, $phaseD2Needle, $chatNeedle) "Aggregate order is Macro A through D2 then canonical Jarvis chat"
$phaseCEntryIndex = -1
$phaseC1EntryIndex = -1
$phaseD1EntryIndex = -1
$phaseD2EntryIndex = -1
for ($index = 0; $index -lt $releaseEntries.Count; $index += 1) {
  if ($releaseEntries[$index].Value.Contains($phaseCNeedle)) { $phaseCEntryIndex = $index }
  if ($releaseEntries[$index].Value.Contains($phaseC1Needle)) { $phaseC1EntryIndex = $index }
  if ($releaseEntries[$index].Value.Contains($phaseD1Needle)) { $phaseD1EntryIndex = $index }
  if ($releaseEntries[$index].Value.Contains($phaseD2Needle)) { $phaseD2EntryIndex = $index }
}
Assert-True ($phaseCEntryIndex -ge 0 -and $phaseC1EntryIndex -eq ($phaseCEntryIndex + 1)) "Macro C.1 is immediately after Macro C"
Assert-True ($phaseC1EntryIndex -ge 0 -and $phaseD1EntryIndex -eq ($phaseC1EntryIndex + 1)) "Macro D1 is immediately after Macro C.1"
Assert-True ($phaseD1EntryIndex -ge 0 -and $phaseD2EntryIndex -eq ($phaseD1EntryIndex + 1)) "Macro D2 is immediately after Macro D1"
Assert-InOrder $releaseBlock @(
  $phaseC1Needle,
  $phaseD1Needle,
  $phaseD2Needle,
  $chatNeedle,
  'File = "smoke-codexforge-full-validation-wrapper.ps1"; Required = $true',
  'File = $currentCheckpointSmokeFile; Required = $true'
) "C.1, D1, D2, and canonical Jarvis chat precede the full wrapper and checkpoint documentation gates"

$retentionFloors = @{
  "scripts/smoke-codexforge-command-palette.ps1" = @{ Executable = 34; Textual = 39 }
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1" = @{ Executable = 60; Textual = 66 }
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1" = @{ Executable = 30; Textual = 31 }
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1" = @{ Executable = 60; Textual = 61 }
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1" = @{ Executable = 123; Textual = 131 }
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1" = @{ Executable = 99; Textual = 107 }
  "scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1" = @{ Executable = 161; Textual = 174 }
  "scripts/smoke-codexforge-openai-compatible-adapter.ps1" = @{ Executable = 18; Textual = 21 }
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1" = @{ Executable = 161; Textual = 170 }
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1" = @{ Executable = 38; Textual = 44 }
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1" = @{ Executable = 74; Textual = 78 }
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1" = @{ Executable = 69; Textual = 75 }
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1" = @{ Executable = 202; Textual = 213 }
}
foreach ($path in @($retentionFloors.Keys | Sort-Object)) {
  $metrics = Get-AssertionMetrics $path
  $floor = $retentionFloors[$path]
  Assert-True ($metrics.Executable -ge $floor.Executable) "Executable assertion floor is preserved: $path ($($metrics.Executable) >= $($floor.Executable))"
  Assert-True ($metrics.Textual -ge $floor.Textual) "Textual assertion floor is preserved: $path ($($metrics.Textual) >= $($floor.Textual))"
  if ($floor.ContainsKey("Lines")) {
    Assert-True ($metrics.Lines -ge $floor.Lines) "Mechanical ownership smoke line floor is preserved: $path ($($metrics.Lines) >= $($floor.Lines))"
  }
}

$commandPaletteSmokePath = Join-Path $root "scripts/smoke-codexforge-command-palette.ps1"
& powershell -NoProfile -ExecutionPolicy Bypass -File $commandPaletteSmokePath -SkipRouteProbe
Assert-True ($LASTEXITCODE -eq 0) "Registered C.1 gate executes the strengthened command-palette focus and keyboard contract"

$catalogHashScript = @'
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const ts = require(path.join(process.argv[2], "node_modules", "typescript"));
require.extensions[".ts"] = function(module, filename) {
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};
const catalog = require(path.join(process.argv[2], "src/lib/codexforge/model-routing/model-routing-catalog.ts")).CODEXFORGE_PRODUCTION_MODEL_CATALOG;
process.stdout.write(crypto.createHash("sha256").update(JSON.stringify(catalog), "utf8").digest("hex"));
'@
$catalogDigest = ($catalogHashScript | node - $root).Trim()
Assert-True ($LASTEXITCODE -eq 0) "Production catalog digest probe exits cleanly"
Assert-True ($catalogDigest -eq "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b") "Production catalog digest remains exact"

$reportPath = ".codexforge/acceptance/macro-c1-20260801T081220Z/acceptance-report.md"
$resultsPath = ".codexforge/acceptance/macro-c1-20260801T081220Z/browser-results.json"
Assert-True ((Get-FileHash -Algorithm SHA256 -LiteralPath $reportPath).Hash.ToLowerInvariant() -eq "fca281704570affc090f8994716f71d40592674ea2602a5832b9bd074c39ec01") "Original C.1 acceptance report is preserved byte-for-byte"
Assert-True ((Get-FileHash -Algorithm SHA256 -LiteralPath $resultsPath).Hash.ToLowerInvariant() -eq "fec30f73021d69ffba8827efab2f53ee590c2e97eef356e5fd9aa82c382d7f7f") "Original C.1 browser evidence is preserved byte-for-byte"

$documentation = Get-Text "docs/codexforge-macro-phase-c-1-rendered-accessibility-repair.md"
foreach ($heading in @("Authoritative evidence", "Repair map", "Programmatic explanation relationships", "Safety invariants", "Validation and rendered acceptance")) {
  Assert-Contains $documentation $heading "C.1 documentation contains $heading"
}
foreach ($id in @(
  "codexforge-files-project-tree-docs-explanation",
  "codexforge-files-project-tree-logs-explanation",
  "codexforge-files-project-tree-scripts-explanation",
  "codexforge-files-prepare-preview-explanation",
  "codexforge-files-prepare-apply-request-explanation",
  "codexforge-validation-copy-full-checklist-explanation"
)) {
  Assert-Contains $documentation $id "C.1 documentation records relationship: $id"
}

Write-Host ""
Write-Host "Macro Phase C.1 rendered accessibility repair smoke passed."
