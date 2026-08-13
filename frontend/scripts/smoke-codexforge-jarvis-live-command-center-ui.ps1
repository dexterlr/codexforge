Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

function Get-FileText {
  param(
    [Parameter(Mandatory = $true)]
    [string]$RelativePath
  )

  $path = Join-Path $repoRoot $RelativePath
  return Get-Content -Raw -LiteralPath $path
}

function Add-Result {
  param(
    [Parameter(Mandatory = $true)]
    [bool]$Condition,
    [Parameter(Mandatory = $true)]
    [string]$Message
  )

  if ($Condition) {
    Write-Host ("ok - {0}" -f $Message)
    return
  }

  Write-Host ("not ok - {0}" -f $Message)
  $script:Failures.Add($Message) | Out-Null
}

function Find-RuleMixingBorderProperties {
  param(
    [Parameter(Mandatory = $true)]
    [string]$CssText
  )

  $matches = [regex]::Matches($CssText, '(?s)\{(?<body>[^{}]*)\}')

  foreach ($match in $matches) {
    $body = $match.Groups["body"].Value
    $hasBorder = $body -match '(^|[\s;])border\s*:'
    $hasBorderLonghand = $body -match '(^|[\s;])border-(color|top|right|bottom|left)\s*:'

    if ($hasBorder -and $hasBorderLonghand) {
      return $true
    }
  }

  return $false
}

function Get-StatusEntries {
  $entries = @()
  $lines = git -C $repoRoot status --porcelain=v1 --untracked-files=all
  $repoLeaf = Split-Path -Leaf $repoRoot.ProviderPath
  $repoPrefix = "{0}/" -f $repoLeaf

  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    if ($line.Length -lt 4) {
      continue
    }

    $path = $line.Substring(3).Trim()
    if ($path.StartsWith($repoPrefix)) {
      $path = $path.Substring($repoPrefix.Length)
    }

    $entries += [pscustomobject]@{
      Status = $line.Substring(0, 2)
      Path = $path
    }
  }

  return $entries
}

$Failures = New-Object System.Collections.Generic.List[string]

$allowedMacroPhaseCPaths = @(
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
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx",
  "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx",
  "src/lib/codexforge/video-foundation-ui.tsx",
  "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"
)

$athenaPanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx"
$livePanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx"
$shellPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx"
$advancedToolsPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisAdvancedToolsPanel.tsx"
$chatRecallStoragePath = "src/lib/codexforge/chat-recall/chat-recall-browser-storage.ts"
$chatPanelPath = "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx"
$chatCssPath = "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.module.css"
$privateAlphaPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
$privateAlphaIndexPath = "src/lib/codexforge/private-alpha/index.ts"
$cssPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css"
$athenaAliasPath = "src/app/athena/page.tsx"
$jarvisVideoPagePath = "src/app/jarvis-video/page.tsx"
$commandDeckRolePath = "src/lib/codexforge/navigation-shell/navigation-shell-types.ts"

$athenaPanel = Get-FileText $athenaPanelPath
$livePanel = Get-FileText $livePanelPath
$shell = Get-FileText $shellPath
$advancedTools = Get-FileText $advancedToolsPath
$chatRecallStorage = Get-FileText $chatRecallStoragePath
$chatPanel = Get-FileText $chatPanelPath
$chatCss = Get-FileText $chatCssPath
$privateAlpha = Get-FileText $privateAlphaPath
$privateAlphaIndex = Get-FileText $privateAlphaIndexPath
$css = Get-FileText $cssPath
$athenaAlias = Get-FileText $athenaAliasPath
$jarvisVideoPage = Get-FileText $jarvisVideoPagePath
$commandDeckRole = Get-FileText $commandDeckRolePath
$changedUiText = ($athenaPanel, $livePanel, $shell, $advancedTools, $chatPanel, $privateAlpha, $chatCss, $css) -join "`n"
$changedTypeScriptText = ($advancedTools, $chatPanel, $privateAlpha, $privateAlphaIndex) -join "`n"
$liveUiText = ($livePanel, $shell, $advancedTools, $chatPanel, $chatCss, $css) -join "`n"
$liveJarvisBranchMatch = [regex]::Match(
  $shell,
  'if \(isPrimaryAthenaSurface\) \{[\s\S]*?<AthenaCommandCenterPanel[\s\S]*?displayMode="live-product"[\s\S]*?</section>\s*\);\s*\}'
)
$media920Match = [regex]::Match(
  $css,
  '@media \(max-width: 920px\) \{[\s\S]*?privateAlphaTargetSelectorGrid[\s\S]*?grid-template-columns:\s*1fr;'
)

