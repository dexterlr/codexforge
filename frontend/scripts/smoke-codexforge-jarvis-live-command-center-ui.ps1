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

$allowedSliceRPaths = @(
  "docs/codexforge-exact-installed-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract-v0.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/qualify-codexforge-qwen2-5-coder-32b-installed-candidate.ps1",
  "scripts/run-codexforge-qwen2-5-coder-32b-controlled-live-acceptance.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
)

$athenaPanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx"
$livePanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx"
$shellPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx"
$privateAlphaPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
$privateAlphaIndexPath = "src/lib/codexforge/private-alpha/index.ts"
$cssPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css"
$athenaAliasPath = "src/app/athena/page.tsx"
$jarvisVideoPagePath = "src/app/jarvis-video/page.tsx"
$commandDeckRolePath = "src/lib/codexforge/navigation-shell/navigation-shell-types.ts"

$athenaPanel = Get-FileText $athenaPanelPath
$livePanel = Get-FileText $livePanelPath
$shell = Get-FileText $shellPath
$privateAlpha = Get-FileText $privateAlphaPath
$privateAlphaIndex = Get-FileText $privateAlphaIndexPath
$css = Get-FileText $cssPath
$athenaAlias = Get-FileText $athenaAliasPath
$jarvisVideoPage = Get-FileText $jarvisVideoPagePath
$commandDeckRole = Get-FileText $commandDeckRolePath
$statusEntries = Get-StatusEntries
$changedPaths = @($statusEntries | ForEach-Object { $_.Path })
$changedUiText = ($athenaPanel, $livePanel, $shell, $privateAlpha, $css) -join "`n"
$changedTypeScriptText = ($privateAlpha, $privateAlphaIndex) -join "`n"
$liveUiText = ($livePanel, $shell, $privateAlpha, $css) -join "`n"
$liveJarvisBranchMatch = [regex]::Match(
  $shell,
  'if \(isPrimaryAthenaSurface\) \{[\s\S]*?<AthenaCommandCenterPanel[\s\S]*?displayMode="live-product"[\s\S]*?</section>\s*\);\s*\}'
)
$productSourceChanges = @(
  $changedPaths | Where-Object { $_ -match '^src/' }
)
$media920Match = [regex]::Match(
  $css,
  '@media \(max-width: 920px\) \{[\s\S]*?privateAlphaTargetSelectorGrid[\s\S]*?grid-template-columns:\s*1fr;'
)

