param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing $Message`: $Needle"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  if ([regex]::IsMatch($Haystack, $Pattern)) {
    throw "[FAIL] Unexpected $Message with pattern $Pattern"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NoGitDiff {
  param([string]$Path, [string]$Message)
  $diff = ((& git -c core.safecrlf=false diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

function Assert-PowerShellParses {
  param([string]$Path)
  $tokens = $null
  $parseErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $Path),
    [ref]$tokens,
    [ref]$parseErrors
  ) | Out-Null
  Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $Path"
}

function Find-RuleMixingBorderProperties {
  param([string]$CssText)
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

function Get-Text {
  param([string]$Path)
  return Get-Content -Raw -LiteralPath (Join-Path $root $Path)
}

function Get-Window {
  param(
    [string]$Text,
    [string]$Marker,
    [int]$Length
  )

  $index = $Text.IndexOf($Marker)
  if ($index -lt 0) {
    return ""
  }

  $maxLength = [Math]::Min($Length, $Text.Length - $index)
  return $Text.Substring($index, $maxLength)
}

Write-Host ""
Write-Host "=== CodexForge Jarvis manual provider model selector smoke ==="

$allowedChangedFiles = @(
  "docs/codexforge-registry-backed-free-local-provider-onboarding-admission-foundation-v0.md",
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
  "src/lib/codexforge/model-routing/onboarding/index.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-constants.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-types.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts",
  "src/lib/codexforge/model-routing/onboarding/server.ts"
)

$requiredFiles = @(
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "docs/codexforge-jarvis-manual-provider-model-selector-v0.md",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1"
) | ForEach-Object { $_ -replace '/', '\' }

$parsedScripts = @(
  "scripts\smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts\smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts\smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts\smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-live-execution-admission.ps1"
)

foreach ($path in $requiredFiles) {
  Assert-FileExists $path
}

foreach ($path in $parsedScripts) {
  Assert-PowerShellParses $path
}

$statusLines = @(
  (& git status --short --untracked-files=all 2>$null) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)
$changedPaths = $statusLines |
  ForEach-Object {
    if ($_.Length -lt 4) {
      throw "[FAIL] Unexpected git status line: $_"
    }

    $_.Substring(3).Trim() -replace "\\", "/"
  } |
  Sort-Object -Unique

Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git scope contains exactly the nineteen allowed Slice P files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git scope stays within the allowed smoke-repair files: $path"
}

Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-types.ts") 'groqFreeTierExecutionConfirmation?: true;' "Private-alpha types add the exact execution-time Groq Free-tier confirmation input"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-validation.ts") 'groqFreeTierExecutionConfirmation' "Private-alpha validation enforces the exact execution-time Groq Free-tier confirmation"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts") 'groqFreeTierExecutionConfirmation' "Private-alpha store records the execution-time Groq Free-tier confirmation"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Provider runtime remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts") "approvedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS" "Groq adapter identities enforce the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "State machine remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Kill switch remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-api-client.ts") '${PRIVATE_ALPHA_API_BASE_PATH}/routing/free-first' "Private-alpha API client includes the free-first routing endpoint"
Assert-FileExists "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-policy.server.ts") 'freeTierConfirmationState' "Model-routing policy applies the Free-tier confirmation gate"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$typesSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$validationSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-validation.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$runtimeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
$providerSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts"
$ollamaAdapterSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-ollama-adapter.server.ts"
$groqAdapterSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts"
$ollamaTransportSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts"
$apiClientSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-api-client.ts"
$indexSource = Get-Text "src\lib\codexforge\private-alpha\index.ts"
$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$cssSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$providerRegistrySource = Get-Text "src\lib\codexforge\model-routing\model-routing-provider-registry.ts"
$policySource = Get-Text "src\lib\codexforge\model-routing\model-routing-policy.server.ts"
$athenaAliasSource = Get-Text "src\app\athena\page.tsx"
$jarvisVideoSource = Get-Text "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Text "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$codeSource = ($indexSource, $panelSource) -join "`n"
$approvedCloudWindow = Get-Window $panelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' 4000
$createBlock = Get-Window $panelSource 'createPrivateAlphaRun({' 500