Add-Result (Test-Path -LiteralPath (Join-Path $repoRoot $livePanelPath)) "AthenaLiveCommandCenterPanel exists"
Add-Result (Test-Path -LiteralPath (Join-Path $repoRoot $chatPanelPath)) "JarvisChatPanel exists"
Add-Result (
  $athenaPanel.Contains('type AthenaCommandCenterDisplayMode = "live-product" | "legacy-preview";') -and
  $athenaPanel.Contains('displayMode?: AthenaCommandCenterDisplayMode;')
) "AthenaCommandCenterPanel supports live-product and legacy-preview"
Add-Result ($athenaPanel.Contains('displayMode = "legacy-preview"')) "legacy-preview remains the default"
Add-Result ($shell.Contains('displayMode="live-product"')) "/jarvis selects live-product"
Add-Result (
  $athenaAlias.Contains('import { redirect } from "next/navigation";') -and
  ([regex]::Matches($athenaAlias, 'redirect\("/jarvis"\);')).Count -eq 1
) "/athena performs one server-owned compatibility redirect to /jarvis"
Add-Result (
  $athenaAlias -notmatch '(?m)^\s*"use client";' -and
  $athenaAlias -notmatch '(?m)^\s*export \{ default \}' -and
  $athenaAlias -notmatch 'PrivateAlphaRunPanel|JarvisUnifiedProductPageClientShell'
) "/athena mounts no duplicate product client or PrivateAlphaRunPanel"
Add-Result ($athenaAlias -notmatch 'redirect\("/athena"\)') "/athena has no redirect loop"
Add-Result ($livePanel.Contains('data-codexforge-athena-display-mode="live-product"')) "live-product has the stable display-mode marker"
Add-Result (
  $livePanel -match 'import\s*\{[\s\S]*?\bJarvisChatPanel\b[\s\S]*?\}\s*from\s*"@/lib/codexforge/jarvis-chat/components/JarvisChatPanel";' -and
  ([regex]::Matches($livePanel, '<JarvisChatPanel\b')).Count -eq 1 -and
  $livePanel.Contains('<JarvisChatPanel draftHandoff={draftHandoff} />')
) "AthenaLiveCommandCenterPanel owns exactly one canonical JarvisChatPanel"
Add-Result ($livePanel -notmatch 'PrivateAlphaRunPanel') "the reachable live-product branch does not mount the legacy PrivateAlphaRunPanel"
Add-Result (
  $chatPanel.Contains('data-codexforge-jarvis-chat="canonical-local-first"') -and
  $chatPanel.Contains('New chat') -and
  $chatPanel.Contains('id="jarvis-chat-history-title"') -and
  $chatPanel.Contains('id="jarvis-chat-composer"') -and
  $chatPanel.Contains('composerFocusRequest') -and
  $chatPanel.Contains('setComposerFocusRequest((current) => current + 1)') -and
  $chatPanel.Contains('Approve this run') -and
  $chatPanel.Contains('Execute one response') -and
  $chatPanel.Contains('Stop response')
) "canonical Jarvis chat exposes history, creation, messaging, approval, execution, and stop controls"
Add-Result (
  $athenaPanel.Contains("Conversational command composer") -and
  $athenaPanel.Contains("Preview-only drafting")
) "legacy preview implementation remains present"
Add-Result (
  $livePanel -notmatch 'ai-provider-registry' -and
  $livePanel -notmatch 'athena-model-routing-provider-selection-preview' -and
  $livePanel -notmatch 'model-provider-approval-packet-run-intent-preview'
) "the live component does not import historical provider or phase catalogs"
Add-Result ($livePanel -notmatch 'Ask Athena what you want to build or control') "the inert Athena composer is not rendered by the live component"
Add-Result (
  $liveJarvisBranchMatch.Success -and
  $liveJarvisBranchMatch.Value -notmatch 'JarvisDeveloperDiagnosticsDock'
) "developer diagnostics are absent from the live /jarvis branch"
Add-Result ([regex]::Matches($livePanel, 'routeLabel: "/').Count -eq 8) "exactly eight product review destinations exist after the bounded creator entry"
Add-Result (
  $livePanel.Contains('title: "Static Website Creator"') -and
  $livePanel.Contains('href: "/jarvis-websites"') -and
  $livePanel.Contains('title: "Project Files"') -and
  $livePanel.Contains('href: "/files"') -and
  $livePanel.Contains('title: "Patch lifecycle"') -and
  $livePanel.Contains('href: "/patch-preview-workbench"') -and
  $livePanel.Contains('title: "Validation"') -and
  $livePanel.Contains('href: "/validation"') -and
  $livePanel.Contains('title: "Activity & Audit"') -and
  $livePanel.Contains('href: "/jarvis-audit"') -and
  $livePanel.Contains('title: "Safety & Settings"') -and
  $livePanel.Contains('href: "/jarvis-safety"') -and
  $livePanel.Contains('title: "Video planning"') -and
  $livePanel.Contains('href: "/video-workflows"') -and
  $livePanel.Contains('title: "Provider Details"') -and
  $livePanel.Contains('href: "/provider-adapters"')
) "review destinations target the static creator, files, changes, validation, audit, safety, honest video planning, and provider details"

