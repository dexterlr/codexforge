param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Chat Recall Context smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\chat-recall"
$componentDir = Join-Path $domainDir "components"
$legacyPagePath = "src\app\ai\page.tsx"
$jarvisLivePath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaLiveCommandCenterPanel.tsx"
$jarvisAdvancedPath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisAdvancedToolsPanel.tsx"
$browserStoragePath = Join-Path $domainDir "chat-recall-browser-storage.ts"
$jarvisChatPath = "src\lib\codexforge\jarvis-chat\components\JarvisChatPanel.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$brainRecallPanelPath = "src\lib\codexforge\brain-recall\components\BrainRecallPanel.tsx"
$brainRecallHandoffPanelPath = "src\lib\codexforge\brain-recall\components\BrainRecallHandoffPanel.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "chat-recall-types.ts",
  "chat-recall-selection.ts",
  "chat-recall-context.ts",
  "chat-recall-grounding.ts",
  "chat-recall-safety.ts",
  "chat-recall-handoff.ts",
  "chat-recall-browser-storage.ts",
  "chat-recall-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ChatRecallContextPanel.tsx",
  "ChatRecallSelectionPanel.tsx",
  "ChatRecallContextCard.tsx",
  "ChatRecallGroundingPanel.tsx",
  "ChatRecallSafetyNotice.tsx",
  "ChatRecallHandoffPanel.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$legacyPageSource = Get-Content -Raw $legacyPagePath
$jarvisLiveSource = Get-Content -Raw $jarvisLivePath
$jarvisAdvancedSource = Get-Content -Raw $jarvisAdvancedPath
$browserStorageSource = Get-Content -Raw $browserStoragePath
$jarvisChatSource = Get-Content -Raw $jarvisChatPath
$brainPageSource = Get-Content -Raw $brainPagePath
$brainRecallPanelSource = Get-Content -Raw $brainRecallPanelPath
$brainRecallHandoffPanelSource = Get-Content -Raw $brainRecallHandoffPanelPath
$allSmoke = Get-Content -Raw $allSmokePath
$recallSource = $domainSource + "`n" + $uiSource
$allSource = $recallSource + "`n" + $legacyPageSource + "`n" + $jarvisLiveSource + "`n" + $jarvisAdvancedSource + "`n" + $jarvisChatSource + "`n" + $brainPageSource + "`n" + $brainRecallPanelSource + "`n" + $brainRecallHandoffPanelSource