Assert-Contains $catalogSource 'CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION =' "Catalog source declares a catalog version"
Assert-Contains $catalogSource '"codexforge-model-routing-v4"' "Catalog remains v4"
Assert-Contains $providerRegistrySource 'return { modelKey: acceptedModel.modelKey, providerId: CODEXFORGE_GROQ_PROVIDER_ID, modelId: acceptedModel.modelId, label: acceptedModel.modelId, routingState: automatic ? "automatic" : "manual-only", automaticRoutingAdmission: automatic ? { admissionId: CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.admissionVersion, modes: [CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.routingMode] } : null' "Groq registry preserves exact-model keyed automatic 20B/free-first routing and manual-only non-admitted 120B routing"
Assert-Contains $catalogSource 'CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY.flatMap(' "Catalog composition consumes the canonical provider registry"
Assert-Contains $providerRegistrySource 'Automatic free-first routing is admitted only for ${CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.automaticModelKey}.' "Automatic routing remains admitted only for the exact Groq 20B key"
Assert-Contains $policySource "Manual mode requires an exact manualModelKey; no model was evaluated." "Manual policy still requires an exact manual key"
Assert-Contains $typesSource "export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;" "Record version remains 1"
Assert-Contains $typesSource "export const PRIVATE_ALPHA_APPROVAL_BINDING_VERSION = 1 as const;" "Approval binding version remains 1"
Assert-Contains $indexSource "PrivateAlphaRuntimeModelKey" "Index exports PrivateAlphaRuntimeModelKey"
Assert-Contains $indexSource "PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY" "Index exports the local model-key constant"
Assert-Contains $indexSource "PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY" "Index exports the Groq 20B model-key constant"
Assert-Contains $indexSource "PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY" "Index exports the Groq 120B model-key constant"
Assert-Contains $indexSource "PRIVATE_ALPHA_RUNTIME_MODEL_KEYS" "Index exports PRIVATE_ALPHA_RUNTIME_MODEL_KEYS"
Assert-Contains $indexSource "PrivateAlphaBoundDataBoundary" "Index exports cloud approval boundary types"
Assert-Contains $indexSource "PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE" "Index exports cloud approval mode"
Assert-Contains $indexSource "PRIVATE_ALPHA_CLOUD_APPROVAL_STATEMENT" "Index exports cloud approval statement"
Assert-Contains $indexSource "resolvePrivateAlphaBoundConfiguration" "Index exports the bound-configuration resolver"