# PrivateAlphaRunPanel is retained as a developer diagnostic surface. These checks
# preserve its historical safety contracts without claiming it owns normal /jarvis.
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-composer="true"') -and
  $privateAlpha -match '<textarea'
) "retained diagnostic PrivateAlphaRunPanel keeps its real request textarea"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-provider-selector="manual"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-model-selector="manual"')
) "retained diagnostic PrivateAlphaRunPanel keeps manual provider and model selectors"
Add-Result (
  $privateAlpha.Contains('Local Ollama') -and
  $privateAlpha.Contains('Groq Cloud') -and
  $privateAlpha.Contains('gpt-oss:20b') -and
  $privateAlpha.Contains('openai/gpt-oss-20b') -and
  $privateAlpha.Contains('openai/gpt-oss-120b')
) "retained diagnostic PrivateAlphaRunPanel keeps exact local and Groq targets"
Add-Result ($privateAlpha.Contains('Select a Groq model')) "retained diagnostic Groq selector has an explicit prompt option"
Add-Result (
  $privateAlpha.Contains('selectedProviderId === "groq-cloud"') -and
  $privateAlpha.Contains('selectedTarget?.modelKey ?? ""')
) "retained diagnostic selector assigns no default Groq model"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-target-summary="true"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-boundary="manual-execution"') -and
  $privateAlpha.Contains('Creating or approving the request does not contact Groq.') -and
  $privateAlpha.Contains('Only a later explicit execute action can send the approved prompt.')
) "retained diagnostic target summary preserves the manual-execution cloud boundary warning"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-acknowledgement="required"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-execution-acknowledgement="required"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-execute="manual"') -and
  $privateAlpha.Contains('Execute once on Groq Cloud')
) "retained diagnostic cloud approval and manual execution controls remain"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-bound-create={') -and
  $privateAlpha.Contains('modelKey: exactTarget.modelKey')
) "retained diagnostic bound create includes the exact model key"
Add-Result (
  $privateAlpha.Contains('cloudDataTransferAcknowledgement: true') -and
  $privateAlpha.Contains('await approvePrivateAlphaRun(currentRun.runId, {')
) "retained diagnostic cloud approval includes the explicit transfer acknowledgement"
Add-Result (
  $privateAlpha.Contains('await approvePrivateAlphaRun(currentRun.runId, {') -and
  $privateAlpha.Contains('expectedRevision: currentRun.revision,') -and
  -not $privateAlpha.Contains('cloudDataTransferAcknowledgement: undefined')
) "retained diagnostic local approval omits an undefined cloud acknowledgement payload field"
Add-Result (
  $privateAlpha.Contains('executePrivateAlphaRun(currentRun.runId, {') -and
  $privateAlpha.Contains('Execute once on local Ollama')
) "retained diagnostic local execution remains available"
Add-Result (
  $privateAlpha.Contains('Groq approval binding currently supports text requests only.') -and
  $privateAlpha.Contains('Free-first automatic routing supports text requests only.') -and
  $privateAlpha.Contains('requestMode === "free-first-automatic"')
) "retained diagnostic Groq and free-first automatic routing remain text-only"