foreach ($export in @(
  "buildChatRecallSelection",
  "buildChatRecallContext",
  "buildChatRecallGroundingPolicy",
  "buildChatRecallSafetyBoundary",
  "buildChatRecallHandoff"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

Assert-Contains $legacyPageSource 'redirect("/jarvis")' "retired /ai redirects to canonical Jarvis"
Assert-Contains $jarvisLiveSource "JarvisAdvancedToolsPanel" "canonical Jarvis mounts advanced tools"
Assert-Contains $jarvisAdvancedSource "ChatRecallContextPanel" "Jarvis advanced tools render ChatRecallContextPanel"
Assert-Contains $jarvisAdvancedSource "Load reviewed Brain recall" "recall loading requires an explicit visible action"
Assert-Contains $jarvisAdvancedSource "nothing was sent automatically" "recall handoff remains review-only"
Assert-Contains $jarvisAdvancedSource "MAX_RECALL_BYTES" "stored recall has an exact byte ceiling"
Assert-Contains $jarvisAdvancedSource "parseStoredRecall" "stored recall is parsed through a bounded schema"
Assert-Contains $jarvisAdvancedSource "suppliedReadiness !== injectionReadiness" "stored recall cannot forge the canonical readiness classification"
Assert-Contains $jarvisAdvancedSource "if (!reconstructedPolicy.allowContext)" "blocked recall fails closed after canonical policy reconstruction"
Assert-Contains $jarvisAdvancedSource "buildChatRecallHandoff" "visible recall prompt is rebuilt from validated cards and policy"
Assert-Contains $jarvisAdvancedSource "readChatRecallHandoffFromBrowserStorage" "Jarvis reads recall only through the dedicated boundary"
Assert-Contains $jarvisAdvancedSource "The stored recall handoff was malformed or outside the bounded schema" "malformed recall fails closed visibly"
Assert-Contains $jarvisChatSource "draftHandoff" "canonical composer accepts only an explicit visible draft handoff"
Assert-Contains $jarvisChatSource "your existing text was preserved" "advanced-tool handoff cannot overwrite an unsent user draft"
Assert-Contains $brainRecallHandoffPanelSource 'window.location.assign("/jarvis#jarvis-advanced-tools")' "Brain recall hands off to canonical Jarvis"
Assert-Contains $brainRecallHandoffPanelSource "writeChatRecallHandoffToBrowserStorage" "Brain recall writes only through the dedicated boundary"
Assert-Contains $brainRecallHandoffPanelSource "Clipboard access was unavailable" "Brain recall exposes a visible manual-copy fallback"
Assert-Contains $brainRecallHandoffPanelSource 'role="status"' "Brain recall announces copy success and failure accessibly"
Assert-Contains $jarvisAdvancedSource 'if (!navigator.clipboard?.writeText)' "Advanced Tools handles a missing Clipboard API explicitly"
Assert-Contains ($brainPageSource + $brainRecallPanelSource + $brainRecallHandoffPanelSource) "chat recall handoff" "Brain page references chat recall handoff if integrated"
Assert-Contains $browserStorageSource "CHAT_RECALL_MAX_BROWSER_STORAGE_BYTES = 65_536" "recall storage rejects payloads above the exact UTF-8 byte ceiling before persistence"
Assert-Contains $browserStorageSource "new TextEncoder().encode(payload).byteLength" "recall storage measures the persisted payload in UTF-8 bytes"
Assert-Contains $browserStorageSource "containsPrivateAlphaSecretLikeContent(payload)" "recall storage rejects secret-like content before persistence"
Assert-Contains $browserStorageSource "CHAT_RECALL_HANDOFF_KEYS" "recall storage requires the exact canonical top-level schema before persistence"
Assert-Contains $browserStorageSource "JSON.parse(payload)" "recall storage rejects malformed JSON before persistence"

foreach ($text in @(
  "Recalled memory may be stale",
  "visible context",
  "No hidden context injection",
  "Verify current files before editing",
  "No file mutation without safe preview",
  "Only selected recall items are injected",
  "Use this as context, not as proof",
  "Inspect current files before proposing edits"
)) {
  Assert-Contains $allSource $text "UI or policy says $text"
}

Assert-Contains $domainSource "Only selected recall items are injected" "policy only allows selected recall items"
Assert-Contains $domainSource "context, not as proof" "handoff says context not proof"
Assert-Contains $domainSource "Inspect current files" "handoff says inspect current files"

Assert-NotMatches $recallSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $recallSource "write-file" "no write-file import"
Assert-NotContains $recallSource "apply-diff" "no apply-diff import"
Assert-NotContains $recallSource "run-command" "no run-command import"
Assert-NotContains $allSource "broker-execution" "no broker-execution call"
Assert-NotContains $recallSource "Math.random" "no Math.random"
Assert-NotContains $recallSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $recallSource "d3-force" "no d3-force"
Assert-NotMatches $recallSource "https?://" "no external network dependency"

$exactRecallRead = 'window.localStorage.getItem(CHAT_RECALL_CONTEXT_STORAGE_KEY)'
$exactRecallWrite = 'window.localStorage.setItem(CHAT_RECALL_CONTEXT_STORAGE_KEY, payload)'
if ([regex]::Matches($browserStorageSource, [regex]::Escape($exactRecallRead)).Count -ne 1) {
  throw "[FAIL] Chat recall storage boundary must contain exactly one exact-key read."
}
if ([regex]::Matches($browserStorageSource, [regex]::Escape($exactRecallWrite)).Count -ne 1) {
  throw "[FAIL] Chat recall storage boundary must contain exactly one exact-key write."
}
$storageRemainder = $allSource.Replace($exactRecallRead, "").Replace($exactRecallWrite, "")
Assert-NotMatches $storageRemainder 'localStorage|sessionStorage|indexedDB|document\.cookie' "no browser storage outside the exact reviewed recall boundary"
Assert-NotMatches $browserStorageSource 'OPENAI_API_KEY|GROQ_API_KEY|ANTHROPIC_API_KEY|apiKey|credential|fetch\s*\(|https?://' "recall storage boundary has no credential or network seam"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $recallSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey")) {
  Assert-NotContains $recallSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $recallSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildChatRecallStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-chat-recall-context\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Chat Recall Context exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Chat Recall Context" "managed smoke suite includes Chat Recall Context exactly once"

$storageNodeScript = @'
const fs = require("node:fs");
const path = require("node:path");
const repoRoot = process.argv[2];
const ts = require(path.join(repoRoot, "node_modules/typescript"));

require.extensions[".ts"] = function transpileTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};

function assert(condition, message) {
  if (!condition) throw new Error(`[FAIL] ${message}`);
  console.log(`[PASS] ${message}`);
}

const storage = require(path.join(
  repoRoot,
  "src/lib/codexforge/chat-recall/chat-recall-browser-storage.ts"
));
const writes = [];
global.window = {
  localStorage: {
    getItem: () => null,
    setItem: (key, value) => writes.push({ key, value }),
  },
};
const canonical = (extra = {}) => JSON.stringify({
  context: {},
  handoff: {},
  policy: {},
  safety: {},
  selection: {},
  ...extra,
});

const valid = canonical();
assert(storage.writeChatRecallHandoffToBrowserStorage(valid) === true, "canonical recall payload is persisted explicitly");
assert(writes.length === 1 && writes[0].value === valid, "canonical recall payload is written exactly once without rewriting content");
assert(storage.writeChatRecallHandoffToBrowserStorage(canonical({ unexpected: true })) === false, "unknown recall schema fields are rejected before persistence");
assert(storage.writeChatRecallHandoffToBrowserStorage("not-json") === false, "malformed recall JSON is rejected before persistence");
assert(storage.writeChatRecallHandoffToBrowserStorage(canonical({ handoff: { prompt: "sk-abcdefghijklmnop" } })) === false, "secret-like recall content is rejected before persistence");
assert(storage.writeChatRecallHandoffToBrowserStorage(canonical({ context: { text: "x".repeat(65_536) } })) === false, "oversized UTF-8 recall content is rejected before persistence");
assert(writes.length === 1, "rejected recall payloads produce no browser-storage mutation");
'@
$storageNodePath = Join-Path $env:TEMP "codexforge-chat-recall-storage-smoke.cjs"
[IO.File]::WriteAllText($storageNodePath, $storageNodeScript, [Text.UTF8Encoding]::new($false))
try {
  & node $storageNodePath $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] Chat recall storage boundary behavior exited $LASTEXITCODE" }
} finally {
  Remove-Item -LiteralPath $storageNodePath -Force -ErrorAction SilentlyContinue
}

Write-Host "[OK] CodexForge Chat Recall Context smoke passed."