Assert-Contains $panelSource 'data-codexforge-private-alpha-provider-selector="manual"' "Panel contains the manual provider selector marker"
Assert-Contains $panelSource 'data-codexforge-private-alpha-model-selector="manual"' "Panel contains the manual model selector marker"
Assert-Contains $panelSource 'data-codexforge-private-alpha-target-summary="true"' "Panel contains the selected-target summary marker"
Assert-Contains $panelSource '{ id: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID, label: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL }' "Provider options include Local Ollama"
Assert-Contains $panelSource '{ id: "groq-cloud", label: PRIVATE_ALPHA_GROQ_PROVIDER_LABEL }' "Provider options include Groq Cloud"
Assert-Contains $panelSource 'useState<PrivateAlphaManualProviderId>(PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID)' "Initial provider is Local Ollama"
Assert-Contains $panelSource 'useState<PrivateAlphaRuntimeModelKey | null>(' "Panel keeps model selection in typed state"
Assert-Contains $panelSource 'PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY' "Initial model is the exact local model key"
Assert-Contains $panelSource 'setSelectedModelKey(null);' "Switching to Groq clears model selection"
Assert-Contains $panelSource 'selectedTarget?.modelKey ?? ""' "No Groq model is auto-selected"
Assert-Contains $panelSource 'Select a Groq model' "Groq model prompt option is explicit"
Assert-Contains $panelSource 'PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY' "Groq 20B model key is available"
Assert-Contains $panelSource 'PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY' "Groq 120B model key is available"
Assert-Contains $panelSource 'Select one exact allowlisted model.' "Unknown model values are not accepted silently"
Assert-Contains $panelSource 'const canCreateBoundRun = automaticModeSelected' "Create is gated by the request mode"
Assert-Contains $panelSource '<option value="text">Text</option>' "Local supports text"
Assert-Contains $panelSource '<option value="code">Code</option>' "Local supports code"
Assert-Contains $panelSource 'capability: exactTarget.supportsCode ? capability : "text"' "Groq forces text"
Assert-Contains $panelSource 'selectedProviderId === "groq-cloud" ||' "Groq disables the capability select"
Assert-Contains $panelSource 'setCapability("text");' "Changing local code to Groq becomes text"
Assert-Contains $panelSource 'modelKey: exactTarget.modelKey' "Create input includes modelKey"
Assert-Contains $panelSource 'modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,' "Local target configuration uses the exact local key"
Assert-Contains $panelSource 'modelLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,' "Local target configuration uses the exact local model label"
Assert-Contains $panelSource 'modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,' "Groq 20B target configuration uses the exact key"
Assert-Contains $panelSource 'modelLabel: "openai/gpt-oss-20b",' "Groq 20B target configuration uses the exact model label"
Assert-Contains $panelSource 'modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,' "Groq 120B target configuration uses the exact key"
Assert-Contains $panelSource 'modelLabel: "openai/gpt-oss-120b",' "Groq 120B target configuration uses the exact model label"
Assert-NotMatches $createBlock 'providerPreference\s*:' "UI create payload does not send providerPreference"
Assert-NotMatches $createBlock 'dataBoundary\s*:' "UI create payload does not send dataBoundary"
Assert-NotMatches $createBlock 'executionMode\s*:' "UI create payload does not send executionMode"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-boundary="manual-execution"' "Cloud warning marker exists"
Assert-Contains $panelSource 'Creating or approving the request does not contact Groq.' "Cloud warning states creation and approval make no Groq call"
Assert-Contains $panelSource 'The request is persisted locally. Creating the request' "Cloud warning keeps creation local after persistence"
Assert-Contains $panelSource 'Approving the request does not' "Cloud warning states approval makes no Groq call"
Assert-Contains $panelSource 'Only the later explicit execute action' "Cloud warning states only explicit later execution can send the prompt"
Assert-Contains $panelSource 'setApprovalAcknowledged(false);' "Generic approval acknowledgement remains"
Assert-Contains $panelSource 'setCloudDataTransferAcknowledged(false);' "Separate cloud acknowledgement state exists"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-acknowledgement="required"' "Cloud acknowledgement marker exists"
Assert-Contains $panelSource '(cloudExecutableRun && !cloudDataTransferAcknowledged)' "Cloud execution requires both checkboxes"
Assert-Contains $panelSource '!approvalAcknowledged' "Local approval still requires the generic acknowledgement"
Assert-Contains $panelSource 'cloudDataTransferAcknowledgement: true' "Cloud approval payload includes cloudDataTransferAcknowledgement true"
Assert-NotMatches $panelSource 'cloudDataTransferAcknowledgement:\s*undefined' "Local approval payload omits cloudDataTransferAcknowledgement"
Assert-Contains $panelSource 'The request is persisted locally. No prompt was sent to Groq. The exact cloud scope is awaiting approval.' "Groq awaiting-approval messaging says no prompt was sent and approval is still pending"
Assert-Contains $panelSource 'No prompt was sent to Groq' "Groq approved messaging says no prompt was sent"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Cloud execution acknowledgement marker exists"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Cloud execution-manual marker exists"
Assert-Contains $approvedCloudWindow 'type="checkbox"' "Approved Groq UI renders the execution acknowledgement checkbox"
Assert-NotMatches $approvedCloudWindow 'Execute once on local Ollama' "Approved Groq UI renders no local execute button"
Assert-Contains $approvedCloudWindow 'Execute once on Groq Cloud' "Approved Groq UI renders the manual execute button"
Assert-Contains $approvedCloudWindow 'handleExecute()' "Approved Groq UI routes through handleExecute"
Assert-Contains $panelSource 'cloudExecutionAcknowledgement: true' "Approved Groq execution payload includes cloudExecutionAcknowledgement true"
Assert-Contains $approvedCloudWindow 'there is no automatic routing, retry, or fallback.' "Approved Groq UI keeps the explicit one-attempt and no-routing posture"
Assert-Contains $approvedCloudWindow 'Cancel run' "Approved Groq UI retains cancellation"
Assert-Contains $panelSource 'I acknowledge that the approved prompt is sent only to' "Local approved UI still renders the execution acknowledgement"
Assert-Contains $panelSource 'executePrivateAlphaRun(currentRun.runId, {' "Local approved UI still calls executePrivateAlphaRun"
Assert-Contains $panelSource 'status?.executionAllowed === true' "Local canExecute still requires executionAllowed"
Assert-Contains $panelSource 'executionAcknowledged' "Local canExecute still requires the local execution acknowledgement"
Assert-Contains $panelSource 'Historical or legacy record loaded.' "Historical runs remain readable"
Assert-NotMatches $panelSource 'Legacy Slice A runs remain readable but cannot execute\.' "Groq runs are not labelled legacy"
Assert-Contains $panelSource 'Provider</span>' "Bound current run shows provider"
Assert-Contains $panelSource 'Model</span>' "Bound current run shows model"
Assert-Contains $panelSource '>modelKey<' "Bound current run shows modelKey"
Assert-Contains $panelSource '>dataBoundary<' "Bound current run shows dataBoundary"
Assert-Contains $panelSource 'cloudDataTransferRequirement' "Bound current run shows cloud transfer requirement"
Assert-Contains $panelSource 'approval cloud acknowledgement' "Bound approval shows persisted cloud acknowledgement"
Assert-Contains $panelSource 'runs.slice(0, 10)' "Recent runs remain limited to ten"
Assert-Contains $panelSource 'resolveManualProviderLabel(run.providerPreference)' "Recent run cards show provider"
Assert-Contains $panelSource 'resolveRunModelLabel(run.modelPreferenceLabel)' "Recent run cards show model"
Assert-NotMatches $panelSource '\bfetch\s*\(' "No raw fetch exists in the panel"
Assert-NotMatches $panelSource 'https?://|11434' "No external provider URL exists in the panel"
Assert-NotMatches $panelSource 'localStorage|sessionStorage|indexedDB|document\.cookie' "No browser storage exists in the panel"
Assert-NotMatches $panelSource 'process\.env' "No process.env access exists in the panel"
Assert-NotMatches $codeSource 'from\s+["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']|require\(["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']\)' "No provider SDK is introduced"
Assert-NotMatches $codeSource 'GROQ_API_KEY|Authorization|x-groq-request-id|credentialSource|acceptanceToken|liveAcceptanceToken' "No credential-like value is stored"
Assert-NotMatches $codeSource 'live acceptance token|acceptance token' "No live acceptance token is stored"
Assert-Contains $cssSource '.privateAlphaTargetSelectorGrid' "CSS contains target-selector layout"
Assert-Contains $cssSource '.privateAlphaCloudApprovalNotice' "CSS contains cloud approval styling"
Assert-Contains $cssSource '@media (max-width: 920px)' "CSS defines the 920px responsive breakpoint"
Assert-Contains $cssSource '.privateAlphaTargetSelectorGrid,' "CSS collapses the target selector grid at 920px"
Assert-True (-not (Find-RuleMixingBorderProperties -CssText $cssSource)) "CSS introduces no mixed border shorthand and longhand"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $jarvisVideoSource $marker "/jarvis-video retains marker $marker"
}
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"
Assert-NotMatches $codeSource ':\s*any\b|\bas any\b|<any>' "No any or as any is introduced"
Assert-NotMatches $codeSource 'ts-nocheck|ts-expect-error' "No ts-nocheck or ts-expect-error is introduced"

$longestNewPathLength = ($requiredFiles | ForEach-Object { $_.Length } | Measure-Object -Maximum).Maximum
Assert-True ($longestNewPathLength -lt 220) "Longest new path remains below 220 characters"

Write-Host "[PASS] CodexForge Jarvis manual provider model selector smoke complete."
