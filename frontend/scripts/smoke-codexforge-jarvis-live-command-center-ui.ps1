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

  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    if ($line.Length -lt 4) {
      continue
    }

    $entries += [pscustomobject]@{
      Status = $line.Substring(0, 2)
      Path = $line.Substring(3).Trim()
    }
  }

  return $entries
}

$Failures = New-Object System.Collections.Generic.List[string]

$athenaPanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx"
$livePanelPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx"
$shellPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx"
$privateAlphaPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
$cssPath = "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css"
$athenaAliasPath = "src/app/athena/page.tsx"
$jarvisVideoPagePath = "src/app/jarvis-video/page.tsx"
$commandDeckRolePath = "src/lib/codexforge/navigation-shell/navigation-shell-types.ts"

$athenaPanel = Get-FileText $athenaPanelPath
$livePanel = Get-FileText $livePanelPath
$shell = Get-FileText $shellPath
$privateAlpha = Get-FileText $privateAlphaPath
$css = Get-FileText $cssPath
$athenaAlias = Get-FileText $athenaAliasPath
$jarvisVideoPage = Get-FileText $jarvisVideoPagePath
$commandDeckRole = Get-FileText $commandDeckRolePath
$statusEntries = Get-StatusEntries
$changedPaths = @($statusEntries | ForEach-Object { $_.Path })
$changedUiText = ($athenaPanel, $livePanel, $shell, $privateAlpha, $css) -join "`n"
$changedTypeScriptText = ($athenaPanel, $livePanel, $shell, $privateAlpha) -join "`n"
$liveUiText = ($livePanel, $shell, $privateAlpha, $css) -join "`n"
$liveJarvisBranchMatch = [regex]::Match(
  $shell,
  'if \(isPrimaryAthenaSurface\) \{[\s\S]*?<AthenaCommandCenterPanel[\s\S]*?displayMode="live-product"[\s\S]*?</section>\s*\);\s*\}'
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
  $privateAlpha.Contains("Fixed model") -and
  -not ($privateAlpha -cmatch '\breadOnly\b')
) "the fixed model is not rendered as a read-only input"

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
Add-Result ($liveUiText -notmatch '11434') "the browser UI does not reference port 11434"
Add-Result ($liveUiText -notmatch 'localStorage|sessionStorage|indexedDB|document\.cookie') "no browser storage exists"
Add-Result ($liveUiText -notmatch 'https?://') "no external provider URL exists"
Add-Result (
  -not ($changedPaths | Where-Object {
      $_ -match '^src/lib/codexforge/private-alpha/private-alpha-(store|ollama|kill-switch)\.server\.ts$' -or
      $_ -match '^src/lib/codexforge/private-alpha/private-alpha-(state-machine|types|validation|api-client)\.ts$'
    })
) "no backend private-alpha file changed"
Add-Result (
  -not ($changedPaths | Where-Object {
      $_ -match '^src/app/api/codexforge/private-alpha/'
    })
) "no private-alpha API route changed"
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