Add-Result (Test-Path -LiteralPath (Join-Path $repoRoot $livePanelPath)) "AthenaLiveCommandCenterPanel exists"
Add-Result (
  $athenaPanel.Contains('type AthenaCommandCenterDisplayMode = "live-product" | "legacy-preview";') -and
  $athenaPanel.Contains('displayMode?: AthenaCommandCenterDisplayMode;')
) "AthenaCommandCenterPanel supports live-product and legacy-preview"
Add-Result ($athenaPanel.Contains('displayMode = "legacy-preview"')) "legacy-preview remains the default"
Add-Result ($shell.Contains('displayMode="live-product"')) "/jarvis selects live-product"
Add-Result ($athenaAlias.Trim() -eq 'export { default } from "../jarvis/page";') "/athena remains an alias of /jarvis"
Add-Result ($livePanel.Contains('data-codexforge-athena-display-mode="live-product"')) "live-product has the stable display-mode marker"
Add-Result ([regex]::Matches($livePanel, '<PrivateAlphaRunPanel').Count -eq 1) "PrivateAlphaRunPanel is rendered exactly once in the live-product branch"
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
Add-Result ([regex]::Matches($livePanel, 'routeLabel: "/').Count -eq 3) "exactly three quick links exist"
Add-Result (
  $livePanel.Contains('title: "Video Studio"') -and
  $livePanel.Contains('href: "/jarvis-video"') -and
  $livePanel.Contains('title: "Providers"') -and
  $livePanel.Contains('href: "/ai-providers"') -and
  $livePanel.Contains('title: "Audit and Runs"') -and
  $livePanel.Contains('href: "/jarvis-audit"')
) "quick links target Video Studio, Providers, and Audit and Runs"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-composer="true"') -and
  $privateAlpha -match '<textarea'
) "the real private-alpha request textarea remains"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-provider-selector="manual"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-model-selector="manual"')
) "manual provider and model selectors exist"
Add-Result (
  $privateAlpha.Contains('Local Ollama') -and
  $privateAlpha.Contains('Groq Cloud') -and
  $privateAlpha.Contains('gpt-oss:20b') -and
  $privateAlpha.Contains('openai/gpt-oss-20b') -and
  $privateAlpha.Contains('openai/gpt-oss-120b')
) "exact local and Groq targets exist"
Add-Result ($privateAlpha.Contains('Select a Groq model')) "the Groq selector has an explicit prompt option"
Add-Result (
  $privateAlpha.Contains('selectedProviderId === "groq-cloud"') -and
  $privateAlpha.Contains('selectedTarget?.modelKey ?? ""')
) "no default Groq model is assigned"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-target-summary="true"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-boundary="manual-execution"') -and
  $privateAlpha.Contains('Creating or approving the request does not contact Groq.') -and
  $privateAlpha.Contains('Only a later explicit execute action can send the approved prompt.')
) "target summary and manual-execution cloud boundary warning exist"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-acknowledgement="required"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-execution-acknowledgement="required"') -and
  $privateAlpha.Contains('data-codexforge-private-alpha-cloud-execute="manual"') -and
  $privateAlpha.Contains('Execute once on Groq Cloud')
) "cloud approval and manual execution controls exist"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-bound-create={') -and
  $privateAlpha.Contains('modelKey: exactTarget.modelKey')
) "bound create includes the exact model key"
Add-Result (
  $privateAlpha.Contains('cloudDataTransferAcknowledgement: true') -and
  $privateAlpha.Contains('await approvePrivateAlphaRun(currentRun.runId, {')
) "cloud approval payload includes the explicit transfer acknowledgement"
Add-Result (
  $privateAlpha.Contains('await approvePrivateAlphaRun(currentRun.runId, {') -and
  $privateAlpha.Contains('expectedRevision: currentRun.revision,') -and
  -not $privateAlpha.Contains('cloudDataTransferAcknowledgement: undefined')
) "local approval omits an undefined cloud acknowledgement payload field"
Add-Result (
  $privateAlpha.Contains('executePrivateAlphaRun(currentRun.runId, {') -and
  $privateAlpha.Contains('Execute once on local Ollama')
) "local execution remains available"
Add-Result (
  $privateAlpha.Contains('Groq approval binding currently supports text requests only.') -and
  $privateAlpha.Contains('Free-first automatic routing supports text requests only.') -and
  $privateAlpha.Contains('requestMode === "free-first-automatic"')
) "Groq and free-first automatic routing remain text-only"