$advancedSettingsIndex = $privateAlpha.IndexOf("Advanced settings")
$maximumTokensIndex = $privateAlpha.IndexOf("Maximum output tokens")
Add-Result (
  $advancedSettingsIndex -ge 0 -and
  $maximumTokensIndex -gt $advancedSettingsIndex
) "retained diagnostic maximum output tokens remain inside Advanced settings"
Add-Result (
  $privateAlpha.Contains('"Created"') -and
  $privateAlpha.Contains('"Approved"') -and
  $privateAlpha.Contains('"Executing"') -and
  $privateAlpha.Contains('"Result"')
) "retained diagnostic progress labels include Created, Approved, Executing, and Result"
Add-Result (
  $privateAlpha.Contains("showCancellationForm") -and
  $privateAlpha.Contains("Confirm cancellation") -and
  $privateAlpha.Contains("Keep run")
) "retained diagnostic cancellation reason is conditionally disclosed"
Add-Result (
  $privateAlpha.Contains('currentRun.state === "awaiting_approval"') -and
  $privateAlpha.Contains('currentRun.state === "approved"') -and
  $privateAlpha.Contains('currentRun.state === "executing"') -and
  $privateAlpha.Contains('currentRun.state === "succeeded"') -and
  $privateAlpha.Contains('currentRun.state === "failed"')
) "retained diagnostic run renders only state-valid actions"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-technical-details="true"') -and
  $privateAlpha -match '<details'
) "retained diagnostic Technical details uses a native details element"
Add-Result (
  $privateAlpha.Contains("Current run") -and
  $privateAlpha.Contains("Recent runs") -and
  $privateAlpha.Contains("Audit") -and
  $privateAlpha.Contains('role="tablist"') -and
  $privateAlpha.Contains('role="tabpanel"')
) "retained diagnostic Current run, Recent runs, and Audit views remain"
Add-Result ($privateAlpha.Contains("runs.slice(0, 10)")) "retained diagnostic recent runs remain limited to 10"
Add-Result ($privateAlpha.Contains("The model completed but returned no visible response text.")) "retained diagnostic empty successful output has an explicit warning"
Add-Result ($privateAlpha.Contains("currentOutputText.trim().length > 0")) "retained diagnostic non-empty successful output remains renderable"
Add-Result ($privateAlpha.Contains("safeErrorMessage")) "retained diagnostic failed and blocked safe messages remain renderable"

$technicalDetailsIndex = $privateAlpha.IndexOf('data-codexforge-private-alpha-technical-details="true"')
$technicalDetailsText = if ($technicalDetailsIndex -ge 0) {
  $privateAlpha.Substring($technicalDetailsIndex)
} else {
  ""
}
Add-Result (
  $technicalDetailsIndex -ge 0 -and
  $technicalDetailsText.Contains("approvalScopeHash") -and
  $technicalDetailsText.Contains("normalizedRequestHash") -and
  $technicalDetailsText.Contains("outputSha256")
) "retained diagnostic raw hashes remain inside technical details"
Add-Result ($privateAlpha -notmatch '\bfetch\s*\(') "PrivateAlphaRunPanel contains no raw fetch call"
Add-Result ($privateAlpha -notmatch 'localStorage|sessionStorage|indexedDB|document\.cookie') "PrivateAlphaRunPanel contains no browser storage"
Add-Result ($privateAlpha -notmatch 'https?://') "PrivateAlphaRunPanel contains no external URL"
Add-Result ($privateAlphaIndex.Contains("PrivateAlphaRuntimeModelKey")) "private-alpha index exports the runtime model key type"
Add-Result ($privateAlphaIndex.Contains("PRIVATE_ALPHA_RUNTIME_MODEL_KEYS")) "private-alpha index exports the runtime model keys constant"

