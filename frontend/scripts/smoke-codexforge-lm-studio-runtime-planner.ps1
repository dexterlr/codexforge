param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\lm-studio-runtime-planner"
$route = "src\app\lm-studio-runtime-planner"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "LM Studio Runtime Planner" `
  -ScriptFile "smoke-codexforge-lm-studio-runtime-planner.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LmStudioRuntimePlannerPanel" `
  -CommandLabel "Go to LM Studio Runtime Planner" `
  -Modules @("lm-studio-runtime-planner-types.ts","lm-studio-runtime-planner-summary.ts","index.ts") `
  -Components @("LmStudioRuntimePlannerPanel.tsx","index.ts") `
  -Exports @("buildLmStudioRuntimePlannerStableKey","buildLmStudioRuntimePlan","buildLmStudioRuntimePlans","buildLmStudioRuntimePlannerBoundary","buildLmStudioRuntimePlannerModel","summarizeLmStudioRuntimePlanner") `
  -PlainEnglish @("LM Studio runtime planner","Local OpenAI-compatible runtime","Manual setup guidance","Local-only testing note","No cloud provider APIs","Approved local live-test boundary required","local-only","readiness-gated","planning only unless approved local boundary exists","no localStorage API key storage","no arbitrary local file browsing","no model download/install behavior","no automatic provider send","no shell command execution") `
  -ExtraRoutes @("/provider-adapters","/local-model-manager","/task-router","/token-router","/local-llm-creative-assistant")

function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$index = Get-Content -Raw (Join-Path $domain "index.ts")
Assert-Contains $index './lm-studio-runtime-planner-types' "index exports LM Studio runtime types"
Assert-Contains $index './lm-studio-runtime-planner-summary' "index exports LM Studio runtime builders"

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|replicate|runway|pika|cloudProviderApiCallsAllowed:\s*true|cloudCallsAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+|secretsAllowed:\s*true|endpointSecretStorageAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|showDirectoryPicker|webkitdirectory|browseLocalFiles|arbitraryLocalFileBrowsingAllowed:\s*true"
  "no model download/install behavior" = "downloadModel\s*\(|installModel\s*\(|installNode\s*\(|installCustomNode\s*\(|downloadsAllowed:\s*true|automaticDownloadsAllowed:\s*true|installAllowed:\s*true"
  "no shell command execution" = "child_process|execSync|spawn\s*\(|runCommand\s*\(|shellCommandsAllowed:\s*true|<button|onClick="
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|promptPayloadSentAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Write-Host "[OK] CodexForge LM Studio Runtime Planner smoke passed."
