param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\prompt-privacy-classifier"
$route = "src\app\prompt-privacy-classifier"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Prompt Privacy Classifier" `
  -ScriptFile "smoke-codexforge-prompt-privacy-classifier.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "PromptPrivacyClassifierPanel" `
  -CommandLabel "Go to Prompt Privacy Classifier" `
  -Modules @("prompt-privacy-classifier-types.ts","prompt-privacy-classifier-summary.ts","index.ts") `
  -Components @("PromptPrivacyClassifierPanel.tsx","index.ts") `
  -Exports @("buildPromptPrivacyClassifierStableKey","buildPromptPrivacyClassifierItem","buildPromptPrivacyClassifierItems","buildPromptPrivacyClassifierBoundary","buildPromptPrivacyClassifierModel","summarizePromptPrivacyClassifier","PROMPT_PRIVACY_CLASSIFIER_LANGUAGE") `
  -PlainEnglish @("Prompt privacy classifier","Classification does not send prompts anywhere","Files and prompts are not sent automatically","Sensitive data flags","Local-first recommendation","Raw sensitive content stays secondary","Prompt/context summary","Privacy class","File/context send risk","Provider-send readiness","Redaction guidance","Approval requirement","Blocked reasons","Handoff route","no raw sensitive content above fold","no automatic provider send","no auto-routing","no auto-spend","no upload by default","no secrets displayed","no secrets exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no memory auto-promotion","no memory auto-storage","no settings auto-import","no arbitrary local file browsing") `
  -ExtraRoutes @("/provider-budget-guardrails","/provider-live-test-gate","/router-recommendation-review","/provider-failure-recovery","/credentials")

function Assert-Contains {
  param([string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($needle in @(
  "Prompt/context summary",
  "Privacy class",
  "Sensitive data flags",
  "File/context send risk",
  "Local-first recommendation",
  "Provider-send readiness",
  "Redaction guidance",
  "Approval requirement",
  "Blocked reasons",
  "Handoff route",
  "Classification does not send prompts anywhere",
  "Files and prompts are not sent automatically",
  "Raw sensitive content stays secondary"
)) {
  Assert-Contains $source $needle "prompt privacy classifier includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no prompt classification send" = "classificationSendsPromptsAllowed:\s*true|sendPrompt\s*\(|sendToProvider\s*\("
  "no file or prompt auto-send" = "promptOrFileAutoSendAllowed:\s*true|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true"
  "no file upload" = "uploadFile\s*\(|input\s+type=.*file|fileUploadAllowed:\s*true"
  "no raw sensitive content above fold" = "rawSensitiveContentAboveFoldAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets displayed or exported" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true|secretsExportedAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no provider or router config mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-storage or auto-promotion" = "storePromptAsMemory\s*\(|memoryAutoStorageAllowed:\s*true|autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no settings auto-import" = "autoImportSettings|importSettingsAutomatically|settingsAutoImportAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Prompt Privacy Classifier smoke passed."