Add-Result ($liveUiText -notmatch '11434') "the browser UI does not reference port 11434"
Add-Result (
  $advancedTools.Contains('readChatRecallHandoffFromBrowserStorage()') -and
  $chatRecallStorage.Contains('window.localStorage.getItem(CHAT_RECALL_CONTEXT_STORAGE_KEY)') -and
  $chatRecallStorage.Contains('window.localStorage.setItem(CHAT_RECALL_CONTEXT_STORAGE_KEY, payload)') -and
  $liveUiText -notmatch 'localStorage|sessionStorage|indexedDB|document\.cookie'
) "the live Jarvis UI delegates the one bounded recall handoff to its exact storage boundary"
Add-Result ($liveUiText -notmatch 'https?://') "no external provider URL exists"

$expectedProductSourcePaths = @(
  "src/app/patch-preview-workbench/page-client.tsx",
  "src/app/provider-adapters/page-client.tsx",
  "src/app/video-assets/page-client.tsx",
  "src/app/video-projects/page-client.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx",
  "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx",
  "src/lib/codexforge/video-foundation-ui.tsx",
  "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"
)
Add-Result (
  $allowedMacroPhaseCPaths.Count -eq 30 -and
  @($allowedMacroPhaseCPaths | Sort-Object -Unique).Count -eq 30 -and
  @($allowedMacroPhaseCPaths | Where-Object { -not (Test-Path -LiteralPath (Join-Path $repoRoot $_) -PathType Leaf) }).Count -eq 0
) "historical Macro Phase C.1 source inventory remains complete and unique"
Add-Result (
  @($allowedMacroPhaseCPaths | Where-Object { $_ -match '^src/' }).Count -eq $expectedProductSourcePaths.Count -and
  @($expectedProductSourcePaths | Where-Object { $allowedMacroPhaseCPaths -notcontains $_ }).Count -eq 0
) "historical Macro Phase C.1 product source inventory remains exact"
Add-Result (
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/model-routing/model-routing-provider-registry.ts" -and
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/model-routing/model-routing-catalog.ts" -and
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/model-routing/model-routing-types.ts" -and
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/model-routing/index.ts"
) "protected model-routing production ownership remains outside the historical Macro Phase C.1 inventory"
Add-Result (
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx" -and
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx" -and
  $allowedMacroPhaseCPaths -notcontains "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
) "Jarvis live command center, canonical chat, and diagnostic run panel remain outside historical Macro Phase C.1 ownership"
Add-Result (
  $allowedMacroPhaseCPaths -contains "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1" -and
  $allowedMacroPhaseCPaths -contains "scripts/smoke-codexforge-all.ps1"
) "Macro Phase A required smoke and aggregate historical ownership remain present"
Add-Result ($changedTypeScriptText -notmatch ':\s*any\b|\bas any\b|<any>') "no any or as any was introduced"
Add-Result ($changedUiText -notmatch 'ts-nocheck|ts-expect-error') "no ts-nocheck or ts-expect-error was introduced"
Add-Result ($commandDeckRole.Contains("commandDeckRole: CodexForgeCommandDeckRole;")) "commandDeckRole remains strongly typed"
Add-Result (
  $jarvisVideoPage.Contains("JarvisVideoWorkspacePageClient") -and
  $shell.Contains('case "/jarvis-video":')
) "/jarvis-video markers remain present"
Add-Result (
  -not (Find-RuleMixingBorderProperties -CssText $css)
) "no mixed border shorthand or longhand was introduced"
Add-Result ($css.Contains('.privateAlphaTargetSelectorGrid')) "CSS contains the target-selector layout"
Add-Result ($css.Contains('.privateAlphaCloudApprovalNotice')) "CSS contains cloud approval styling"
Add-Result ($media920Match.Success) "CSS collapses the target selector layout at 920px"

$longestPath = 0
foreach ($path in $allowedMacroPhaseCPaths) {
  if ($path.Length -gt $longestPath) {
    $longestPath = $path.Length
  }
}

Add-Result ($longestPath -lt 220) "longest historical Macro Phase C.1 source path is under 220 characters"

if ($Failures.Count -gt 0) {
  Write-Host ""
  Write-Host ("FAIL - {0} check(s) failed" -f $Failures.Count)
  exit 1
}

Write-Host ""
Write-Host "PASS smoke-codexforge-jarvis-live-command-center-ui"
