param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\odysseus-reference-architecture-spike"
$route = "src\app\odysseus-reference-architecture"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 313 Odysseus Reference Architecture Spike" `
  -ScriptFile "smoke-codexforge-odysseus-reference-architecture-spike.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OdysseusReferenceArchitectureSpikePanel" `
  -CommandLabel "Go to Odysseus Reference Architecture" `
  -Modules @("odysseus-reference-architecture-spike-types.ts","odysseus-reference-architecture-spike-summary.ts","index.ts") `
  -Components @("OdysseusReferenceArchitectureSpikePanel.tsx","index.ts") `
  -Exports @("buildOdysseusReferenceArchitectureSpikeStableKey","buildOdysseusReferenceArchitectureSpike","buildOdysseusReferenceArchitectureSpikes","buildOdysseusReferenceArchitectureSpikeBoundary","buildOdysseusReferenceArchitectureSpikeModel","summarizeOdysseusReferenceArchitectureSpike","ODYSSEUS_REFERENCE_ARCHITECTURE_SPIKE_LANGUAGE") `
  -PlainEnglish @("Odysseus reference architecture spike","Odysseus code is not vendored or copied","This spike does not add runtime integration","Future adoption requires license security review","Self-host packaging lessons","CodexForge fit assessment","reference spikes do not integrate third-party code","Spike identity","Reference scope","Local model/workspace lessons","Deep research/memory lessons","Connector/workspace UX lessons","Risks/gaps","Non-goals","Next recommended route","no automatic provider calls","no provider API calls","no automatic provider send","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no API key export","no secret export","no localStorage API key storage","no process.env printing","no API keys or secrets displayed","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no uncontrolled polling loops","no raw polling loops","no render job start/cancel/hold/retry behavior","no command execution","no shell command execution","no git command execution from UI","no test execution from UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no Odysseus code import","no Odysseus dependencies","no Odysseus runtime integration","no external tool execution from UI","no network data fetch from UI","provider tests require explicit approval","advanced reference details collapsed/secondary","server-only path boundary markers remain intact","no real video generation","no image generation","no upscale execution","no frame interpolation execution","no ComfyUI workflow run","no job queue execution","no hardware/system command","no prompt payload sent to providers","no cloud provider API calls","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no hardcoded API keys","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now for deterministic layout/ids","no d3-force","no mojibake","no obvious duplicate React key patterns") `
  -ExtraRoutes @("/ruflo-reference-architecture","/render-job-status-polling","/render-job-cancel-hold-boundary","/local-bridge-health","/capabilities")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$packageSource = Get-Content -Raw "package.json"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "").Replace("no Date.now for deterministic layout/ids", "")

Assert-Contains $source "Future adoption requires license/security review" "future adoption requires license/security review"
Assert-NotMatches $packageSource '"odysseus"|"@odysseus/' "no Odysseus dependency references in package manifest"

$blockedPatterns = @{
  "no automatic provider calls" = "providerApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\("
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no prompt/file sending without approval" = "promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no auto-spend tokens" = "autoSpendTokensAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|spendTokens\s*\("
  "no auto-route live provider traffic" = "autoRouteLiveProviderTrafficAllowed:\s*true|routeLiveTraffic\s*\("
  "no API key export" = "apiKeyExportAllowed:\s*true|exportApiKey\s*\("
  "no secret export" = "secretExportAllowed:\s*true|exportSecret\s*\("
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+"
  "no API keys or secrets displayed" = "apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no ComfyUI job submission" = "comfyUiJobSubmissionAllowedFromPage:\s*true|queue_prompt|submitComfyUiJob\s*\("
  "no ComfyUI request sent from UI" = "comfyUiRequestSentFromPageAllowed:\s*true|queue_prompt|ComfyUIQueueSubmit\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\(|localEndpointFetch\s*\(|fetch\s*\("
  "no uncontrolled polling loops" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no render job start/cancel/hold/retry behavior" = "renderJobMutationAllowedFromUi:\s*true|startRenderJob\s*\(|cancelRenderJob\s*\(|holdRenderJob\s*\(|retryRenderJob\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no session token localStorage storage" = "sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open from UI" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|localFileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\("
  "no artifact deletion" = "artifactDeletionAllowed:\s*true|deleteArtifact\s*\("
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|localProcessMutationAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Ruflo/Odysseus vendoring" = "odysseusCodeVendoredOrCopied:\s*true|vendor[/\\]odysseus|third_party[/\\]odysseus"
  "no Ruflo/Odysseus runtime integration" = "runtimeIntegrationAdded:\s*true|OdysseusRuntime|executeOdysseus\s*\(|connectOdysseus\s*\("
  "no Ruflo/Odysseus dependency references" = "odysseusDependenciesAdded:\s*true|from\s+[`"'](?:odysseus|@odysseus/|@[^/`"']+/odysseus)|require\s*\(\s*[`"'](?:odysseus|@odysseus/)"
  "future adoption requires license/security review" = "licenseSecurityReviewRequired:\s*false"
  "no external tool execution from UI" = "externalToolsExecutedFromUi:\s*true|executeExternalTool\s*\("
  "no network data fetch from UI" = "networkDataFetchedFromUi:\s*true|fetch\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
  "no obvious duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Write-Host "[OK] CodexForge Odysseus Reference Architecture Spike smoke passed."