$advancedSettingsIndex = $privateAlpha.IndexOf("Advanced settings")
$maximumTokensIndex = $privateAlpha.IndexOf("Maximum output tokens")
Add-Result (
  $advancedSettingsIndex -ge 0 -and
  $maximumTokensIndex -gt $advancedSettingsIndex
) "maximum output tokens are inside Advanced settings"
Add-Result (
  $privateAlpha.Contains('"Created"') -and
  $privateAlpha.Contains('"Approved"') -and
  $privateAlpha.Contains('"Executing"') -and
  $privateAlpha.Contains('"Result"')
) "Created, Approved, Executing, and Result progress labels exist"
Add-Result (
  $privateAlpha.Contains("showCancellationForm") -and
  $privateAlpha.Contains("Confirm cancellation") -and
  $privateAlpha.Contains("Keep run")
) "cancellation reason is conditionally disclosed"
Add-Result (
  $privateAlpha.Contains('currentRun.state === "awaiting_approval"') -and
  $privateAlpha.Contains('currentRun.state === "approved"') -and
  $privateAlpha.Contains('currentRun.state === "executing"') -and
  $privateAlpha.Contains('currentRun.state === "succeeded"') -and
  $privateAlpha.Contains('currentRun.state === "failed"')
) "only state-valid actions are rendered"
Add-Result (
  $privateAlpha.Contains('data-codexforge-private-alpha-technical-details="true"') -and
  $privateAlpha -match '<details'
) "Technical details uses a native details element"
Add-Result (
  $privateAlpha.Contains("Current run") -and
  $privateAlpha.Contains("Recent runs") -and
  $privateAlpha.Contains("Audit") -and
  $privateAlpha.Contains('role="tablist"') -and
  $privateAlpha.Contains('role="tabpanel"')
) "Current run, Recent runs, and Audit views exist"
Add-Result ($privateAlpha.Contains("runs.slice(0, 10)")) "recent runs are limited to 10 in the UI"
Add-Result ($privateAlpha.Contains("The model completed but returned no visible response text.")) "empty successful output has an explicit warning"
Add-Result ($privateAlpha.Contains("currentOutputText.trim().length > 0")) "non-empty successful output remains renderable"
Add-Result ($privateAlpha.Contains("safeErrorMessage")) "failed and blocked safe messages remain renderable"

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
) "raw hashes are placed in technical details"
Add-Result ($privateAlpha -notmatch '\bfetch\s*\(') "PrivateAlphaRunPanel contains no raw fetch call"
Add-Result ($privateAlpha -notmatch 'localStorage|sessionStorage|indexedDB|document\.cookie') "PrivateAlphaRunPanel contains no browser storage"
Add-Result ($privateAlpha -notmatch 'https?://') "PrivateAlphaRunPanel contains no external URL"
Add-Result ($privateAlphaIndex.Contains("PrivateAlphaRuntimeModelKey")) "private-alpha index exports the runtime model key type"
Add-Result ($privateAlphaIndex.Contains("PRIVATE_ALPHA_RUNTIME_MODEL_KEYS")) "private-alpha index exports the runtime model keys constant"

Add-Result ($liveUiText -notmatch '11434') "the browser UI does not reference port 11434"
Add-Result ($liveUiText -notmatch 'localStorage|sessionStorage|indexedDB|document\.cookie') "no browser storage exists"
Add-Result ($liveUiText -notmatch 'https?://') "no external provider URL exists"

$changedProductSourcePaths = @(
  $productSourceChanges | Where-Object { $_ -match '^src/' }
)
$expectedProductSourcePaths = @(
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
)
Add-Result (
  $changedPaths.Count -eq $allowedSliceRPaths.Count -and
  @($changedPaths | Where-Object { $allowedSliceRPaths -notcontains $_ }).Count -eq 0
) "git scope contains exactly the twenty allowed Slice R files"
Add-Result (
  $changedProductSourcePaths.Count -eq $expectedProductSourcePaths.Count -and
  @($changedProductSourcePaths | Where-Object { $expectedProductSourcePaths -notcontains $_ }).Count -eq 0
) "only the exact Slice R qualification and controlled acceptance source paths changed"
Add-Result (
  $changedPaths -notcontains "src/lib/codexforge/model-routing/model-routing-provider-registry.ts" -and
  $changedPaths -notcontains "src/lib/codexforge/model-routing/model-routing-catalog.ts" -and
  $changedPaths -notcontains "src/lib/codexforge/model-routing/model-routing-types.ts" -and
  $changedPaths -notcontains "src/lib/codexforge/model-routing/index.ts"
) "protected model-routing production ownership remains outside the Slice R changed paths"
Add-Result (
  $changedPaths -contains "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts" -and
  $changedPaths -contains "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
) "Slice R server-only runtime ownership is present in the changed paths"
Add-Result (
  $changedPaths -contains "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts" -and
  $changedPaths -contains "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1"
) "Slice R type contract and required smoke ownership are present"
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
foreach ($path in $changedPaths) {
  if ($path.Length -gt $longestPath) {
    $longestPath = $path.Length
  }
}

Add-Result ($longestPath -lt 220) "longest new source path is under 220 characters"

if ($Failures.Count -gt 0) {
  Write-Host ""
  Write-Host ("FAIL - {0} check(s) failed" -f $Failures.Count)
  exit 1
}

Write-Host ""
Write-Host "PASS smoke-codexforge-jarvis-live-command-center-ui"
