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
  Assert-True ($Haystack.IndexOf($Needle, [StringComparison]::Ordinal) -ge 0) $Message
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  Assert-True ($Haystack.IndexOf($Needle, [StringComparison]::Ordinal) -lt 0) $Message
}

function Assert-NoGitDiff {
  param([string]$RelativePath, [string]$Message)
  $checkpointDiff = ((& git -c core.safecrlf=false diff --name-only "$expectedBaselineTag..$expectedCreatorCheckpointTag" -- $RelativePath 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($checkpointDiff)) $Message
}

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase D2 static Website/Browser App builder foundation ==="

$requiredFiles = @(
  "src/lib/codexforge/creator/creator-contract.server.ts",
  "src/lib/codexforge/creator/creator-path-policy.ts",
  "src/lib/codexforge/creator/creator-markup-validation.server.ts",
  "src/lib/codexforge/creator/creator-code-validation.server.ts",
  "src/lib/codexforge/creator/creator-http.server.ts",
  "src/lib/codexforge/creator/creator-validation.server.ts",
  "src/lib/codexforge/creator/creator-materialization.server.ts",
  "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx",
  "src/lib/codexforge/creator/components/WebsiteCreatorPanel.module.css",
  "src/proxy.ts",
  "src/app/api/codexforge/creator/preview/[projectId]/[previewId]/[revision]/[...filePath]/route.ts",
  "src/app/api/codexforge/creator/projects/[projectId]/export/[revision]/manifest/route.ts",
  "src/app/api/codexforge/creator/projects/[projectId]/export/[revision]/files/[...filePath]/route.ts",
  "scripts/codexforge-creator-deterministic-activity-trap.cjs",
  "docs/codexforge-macro-phase-d2-static-website-browser-app-builder-foundation.md"
)
foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file)) "D2 file exists: $file"
}

$expectedCheckpointPaths = @(
  "frontend/docs/codexforge-macro-phase-c-1-rendered-accessibility-repair.md",
  "frontend/package.json",
  "frontend/native/codexforge_creator_filesystem.cc",
  "frontend/native/codexforge_node_api_minimal.h",
  "frontend/scripts/build-codexforge-creator-native.cjs",
  "frontend/scripts/codexforge-jarvis-unified-product-ia-smoke-helper.ps1",
  "frontend/scripts/codexforge-private-alpha-concurrency-worker.cjs",
  "frontend/scripts/smoke-codexforge-all.ps1",
  "frontend/scripts/smoke-codexforge-creator-lock-concurrency.cjs",
  "frontend/scripts/smoke-codexforge-creator-native-filesystem.cjs",
  "frontend/scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "frontend/scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "frontend/scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "frontend/scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "frontend/scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "frontend/scripts/smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1",
  "frontend/scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1",
  "frontend/scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "frontend/scripts/smoke-codexforge-private-alpha-http-boundary.cjs",
  "frontend/scripts/smoke-codexforge-private-alpha-local-ollama-execution.ps1",
  "frontend/scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "frontend/scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "frontend/scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "frontend/scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "frontend/scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "frontend/src/app/api/codexforge/private-alpha/routing/free-first/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/runs/route.ts",
  "frontend/src/app/api/codexforge/private-alpha/status/route.ts",
  "frontend/src/app/jarvis-websites/page-client.tsx",
  "frontend/src/lib/codexforge/command-palette/command-registry.ts",
  "frontend/src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx",
  "frontend/src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-content.ts",
  "frontend/src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-workspaces.ts",
  "frontend/src/lib/codexforge/navigation-shell/navigation-route-registry.ts",
  "frontend/src/lib/codexforge/private-alpha/index.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-http.server.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-native-filesystem.server.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-types.ts",
  "frontend/src/lib/codexforge/private-alpha/private-alpha-validation.ts",
  "frontend/docs/codexforge-macro-phase-d1-shared-creator-lifecycle-foundation.md",
  "frontend/docs/codexforge-macro-phase-d2-static-website-browser-app-builder-foundation.md",
  "frontend/scripts/smoke-codexforge-macro-phase-d1-shared-creator-lifecycle-foundation.ps1",
  "frontend/scripts/smoke-codexforge-macro-phase-d2-static-website-browser-app-builder-foundation.ps1",
  "frontend/scripts/codexforge-creator-deterministic-activity-trap.cjs",
  "frontend/src/app/api/codexforge/creator/preview/[projectId]/[previewId]/[revision]/[...filePath]/route.ts",
  "frontend/src/app/api/codexforge/creator/projects/[projectId]/actions/route.ts",
  "frontend/src/app/api/codexforge/creator/projects/[projectId]/export/[revision]/files/[...filePath]/route.ts",
  "frontend/src/app/api/codexforge/creator/projects/[projectId]/export/[revision]/manifest/route.ts",
  "frontend/src/app/api/codexforge/creator/projects/[projectId]/route.ts",
  "frontend/src/app/api/codexforge/creator/projects/route.ts",
  "frontend/src/lib/codexforge/creator/components/WebsiteCreatorPanel.module.css",
  "frontend/src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx",
  "frontend/src/lib/codexforge/creator/components/index.ts",
  "frontend/src/lib/codexforge/creator/creator-api-client.ts",
  "frontend/src/lib/codexforge/creator/creator-code-validation.server.ts",
  "frontend/src/lib/codexforge/creator/creator-contract.server.ts",
  "frontend/src/lib/codexforge/creator/creator-crypto.ts",
  "frontend/src/lib/codexforge/creator/creator-filesystem.server.ts",
  "frontend/src/lib/codexforge/creator/creator-http.server.ts",
  "frontend/src/lib/codexforge/creator/creator-markup-validation.server.ts",
  "frontend/src/lib/codexforge/creator/creator-materialization.server.ts",
  "frontend/src/lib/codexforge/creator/creator-native-filesystem.server.ts",
  "frontend/src/lib/codexforge/creator/creator-path-policy.ts",
  "frontend/src/lib/codexforge/creator/creator-persistence.server.ts",
  "frontend/src/lib/codexforge/creator/creator-policy.ts",
  "frontend/src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts",
  "frontend/src/lib/codexforge/creator/creator-runtime.server.ts",
  "frontend/src/lib/codexforge/creator/creator-service.server.ts",
  "frontend/src/lib/codexforge/creator/creator-state-machine.ts",
  "frontend/src/lib/codexforge/creator/creator-types.ts",
  "frontend/src/lib/codexforge/creator/creator-validation.server.ts",
  "frontend/src/proxy.ts"
)
$currentCheckpointPaths = @(
  (& git diff --name-only "$expectedBaselineTag..$expectedCreatorCheckpointTag") |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)
Assert-True ((& git rev-parse "$expectedBaselineTag^{}").Trim() -eq $expectedBaseline) "D2 baseline annotated tag peels to the exact approved Macro Phase C.1 commit"
Assert-True ((& git rev-parse "$expectedCreatorCheckpointTag^{}").Trim() -eq $expectedCreatorCheckpoint) "D2 annotated checkpoint tag peels to the exact approved creator commit"
Assert-True ((& git rev-parse "$expectedCreatorCheckpoint^").Trim() -eq $expectedBaseline) "D2 creator checkpoint has the exact approved Macro Phase C.1 parent"
Assert-True ($expectedCheckpointPaths.Count -eq 78) "D2 exact checkpoint manifest declares 78 paths"
Assert-True (@($expectedCheckpointPaths | Sort-Object -Unique).Count -eq $expectedCheckpointPaths.Count) "D2 exact checkpoint manifest paths are unique"
Assert-True (@($currentCheckpointPaths | Sort-Object -Unique).Count -eq $currentCheckpointPaths.Count) "D2 committed checkpoint paths are unique"
Assert-True ($currentCheckpointPaths.Count -eq $expectedCheckpointPaths.Count) "D2 committed checkpoint path count matches the exact manifest"
foreach ($path in $expectedCheckpointPaths) {
  Assert-True ($currentCheckpointPaths -ccontains $path) "D2 exact committed checkpoint path is present: $path"
}
foreach ($path in $currentCheckpointPaths) {
  Assert-True ($expectedCheckpointPaths -ccontains $path) "D2 committed checkpoint path is authorized: $path"
}
foreach ($checkpointScript in @($currentCheckpointPaths | Where-Object { $_.EndsWith(".ps1", [StringComparison]::OrdinalIgnoreCase) })) {
  $frontendRelative = $checkpointScript.Substring("frontend/".Length)
  $tokens = $null
  $parseErrors = $null
  [void][System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $frontendRelative),
    [ref]$tokens,
    [ref]$parseErrors
  )
  Assert-True ($parseErrors.Count -eq 0) "D2 changed PowerShell parses: $frontendRelative"
}

$contract = Get-Text "src/lib/codexforge/creator/creator-contract.server.ts"
$pathPolicy = Get-Text "src/lib/codexforge/creator/creator-path-policy.ts"
$markupValidation = Get-Text "src/lib/codexforge/creator/creator-markup-validation.server.ts"
$codeValidation = Get-Text "src/lib/codexforge/creator/creator-code-validation.server.ts"
$creatorHttp = Get-Text "src/lib/codexforge/creator/creator-http.server.ts"
$validation = Get-Text "src/lib/codexforge/creator/creator-validation.server.ts"
$nativeFilesystemSource = Get-Text "src/lib/codexforge/creator/creator-native-filesystem.server.ts"
$filesystemSource = Get-Text "src/lib/codexforge/creator/creator-filesystem.server.ts"
$materialization = Get-Text "src/lib/codexforge/creator/creator-materialization.server.ts"
$previewRoute = Get-Text "src/app/api/codexforge/creator/preview/[projectId]/[previewId]/[revision]/[...filePath]/route.ts"
$panel = Get-Text "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx"
Assert-Contains $panel '["Approval", ["approved", "awaiting_repair_approval", "repair_approved"]]' "D2 creator journey declares the exact repair-approved state without malformed syntax"
$panelCss = Get-Text "src/lib/codexforge/creator/components/WebsiteCreatorPanel.module.css"
$jarvisPage = Get-Text "src/app/jarvis-websites/page-client.tsx"
$athenaPage = Get-Text "src/app/athena/page.tsx"
$runtimeSource = Get-Text "src/lib/codexforge/creator/creator-runtime.server.ts"
$creatorProxy = Get-Text "src/proxy.ts"
$navigationRegistry = Get-Text "src/lib/codexforge/navigation-shell/navigation-route-registry.ts"
$jarvisProductContent = Get-Text "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-content.ts"
$topbarSource = Get-Text "src/lib/codexforge/navigation-shell/components/CodexForgeTopbar.tsx"
$packageManifest = Get-Text "package.json"

Assert-Contains $codeValidation 'import "server-only";' "D2 JavaScript and CSS validation remains server-only"
Assert-Contains $markupValidation 'import "server-only";' "D2 HTML and SVG validation remains server-only"
Assert-Contains $creatorHttp 'request.headers.get("Host")' "D2 creator mutations validate the browser-visible Host authority"
Assert-Contains $creatorHttp 'parsedOrigin.host !== externalAuthority.host' "D2 creator mutations compare normalized Origin and external Host authorities"
Assert-Contains $creatorHttp 'parsedOrigin.protocol !== url.protocol' "D2 creator mutations bind Origin scheme to the trusted request URL scheme"
Assert-NotContains $creatorHttp 'parsedOrigin.origin !== url.origin' "D2 creator mutations do not compare Origin to Next internal URL authority"
Assert-NotContains $creatorHttp 'x-forwarded-host' "D2 creator origin validation does not trust x-forwarded-host"
Assert-NotContains $creatorHttp 'x-forwarded-proto' "D2 creator origin validation does not trust x-forwarded-proto"
Assert-Contains $codeValidation 'import acornModule from "next/dist/compiled/acorn/acorn.js";' "D2 JavaScript validation statically imports the pinned server Acorn parser"
Assert-Contains $markupValidation 'import htmlParserModule from "next/dist/compiled/node-html-parser/index.js";' "D2 markup validation statically imports the pinned server HTML parser"
Assert-Contains $codeValidation 'import postcss from "postcss";' "D2 CSS validation retains its static PostCSS parser import"
Assert-Contains $markupValidation "let openingTagTerminated = false;" "D2 restricted markup scan tracks an explicit opening-tag terminator"
Assert-Contains $markupValidation "if (index >= source.length) break;" "D2 trailing opening-tag whitespace reaches the explicit terminator rejection"
Assert-Contains $markupValidation "if (!openingTagTerminated)" "D2 restricted markup scan rejects EOF before an opening-tag terminator"
foreach ($parserValidationSource in @($codeValidation, $markupValidation)) {
  Assert-NotContains $parserValidationSource "createRequire" "D2 parser loading does not use Webpack-incompatible createRequire"
  Assert-NotContains $parserValidationSource "requireFromHere" "D2 parser loading has no runtime require adapter"
  Assert-NotContains $parserValidationSource 'from "node:module"' "D2 parser loading has no node:module compatibility boundary"
}

Assert-Contains $contract 'codexforge.creator.bundle.v1' "D2 exact contract version exists"
Assert-Contains $contract "assertCreatorJsonHasUniqueObjectKeys" "D2 duplicate JSON keys are rejected before parse collapse"
Assert-Contains $contract "one exact lowercase json code fence" "D2 fenced normalization is exact and bounded"
Assert-Contains $pathPolicy "WINDOWS_DEVICE_NAMES" "D2 rejects Windows device paths"
Assert-Contains $pathPolicy "path.case_collision" "D2 rejects case-insensitive collisions"
Assert-Contains $pathPolicy "path.file_directory_collision" "D2 rejects normalized case-insensitive file and ancestor collisions"
Assert-Contains $pathPolicy "path.package_manifest_forbidden" "D2 rejects package manifests"
Assert-Contains $markupValidation "html.resource_fragment_forbidden" "D2 rejects fragments where typed local resources are required"
Assert-Contains $markupValidation "a11y.label_ambiguous" "D2 structured accessibility validation rejects ambiguous label ownership"
Assert-Contains $markupValidation "a11y.details_summary" "D2 structured accessibility validation requires named disclosure summaries"
Assert-Contains $codeValidation "css.interaction_suppression_forbidden" "D2 CSS validation preserves focus, pointer, touch, zoom, and cursor interaction"
Assert-Contains $codeValidation "readStaticBoolean" "D2 uses AST semantics for statically constant loop tests"
Assert-Contains $validation "stagesCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" "D2 runs ten ordered validation stages"
Assert-Contains $nativeFilesystemSource "publishTreeExclusive" "D2 requires the native whole-tree publication interface"
Assert-Contains $filesystemSource "this.native().publishTreeExclusive(target, entries)" "D2 Windows publication delegates one complete ordered tree to the native boundary"
Assert-Contains $filesystemSource "normalizeTreePublicationEntries" "D2 filesystem validates whole-tree bounds and collisions before mutation"
Assert-Contains $materialization "publishTreeExclusive(finalRoot, orderedEntries)" "D2 publishes one complete in-memory revision tree atomically"
Assert-Contains $materialization "assertExactCreatorRevisionInventory" "D2 post-commit reconciliation rejects unexpected or missing revision-tree entries"
Assert-Contains $materialization "source.equals(encodeCanonical(manifest))" "D2 manifest reconciliation requires exact canonical persisted bytes"
Assert-Contains $materialization "materializationSource.equals(encodeCanonical(materializationValue))" "D2 revision reconciliation requires exact canonical persisted bytes"
Assert-Contains $materialization "validationSource.equals(encodeCanonical(validation))" "D2 validation reconciliation requires exact canonical persisted bytes"
Assert-NotContains $materialization ".stage-r" "D2 materialization exposes no revision staging name"
Assert-NotContains $materialization "renameDirectoryExclusive" "D2 materialization no longer composes publication from a visible staged rename"
Assert-Contains $materialization "hashCreatorSha256" "D2 verifies file SHA-256 hashes"
Assert-Contains $previewRoute 'sandbox allow-scripts' "D2 preview response reinforces the minimum iframe sandbox"
Assert-Contains $previewRoute "connect-src 'none'" "D2 preview CSP blocks network connections"
Assert-Contains $previewRoute 'X-Content-Type-Options' "D2 preview sends nosniff"
Assert-Contains $previewRoute 'Cache-Control' "D2 preview disables caching"
Assert-Contains $panel '<h1>Static Website/Browser App v0</h1>' "D2 creator route owns one exact H1"
Assert-True ([regex]::Matches($panel, '<h1(?:\s|>)').Count -eq 1) "D2 creator panel contains exactly one H1"
Assert-Contains $panel 'sandbox="allow-scripts"' "D2 iframe uses allow-scripts only"
Assert-NotContains $panel "allow-same-origin" "D2 iframe never grants same-origin"
Assert-Contains $panel "Back to Jarvis" "D2 focused surface returns to Jarvis"
Assert-Contains $panel "4096 tokens" "D2 UI shows exact token limit"
Assert-Contains $panel "Local machine" "D2 UI shows local data boundary"
Assert-Contains $panel "aria-describedby" "D2 disabled controls have associated explanations"
$panelCompact = $panel -replace '\s+', ' '
Assert-Contains $panelCompact 'aria-describedby={busy ? recoveryReasonId : undefined} disabled={busy}' "D2 recovery button retains its busy lock and conditionally references its exact disabled reason"
Assert-Contains $panelCompact 'const recoveryReason = busy ? "This recovery action is unavailable while the current creator operation finishes." : "This recovery action resumes the exact persisted intent; it cannot create an additional provider attempt.";' "D2 recovery reason distinguishes the disabled busy state from the enabled recoverable state"
Assert-Contains $panelCompact 'const recoveryOwnsOrdinaryActions = recoveryAction !== null;' "D2 persisted recovery ownership gates ordinary creator actions"
Assert-Contains $panelCompact 'pendingRecoveryIntent === null &&' "D2 cancellation supersession is unavailable after explicit recovery takes ownership"
Assert-Contains $panelCompact 'disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "awaiting_generation_approval"}' "D2 generation approval cannot compete with an explicit recovery action"
Assert-Contains $panelCompact 'This action is unavailable while the explicit recovery action' "D2 recovery-owned ordinary controls expose an exact visible reason"
Assert-True ([regex]::Matches($panel, 'id=\{recoveryReasonId\}').Count -eq 1) "D2 recovery explanation ID target exists exactly once"
Assert-Contains $panelCompact '<p id={recoveryReasonId} className={styles.actionReason}>{recoveryReason}</p>' "D2 recovery explanation is visible and is not hidden from assistive technology"
Assert-Contains $panelCompact 'aria-describedby={busy ? newRequestReasonId : undefined} disabled={busy}' "D2 new-request busy lock has an exact conditional disabled reason"
Assert-Contains $panelCompact 'aria-describedby={busy || Boolean(project) ? titleDisabledReasonId : undefined} disabled={busy || Boolean(project)}' "D2 title lock has an exact busy-or-existing-project reason"
Assert-Contains $panelCompact 'aria-describedby={busy || Boolean(project) ? descriptionDisabledReasonId : undefined} disabled={busy || Boolean(project)}' "D2 description lock has an exact busy-or-existing-project reason"
Assert-Contains $panelCompact '? "The single repair attempt has already been used; another repair cannot be requested in v0."' "D2 repair reason explains the one-attempt cap"
Assert-Contains $panelCompact '? `Repair is unavailable while the project is ${STATUS_LABELS[project.status].toLowerCase()}.`' "D2 repair reason explains an incompatible lifecycle state"
Assert-Contains $panelCompact '? "Repair requires at least one validation finding and never runs automatically."' "D2 repair reason explains the validation-finding gate"
Assert-Contains $panelCompact '? "Create and review a creator project before cancellation is available."' "D2 cancel reason explains the no-project state"
Assert-Contains $panelCompact '? "This creator project is already canceled."' "D2 cancel reason explains the canceled state"
Assert-Contains $panelCompact '? "This creator project is already exported; start a new creator request to continue."' "D2 cancel reason explains the exported state"
Assert-Contains $panelCompact '? "Cancellation is unavailable while validation or publication recovery is in progress."' "D2 cancel reason distinguishes validation from provider execution"
Assert-Contains $panel 'const REVIEW_PLAN_EXPLANATION_ID = "codexforge-creator-review-plan-explanation";' "D2 review-plan explanation uses one stable ID constant"
Assert-Contains $panelCompact '<button className={styles.primaryButton} type="submit" aria-describedby={busy || Boolean(project) ? REVIEW_PLAN_EXPLANATION_ID : undefined} disabled={busy || Boolean(project)} >' "D2 review-plan disabled behavior has an exact conditional description association"
Assert-True ([regex]::Matches($panel, 'id=\{REVIEW_PLAN_EXPLANATION_ID\}').Count -eq 1) "D2 review-plan explanation ID target exists exactly once"
Assert-Contains $panelCompact '<p id={REVIEW_PLAN_EXPLANATION_ID} className={styles.actionReason}>{reviewPlanExplanation}</p>' "D2 review-plan explanation is a visible paragraph without hidden attributes"
Assert-Contains $panelCompact 'const reviewPlanExplanation = busy ? "An exact creator operation is currently in progress."' "D2 review-plan explanation distinguishes an operation currently being busy"
Assert-Contains $panelCompact ': project ? "An exact creation plan already exists for this project. Continue with its approval and execution controls below."' "D2 review-plan explanation distinguishes an existing project and plan"
Assert-Contains $panelCompact ': "Submitting prepares the exact bounded plan; it does not approve or execute generation.";' "D2 review-plan explanation truthfully describes the enabled boundary"
Assert-Contains $panelCompact 'candidate.stateRevision < latest.stateRevision' "D2 client rejects an older same-project replay snapshot"
Assert-Contains $panelCss ":focus-visible" "D2 UI has visible keyboard focus"
Assert-Contains $panelCss "prefers-reduced-motion" "D2 UI honors reduced motion"
Assert-Contains $jarvisPage "WebsiteCreatorPanel" "D2 reuses the existing Jarvis websites route"
Assert-Contains $athenaPage 'redirect("/jarvis")' "D2 preserves the Athena redirect"
Assert-Contains $runtimeSource 'process.env.NODE_ENV === "production"' "D2 deterministic test routing fails closed in production"
Assert-NotContains $runtimeSource "providerAdapter:" "D2 production runtime has no fixture provider fallback"
Assert-Contains $runtimeSource "DETERMINISTIC_TRANSPORT_TRAP" "D2 deterministic runtime binds an explicit transport trap"
Assert-Contains $creatorProxy 'matcher: ["/jarvis-websites/:path*"]' "D2 clickjacking headers are scoped to the creator route"
Assert-Contains $creatorProxy "frame-ancestors 'none'" "D2 creator route forbids framing"
Assert-Contains $creatorProxy 'response.headers.set("X-Frame-Options", "DENY")' "D2 creator route sends legacy frame denial"
$navigationCompact = $navigationRegistry -replace '\s+', ' '
Assert-Contains $navigationCompact 'readiness: route.href === "/jarvis" || route.href === "/jarvis-websites" ? "available" : "preview-only",' "D2 operational creator owns an available readiness label without relabeling other Jarvis routes"
Assert-Contains $navigationCompact 'route.href === "/jarvis" || route.href === "/jarvis-websites"' "D2 canonical chat and operational creator share the explicit mutation-capable route predicate"
Assert-Contains $navigationCompact '? false' "D2 operational creator route does not claim a no-mutation posture"
Assert-Contains $navigationCompact 'noMutation: input.noMutation ?? fallback.noMutation ?? true,' "D2 route builder preserves the owning route mutation posture"
Assert-NotContains $navigationCompact 'readiness: route.href === "/jarvis" ? "available" : "preview-only",' "D2 removes the obsolete blanket preview-only creator readiness rule"
Assert-Contains $jarvisProductContent 'id: "website-flow"' "D2 Jarvis capability grid owns one website creator capability"
Assert-Contains $jarvisProductContent 'tone: "approval-required"' "D2 Jarvis capability grid labels the creator as operational and approval-gated"
Assert-Contains $jarvisProductContent 'Static Website/Browser App v0 is operational' "D2 Jarvis capability wording reflects the implemented static creator"
Assert-Contains $jarvisProductContent 'backend, deployment, packages, and paid routing remain unavailable' "D2 Jarvis capability wording preserves exact unsupported boundaries"
Assert-NotContains $jarvisProductContent 'pages, preview, and publish approval are framed as a polished placeholder' "D2 Jarvis capability grid no longer contradicts the operational creator route"
Assert-Contains $topbarSource 'routeState.activeRoute.readiness' "D2 topbar continues to render readiness from owning route metadata"
Assert-Contains $navigationRegistry 'badge: "Local v0"' "D2 creator navigation retains the honest local static v0 badge"
Assert-Contains $packageManifest '"native:build": "node ./scripts/build-codexforge-creator-native.cjs"' "D2 package scripts bind the repository-owned native build explicitly"
Assert-Contains $packageManifest '"native:test": "npm run native:build && node ./scripts/smoke-codexforge-creator-native-filesystem.cjs"' "D2 package scripts expose the audited native regression gate"
Assert-Contains $nativeFilesystemSource 'Symbol.for(' "D2 native loader retains its validated binding across Next server-module reloads"
Assert-Contains $nativeFilesystemSource 'Object.defineProperty(process, CREATOR_NATIVE_BINDING_CACHE_KEY' "D2 native loader publishes one immutable process-scoped binding"
Assert-Contains $runtimeSource 'Symbol.for(' "D2 runtime retains its exact service and trusted native-root handles across Next server-module reloads"
Assert-Contains $runtimeSource 'Object.defineProperty(process, CREATOR_RUNTIME_REGISTRY_CACHE_KEY' "D2 runtime publishes one immutable validated process-scoped service registry"
Assert-Contains $runtimeSource 'if (runtimeRegistry.has(runtime.key))' "D2 runtime distinguishes an existing cache entry from every falsy or missing value"
Assert-Contains $runtimeSource 'if (!isCreatorService(cached))' "D2 runtime fails closed if a cached service loses its exact interface"
Assert-Contains $runtimeSource 'CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES = 16' "D2 process-scoped runtime registry is explicitly bounded"
Assert-Contains $runtimeSource 'services.set(key, Object.freeze(service));' "D2 runtime freezes every exact registered service"
Assert-Contains $packageManifest '"build": "npm run native:build && next build"' "D2 production build fails closed unless the native creator boundary builds"

$privateAlphaValidation = Get-Text "src/lib/codexforge/private-alpha/private-alpha-validation.ts"
$privateAlphaHttp = Get-Text "src/lib/codexforge/private-alpha/private-alpha-http.server.ts"
Assert-Contains $privateAlphaValidation '!/^[A-Za-z0-9][A-Za-z0-9._:-]*$/u.test(trimmed)' "D2 Private Alpha idempotency ownership framing rejects ambiguous non-ASCII or control input"
Assert-Contains $privateAlphaHttp 'assertPrivateAlphaLoopbackRequest' "D2 Private Alpha HTTP boundary owns loopback authority validation"
Assert-Contains $privateAlphaHttp 'assertCreatorJsonHasUniqueObjectKeys(source);' "D2 Private Alpha HTTP boundary rejects duplicate JSON keys before parse collapse"
$privateAlphaRouteSources = @(
  "src/app/api/codexforge/private-alpha/status/route.ts",
  "src/app/api/codexforge/private-alpha/runs/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
  "src/app/api/codexforge/private-alpha/routing/free-first/route.ts"
) | ForEach-Object { Get-Text $_ }
foreach ($privateAlphaRouteSource in $privateAlphaRouteSources) {
  Assert-Contains $privateAlphaRouteSource 'assertPrivateAlphaLoopbackRequest' "D2 Private Alpha route validates loopback/authority before service access"
  Assert-NotContains $privateAlphaRouteSource 'request.json()' "D2 Private Alpha route does not perform unbounded permissive JSON parsing"
}

foreach ($protectedPath in @(
  "package-lock.json",
  "tsconfig.json",
  "next.config.ts",
  "src/lib/codexforge/model-routing",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "src/lib/codexforge/provider-adapters",
  "src/lib/codexforge/private-alpha/private-alpha-api-client.ts",
  "src/lib/codexforge/private-alpha/private-alpha-free-first-routing.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-free-first-routing-types.ts",
  "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts"
)) {
  if (Test-Path -LiteralPath (Join-Path $root $protectedPath)) {
    Assert-NoGitDiff $protectedPath "D2 protected scope remains unchanged: $protectedPath"
  }
}

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const Module = require("module");
const repoRoot = process.argv[2];
const activityTrap = require(path.join(repoRoot, "scripts", "codexforge-creator-deterministic-activity-trap.cjs")).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d2-static-website-builder"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests", "macro-d2-static-website-builder"),
  ],
  allowedMkdirPaths: [
    path.join(repoRoot, ".codexforge"),
    path.join(repoRoot, ".codexforge", "creator-tests"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests"),
  ],
});
const activityCounters = activityTrap.counters;
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
let fixtureAvailabilityCalls = 0;
let fixtureDeliveries = 0;
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  const resolvedFilename = Module._resolveFilename(request, parent, isMain);
  return activityTrap.wrapLoadedModule(
    resolvedFilename,
    originalLoad.apply(this, arguments)
  );
};
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const syntaxDiagnostics = (output.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );
  assert(
    syntaxDiagnostics.length === 0,
    `TypeScript syntax validation passes before loading ${path.relative(repoRoot, filename)}`
  );
  module._compile(output.outputText, filename);
};
require.extensions[".tsx"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const syntaxDiagnostics = (output.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );
  assert(
    syntaxDiagnostics.length === 0,
    `TSX syntax validation passes before loading ${path.relative(repoRoot, filename)}`
  );
  module._compile(output.outputText, filename);
};
require.extensions[".css"] = function (module) {
  module.exports = new Proxy({}, { get: (_target, property) => String(property) });
};
function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}
function auditPanelDisabledDescriptions() {
  const panelPath = path.join(
    repoRoot,
    "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx"
  );
  const panelSource = fs.readFileSync(panelPath, "utf8");
  const panelTree = ts.createSourceFile(
    panelPath,
    panelSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const interactiveTags = new Set(["button", "input", "textarea", "select"]);
  const declarations = new Map();
  const targets = new Map();
  const disabledControls = [];
  function attributesFor(node) {
    return node.attributes.properties.filter(ts.isJsxAttribute);
  }
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      declarations.set(node.name.text, node);
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(panelTree);
      const attributes = attributesFor(node);
      const byName = new Map(
        attributes.map((attribute) => [attribute.name.getText(panelTree), attribute])
      );
      const idAttribute = byName.get("id");
      if (
        idAttribute?.initializer &&
        ts.isJsxExpression(idAttribute.initializer) &&
        idAttribute.initializer.expression &&
        ts.isIdentifier(idAttribute.initializer.expression)
      ) {
        const symbol = idAttribute.initializer.expression.text;
        const existing = targets.get(symbol) || [];
        existing.push({ tag, attributes: byName });
        targets.set(symbol, existing);
      }
      if (interactiveTags.has(tag) && byName.has("disabled")) {
        const describedBy = byName.get("aria-describedby");
        assert(Boolean(describedBy), `disabled ${tag} has an aria-describedby attribute`);
        const expression = describedBy?.initializer?.getText(panelTree) || "";
        const reasonSymbols = Array.from(
          new Set(
            expression.match(/\b(?:[A-Za-z_$][\w$]*ReasonId|REVIEW_PLAN_EXPLANATION_ID)\b/g) || []
          )
        );
        assert(reasonSymbols.length === 1, `disabled ${tag} references one exact reason ID`);
        disabledControls.push({ tag, reasonSymbol: reasonSymbols[0] });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(panelTree);
  assert(disabledControls.length === 14, "D2 panel exposes the exact 14 disable-capable controls");
  assert(
    disabledControls.filter((control) => control.tag === "button").length === 12 &&
      disabledControls.filter((control) => control.tag === "input").length === 1 &&
      disabledControls.filter((control) => control.tag === "textarea").length === 1,
    "D2 disabled-control inventory is 12 buttons, one input, and one textarea"
  );
  const reasonSymbols = disabledControls.map((control) => control.reasonSymbol);
  assert(
    new Set(reasonSymbols).size === reasonSymbols.length,
    "D2 every disable-capable control owns one unique description ID"
  );
  for (const reasonSymbol of reasonSymbols) {
    const reasonTargets = targets.get(reasonSymbol) || [];
    assert(reasonTargets.length === 1, `${reasonSymbol} has exactly one rendered target`);
    const target = reasonTargets[0];
    assert(target.tag === "p", `${reasonSymbol} resolves to visible paragraph content`);
    assert(
      !target.attributes.has("hidden") && !target.attributes.has("aria-hidden"),
      `${reasonSymbol} is not hidden from assistive technology`
    );
    const declaration = declarations.get(reasonSymbol);
    assert(Boolean(declaration?.initializer), `${reasonSymbol} has a stable declaration`);
    if (reasonSymbol === "REVIEW_PLAN_EXPLANATION_ID") {
      assert(
        ts.isStringLiteral(declaration.initializer) &&
          declaration.initializer.text === "codexforge-creator-review-plan-explanation",
        "review-plan reason keeps its exact stable literal ID"
      );
    } else {
      assert(
        ts.isCallExpression(declaration.initializer) &&
          declaration.initializer.expression.getText(panelTree) === "useId",
        `${reasonSymbol} uses React's stable unique ID allocation`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolveValue, rejectValue) => {
    resolve = resolveValue;
    reject = rejectValue;
  });
  return { promise, resolve, reject };
}
function createElement(type, props, key) {
  return { type, key: key ?? null, props: props || {} };
}
function walkElements(value, visit) {
  if (Array.isArray(value)) {
    for (const child of value) walkElements(child, visit);
    return;
  }
  if (!value || typeof value !== "object" || !("type" in value) || !("props" in value)) return;
  visit(value);
  walkElements(value.props.children, visit);
}
function collectElements(tree, predicate) {
  const matches = [];
  walkElements(tree, (element) => {
    if (predicate(element)) matches.push(element);
  });
  return matches;
}
function elementText(value) {
  if (value === null || value === undefined || typeof value === "boolean") return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(elementText).join("");
  if (typeof value === "object" && value.props) return elementText(value.props.children);
  return "";
}
function createHookRunner() {
  const states = [];
  const refs = [];
  const ids = [];
  let stateCursor = 0;
  let refCursor = 0;
  let idCursor = 0;
  let effects = [];
  return {
    states,
    refs,
    beginRender() {
      stateCursor = 0;
      refCursor = 0;
      idCursor = 0;
      effects = [];
    },
    render(Component) {
      this.beginRender();
      return Component();
    },
    useState(initialValue) {
      const index = stateCursor++;
      if (!(index in states)) {
        states[index] = typeof initialValue === "function" ? initialValue() : initialValue;
      }
      return [states[index], (nextValue) => {
        states[index] = typeof nextValue === "function" ? nextValue(states[index]) : nextValue;
      }];
    },
    useRef(initialValue) {
      const index = refCursor++;
      if (!(index in refs)) refs[index] = { current: initialValue };
      return refs[index];
    },
    useId() {
      const index = idCursor++;
      if (!(index in ids)) ids[index] = `codexforge-d2-component-${index + 1}`;
      return ids[index];
    },
    useMemo(factory) {
      return factory();
    },
    useEffect(effect) {
      effects.push(effect);
    },
    async flushEffects() {
      const pending = effects;
      effects = [];
      for (const effect of pending) effect();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    },
  };
}
function creatorPanelProject(status, overrides = {}) {
  const projectId = "a".repeat(24);
  const preview = overrides.preview || {
    status: status === "preview_available" ? "active" : "inactive",
    previewId: status === "preview_available" ? "preview-000000000001" : null,
    artifactRevision: status === "preview_available" ? 1 : null,
    startedAt: status === "preview_available" ? "2026-08-01T12:00:00.000Z" : null,
    stoppedAt: null,
  };
  const sourceRunId = "11111111-1111-4111-8111-111111111111";
  const intentType = status === "repair_requested"
    ? "repair.requested"
    : ["generating", "repairing", "validating"].includes(status)
      ? "execution.requested"
      : null;
  const intent = intentType ? {
    eventId: "1".repeat(24),
    eventType: intentType,
    occurredAt: "2026-08-01T12:00:00.000Z",
    actor: "local-operator",
    previousState: status,
    resultingState: status,
    stateRevision: 7,
    sourceRunId: intentType === "repair.requested" ? null : sourceRunId,
    artifactRevision: null,
    idempotencyKeyHash: "2".repeat(64),
    mutationDigest: "3".repeat(64),
    summary: "Persisted component recovery intent.",
  } : null;
  return {
    identity: { projectId, projectSlug: "d2-component-project", projectTitle: "D2 Component Project", creatorKind: "website-browser-app" },
    request: { description: "Build a bounded local static page.", requestDigest: "b".repeat(64) },
    status,
    stateRevision: 7,
    plan: null,
    approvalPacket: null,
    runBindings: ["generating", "repairing", "validating"].includes(status)
      ? [{ purpose: overrides.purpose || (status === "repairing" ? "repair" : "generation"), sourceRunId }]
      : [],
    artifactProposal: null,
    artifactProposalBinding: null,
    validation: overrides.validation === undefined ? { valid: true, issues: [{ code: "a11y.optional_page_landmarks", severity: "warning", message: "Optional landmark.", suggestedRepairContext: "Add a footer.", blocksMaterialization: false }], stagesCompleted: [1,2,3,4,5,6,7,8,9,10], issueDigest: "c".repeat(64), bundleDigest: "d".repeat(64), manifestDigest: "e".repeat(64) } : overrides.validation,
    materializations: overrides.materializations || [],
    preview,
    repair: overrides.repair || null,
    exportManifest: overrides.exportManifest || null,
    auditEvents: intent ? [intent] : [],
    idempotencyRecords: [],
    failureCode: null,
    failureMessage: null,
    ...overrides,
  };
}
function assertDisabledControlDescriptions(tree, context) {
  function requireCondition(condition, message) {
    if (!condition) throw new Error(message);
  }
  const ids = new Map();
  walkElements(tree, (element) => {
    if (typeof element.props.id !== "string") return;
    const existing = ids.get(element.props.id) || [];
    existing.push(element);
    ids.set(element.props.id, existing);
  });
  for (const [id, elements] of ids) {
    requireCondition(elements.length === 1, `${context}: rendered ID ${id} is not unique`);
  }
  const controls = collectElements(
    tree,
    (element) => ["button", "input", "textarea", "select"].includes(element.type)
  );
  const disabledControls = controls.filter((control) => control.props.disabled === true);
  for (const control of disabledControls) {
    const describedBy = control.props["aria-describedby"];
    requireCondition(typeof describedBy === "string" && describedBy.length > 0 && !/\s/.test(describedBy), `${context}: disabled ${control.type} ${elementText(control).trim() || control.props.id || "field"} does not reference one description ID`);
    const targets = ids.get(describedBy) || [];
    requireCondition(targets.length === 1, `${context}: disabled control description ${describedBy} does not exist exactly once`);
    const target = targets[0];
    requireCondition(target.props.hidden !== true && target.props["aria-hidden"] !== true && target.props["aria-hidden"] !== "true", `${context}: disabled control description ${describedBy} is hidden`);
    requireCondition(elementText(target).trim().length > 0, `${context}: disabled control description ${describedBy} is not visibly nonempty`);
  }
  assert(true, `${context}: every disabled native control has one unique existing visible assistive-technology-exposed description`);
  return { controls, disabledControls, ids };
}
async function runWebsiteCreatorPanelBehaviorTests() {
  const panelPath = path.join(repoRoot, "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx");
  const panelCssPath = path.join(repoRoot, "src/lib/codexforge/creator/components/WebsiteCreatorPanel.module.css");
  const panelResolved = require.resolve(panelPath);
  const storage = new Map();
  global.window = {
    location: { href: "http://127.0.0.1:41001/jarvis-websites" },
    history: { replaceState(_state, _title, url) { global.window.location.href = String(url); } },
    sessionStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); },
      removeItem(key) { storage.delete(key); },
    },
  };
  let activeRunner = null;
  let keySequence = 0;
  let createCalls = [];
  let createImplementation = async () => { throw new Error("test create implementation not configured"); };
  let actionCalls = [];
  let actionImplementation = async () => { throw new Error("test action implementation not configured"); };
  let fetchImplementation = async () => { throw new Error("test fetch implementation not configured"); };
  const reactMock = {
    useState(initialValue) { return activeRunner.useState(initialValue); },
    useRef(initialValue) { return activeRunner.useRef(initialValue); },
    useId() { return activeRunner.useId(); },
    useMemo(factory) { return activeRunner.useMemo(factory); },
    useEffect(effect) { return activeRunner.useEffect(effect); },
  };
  const jsxRuntimeMock = {
    Fragment: Symbol("Fragment"),
    jsx: createElement,
    jsxs: createElement,
  };
  const apiMock = {
    buildCreatorClientIdempotencyKey() { keySequence += 1; return `component-idempotency-key-${keySequence}`; },
    async createCreatorProject(input, key) { createCalls.push({ input, key }); return createImplementation(input, key); },
    async actOnCreatorProject(projectId, action, revision, key) { actionCalls.push({ projectId, action, revision, key }); return actionImplementation(projectId, action, revision, key); },
    async fetchCreatorProject(projectId) { return fetchImplementation(projectId); },
  };
  const priorLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === "react") return reactMock;
    if (request === "react/jsx-runtime") return jsxRuntimeMock;
    if (request === "next/link") return function Link(props) { return createElement("a", props); };
    let resolved = null;
    try { resolved = Module._resolveFilename(request, parent, isMain); } catch {}
    if (resolved && resolved.replace(/\\/g, "/").endsWith("/src/lib/codexforge/creator/creator-api-client.ts")) return apiMock;
    return priorLoad.apply(this, arguments);
  };
  try {
    delete require.cache[panelResolved];
    const { WebsiteCreatorPanel } = require(panelPath);
    const statuses = [
      "draft", "awaiting_generation_approval", "approved", "generating", "validating",
      "rejected_output", "ready", "preview_available", "repair_requested",
      "awaiting_repair_approval", "repair_approved", "repairing", "failed", "canceled", "exported",
    ];
    for (const status of statuses) {
      for (const busy of [false, true]) {
        activeRunner = createHookRunner();
        activeRunner.render(WebsiteCreatorPanel);
        activeRunner.states[2] = creatorPanelProject(status);
        activeRunner.states[3] = busy;
        activeRunner.states[4] = busy ? "Completing one exact creator operation" : "";
        const tree = activeRunner.render(WebsiteCreatorPanel);
        const audit = assertDisabledControlDescriptions(tree, `${status}/${busy ? "busy" : "idle"}`);
        assert(audit.disabledControls.length > 0, `${status}/${busy ? "busy" : "idle"}: disabled-control matrix exercises a real disabled state`);
      }
    }

    for (const status of ["generating", "repairing", "validating", "repair_requested"]) {
      activeRunner = createHookRunner();
      activeRunner.render(WebsiteCreatorPanel);
      activeRunner.states[2] = creatorPanelProject(status);
      activeRunner.states[3] = true;
      let tree = activeRunner.render(WebsiteCreatorPanel);
      const recoveryButton = collectElements(tree, (element) => element.type === "button" && elementText(element).includes("Resume"))[0];
      assert(recoveryButton?.props.disabled === true, `${status}: rendered recovery action retains its busy lock`);
      const recoveryId = recoveryButton.props["aria-describedby"];
      const recoveryTargets = collectElements(tree, (element) => element.props.id === recoveryId);
      assert(recoveryTargets.length === 1, `${status}: busy recovery action references one exact rendered explanation`);
      assert(elementText(recoveryTargets[0]).trim() === "This recovery action is unavailable while the current creator operation finishes.", `${status}: busy recovery explanation is exact and recovery-specific`);
      activeRunner.states[3] = false;
      tree = activeRunner.render(WebsiteCreatorPanel);
      const idleRecoveryButton = collectElements(tree, (element) => element.type === "button" && elementText(element).includes("Resume"))[0];
      assert(idleRecoveryButton?.props.disabled === false, `${status}: recovery action is enabled when no creator operation is busy`);
    }

    const interruptedApprovalEvent = {
      eventId: "4".repeat(24),
      eventType: "approval.requested",
      occurredAt: "2026-08-01T12:00:00.000Z",
      actor: "local-operator",
      previousState: "awaiting_generation_approval",
      resultingState: "awaiting_generation_approval",
      stateRevision: 7,
      sourceRunId: "11111111-1111-4111-8111-111111111111",
      artifactRevision: null,
      idempotencyKeyHash: "5".repeat(64),
      mutationDigest: "6".repeat(64),
      summary: "Persisted interrupted approval intent.",
    };
    const explicitRecoveryEvent = {
      ...interruptedApprovalEvent,
      eventId: "7".repeat(24),
      eventType: "recovery.requested",
      stateRevision: 8,
      idempotencyKeyHash: "8".repeat(64),
      mutationDigest: "9".repeat(64),
      summary: "Explicit recovery owns the interrupted approval.",
    };
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = creatorPanelProject("awaiting_generation_approval", {
      stateRevision: 8,
      runBindings: [{ purpose: "generation", sourceRunId: interruptedApprovalEvent.sourceRunId }],
      auditEvents: [interruptedApprovalEvent, explicitRecoveryEvent],
    });
    let recoveryOwnershipTree = activeRunner.render(WebsiteCreatorPanel);
    const ownedRecoveryButton = collectElements(
      recoveryOwnershipTree,
      (element) => element.type === "button" && elementText(element).includes("Resume recorded manual approval")
    )[0];
    const ownedApprovalButton = collectElements(
      recoveryOwnershipTree,
      (element) => element.type === "button" && elementText(element).trim() === "Approve exact generation"
    )[0];
    const ownedCancelButton = collectElements(
      recoveryOwnershipTree,
      (element) => element.type === "button" && elementText(element).trim() === "Cancel creator"
    )[0];
    const ownedApprovalReason = collectElements(
      recoveryOwnershipTree,
      (element) => element.props.id === ownedApprovalButton.props["aria-describedby"]
    )[0];
    const ownedCancelReason = collectElements(
      recoveryOwnershipTree,
      (element) => element.props.id === ownedCancelButton.props["aria-describedby"]
    )[0];
    assert(
      ownedRecoveryButton?.props.disabled === false &&
        ownedApprovalButton?.props.disabled === true &&
        ownedCancelButton?.props.disabled === true &&
        elementText(ownedApprovalReason).includes("explicit recovery action") &&
        elementText(ownedApprovalReason).includes("Resume recorded manual approval") &&
        elementText(ownedCancelReason).includes("explicit recovery action"),
      "explicit recovery ownership enables only recovery and gives competing approval/cancellation exact visible reasons"
    );
    assertDisabledControlDescriptions(
      recoveryOwnershipTree,
      "explicit recovery ownership"
    );

    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = creatorPanelProject("awaiting_generation_approval", {
      runBindings: [{ purpose: "generation", sourceRunId: interruptedApprovalEvent.sourceRunId }],
      auditEvents: [interruptedApprovalEvent],
    });
    recoveryOwnershipTree = activeRunner.render(WebsiteCreatorPanel);
    const interruptedApprovalButton = collectElements(
      recoveryOwnershipTree,
      (element) => element.type === "button" && elementText(element).trim() === "Approve exact generation"
    )[0];
    const supersedingCancelButton = collectElements(
      recoveryOwnershipTree,
      (element) => element.type === "button" && elementText(element).trim() === "Cancel creator"
    )[0];
    const supersedingCancelReason = collectElements(
      recoveryOwnershipTree,
      (element) => element.props.id === supersedingCancelButton.props["aria-describedby"]
    )[0];
    assert(
      interruptedApprovalButton?.props.disabled === true &&
        supersedingCancelButton?.props.disabled === false &&
        elementText(supersedingCancelReason).includes("may supersede this interrupted pre-execution intent"),
      "interrupted approval disables a competing approval while preserving the explicit pre-execution cancellation escape"
    );

    actionCalls = [];
    actionImplementation = async (_projectId, _action, _revision, _key) => ({
      project: creatorPanelProject("failed", { stateRevision: 10 }),
      replayed: false,
    });
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = creatorPanelProject("generating");
    const explicitRecoveryTree = activeRunner.render(WebsiteCreatorPanel);
    const explicitRecoveryButton = collectElements(explicitRecoveryTree, (element) => element.type === "button" && elementText(element).includes("Resume recorded generation"))[0];
    await explicitRecoveryButton.props.onClick();
    assert(
      actionCalls.length === 1 &&
        actionCalls[0].action === "recover" &&
        actionCalls[0].revision === 7 &&
        actionCalls[0].key === `creator-ui-recover:${"a".repeat(24)}:7`,
      "rendered recovery control sends one explicit deterministic recover mutation for the exact interrupted revision"
    );

    activeRunner = createHookRunner();
    let tree = activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[3] = true;
    tree = activeRunner.render(WebsiteCreatorPanel);
    let reviewButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Review exact creation plan")[0];
    let reviewReason = collectElements(tree, (element) => element.props.id === reviewButton.props["aria-describedby"])[0];
    assert(reviewButton.props.disabled === true && elementText(reviewReason).trim() === "An exact creator operation is currently in progress.", "busy review-plan button has its exact visible operation-in-progress reason");
    activeRunner.states[3] = false;
    activeRunner.states[2] = creatorPanelProject("awaiting_generation_approval");
    tree = activeRunner.render(WebsiteCreatorPanel);
    reviewButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Review exact creation plan")[0];
    reviewReason = collectElements(tree, (element) => element.props.id === reviewButton.props["aria-describedby"])[0];
    assert(reviewButton.props.disabled === true && elementText(reviewReason).includes("creation plan already exists"), "existing-project review-plan button has its distinct exact visible plan reason");

    activeRunner = createHookRunner();
    tree = activeRunner.render(WebsiteCreatorPanel);
    let titleInput = collectElements(tree, (element) => element.type === "input")[0];
    let descriptionInput = collectElements(tree, (element) => element.type === "textarea")[0];
    titleInput.props.onChange({ target: { value: "First title" } });
    descriptionInput.props.onChange({ target: { value: "First description" } });
    tree = activeRunner.render(WebsiteCreatorPanel);
    createImplementation = async () => { throw new Error("deterministic lost create response"); };
    let form = collectElements(tree, (element) => element.type === "form")[0];
    await form.props.onSubmit({ preventDefault() {} });
    tree = activeRunner.render(WebsiteCreatorPanel);
    form = collectElements(tree, (element) => element.type === "form")[0];
    await form.props.onSubmit({ preventDefault() {} });
    assert(createCalls.length === 2 && createCalls[0].key === createCalls[1].key, "unchanged create retry after a lost response reuses the exact idempotency key");
    activeRunner = createHookRunner();
    tree = activeRunner.render(WebsiteCreatorPanel);
    await activeRunner.flushEffects();
    tree = activeRunner.render(WebsiteCreatorPanel);
    titleInput = collectElements(tree, (element) => element.type === "input")[0];
    descriptionInput = collectElements(tree, (element) => element.type === "textarea")[0];
    assert(
      titleInput.props.value === "First title" &&
        descriptionInput.props.value === "First description" &&
        elementText(tree).includes("interrupted plan request was restored"),
      "component remount restores the exact pending create payload for one explicit retry"
    );
    await collectElements(tree, (element) => element.type === "form")[0].props.onSubmit({ preventDefault() {} });
    assert(
      createCalls.length === 3 && createCalls[2].key === createCalls[0].key,
      "explicit create retry after remount reuses the exact tab-scoped project identity"
    );
    tree = activeRunner.render(WebsiteCreatorPanel);
    titleInput = collectElements(tree, (element) => element.type === "input")[0];
    titleInput.props.onChange({ target: { value: "Changed title" } });
    tree = activeRunner.render(WebsiteCreatorPanel);
    await collectElements(tree, (element) => element.type === "form")[0].props.onSubmit({ preventDefault() {} });
    assert(createCalls[3].key !== createCalls[2].key, "editing the title after a lost create response rotates the idempotency key");
    tree = activeRunner.render(WebsiteCreatorPanel);
    descriptionInput = collectElements(tree, (element) => element.type === "textarea")[0];
    descriptionInput.props.onChange({ target: { value: "Changed description" } });
    tree = activeRunner.render(WebsiteCreatorPanel);
    await collectElements(tree, (element) => element.type === "form")[0].props.onSubmit({ preventDefault() {} });
    assert(createCalls[4].key !== createCalls[3].key, "editing the description after a lost create response rotates the idempotency key again");

    const activePreview = creatorPanelProject("preview_available");
    const suppressionKey = `codexforge.creator.preview-suppressed.v1:${activePreview.identity.projectId}:${activePreview.preview.previewId}`;
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = activePreview;
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 1, "active preview initially renders one sandbox iframe");
    const stopDeferred = createDeferred();
    actionImplementation = async () => stopDeferred.promise;
    actionCalls = [];
    const stopButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Stop preview")[0];
    const stopPromise = stopButton.props.onClick();
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 0 && storage.get(suppressionKey) === "true", "stop request synchronously removes the iframe and records tab-scoped suppression before the server reply");
    stopDeferred.reject(new Error("deterministic unknown stop outcome"));
    await stopPromise;
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 0 && elementText(tree).includes("remains hidden across page reloads"), "unknown stop outcome keeps generated content locally suppressed with honest copy");

    global.window.location.href = `http://127.0.0.1:41001/jarvis-websites?project=${activePreview.identity.projectId}`;
    fetchImplementation = async () => activePreview;
    activeRunner = createHookRunner();
    tree = activeRunner.render(WebsiteCreatorPanel);
    await activeRunner.flushEffects();
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 0 && elementText(tree).includes("remains hidden across page reloads"), "stored stop suppression survives a deterministic component reload with the server still reporting active");

    const cancelPreview = creatorPanelProject("ready", { preview: activePreview.preview });
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = cancelPreview;
    tree = activeRunner.render(WebsiteCreatorPanel);
    const cancelDeferred = createDeferred();
    actionImplementation = async () => cancelDeferred.promise;
    const cancelButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Cancel creator")[0];
    const cancelPromise = cancelButton.props.onClick();
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 0 && storage.get(suppressionKey) === "true", "cancel request synchronously preserves the same iframe suppression boundary before the server reply");
    cancelDeferred.reject(new Error("deterministic unknown cancel outcome"));
    await cancelPromise;

    const inactiveOldPreview = creatorPanelProject("ready", { preview: { ...activePreview.preview, status: "inactive" } });
    const newlyStarted = creatorPanelProject("preview_available", { preview: { ...activePreview.preview, previewId: "preview-000000000002" } });
    activeRunner.states[2] = inactiveOldPreview;
    activeRunner.states[3] = false;
    tree = activeRunner.render(WebsiteCreatorPanel);
    actionImplementation = async () => ({ project: newlyStarted });
    const startButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Start preview")[0];
    await startButton.props.onClick();
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(collectElements(tree, (element) => element.type === "iframe").length === 1 && !storage.has(suppressionKey), "successful explicit start clears stale suppression and renders only the new active preview");

    const stoppedCurrentPreview = creatorPanelProject("ready", {
      stateRevision: 10,
      preview: {
        ...activePreview.preview,
        status: "stopped",
        stoppedAt: "2026-08-01T12:01:00.000Z",
      },
    });
    const staleHistoricalPreview = creatorPanelProject("preview_available", {
      stateRevision: 9,
      preview: activePreview.preview,
    });
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = stoppedCurrentPreview;
    tree = activeRunner.render(WebsiteCreatorPanel);
    actionImplementation = async () => ({ project: staleHistoricalPreview, replayed: true });
    actionCalls = [];
    const staleStartButton = collectElements(tree, (element) => element.type === "button" && elementText(element).trim() === "Start preview")[0];
    await staleStartButton.props.onClick();
    tree = activeRunner.render(WebsiteCreatorPanel);
    assert(
      activeRunner.states[2].stateRevision === 10 &&
        activeRunner.states[2].status === "ready" &&
        activeRunner.states[2].preview.status === "stopped" &&
        collectElements(tree, (element) => element.type === "iframe").length === 0,
      "older idempotent replay cannot regress a newer stopped-preview snapshot or resurrect generated content"
    );

    const longPath = `${"nested-segment-".repeat(3)}one/${"long-file-name-".repeat(3)}artifact.html`;
    const longManifest = {
      artifactRevision: 1,
      manifestDigest: "1".repeat(64),
      aggregateDigest: "2".repeat(64),
      aggregateBytes: 10,
      sourceRunId: "run-component-export",
      files: [{ path: longPath, mediaType: "text/html", byteLength: 10, sha256: "3".repeat(64) }],
    };
    activeRunner = createHookRunner();
    activeRunner.render(WebsiteCreatorPanel);
    activeRunner.states[2] = creatorPanelProject("exported", { exportManifest: longManifest });
    tree = activeRunner.render(WebsiteCreatorPanel);
    const longDownload = collectElements(tree, (element) => element.type === "a" && elementText(element).includes(longPath))[0];
    assert(longDownload && longDownload.props.href.endsWith(longPath.split("/").map(encodeURIComponent).join("/")), "maximum-style nested export paths render as exact safe per-segment download links");
    const cssSource = fs.readFileSync(panelCssPath, "utf8");
    assert(/\.fileList summary > \*\s*\{[^}]*max-width:\s*100%[^}]*overflow-wrap:\s*anywhere[^}]*word-break:\s*break-word/s.test(cssSource), "generated file summaries own bounded mobile wrapping styles");
    assert(/\.downloadLinks a\s*\{[^}]*max-width:\s*100%[^}]*overflow-wrap:\s*anywhere[^}]*white-space:\s*normal[^}]*word-break:\s*break-word/s.test(cssSource), "long export links own bounded mobile wrapping styles");
  } finally {
    Module._load = priorLoad;
    delete require.cache[panelResolved];
    delete global.window;
  }
}
async function expectFailure(operation, code, message) {
  try {
    await operation();
  } catch (error) {
    assert(error && error.code === code, `${message} (expected ${code}, received ${error?.code ?? error?.name ?? "unknown"}: ${error?.message ?? String(error)})`);
    return error;
  }
  throw new Error(`${message}: expected ${code}`);
}
async function assertNoTransientRevisionEntries(persistence, projectId, message) {
  let entries;
  try {
    entries = await persistence.filesystem.listDirectory([
      "projects",
      projectId,
      "revisions",
    ]);
  } catch (error) {
    if (error?.code === "not_found") return;
    throw error;
  }
  assert(
    entries.every((entry) => /^\d{6}$/.test(entry)),
    `${message}: unexpected revision entry ${entries.find((entry) => !/^\d{6}$/.test(entry)) ?? "unknown"}`
  );
}
function assertWholeTreePublicationCall(call, projectId, artifactRevision, expectedBundle, message) {
  assert(call, `${message}: publication call is present`);
  assert(
    call.targetSegments.join("/") ===
      `projects/${projectId}/revisions/${String(artifactRevision).padStart(6, "0")}`,
    `${message}: exact immutable revision target is used`
  );
  assert(
    call.orderedEntries.length === expectedBundle.files.length + 3,
    `${message}: contract files and exactly three metadata files are published together`
  );
  for (let index = 0; index < expectedBundle.files.length; index += 1) {
    const [relativeSegments, data] = call.orderedEntries[index];
    assert(
      relativeSegments.join("/") === `files/${expectedBundle.files[index].path}` &&
        Buffer.isBuffer(data) &&
        data.equals(Buffer.from(expectedBundle.files[index].content, "utf8")),
      `${message}: ordered artifact entry ${index} contains exact path and bytes`
    );
  }
  const metadataPayloads = new Map();
  const metadataNames = call.orderedEntries
    .slice(expectedBundle.files.length)
    .map(([relativeSegments, data]) => {
      assert(Buffer.isBuffer(data) && data.at(-1) === 0x0a, `${message}: metadata is canonical newline-terminated bytes`);
      const name = relativeSegments.join("/");
      metadataPayloads.set(name, JSON.parse(data.toString("utf8")));
      return name;
    });
  assert(
    JSON.stringify(metadataNames) === JSON.stringify(["manifest.json", "validation.json", "revision.json"]),
    `${message}: metadata order is exact and deterministic`
  );
  const manifest = metadataPayloads.get("manifest.json");
  const validation = metadataPayloads.get("validation.json");
  const materialization = metadataPayloads.get("revision.json");
  assert(
    manifest?.creatorProjectId === projectId &&
      manifest?.projectTitle === expectedBundle.projectTitle &&
      manifest?.artifactRevision === artifactRevision &&
      manifest?.entrypoint === expectedBundle.entrypoint &&
      JSON.stringify(manifest?.files?.map((file) => file.path)) ===
        JSON.stringify(expectedBundle.files.map((file) => file.path)),
    `${message}: manifest metadata is bound to the exact project, revision, entrypoint, and ordered inventory`
  );
  assert(
    validation?.valid === true &&
      validation?.bundleDigest !== null &&
      validation?.manifestDigest !== null &&
      materialization?.artifactRevision === artifactRevision &&
      materialization?.entrypoint === expectedBundle.entrypoint &&
      materialization?.aggregateDigest === manifest?.aggregateDigest &&
      materialization?.validationDigest === manifest?.validationDigest &&
      JSON.stringify(materialization?.files) === JSON.stringify(manifest?.files),
    `${message}: validation and revision metadata exactly bind the same complete publication`
  );
}
async function explicitlyRecoverProject(service, project, recoveryKey, message) {
  const before = JSON.stringify(project);
  const readOnly = await service.getProject(project.identity.projectId);
  assert(
    JSON.stringify(readOnly) === before,
    `${message}: GET leaves the interrupted project byte-for-byte unchanged`
  );
  const result = await service.actOnProject(
    project.identity.projectId,
    { action: "recover", expectedRevision: project.stateRevision },
    recoveryKey
  );
  assert(
    result.project.auditEvents.filter((event) => event.eventType === "recovery.requested").length === 1 &&
      result.project.auditEvents.filter((event) => event.eventType === "recovery.completed").length === 1 &&
      result.project.idempotencyRecords.at(-1)?.mutationKind === "recover",
    `${message}: one exact recovery request and completion are durably recorded`
  );
  const replay = await service.actOnProject(
    project.identity.projectId,
    { action: "recover", expectedRevision: project.stateRevision },
    recoveryKey
  );
  assert(
    replay.replayed && replay.project.stateRevision === result.project.stateRevision,
    `${message}: duplicate recovery replays without another lifecycle mutation`
  );
  return result.project;
}
async function getExactBoundRun(lifecycle, project, binding) {
  return lifecycle.getRun({
    projectId: project.identity.projectId,
    purpose: binding.purpose,
    runId: binding.sourceRunId,
    ownershipBindingId: binding.ownershipBindingId,
  });
}
function assertRequiredParserLoadFailsClosed(
  validatorRelativePath,
  parserRequest,
  label
) {
  const validatorPath = path.join(repoRoot, validatorRelativePath);
  const resolvedValidatorPath = require.resolve(validatorPath);
  delete require.cache[resolvedValidatorPath];
  const parserUnavailable = new Error(`${label} parser unavailable`);
  const previousLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === parserRequest) throw parserUnavailable;
    return previousLoad.apply(this, arguments);
  };
  try {
    require(validatorPath);
    throw new Error(`${label} validator initialized without its required parser`);
  } catch (error) {
    assert(error === parserUnavailable, `${label} parser unavailability fails validator initialization closed`);
  } finally {
    Module._load = previousLoad;
    delete require.cache[resolvedValidatorPath];
  }
  assert(!require.cache[resolvedValidatorPath], `${label} parser failure leaves no cached permissive validator`);
}
async function assertPreviewRouteUsesValidatedExternalAuthority() {
  const net = require("node:net");
  const projectId = "6".repeat(24);
  const previewId = "7".repeat(32);
  const revision = 12;
  const routePath = path.join(
    repoRoot,
    "src/app/api/codexforge/creator/preview/[projectId]/[previewId]/[revision]/[...filePath]/route.ts"
  );
  const runtimePath = path.join(repoRoot, "src/lib/codexforge/creator/creator-runtime.server.ts");
  const resolvedRoute = require.resolve(routePath);
  const resolvedRuntime = require.resolve(runtimePath);
  const listener = net.createServer();
  const externalPort = 41873;
  listener.address = () => ({ address: "127.0.0.1", family: "IPv4", port: externalPort });
  const originalGetActiveHandles = process._getActiveHandles;
  process._getActiveHandles = () => [listener];
  try {
    const address = listener.address();
    assert(address && typeof address === "object" && address.address === "127.0.0.1", "preview route response test exposes one deterministic loopback-only listener handle");
    const externalAuthority = `http://127.0.0.1:${address.port}`;
    const internalAuthority = `http://localhost:${address.port === 65535 ? 65534 : address.port + 1}`;
    const priorLoad = Module._load;
    Module._load = function (request, parent, isMain) {
      let resolved = null;
      try { resolved = Module._resolveFilename(request, parent, isMain); } catch {}
      if (resolved === resolvedRuntime) {
        return {
          getCreatorRuntimeService() {
            return {
              async readActivePreviewFile(input) {
                assert(
                  input.projectId === projectId &&
                    input.previewId === previewId &&
                    input.artifactRevision === revision &&
                    input.filePath === "index.html",
                  "actual preview route binds its runtime read to the exact requested project, preview, revision, and file"
                );
                return { mediaType: "text/html", bytes: Buffer.from("<!doctype html><title>D2 route response</title>", "utf8") };
              },
            };
          },
        };
      }
      return priorLoad.apply(this, arguments);
    };
    try {
      delete require.cache[resolvedRoute];
      const route = require(routePath);
      const request = new Request(
        `${internalAuthority}/api/codexforge/creator/preview/${projectId}/${previewId}/${revision}/index.html`,
        { headers: { Host: `127.0.0.1:${address.port}` } }
      );
      const response = await route.GET(request, {
        params: Promise.resolve({ projectId, previewId, revision: String(revision), filePath: ["index.html"] }),
      });
      assert(response.status === 200 && (await response.text()).includes("D2 route response"), "actual preview route returns the deterministic validated static file response");
      const csp = response.headers.get("Content-Security-Policy") || "";
      const exactPrefix = `${externalAuthority}/api/codexforge/creator/preview/${projectId}/${previewId}/${revision}/`;
      for (const directive of ["img-src", "style-src", "script-src"]) {
        const match = csp.match(new RegExp(`(?:^|; )${directive} ([^;]+)`));
        assert(match && match[1] === exactPrefix, `preview CSP ${directive} is exactly scoped to the validated external Host revision prefix`);
      }
      assert(!csp.includes(internalAuthority), "preview CSP does not disclose or bind Next's distinct internal request authority");
      assert(!csp.includes(`${externalAuthority}/api/codexforge/creator/preview/${"8".repeat(24)}/`), "preview CSP grants no sibling project prefix");
      assert(!csp.includes(`${externalAuthority}/api/codexforge/creator/preview/${projectId}/${"9".repeat(32)}/`), "preview CSP grants no sibling preview prefix");
      assert(!csp.includes(`${externalAuthority}/api/codexforge/creator/preview/${projectId}/${previewId}/${revision + 1}/`), "preview CSP grants no sibling revision prefix");
    } finally {
      Module._load = priorLoad;
      delete require.cache[resolvedRoute];
    }
  } finally {
    process._getActiveHandles = originalGetActiveHandles;
  }
}
function baseHtml(options = {}) {
  const head = options.head || "";
  const body = options.body || '<button id="hello" type="button">Say hello</button>';
  const header = options.header === false ? "" : "<header><p>Local static creator</p></header>";
  const footer = options.footer === false ? "" : "<footer><p>Built locally</p></footer>";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>D2 Builder Site</title>${head}</head><body>${header}<main><h1>D2 Builder Site</h1>${body}</main>${footer}</body></html>`;
}
function bundle(files, title = "D2 Builder Site") {
  return {
    contractVersion: "codexforge.creator.bundle.v1",
    projectTitle: title,
    creatorKind: "website-browser-app",
    entrypoint: "index.html",
    files,
  };
}
function htmlFile(content = baseHtml()) {
  return { path: "index.html", mediaType: "text/html", content };
}
function output(value) { return JSON.stringify(value); }
function safePrivateAlphaRoot(storeModule, suffix) {
  const label = storeModule.buildPrivateAlphaTestingDataRootLabel(suffix);
  const base = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
  const target = path.resolve(repoRoot, ...label.split("/"));
  const relative = path.relative(base, target);
  assert(relative && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), "D2 Private Alpha cleanup target is one owned deterministic suffix");
  return target;
}

async function main() {
  const suffix = "macro-d2-static-website-builder";
  auditPanelDisabledDescriptions();
  await runWebsiteCreatorPanelBehaviorTests();
  await assertPreviewRouteUsesValidatedExternalAuthority();
  assertRequiredParserLoadFailsClosed(
    "src/lib/codexforge/creator/creator-code-validation.server.ts",
    "next/dist/compiled/acorn/acorn.js",
    "JavaScript AST"
  );
  assertRequiredParserLoadFailsClosed(
    "src/lib/codexforge/creator/creator-markup-validation.server.ts",
    "next/dist/compiled/node-html-parser/index.js",
    "HTML and SVG"
  );
  const nativeModulePath = path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-native-filesystem.server.ts"
  );
  const firstNativeModule = require(nativeModulePath);
  const firstNativeBinding = firstNativeModule.loadCreatorNativeFilesystem();
  delete require.cache[require.resolve(nativeModulePath)];
  const reloadedNativeModule = require(nativeModulePath);
  const reloadedNativeBinding = reloadedNativeModule.loadCreatorNativeFilesystem();
  assert(
    reloadedNativeBinding === firstNativeBinding,
    "Next-style server-module reload reuses one exact validated native binding without a second dlopen"
  );
  const runtimeModulePath = path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-runtime.server.ts"
  );
  const setRuntimeEnvironment = (name, value) => Object.defineProperty(process.env, name, {
    value,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  const priorDeterministicMode = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE;
  const priorDeterministicSuffix = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX;
  setRuntimeEnvironment("CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE", "1");
  setRuntimeEnvironment("CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX", "macro-d2-runtime-reload");
  try {
    delete require.cache[require.resolve(runtimeModulePath)];
    const firstRuntimeModule = require(runtimeModulePath);
    const firstRuntimeService = firstRuntimeModule.getCreatorRuntimeService();
    const runtimeRegistryDescriptor = Object.getOwnPropertyDescriptor(
      process,
      Symbol.for("codexforge.creator.runtime-service-registry.v1")
    );
    assert(
      runtimeRegistryDescriptor &&
        runtimeRegistryDescriptor.configurable === false &&
        runtimeRegistryDescriptor.enumerable === false &&
        runtimeRegistryDescriptor.writable === false &&
        Object.isFrozen(runtimeRegistryDescriptor.value),
      "creator runtime registry is one nonenumerable nonconfigurable nonwritable frozen process property"
    );
    delete require.cache[require.resolve(runtimeModulePath)];
    const reloadedRuntimeModule = require(runtimeModulePath);
    const reloadedRuntimeService = reloadedRuntimeModule.getCreatorRuntimeService();
    assert(
      reloadedRuntimeService === firstRuntimeService,
      "Next-style server-module reload reuses one exact creator service and its trusted native-root handles"
    );
    setRuntimeEnvironment("CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX", "macro-d2-runtime-reload-other");
    delete require.cache[require.resolve(runtimeModulePath)];
    const separateRuntimeService = require(runtimeModulePath).getCreatorRuntimeService();
    assert(
      separateRuntimeService !== firstRuntimeService,
      "different deterministic runtime suffixes never alias one creator service"
    );
  } finally {
    if (priorDeterministicMode === undefined) delete process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE;
    else setRuntimeEnvironment("CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE", priorDeterministicMode);
    if (priorDeterministicSuffix === undefined) delete process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX;
    else setRuntimeEnvironment("CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX", priorDeterministicSuffix);
    delete require.cache[require.resolve(runtimeModulePath)];
  }
  const validationModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-validation.server.ts"));
  const contractModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-contract.server.ts"));
  const codeValidationModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-code-validation.server.ts"));
  const markupValidationModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-markup-validation.server.ts"));
  const persistenceModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-persistence.server.ts"));
  const adapterModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"));
  const serviceModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-service.server.ts"));
  const materializationModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-materialization.server.ts"));
  const cryptoModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-crypto.ts"));
  const navigationModule = require(path.join(repoRoot, "src/lib/codexforge/navigation-shell/navigation-route-registry.ts"));
  const jarvisContentModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-content.ts"));
  const storeModule = require(path.join(repoRoot, "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"));
  const httpModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-http.server.ts"));
  const cleanupPersistence = persistenceModule.createCreatorPersistenceForTesting(suffix);
  const builtNavigationRoutes = navigationModule.buildCodexForgeNavigationRoutes();
  const creatorNavigationRoute = builtNavigationRoutes.find(
    (route) => route.href === "/jarvis-websites"
  );
  const untouchedPlaceholderRoute = builtNavigationRoutes.find(
    (route) => route.href === "/jarvis-avatar"
  );
  const websiteCapability = jarvisContentModule.JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID.find(
    (capability) => capability.routeHref === "/jarvis-websites"
  );
  assert(
    creatorNavigationRoute?.readiness === "available" &&
      creatorNavigationRoute.noMutation === false &&
      creatorNavigationRoute.safetyPosture === "approval-gated" &&
      creatorNavigationRoute.requiresReview === true,
    "computed Website/Browser App route is operational, server-mutation-aware, approval-gated, and review-bound"
  );
  assert(
    untouchedPlaceholderRoute?.readiness === "preview-only" &&
      untouchedPlaceholderRoute.noMutation === true,
    "computed untouched Jarvis placeholder remains preview-only and non-mutating"
  );
  assert(
    websiteCapability?.tone === "approval-required" &&
      websiteCapability.summary.includes("Static Website/Browser App v0 is operational") &&
      websiteCapability.summary.includes("backend, deployment, packages, and paid routing remain unavailable"),
    "render-owned Jarvis capability data truthfully presents the static creator as operational, approval-gated, and bounded"
  );
  async function tamperManifestWithValidSelfDigest(projectId, artifactRevision) {
    const manifestPath = await persistence.filesystem.resolve([
      "projects",
      projectId,
      "revisions",
      String(artifactRevision).padStart(6, "0"),
      "manifest.json",
    ]);
    const original = await fsp.readFile(manifestPath);
    const parsed = JSON.parse(original.toString("utf8"));
    const { manifestDigest: _manifestDigest, ...base } = parsed;
    const changedBase = { ...base, createdAt: "2000-01-01T00:00:00.000Z" };
    const changed = {
      ...changedBase,
      manifestDigest: cryptoModule.hashCreatorCanonicalJson(changedBase),
    };
    await fsp.writeFile(manifestPath, `${cryptoModule.serializeCreatorCanonicalJson(changed)}\n`, { flag: "w" });
    return async () => fsp.writeFile(manifestPath, original, { flag: "w" });
  }
  const privateAlphaRoot = safePrivateAlphaRoot(storeModule, suffix);
  const productionCreatorRoot = path.join(repoRoot, ".codexforge", "creator");
  const productionCreatorBefore = fs.existsSync(productionCreatorRoot);
  const productionPrivateAlphaRoot = path.join(repoRoot, ".codexforge", "private-alpha");
  const productionPrivateAlphaBefore = fs.existsSync(productionPrivateAlphaRoot)
    ? (await fsp.readdir(productionPrivateAlphaRoot)).sort().join("\n")
    : "absent";
  await cleanupPersistence.cleanupTestRoot().catch(() => undefined);
  await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
  const persistence = persistenceModule.createCreatorPersistenceForTesting(suffix);

  const appJs = 'const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.textContent = "Hello from local JavaScript"; });';
  const css = "body { color: #10243e; background: #f8fafc; font-family: system-ui, sans-serif; } h1 { font-size: 2rem; line-height: 1.2; }";
  const warningBundle = bundle([
    htmlFile(baseHtml({
      footer: false,
      head: '<link rel="stylesheet" href="styles.css">',
      body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>',
    })),
    { path: "app.js", mediaType: "text/javascript", content: appJs },
    { path: "styles.css", mediaType: "text/css", content: css },
  ]);
  const replacementBundle = bundle([
    htmlFile(baseHtml({
      head: '<link rel="stylesheet" href="styles.css">',
      body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>',
    })),
    { path: "app.js", mediaType: "text/javascript", content: appJs },
    { path: "styles.css", mediaType: "text/css", content: css },
  ]);
  function titledBundle(title, includeFooter) {
    return bundle([
      htmlFile(baseHtml({
        footer: includeFooter,
        head: '<link rel="stylesheet" href="styles.css">',
        body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>',
      }).replaceAll("D2 Builder Site", title)),
      { path: "app.js", mediaType: "text/javascript", content: appJs },
      { path: "styles.css", mediaType: "text/css", content: css },
    ], title);
  }
  const viewportMarkup = '<meta name="viewport" content="width=device-width, initial-scale=1">';
  const voidElementCases = [
    { name: "br", kind: "unterminated-void-br", placement: "body", validOpening: "<br", extraFiles: [] },
    { name: "hr", kind: "unterminated-void-hr", placement: "body", validOpening: "<hr", extraFiles: [] },
    {
      name: "img",
      kind: "unterminated-void-img",
      placement: "body",
      validOpening: '<img src="icon.svg" alt="Local status mark"',
      extraFiles: [{ path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-label="Status"><title>Status</title><circle cx="5" cy="5" r="4" fill="#2563eb"/></svg>' }],
    },
    {
      name: "input",
      kind: "unterminated-void-input",
      placement: "labelled-input",
      validOpening: '<input id="void-input" name="void-input" type="text"',
      extraFiles: [],
    },
    {
      name: "link",
      kind: "unterminated-void-link",
      placement: "head",
      validOpening: '<link rel="stylesheet" href="styles.css"',
      extraFiles: [{ path: "styles.css", mediaType: "text/css", content: "body { color: #10243e; }" }],
    },
    {
      name: "meta",
      kind: "unterminated-void-meta",
      placement: "viewport",
      validOpening: '<meta name="viewport" content="width=device-width, initial-scale=1"',
      extraFiles: [],
    },
  ];
  function voidElementBundle(fixture, terminator, title = "D2 Builder Site") {
    const markup = `${fixture.validOpening}${terminator}`;
    let html;
    if (fixture.placement === "head") {
      html = baseHtml({ head: markup });
    } else if (fixture.placement === "viewport") {
      html = baseHtml().replace(viewportMarkup, markup);
    } else if (fixture.placement === "labelled-input") {
      html = baseHtml({ body: `<label for="void-input">Local value</label>${markup}` });
    } else {
      html = baseHtml({ body: markup });
    }
    return bundle([
      htmlFile(html.replaceAll("D2 Builder Site", title)),
      ...fixture.extraFiles,
    ], title);
  }
  function invalidPolicyBundle(title, kind) {
    const titledHtml = htmlFile(baseHtml().replaceAll("D2 Builder Site", title));
    if (kind === "unknown-root-key") {
      return {
        ...bundle([titledHtml], title),
        [`forbidden-${"x".repeat(60000)}\u202e`]: true,
      };
    }
    if (kind === "unknown-file-key") {
      return bundle([{
        ...titledHtml,
        [`forbidden-${"y".repeat(60000)}\u2066`]: true,
      }], title);
    }
    if (kind === "file-count") {
      return bundle([
        titledHtml,
        ...Array.from({ length: 12 }, (_, index) => ({
          path: `file-${String(index).padStart(2, "0")}.txt`,
          mediaType: "text/plain",
          content: "x",
        })),
      ], title);
    }
    if (kind === "individual-size") {
      return bundle([
        titledHtml,
        { path: "large.txt", mediaType: "text/plain", content: "x".repeat(24577) },
      ], title);
    }
    if (kind === "aggregate-size") {
      return bundle([
        titledHtml,
        { path: "a.txt", mediaType: "text/plain", content: "a".repeat(24450) },
        { path: "b.txt", mediaType: "text/plain", content: "b".repeat(24450) },
      ], title);
    }
    if (kind === "invalid-path") {
      return bundle([
        titledHtml,
        { path: "", mediaType: "text/plain", content: "x" },
      ], title);
    }
    if (kind === "js-alias-recursion") {
      return bundle([
        htmlFile(baseHtml({ body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>' }).replaceAll("D2 Builder Site", title)),
        { path: "app.js", mediaType: "text/javascript", content: "function update() { const again = update; again(); } update();" },
      ], title);
    }
    if (kind === "svg-escaped-url") {
      return bundle([
        htmlFile(baseHtml({ body: '<img src="icon.svg" alt="Local icon">' }).replaceAll("D2 Builder Site", title)),
        { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z" fill="u\\72l(h\\74tps:\\2f\\2fevil.example/a.svg)"/></svg>' },
      ], title);
    }
    if (kind === "css-hidden-required") {
      return bundle([
        htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' }).replaceAll("D2 Builder Site", title)),
        { path: "styles.css", mediaType: "text/css", content: ".gone, h1 { display: none; }" },
      ], title);
    }
    const unterminatedVoid = voidElementCases.find((fixture) => fixture.kind === kind);
    if (unterminatedVoid) {
      return bundle([
        { ...titledHtml, content: `${titledHtml.content}<${unterminatedVoid.name}` },
      ], title);
    }
    throw new Error(`Unknown invalid policy fixture: ${kind}`);
  }
  const invalidPolicyCases = [
    {
      kind: "unknown-root-key",
      issueCode: "contract.fields",
      generationTitle: "D2 Bounded Root Diagnostic Generation Site",
      repairTitle: "D2 Bounded Root Diagnostic Repair Site",
    },
    {
      kind: "unknown-file-key",
      issueCode: "contract.file_fields",
      generationTitle: "D2 Bounded File Diagnostic Generation Site",
      repairTitle: "D2 Bounded File Diagnostic Repair Site",
    },
    {
      kind: "file-count",
      issueCode: "limit.file_count",
      generationTitle: "D2 Invalid File Count Generation Site",
      repairTitle: "D2 Invalid File Count Repair Site",
    },
    {
      kind: "individual-size",
      issueCode: "limit.individual_file_bytes",
      generationTitle: "D2 Invalid Individual Size Generation Site",
      repairTitle: "D2 Invalid Individual Size Repair Site",
    },
    {
      kind: "aggregate-size",
      issueCode: "limit.aggregate_bytes",
      generationTitle: "D2 Invalid Aggregate Size Generation Site",
      repairTitle: "D2 Invalid Aggregate Size Repair Site",
    },
    {
      kind: "invalid-path",
      issueCode: "path.invalid_length_or_charset",
      generationTitle: "D2 Invalid Path Generation Site",
      repairTitle: "D2 Invalid Path Repair Site",
    },
    {
      kind: "js-alias-recursion",
      issueCode: "js.recursion_forbidden",
      generationTitle: "D2 JavaScript Alias Recursion Generation Site",
      repairTitle: "D2 JavaScript Alias Recursion Repair Site",
    },
    {
      kind: "svg-escaped-url",
      issueCode: "svg.escape_forbidden",
      generationTitle: "D2 Escaped SVG URL Generation Site",
      repairTitle: "D2 Escaped SVG URL Repair Site",
    },
    {
      kind: "css-hidden-required",
      issueCode: "css.rendering_suppression_forbidden",
      generationTitle: "D2 Hidden Required Heading Generation Site",
      repairTitle: "D2 Hidden Required Heading Repair Site",
    },
    ...voidElementCases.map((fixture) => ({
      kind: fixture.kind,
      issueCode: "html.syntax_subset",
      generationTitle: `D2 Unterminated ${fixture.name} Generation Site`,
      repairTitle: `D2 Unterminated ${fixture.name} Repair Site`,
    })),
  ];

  function validateRaw(raw, title = "D2 Builder Site") {
    return validationModule.validateCreatorProviderOutput({ rawOutput: raw, expectedProjectTitle: title, completedAt: "2026-08-01T12:00:00.000Z" });
  }
  function assertIssue(raw, code, message) {
    const result = validateRaw(raw);
    assert(!result.validation.valid && result.validation.issues.some((issue) => issue.code === code), message);
  }
  function scriptBundle(source) {
    return bundle([
      htmlFile(baseHtml({ body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>' })),
      { path: "app.js", mediaType: "text/javascript", content: source },
    ]);
  }
  function stylesheetBundle(source) {
    return bundle([
      htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' })),
      { path: "styles.css", mediaType: "text/css", content: source },
    ]);
  }
  function svgBundle(source) {
    return bundle([
      htmlFile(baseHtml({ body: '<img src="icon.svg" alt="Local status mark">' })),
      { path: "icon.svg", mediaType: "image/svg+xml", content: source },
    ]);
  }
  const directValid = validateRaw(output(replacementBundle));
  assert(directValid.validation.valid && directValid.validation.stagesCompleted.length === 10, "valid static bundle passes all ten stages");
  for (const [title, label] of [
    ["Safe\ud800Title", "unpaired high surrogate"],
    ["Safe\udc00Title", "unpaired low surrogate"],
    ["Safe\u202etxt.exe", "bidirectional override"],
    ["Safe\u200bTitle", "zero-width format control"],
    ["\u0301", "combining-mark-only title"],
    ["\u034f", "combining-grapheme-joiner-only title"],
    ["\ufe0f", "variation-selector-only title"],
    ["\u0301\u0308", "multiple combining marks without a visible base"],
  ]) {
    let requestRejected = false;
    try {
      serviceModule.validateCreatorCreateProjectInput({
        creatorKind: "website-browser-app",
        projectTitle: title,
        description: "Create one bounded static page.",
      });
    } catch (error) {
      requestRejected = error?.code === "invalid_request";
    }
    assert(requestRejected, `${label} is rejected at the creator request boundary`);
    const parsedTitle = contractModule.parseCreatorArtifactOutput(output(bundle([htmlFile()], title)));
    assert(
      !parsedTitle.ok && parsedTitle.issues.some((issue) => issue.code === "contract.project_title"),
      `${label} is rejected identically at the provider artifact title boundary`
    );
  }
  const safeUnicodeInput = serviceModule.validateCreatorCreateProjectInput({
    creatorKind: "website-browser-app",
    projectTitle: "Café launch 🎉",
    description: "Create one bounded static page.",
  });
  const safeUnicodeOutput = validationModule.validateCreatorProviderOutput({
    rawOutput: output(titledBundle(safeUnicodeInput.projectTitle, true)),
    expectedProjectTitle: safeUnicodeInput.projectTitle,
    completedAt: "2026-08-01T12:00:00.000Z",
  });
  assert(safeUnicodeOutput.validation.valid, "safe visible Unicode identity is accepted consistently from create input through exact expected provider output");
  const unsafeArtifactCharacters = [
    ["\u202e", "right-to-left override"],
    ["\u2066", "left-to-right isolation"],
    ["\u200b", "zero-width space"],
    ["\u0085", "next-line control"],
    ["\ud800", "unpaired surrogate"],
  ];
  const unsafeArtifactBuilders = [
    ["HTML text", (character) => bundle([htmlFile(baseHtml({ body: `<p>Visible${character}spoof</p>` }))])],
    ["SVG text", (character) => bundle([htmlFile(), { path: "icon.svg", mediaType: "image/svg+xml", content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><text x="1" y="5">A${character}B</text></svg>` }])],
    ["JavaScript string", (character) => bundle([htmlFile(), { path: "app.js", mediaType: "text/javascript", content: `const label = "A${character}B";` }])],
    ["JSON string", (character) => bundle([htmlFile(), { path: "data.json", mediaType: "application/json", content: `{"label":"A${character}B"}` }])],
    ["Markdown text", (character) => bundle([htmlFile(), { path: "notes.md", mediaType: "text/markdown", content: `Visible ${character} spoof` }])],
    ["plain text", (character) => bundle([htmlFile(), { path: "notes.txt", mediaType: "text/plain", content: `Visible ${character} spoof` }])],
  ];
  for (const [character, characterLabel] of unsafeArtifactCharacters) {
    for (const [fileLabel, build] of unsafeArtifactBuilders) {
      assertIssue(
        output(build(character)),
        characterLabel === "unpaired surrogate"
          ? "contract.file_values"
          : "content.control_or_format_character",
        `${characterLabel} is rejected from ${fileLabel} before inspection, preview, or materialization`
      );
    }
  }
  const safeVisibleArtifactText = "Caf\u00e9 \u72b6\u614b \u{1f389}";
  for (const [fileLabel, build] of unsafeArtifactBuilders) {
    const safeUnicodeArtifact = validateRaw(output(build(safeVisibleArtifactText)));
    assert(
      !safeUnicodeArtifact.validation.issues.some((issue) =>
        issue.code === "content.control_or_format_character" || issue.code === "contract.file_values"
      ),
      `ordinary visible Unicode is not misclassified as a control, format character, or invalid string in ${fileLabel}`
    );
  }
  for (const [encodedControl, label] of [
    ["&#x202E;", "numeric bidi-control entity"],
    ["&lrm;", "named direction-mark entity"],
  ]) {
    const entityHtml = baseHtml({ body: `<p>Visible${encodedControl}spoof</p>` });
    assertIssue(output(bundle([htmlFile(entityHtml)])), "html.decoded_control_or_format_character", `${label} is rejected after structured HTML entity decoding`);
  }
  assertIssue(
    output(bundle([htmlFile(baseHtml({ body: '<button type="button" aria-label="Safe&#x202E;spoof">Action</button>' }))])),
    "html.syntax_subset",
    "character references are forbidden in attribute values before an encoded format-control can affect inspection"
  );
  assert(
    validateRaw(output(bundle([htmlFile(baseHtml({ body: "<p>Rock &amp; roll</p>" }))]))).validation.valid,
    "ordinary safe character references in visible HTML text remain valid"
  );
  for (const [explanation, label] of [
    ["Visible\u202espoof", "bidirectional format control"],
    ["Visible\u0085spoof", "C1 control"],
    ["Visible\ud800spoof", "unpaired surrogate"],
  ]) {
    assertIssue(
      output({ ...bundle([htmlFile()]), explanation }),
      "contract.explanation",
      `${label} is rejected from optional provider explanation metadata`
    );
  }
  assert(
    validateRaw(output({ ...bundle([htmlFile()]), explanation: "Caf\u00e9 launch \u{1f389}" })).validation.valid,
    "ordinary visible Unicode remains valid in bounded provider explanation metadata"
  );
  for (const [description, label] of [
    ["Unsafe\ud800brief", "unpaired surrogate"],
    ["Unsafe\u202ebrief", "bidirectional format control"],
    ["\u200b", "zero-width-only brief"],
    ["\u0301\ufe0f", "combining-and-variation-only brief"],
  ]) {
    let descriptionRejected = false;
    try {
      serviceModule.validateCreatorCreateProjectInput({
        creatorKind: "website-browser-app",
        projectTitle: "Visible title",
        description,
      });
    } catch (error) {
      descriptionRejected = error?.code === "invalid_request";
    }
    assert(descriptionRejected, `${label} is rejected from the user-visible creator brief`);
  }
  assert(
    serviceModule.validateCreatorCreateProjectInput({
      creatorKind: "website-browser-app",
      projectTitle: "Visible title",
      description: "First meaningful line.\nSecond meaningful line 🎉",
    }).description.includes("\n"),
    "meaningful multiline Unicode creator briefs remain valid"
  );
  assert(
    voidElementCases.length === 6 &&
      voidElementCases.map((fixture) => fixture.name).join(",") === "br,hr,img,input,link,meta",
    "void-element termination matrix exactly covers every supported HTML void element"
  );
  const malformedVoidProviderResults = [];
  for (const fixture of voidElementCases) {
    const malformedEndings = [
      [`<${fixture.name}`, "EOF immediately after the tag name"],
      [`<${fixture.name}   `, "EOF after trailing whitespace"],
      [`<${fixture.name} hidden`, "EOF after a supported unquoted boolean attribute"],
      [`<${fixture.name} title="unterminated`, "EOF inside a quoted attribute"],
      [`<${fixture.name} title="complete"`, "EOF immediately after a quoted attribute"],
      [`<${fixture.name} title="complete"   `, "EOF after a quoted attribute and trailing whitespace"],
      [`<${fixture.name} /`, "EOF inside a self-closing marker"],
    ];
    for (const [suffix, label] of malformedEndings) {
      const result = markupValidationModule.validateCreatorHtml("index.html", `${baseHtml()}${suffix}`);
      assert(
        result.issues.length === 1 &&
          result.issues[0].code === "html.syntax_subset" &&
          result.issues[0].severity === "error" &&
          result.issues[0].blocksMaterialization === true &&
          result.references.length === 0,
        `${fixture.name} ${label} is one blocking syntax rejection with no admitted element contribution`
      );
    }
    for (const [terminator, label] of [
      [">", "complete greater-than terminator"],
      [" />", "complete self-closing terminator"],
      [" hidden>", "complete supported boolean attribute and greater-than terminator"],
      [" hidden />", "complete supported boolean attribute and self-closing terminator"],
    ]) {
      const result = validateRaw(output(voidElementBundle(fixture, terminator)));
      assert(
        result.parse.ok && result.bundle !== null && result.validation.valid,
        `${fixture.name} ${label} remains a valid complete provider bundle`
      );
    }
    const invalidTitle = `D2 Unterminated ${fixture.name} Generation Site`;
    const providerResult = validateRaw(
      output(invalidPolicyBundle(invalidTitle, fixture.kind)),
      invalidTitle
    );
    assert(
      providerResult.parse.ok &&
        providerResult.bundle === null &&
        providerResult.validation.valid === false &&
        providerResult.validation.bundleDigest === null &&
        providerResult.validation.manifestDigest === null &&
        providerResult.validation.issues.some(
          (issue) => issue.code === "html.syntax_subset" && issue.filePath === "index.html" && issue.blocksMaterialization
        ) &&
        providerResult.validation.issues.some((issue) => issue.code === "preview.not_ready"),
      `${fixture.name} malformed provider output is schema-valid but cannot become an artifact proposal or preview-ready bundle`
    );
    malformedVoidProviderResults.push({ fixture, result: providerResult });
  }
  const malformedImageReference = markupValidationModule.validateCreatorHtml(
    "index.html",
    `${baseHtml()}<img alt="" src="icon.svg"`
  );
  assert(
    malformedImageReference.issues.length === 1 &&
      malformedImageReference.issues[0].code === "html.syntax_subset" &&
      malformedImageReference.references.length === 0,
    "unterminated image attributes never contribute a local resource reference"
  );
  const nonAsciiMarkupSyntaxWhitespace = [
    ["\u00a0", "non-breaking space"],
    ["\u2003", "em space"],
    ["\u2028", "line separator"],
    ["\u202f", "narrow non-breaking space"],
  ];
  for (const [separator, separatorLabel] of nonAsciiMarkupSyntaxWhitespace) {
    const cases = [
      [baseHtml({ body: `<button${separator}type="button">Action</button>` }), [], "after a button tag name"],
      [baseHtml({ body: `<button type${separator}="button">Action</button>` }), [], "before an attribute equals sign"],
      [baseHtml({ body: `<button type=${separator}"button">Action</button>` }), [], "after an attribute equals sign"],
      [baseHtml({ body: `<button type="button"${separator}>Action</button>` }), [], "before an opening-tag terminator"],
      [baseHtml({ body: `<button type="button">Action</button${separator}>` }), [], "inside a closing tag"],
      [baseHtml({ body: `<img${separator}src="icon.svg" alt="Image">` }), [{ path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>' }], "after an image tag name"],
      [baseHtml({ body: `<script${separator}src="app.js" defer></script>` }), [{ path: "app.js", mediaType: "text/javascript", content: "const ready = true;" }], "after a script tag name"],
    ];
    for (const [html, extraFiles, placement] of cases) {
      const direct = markupValidationModule.validateCreatorHtml("index.html", html);
      assert(
        direct.issues.some((issue) => issue.code === "html.syntax_subset") && direct.references.length === 0,
        `${separatorLabel} ${placement} is rejected by the exact HTML syntax scanner without admitted resource references`
      );
      const complete = validateRaw(output(bundle([htmlFile(html), ...extraFiles])));
      assert(
        !complete.validation.valid &&
          complete.bundle === null &&
          complete.validation.issues.some((issue) => issue.code === "html.syntax_subset") &&
          complete.validation.issues.some((issue) => issue.code === "preview.not_ready"),
        `${separatorLabel} ${placement} cannot become an artifact proposal, materialization, or preview-ready bundle`
      );
    }
  }
  for (const [separator, label] of [[" ", "space"], ["\t", "tab"], ["\n", "line feed"], ["\r", "carriage return"], ["\f", "form feed"]]) {
    const exactWhitespaceHtml = baseHtml({ body: `<button${separator}type="button">Action</button>` });
    assert(validateRaw(output(bundle([htmlFile(exactWhitespaceHtml)]))).validation.valid, `exact HTML ASCII ${label} remains valid between a tag name and attribute`);
  }
  const safeJavaScriptBundle = bundle([
    htmlFile(baseHtml({ body: '<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: "for (let index = 0; index < 3; index += 1) { const next = index + 1; }" },
  ]);
  assert(validateRaw(output(safeJavaScriptBundle)).validation.valid, "static Acorn import accepts safe bounded JavaScript");
  assertIssue(output(bundle([
    htmlFile(baseHtml({ body: '<script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: "const broken = ;" },
  ])), "js.parse_failed", "malformed JavaScript fails closed through the static Acorn parser");
  const safeCssBundle = bundle([
    htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' })),
    { path: "styles.css", mediaType: "text/css", content: "body { color: #10243e; }" },
  ]);
  assert(validateRaw(output(safeCssBundle)).validation.valid, "static PostCSS import accepts safe bounded CSS");
  assertIssue(output(bundle([
    htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' })),
    { path: "styles.css", mediaType: "text/css", content: "body { color: #10243e;" },
  ])), "css.parse_failed", "malformed CSS fails closed through the static PostCSS parser");
  const directWarning = validateRaw(output(warningBundle));
  assert(directWarning.validation.valid && directWarning.validation.issues.some((issue) => issue.code === "a11y.optional_page_landmarks" && issue.severity === "warning"), "honest nonblocking accessibility warning is reported");
  const passiveSvgBundle = bundle([
    htmlFile(baseHtml({ body: '<img src="icon.svg" alt="Local status mark">' })),
    { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-label="Status"><title>Status</title><circle cx="5" cy="5" r="4" fill="#2563eb"/></svg>' },
  ]);
  assert(validateRaw(output(passiveSvgBundle)).validation.valid, "passive local SVG with the exact standard namespace is accepted");
  assert(validateRaw(`\`\`\`json\n${output(replacementBundle)}\n\`\`\``).validation.valid, "one exact JSON fence normalizes deterministically");

  assertIssue("{", "contract.json_invalid", "malformed JSON is rejected");
  assertIssue(`prose ${output(replacementBundle)}`, "contract.json_invalid", "extra prose is rejected");
  assertIssue(`\`\`\`json\n${output(replacementBundle)}\n\`\`\`\n\`\`\`json\n{}\n\`\`\``, "contract.json_invalid", "multiple code fences are rejected");
  assertIssue(output(replacementBundle).slice(0, -3), "contract.json_invalid", "truncated JSON is rejected");
  assertIssue('{"contractVersion":"codexforge.creator.bundle.v1","projectTitle":"D2 Builder Site","creatorKind":"website-browser-app","entrypoint":"index.html"}', "contract.fields", "missing contract fields are rejected");
  assertIssue(output({ ...replacementBundle, command: "npm install" }), "contract.fields", "unknown contract fields are rejected");
  for (const [invalidOutput, code, label] of [
    [output(invalidPolicyBundle("D2 Builder Site", "unknown-root-key")), "contract.fields", "oversized and format-controlled unknown root key"],
    [output(invalidPolicyBundle("D2 Builder Site", "unknown-file-key")), "contract.file_fields", "oversized and format-controlled unknown file key"],
  ]) {
    const result = validateRaw(invalidOutput);
    assert(
      !result.validation.valid &&
        result.bundle === null &&
        result.validation.issues.some((issue) => issue.code === code) &&
        result.validation.issues.every((issue) =>
          issue.message.length <= 240 &&
          issue.suggestedRepairContext.length <= 240 &&
          !/[\p{Cc}\p{Cf}\p{Cs}]/u.test(`${issue.code}${issue.filePath || ""}${issue.message}${issue.suggestedRepairContext}`)
        ),
      `${label} is rejected with only bounded sanitized diagnostics`
    );
  }
  assertIssue('{"contractVersion":"codexforge.creator.bundle.v1","contractVersion":"codexforge.creator.bundle.v1","projectTitle":"D2 Builder Site","creatorKind":"website-browser-app","entrypoint":"index.html","files":[]}', "contract.json_invalid", "duplicate JSON object keys are rejected");

  assertIssue(output(bundle([htmlFile(), htmlFile()])), "path.duplicate", "duplicate artifact paths are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "App.js", mediaType: "text/javascript", content: "const a = 1;" }, { path: "app.js", mediaType: "text/javascript", content: "const b = 2;" }])), "path.case_collision", "case-insensitive path collisions are rejected");
  for (const [files, label] of [
    [[htmlFile(), { path: "index.html/app.js", mediaType: "text/javascript", content: "const app = 1;" }], "entrypoint file used as a directory"],
    [[htmlFile(), { path: "assets", mediaType: "text/plain", content: "x" }, { path: "assets/app.js", mediaType: "text/javascript", content: "const app = 1;" }], "extensionless ancestor before child"],
    [[{ path: "assets/app.js", mediaType: "text/javascript", content: "const app = 1;" }, { path: "assets", mediaType: "text/plain", content: "x" }, htmlFile()], "child before extensionless ancestor"],
    [[htmlFile(), { path: "ASSETS", mediaType: "text/plain", content: "x" }, { path: "assets/app.js", mediaType: "text/javascript", content: "const app = 1;" }], "case-folded ancestor before child"],
    [[{ path: "ASSETS/app.js", mediaType: "text/javascript", content: "const app = 1;" }, { path: "assets", mediaType: "text/plain", content: "x" }, htmlFile()], "case-folded child before ancestor"],
  ]) {
    assertIssue(output(bundle(files)), "path.file_directory_collision", `${label} is rejected before materialization`);
  }
  assertIssue(output(bundle([htmlFile(), { path: "../escape.txt", mediaType: "text/plain", content: "x" }])), "path.traversal_or_depth", "relative traversal is rejected");
  assertIssue(output(bundle([{ path: "/index.html", mediaType: "text/html", content: baseHtml() }])), "path.absolute_encoded_or_namespace", "absolute paths are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "\\\\server\\share.txt", mediaType: "text/plain", content: "x" }])), "path.absolute_encoded_or_namespace", "UNC paths are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "C:escape.txt", mediaType: "text/plain", content: "x" }])), "path.absolute_encoded_or_namespace", "drive-qualified and ADS paths are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "%2e%2e/escape.txt", mediaType: "text/plain", content: "x" }])), "path.absolute_encoded_or_namespace", "encoded traversal is rejected");
  assertIssue(output(bundle([htmlFile(), { path: "CON.txt", mediaType: "text/plain", content: "x" }])), "path.unsafe_segment", "Windows reserved device names are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "notes./readme.txt", mediaType: "text/plain", content: "x" }])), "path.unsafe_segment", "trailing dots and spaces are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "a/b/c/d/file.txt", mediaType: "text/plain", content: "x" }])), "path.traversal_or_depth", "excessive directory depth is rejected");
  assertIssue(output(bundle([htmlFile(), { path: `${"a".repeat(49)}.txt`, mediaType: "text/plain", content: "x" }])), "path.unsafe_segment", "excessive segment length is rejected");
  const manyFiles = [htmlFile(), ...Array.from({ length: 12 }, (_, index) => ({ path: `file-${String(index).padStart(2, "0")}.txt`, mediaType: "text/plain", content: "x" }))];
  assertIssue(output(bundle(manyFiles)), "limit.file_count", "too many files are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "large.txt", mediaType: "text/plain", content: "x".repeat(24577) }])), "limit.individual_file_bytes", "oversized individual files are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "a.txt", mediaType: "text/plain", content: "a".repeat(24450) }, { path: "b.txt", mediaType: "text/plain", content: "b".repeat(24450) }])), "limit.aggregate_bytes", "oversized aggregate bundles are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "run.sh", mediaType: "text/plain", content: "echo x" }])), "path.extension_forbidden", "shell and disallowed extensions are rejected");
  assertIssue(output(bundle([htmlFile(), { path: "data.json", mediaType: "text/plain", content: "{}" }])), "path.media_type_mismatch", "wrong media types are rejected");
  assertIssue(output(bundle([{ path: "other.html", mediaType: "text/html", content: baseHtml() }])), "path.entrypoint_not_first", "missing exact entrypoint is rejected");

  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<script src="https://evil.example/x.js" defer></script>' }))])), "html.reference_unsafe", "external HTML scripts are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ head: '<link rel="stylesheet" href="https://evil.example/x.css">' }))])), "html.reference_unsafe", "external HTML styles are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<button type="button" onclick="evil()">Unsafe</button>' }))])), "html.attribute_forbidden", "inline event handlers are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<script>eval("x")</script>' }))])), "html.inline_script", "inline scripts are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<iframe src="local.html"></iframe>' }))])), "html.element_forbidden", "dangerous HTML elements are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<form action="https://evil.example"><button type="button">No</button></form>' }))])), "html.attribute_forbidden", "external form actions are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<a href="javascript:alert(1)">Unsafe</a>' }))])), "html.reference_unsafe", "dangerous URL schemes are rejected");
  assert(validateRaw(output(bundle([htmlFile(baseHtml({ body: '<a href="#details">Jump to details</a><section id="details"><h2>Details</h2></section>' }))]))).validation.valid, "ordinary matching same-document anchor fragments remain valid");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<div id="app"></div><script src="#app" defer></script>' }))])), "html.resource_fragment_forbidden", "script fragment resources are rejected even when the fragment ID exists");
  assertIssue(output(bundle([htmlFile(baseHtml({ head: '<link rel="stylesheet" href="#styles">', body: '<section id="styles"><h2>Styles</h2></section>' }))])), "html.resource_fragment_forbidden", "stylesheet fragment resources are rejected even when the fragment ID exists");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<div id="icon"></div><img src="#icon" alt="Local icon">' }))])), "html.resource_fragment_forbidden", "image fragment resources are rejected even when the fragment ID exists");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<div id="app"></div><script src="app.js#app" defer></script>' }))])), "html.resource_fragment_forbidden", "fragment-bearing script resources are rejected before inventory lookup");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<input type="file" aria-label="Unsafe file access">' }))])), "html.input_type_forbidden", "file and device input types are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' })), { path: "styles.css", mediaType: "text/css", content: '@import "https://evil.example/x.css";' }])), "css.at_rule_forbidden", "CSS imports are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">' })), { path: "styles.css", mediaType: "text/css", content: 'body { background: url("https://evil.example/x.png"); }' }])), "css.remote_or_dynamic_value", "CSS remote URLs are rejected");
  for (const [source, label] of [
    ['eval("x")', "eval"],
    ['new Function("return 1")', "Function constructor"],
    ['import("./x.js")', "dynamic import"],
    ['fetch("/data.json")', "fetch"],
    ['new XMLHttpRequest()', "XMLHttpRequest"],
    ['new WebSocket("ws://localhost")', "WebSocket"],
    ['new RTCPeerConnection()', "WebRTC"],
    ['window["fetch"]("/data.json")', "computed fetch"],
    ['const link = document.querySelector("a"); link["href"] = `https://evil.example`;', "computed external navigation"],
    ['location.assign("ht" + "tps:" + "/" + "/evil.example")', "split external navigation"],
    ['Object.values(self).find((value) => value && value.name === "fetch")', "global enumeration"],
    ['const link = document.createElement("a"); link.setAttributeNS(null, "href", "ht" + "tps:" + "/" + "/evil.example"); link.click();', "namespace navigation sink"],
    ['const link = document.querySelector("a"); link.attributes[0].value = "ht" + "tps:" + "/" + "/evil.example"; link.click();', "attribute-node navigation sink"],
    ['const link = document.querySelector("a"); link.protocol = "ht" + "tps:"; link.host = "evil.example"; link.click();', "URL component navigation sink"],
    ['const meta = document.createElement("meta"); meta.httpEquiv = "refresh"; meta.content = "0;url=" + "ht" + "tps:" + "/" + "/evil.example"; document.head.append(meta);', "dynamic meta refresh"],
    ['const parsed = new DOMParser().parseFromString("<p>unsafe</p>", "text/html"); document.body.append(parsed.body);', "DOM parser injection"],
    ['document.body.style.backgroundImage = "url(ht" + "tps://evil.example/a.png)";', "runtime CSS resource injection"],
    ['new Audio("ht" + "tps:" + "/" + "/evil.example/a.mp3")', "audio resource constructor"],
    ['CSS.paintWorklet.addModule("ht" + "tps:" + "/" + "/evil.example/worklet.js")', "worklet resource loader"],
    ['navigation.navigate("ht" + "tps:" + "/" + "/evil.example")', "Navigation API"],
    ['document.querySelector("main").setHTMLUnsafe("<p>unsafe</p>")', "modern HTML injection sink"],
    ['const input = document.querySelector("input"); input.type = "file"; input.click(); input.files[0].text();', "runtime file picker mutation"],
    ['require("child_process").exec("whoami"); process.env.SECRET', "Node server globals"],
    ['const link = document.querySelector("a"); const { setAttribute: setter } = link; link.setter = setter; link.setter("href", "ht" + "tps:" + "/" + "/evil.example"); link.click();', "destructured navigation sink"],
    ['const link = document.querySelector("a"); const result = document.evaluate("//a/@href", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null); result.singleNodeValue.value = "ht" + "tps:" + "/" + "/evil.example"; link.click();', "XPath attribute navigation sink"],
    ['const link = document.querySelector("a"); const setter = link.__lookupSetter__("href"); link.setter = setter; link.setter("ht" + "tps:" + "/" + "/evil.example"); link.click();', "legacy reflected navigation sink"],
    ['new webkitRTCPeerConnection()', "WebRTC vendor alias"],
    ['localStorage.setItem("x", "y")', "storage"],
    ['window.location = "/other.html"', "external navigation"],
  ]) {
    const expectedCode = label === "dynamic import"
      ? "js.module_or_dynamic_code"
      : label === "external navigation" || label === "computed fetch" || label === "computed external navigation" || label === "global enumeration" || label === "namespace navigation sink" || label === "attribute-node navigation sink" || label === "URL component navigation sink" || label === "dynamic meta refresh" || label === "runtime CSS resource injection" || label === "worklet resource loader" || label === "modern HTML injection sink" || label === "runtime file picker mutation" || label === "destructured navigation sink" || label === "legacy reflected navigation sink"
        ? "js.member_forbidden"
        : "js.api_forbidden";
    assertIssue(output(bundle([htmlFile(baseHtml({ body: '<script src="app.js" defer></script>' })), { path: "app.js", mediaType: "text/javascript", content: source }])), expectedCode, `dangerous JavaScript ${label} is rejected`);
  }
  for (const [source, label] of [
    ["//# sourceMappingURL=https://evil.example/app.js.map", "external line source-map directive"],
    ["/*# sourceMappingURL=data:application/json;base64,e30= */", "data-URL block source-map directive"],
    ["/* ordinary author comment */ const value = 1;", "ordinary JavaScript comment"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.comment_forbidden"),
      `${label} is rejected directly through Acorn comment collection`
    );
    assertIssue(output(scriptBundle(source)), "js.comment_forbidden", `${label} cannot reach preview`);
  }
  const commentLikeLiteralIssues = codeValidationModule.validateCreatorJavaScript("app.js", 'const note = "/* not a comment */";');
  assert(
    !commentLikeLiteralIssues.some((issue) => issue.code === "js.comment_forbidden"),
    "comment-like characters inside a parsed string literal are not misclassified as an AST comment"
  );
  const deepAst = `const nested = ${"[".repeat(300)}0${"]".repeat(300)};`;
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<script src="app.js" defer></script>' })), { path: "app.js", mediaType: "text/javascript", content: deepAst }])), "js.ast_complexity", "deep JavaScript ASTs fail with one stable bounded issue");
  for (const [source, label] of [
    ["while (1) {}", "numeric truthy while loop"],
    ['while ("x") {}', "string truthy while loop"],
    ["do {} while (1);", "numeric truthy do-while loop"],
    ["for (; 1 ;) {}", "numeric truthy for loop"],
    ["while (true) {}", "boolean truthy while loop"],
    ["for (;;) {}", "test-free for loop"],
    ["while (-1) {}", "unary numeric truthy while loop"],
    ["while (1 === 1) {}", "constant comparison truthy while loop"],
    ["do {} while (+1);", "unary numeric truthy do-while loop"],
    ["for (; 1 + 1 ;) {}", "constant arithmetic truthy for loop"],
  ]) {
    assertIssue(output(bundle([htmlFile(baseHtml({ body: '<script src="app.js" defer></script>' })), { path: "app.js", mediaType: "text/javascript", content: source }])), "js.obvious_infinite_loop", `${label} is rejected through AST semantics`);
  }
  for (const [source, label] of [
    ["for (let index = 0; index < 3; index += 1) {}", "ascending exclusive bounded for loop"],
    ["for (let index = 3; index >= 0; index -= 1) {}", "descending inclusive bounded for loop"],
    ["for (let index = 0; index <= 6; index += 2) {}", "positive-step inclusive bounded for loop"],
    ["for (let row = 0; row < 10; row += 1) { for (let column = 0; column < 10; column += 1) {} }", "small nested bounded loop work"],
  ]) {
    assert(validateRaw(output(scriptBundle(source))).validation.valid, `${label} remains valid`);
  }
  const sequentialLoopSource = (count) => Array.from(
    { length: count },
    (_, index) => `for (let index${index} = 0; index${index} < 10000; index${index} += 1) {}`
  ).join("\n");
  const exactCumulativeLoopCeiling = sequentialLoopSource(10);
  assert(
    codeValidationModule.validateCreatorJavaScript("app.js", exactCumulativeLoopCeiling).length === 0,
    "sequential statically bounded loops at the exact aggregate work ceiling remain valid"
  );
  assert(
    validateRaw(output(scriptBundle(exactCumulativeLoopCeiling))).validation.valid,
    "full provider output accepts sequential bounded loops at the exact aggregate work ceiling"
  );
  const excessiveSequentialLoopWork = sequentialLoopSource(11);
  assert(
    codeValidationModule.validateCreatorJavaScript("app.js", excessiveSequentialLoopWork).some((issue) => issue.code === "js.excessive_cumulative_loop_work"),
    "direct AST validation sums statically visible work across sequential loops"
  );
  assertIssue(
    output(scriptBundle(excessiveSequentialLoopWork)),
    "js.excessive_cumulative_loop_work",
    "full provider output rejects sequential loops whose combined work exceeds the aggregate ceiling"
  );
  for (const [source, label] of [
    ["for (const index = 0; index < 1; index += 1) {}", "const loop counter that would throw on update"],
    ["let index = 0; for (index = 0; index < 1; index += 1) {}", "assignment-form loop initializer"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.loop_not_statically_bounded"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.loop_not_statically_bounded", `full provider output rejects ${label}`);
  }
  for (const [source, label] of [
    ['const button = document.querySelector("#hello"); for (let index = 0; index < 10000; index += 1) { button.classList.toggle("active"); }', "repeated class mutation"],
    ['const button = document.querySelector("#hello"); for (let index = 0; index < 10000; index += 1) { button.addEventListener("click", () => {}); }', "repeated event registration"],
    ['for (let index = 0; index < 10000; index += 1) { document.querySelector("#hello"); }', "repeated DOM query"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.loop_call_forbidden"),
      `direct AST validation rejects ${label} inside a loop`
    );
    assertIssue(output(scriptBundle(source)), "js.loop_call_forbidden", `full provider output rejects ${label} inside a loop`);
  }
  const lexicalEscapeCases = [
    ['function localOnly() { let ghost; } ghost = 1;', "function-local declaration used as a browser-global assignment"],
    ['function parameterOnly(ghost) {} ghost = 1;', "function parameter used as a browser-global assignment"],
    ['{ let ghost; } ghost = 1;', "block-local declaration used as a browser-global assignment"],
    ['function localOnly() { let ghost; } ghost++;', "function-local declaration used as a browser-global update"],
  ];
  for (const [source, label] of lexicalEscapeCases) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.identifier_reassignment_forbidden"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.identifier_reassignment_forbidden", `full provider output rejects ${label}`);
  }
  const globalBindingCases = [
    ['var onclick = () => {};', "classic-script var event-handler binding"],
    ['var name = "stored";', "classic-script var Window name storage binding"],
    ['var onload = () => { document.querySelector("#hello").textContent = "Loaded"; };', "classic-script var load-handler binding"],
    ['let onclick = () => {};', "lexical event-handler-shaped binding"],
  ];
  for (const [source, label] of globalBindingCases) {
    const directIssues = codeValidationModule.validateCreatorJavaScript("app.js", source);
    assert(
      directIssues.some((issue) => issue.code === "js.var_declaration_forbidden" || issue.code === "js.global_binding_forbidden"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(
      output(scriptBundle(source)),
      source.startsWith("var ") ? "js.var_declaration_forbidden" : "js.global_binding_forbidden",
      `full provider output rejects ${label}`
    );
  }
  const reservedBindingCases = [
    ['const undefined = true; while (undefined) {}', "undefined binding hiding a constant-truthy loop"],
    ['const NaN = 1; while (NaN) {}', "NaN binding hiding a constant-truthy loop"],
    ['const Infinity = 0;', "Infinity evaluator binding"],
    ['const document = null; const button = document.querySelector("#hello"); button.addEventListener("click", () => {});', "document receiver shadowing"],
    ['function handler(undefined) { while (undefined) {} } document.querySelector("#hello").addEventListener("click", handler);', "event parameter hiding a constant-truthy loop"],
  ];
  for (const [source, label] of reservedBindingCases) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.global_binding_forbidden"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.global_binding_forbidden", `full provider output rejects ${label}`);
  }
  for (const [source, label] of [
    ['try { null.value; } catch (undefined) { while (undefined) {} }', "catch binding shadowing undefined"],
    ['try { null.value; } catch (NaN) { while (NaN) {} }', "catch binding shadowing NaN"],
    ['try { null.value; } catch (document) { document.querySelector("#hello"); }', "catch binding shadowing document"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.exception_control_flow_forbidden"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.exception_control_flow_forbidden", `full provider output rejects ${label}`);
  }
  const nonThrowingSubsetCases = [
    ["null.value;", "js.member_access_forbidden", "member read from null"],
    ["const missingObject = null; missingObject.value;", "js.member_access_forbidden", "member read from a null local"],
    ['const button = document.querySelector("#hello"); button.missing.deep;', "js.member_access_forbidden", "unknown nested DOM member read"],
    ['const button = document.querySelector("#hello"); button.addEventListener("click", () => { null.value; });', "js.member_access_forbidden", "throwing member read inside an event callback"],
    ["debugger;", "js.debugger_forbidden", "debugger suspension"],
    ["missing;", "js.unresolved_identifier", "bare unresolved identifier"],
    ["const local = missing;", "js.unresolved_identifier", "unresolved initializer"],
    ["if (missing) {}", "js.unresolved_identifier", "unresolved conditional"],
    ["local; let local = 1;", "js.temporal_dead_zone", "lexical read before initialization"],
    ['"key" in null;', "js.relational_object_operator_forbidden", "throwing in operator"],
    ["1 instanceof null;", "js.relational_object_operator_forbidden", "throwing instanceof operator"],
  ];
  for (const [source, code, label] of nonThrowingSubsetCases) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === code),
      `direct AST and scope validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), code, `full provider output rejects ${label}`);
  }
  const nestedListenerCases = [
    ['const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.addEventListener("click", () => { button.classList.toggle("active"); }); });', "inline callback listener accumulation"],
    ['const button = document.querySelector("#hello"); function addNested() { button.addEventListener("click", () => {}); } button.addEventListener("click", addNested);', "named callback listener accumulation"],
  ];
  for (const [source, label] of nestedListenerCases) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.event_registration_nested"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.event_registration_nested", `full provider output rejects ${label}`);
  }
  for (const [source, label] of [
    ['const button = document.querySelector("#hello"); button.addEventListener("click", (button) => { button.classList.toggle("active"); });', "inline callback parameter shadowing a DOM binding"],
    ['const button = document.querySelector("#hello"); function handler(button) { button.textContent = "Done"; } button.addEventListener("click", handler);', "named callback parameter shadowing a DOM binding"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.dom_binding_invalid"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.dom_binding_invalid", `full provider output rejects ${label}`);
  }
  for (const [source, label] of [
    ['const button = document.querySelector("#hello"); button.addEventListener("click", (...button) => { button.classList.toggle("active"); });', "rest parameter target shadowing"],
    ['const button = document.querySelector("#hello"); button.addEventListener("click", (button = {}) => { button.classList.toggle("active"); });', "default parameter target shadowing"],
  ]) {
    assertIssue(output(scriptBundle(source)), "js.module_or_dynamic_code", `${label} is rejected as a complex binding pattern`);
  }
  for (const [source, label] of [
    ['let value = ""; const button = document.querySelector("#hello"); button.addEventListener("click", () => { value = value + "x"; });', "linear callback state accumulation"],
    ['let first = "", second = "x"; const button = document.querySelector("#hello"); button.addEventListener("click", () => { first = first + second; second = first + second; });', "Fibonacci callback state accumulation"],
    ['let first = "x", second = "x"; const button = document.querySelector("#hello"); button.addEventListener("click", () => { first = second + second; second = first + first; });', "cross-variable callback state amplification"],
  ]) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.identifier_reassignment_forbidden"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(output(scriptBundle(source)), "js.identifier_reassignment_forbidden", `full provider output rejects ${label}`);
  }
  const safeTopLevelListener = 'const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.classList.toggle("active"); });';
  assert(codeValidationModule.validateCreatorJavaScript("app.js", safeTopLevelListener).length === 0, "direct AST validation retains one top-level listener with bounded DOM mutation");
  assert(validateRaw(output(scriptBundle(safeTopLevelListener))).validation.valid, "full provider output retains one top-level listener with bounded DOM mutation");
  const duplicateTopLevelListener = 'const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.classList.toggle("active"); }); button.addEventListener("click", () => { button.classList.toggle("active"); });';
  assert(
    codeValidationModule.validateCreatorJavaScript("app.js", duplicateTopLevelListener).some((issue) => issue.code === "js.duplicate_event_listener"),
    "direct AST validation rejects a duplicate exact target and event listener"
  );
  assertIssue(output(scriptBundle(duplicateTopLevelListener)), "js.duplicate_event_listener", "full provider output rejects a duplicate exact target and event listener");
  const distinctTopLevelListeners = 'const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.classList.toggle("active"); }); button.addEventListener("keyup", () => { button.classList.toggle("keyboard-active"); });';
  assert(codeValidationModule.validateCreatorJavaScript("app.js", distinctTopLevelListeners).length === 0, "direct AST validation retains different literal events on one exact target");
  assert(validateRaw(output(scriptBundle(distinctTopLevelListeners))).validation.valid, "full provider output retains different literal events on one exact target");
  const domBackedStateCases = [
    ['const button = document.querySelector("#hello"); const field = document.querySelector("#field"); button.addEventListener("click", () => { field.value = field.value + field.value; });', "exponential input value accumulation"],
    ['const button = document.querySelector("#hello"); const notes = document.querySelector("#notes"); button.addEventListener("click", () => { notes.value = notes.value + "x"; });', "unbounded textarea value accumulation"],
    ['const button = document.querySelector("#hello"); const choice = document.querySelector("#choice"); button.addEventListener("click", () => { choice.checked = choice.checked; });', "DOM-backed checked-state reuse"],
    ['const button = document.querySelector("#hello"); button.addEventListener("click", () => { button.disabled = 1; });', "non-boolean disabled-state assignment"],
  ];
  const domBackedStateHtml = baseHtml({ body: '<button id="hello" type="button">Update</button><label for="field">Field</label><input id="field" type="text"><label for="notes">Notes</label><textarea id="notes"></textarea><label for="choice">Choice</label><input id="choice" type="checkbox">' });
  for (const [source, label] of domBackedStateCases) {
    assert(
      codeValidationModule.validateCreatorJavaScript("app.js", source).some((issue) => issue.code === "js.dom_mutation_value_invalid"),
      `direct AST validation rejects ${label}`
    );
    assertIssue(
      output(bundle([htmlFile(domBackedStateHtml.replace("</main>", '<script src="app.js" defer></script></main>')), { path: "app.js", mediaType: "text/javascript", content: source }])),
      "js.dom_mutation_value_invalid",
      `full provider output rejects ${label}`
    );
  }
  for (const [source, label] of [
    ["let index = 0; while (index < 3) { index += 1; }", "dynamic while loop"],
    ["let index = 0; do { index += 1; } while (index < 3);", "dynamic do-while loop"],
    ["for (let index = 0; index < limit; index += 1) {}", "unknown-bound for loop"],
    ["for (const key in object) {}", "for-in loop"],
    ["for (const value of values) {}", "for-of loop"],
  ]) {
    assertIssue(output(scriptBundle(source)), "js.loop_not_statically_bounded", `${label} is conservatively rejected without a validator-provable literal bound`);
  }
  for (const [source, label] of [
    ["async function load() { return 1; }", "async function declaration"],
    ["const load = async () => 1;", "async arrow function"],
    ["function* values() { yield 1; }", "generator function declaration"],
  ]) {
    assertIssue(output(scriptBundle(source)), "js.function_mode_forbidden", `${label} is rejected from the synchronous bounded script subset`);
  }
  const excessiveLoopLiteralWork = `for (let index = 0; index < 10000; index += 1) { const values = [${Array.from({ length: 1000 }, () => "0").join(",")}]; }`;
  for (const [source, code, label] of [
    ["while (new Date()) {}", "js.obvious_infinite_loop", "constructed-object truthy loop"],
    ["while (Infinity) {}", "js.obvious_infinite_loop", "Infinity truthy loop"],
    ["while (document) {}", "js.obvious_infinite_loop", "document truthy loop"],
    ["let keepGoing = false; while (keepGoing = 1) {}", "js.obvious_infinite_loop", "constant assignment truthy loop"],
    ["for (let index = 0; index < 10001; index += 1) {}", "js.excessive_static_loop", "excessive literal iteration bound"],
    ["for (let row = 0; row < 1000; row += 1) { for (let column = 0; column < 1000; column += 1) {} }", "js.excessive_nested_loop_work", "excessive nested literal loop work"],
    [excessiveLoopLiteralWork, "js.excessive_nested_loop_work", "excessive literal construction work inside a bounded loop"],
    ["const exact = 1n;", "js.bigint_forbidden", "BigInt literal arithmetic"],
    ['let text = "x"; text += text;', "js.self_amplifying_assignment", "self-amplifying compound assignment"],
    ['let first = "x", second = "y"; first += second; second += first;', "js.assignment_form_forbidden", "cross-variable compound string amplification"],
    ['let previous = "x"; let temporary; let expanded = (temporary = previous + previous, temporary);', "js.assignment_form_forbidden", "nested sequence assignment amplification"],
    ['let text = "x"; text = text + text;', "js.self_amplifying_assignment", "self-amplifying binary assignment"],
    ["function recurse() { recurse(); } recurse();", "js.recursion_forbidden", "direct named recursion"],
    ["function left() { right(); } function right() { left(); } left();", "js.recursion_forbidden", "mutual named recursion"],
    ["Promise.resolve().then(() => {});", "js.api_forbidden", "promise microtask scheduling"],
    ["new Array(1000000000);", "js.constructor_forbidden", "huge array construction"],
    ["const pattern = /x+/;", "js.regex_forbidden", "regular expression execution"],
    ["speechSynthesis.speak(message);", "js.api_forbidden", "speech synthesis"],
    ["document.querySelector(\"#hello\").remove();", "js.member_forbidden", "destructive DOM removal"],
    ["requestIdleCallback(() => {});", "js.api_forbidden", "idle callback scheduling"],
    ["setImmediate(() => {});", "js.api_forbidden", "setImmediate background scheduling"],
    ["scheduler.postTask(() => {});", "js.api_forbidden", "scheduler task queuing"],
    ['document.querySelector("#hello").click();', "js.member_forbidden", "recursive click dispatch"],
    ['document.querySelector("form").submit();', "js.member_forbidden", "recursive form submission"],
    ['document.querySelector("#hello").dispatchEvent(event);', "js.member_forbidden", "recursive synthetic event dispatch"],
    ['const values = [1, 2].concat([3, 4]);', "js.member_forbidden", "high-amplification concat"],
    ['const text = ["a", "b"].join("");', "js.member_forbidden", "high-amplification join"],
    ['const text = "x".replaceAll("x", "xx");', "js.member_forbidden", "high-amplification replaceAll"],
    ['const total = [1, 2].reduce((sum, value) => sum + value, 0);', "js.member_forbidden", "high-amplification reduce"],
    ["class View { update() {} }", "js.module_or_dynamic_code", "class declaration"],
    ["const values = [...items];", "js.module_or_dynamic_code", "spread expansion"],
    ["const handlers = { click() {} };", "js.function_container_forbidden", "object method container"],
    ["const handlers = { get value() { return 1; } };", "js.function_container_forbidden", "object accessor container"],
    ["const handlers = { click: () => {} };", "js.function_container_forbidden", "function-valued object property"],
    ["const amplified = 2 ** 32;", "js.exponentiation_forbidden", "runtime exponentiation"],
    ["function update() { const again = update; again(); } update();", "js.recursion_forbidden", "function-alias recursion"],
    ["function update() { arguments.callee(); } update();", "js.api_forbidden", "arguments callee recursion"],
    ['let text = "x"; for (let index = 0; index < 10; index += 1) { text = text + text + text; }', "js.self_amplifying_assignment", "multi-operand self-amplifying string assignment"],
    ["let value = BigInt(2); value *= value;", "js.api_forbidden", "BigInt constructor and squaring"],
    ['const found = "aaaa".match("(a+)+$");', "js.member_forbidden", "implicit regular-expression compilation through match"],
    ['const found = "aaaa".search("(a+)+$");', "js.member_forbidden", "implicit regular-expression compilation through search"],
    ["const box = {}; function update() { box.update(); } box.update = update; update();", "js.function_container_forbidden", "member-held recursive function"],
    ["function work() { for (let inner = 0; inner < 10000; inner += 1) { Math.sin(inner); } } for (let outer = 0; outer < 10000; outer += 1) { work(); }", "js.user_function_call_forbidden", "call-expanded loop work"],
    ["for (let index = 0; index < 10; index += 1) { index = 0; }", "js.loop_mutation_forbidden", "loop-counter assignment reset"],
    ["for (let index = 0; index < 10; index += 1) { --index; }", "js.loop_mutation_forbidden", "loop-counter decrement reset"],
    ["for (let index = 9000000000000000; index < 9000000000000001; index += 0.1) {}", "js.excessive_static_loop", "IEEE-754 fractional-step stagnation"],
    ["for (let index = 10000000000000000; index < 10000000000000002; index += 1) {}", "js.excessive_static_loop", "IEEE-754 integer-step stagnation"],
    ['let first = "x", second = "y"; for (let index = 0; index < 100; index += 1) { const next = first + second; first = second; second = next; }', "js.loop_mutation_forbidden", "cross-variable Fibonacci string amplification"],
    ['let text = ""; for (let index = 0; index < 10000; index += 1) { text += "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; }', "js.loop_mutation_forbidden", "large linear loop accumulation"],
    ["function work() { for (let inner = 0; inner < 10000; inner += 1) {} } for (let outer = 0; outer < 10000; outer += 1) { [1].forEach(work); }", "js.member_forbidden", "higher-order call-expanded work"],
    ["function invoke(callback) { callback(callback); } invoke(invoke);", "js.user_function_call_forbidden", "higher-order self invocation"],
    ['const heading = document.querySelector("h1"); heading.parentNode.removeChild(heading);', "js.member_forbidden", "parent-node structural removal"],
    ['document.querySelector("h1").outerText = "gone";', "js.member_forbidden", "outerText semantic replacement"],
    ['document.querySelector("html").removeAttribute("lang");', "js.member_forbidden", "language attribute removal"],
    ['document.querySelector("h1").toggleAttribute("hidden");', "js.member_forbidden", "hidden attribute toggle"],
    ['document.querySelector("h1").hidden = true;', "js.member_forbidden", "hidden semantic property write"],
    ['document.querySelector("main").ariaHidden = "true";', "js.member_forbidden", "ARIA visibility property write"],
    ['document.querySelector("main").role = "presentation";', "js.member_forbidden", "role mutation"],
    ['document.querySelector("button").tabIndex = -1;', "js.member_forbidden", "keyboard-order mutation"],
    ['const range = document.createRange(); range.selectNode(document.querySelector("h1")); range.deleteContents();', "js.member_forbidden", "Range structural deletion"],
    ['document.getSelection().deleteFromDocument();', "js.member_forbidden", "Selection structural deletion"],
    ['function update() { [update][0](); } document.querySelector("#hello").addEventListener("click", update);', "js.user_function_call_forbidden", "array-held event-callback recursion"],
    ['function update() { (0, update)(); } document.querySelector("#hello").addEventListener("click", update);', "js.user_function_call_forbidden", "sequence-expression event-callback recursion"],
    ['function update() { (true ? update : update)(); } document.querySelector("#hello").addEventListener("click", update);', "js.user_function_call_forbidden", "conditional event-callback recursion"],
    ['let again; function update() { (again = update)(); } document.querySelector("#hello").addEventListener("click", update);', "js.user_function_call_forbidden", "assignment-callee event-callback recursion"],
    ['function update() { update``; } document.querySelector("#hello").addEventListener("click", update);', "js.module_or_dynamic_code", "tagged-template event-callback recursion"],
    ['function update() { (0, update)``; } document.querySelector("#hello").addEventListener("click", update);', "js.module_or_dynamic_code", "sequence tagged-template event-callback recursion"],
    ['let update; update = () => update(); document.querySelector("#hello").addEventListener("click", update);', "js.function_container_forbidden", "post-declaration recursive callback assignment"],
    ['let update = null; update = () => update(); document.querySelector("#hello").addEventListener("click", update);', "js.function_container_forbidden", "null-initialized recursive callback assignment"],
    ['let left; let right; left = () => right(); right = () => left(); document.querySelector("#hello").addEventListener("click", left);', "js.function_container_forbidden", "mutual post-declaration callback assignment"],
    ['const [first] = ["value"];', "js.module_or_dynamic_code", "destructured binding outside the unambiguous static subset"],
    ['throw "boom";', "js.throw_forbidden", "explicit load-time exception"],
    ['document.querySelector("[").textContent = "Broken";', "js.selector_invalid", "syntactically invalid selector"],
    ['document.querySelector("button").textContent = "Wrong selector shape";', "js.selector_invalid", "non-ID selector outside the exact DOM contract"],
    ['document.querySelector("#missing").textContent = "Missing";', "js.selector_unresolved", "selector missing from validated HTML"],
    ['document.querySelector("#hello").classList.add("two words");', "js.dom_token_invalid", "invalid multi-token classList argument"],
    ['const q = document.querySelector; q("#hello");', "js.dom_method_extraction", "extracted document query method"],
    ['document.styleSheets[0].disabled = true;', "js.dom_target_unbound", "CSSOM stylesheet disable mutation"],
    ['document.querySelector("#hello").classList.value = "ready";', "js.dom_target_unbound", "classList value assignment bypass"],
    ['let target = document.querySelector("#hello"); target = document.querySelector("#missing"); target.textContent = "Gone";', "js.dom_binding_invalid", "reassigned DOM target binding"],
    ['{ const target = document.querySelector("#missing"); target.textContent = "Gone"; } const target = document.querySelector("#hello");', "js.dom_binding_invalid", "shadowed DOM target binding"],
    ['function update() { const target = document.querySelector("#missing"); target.textContent = "Gone"; } const target = document.querySelector("#hello"); target.addEventListener("click", update);', "js.dom_binding_invalid", "function-local DOM target shadowing"],
    ['const target = document.querySelector("#hello"); target = document.querySelector("#missing"); target.addEventListener("click", () => {});', "js.dom_binding_invalid", "event target reassignment"],
    ['const notCallback = 1; document.querySelector("#hello").addEventListener("click", notCallback);', "js.event_contract_invalid", "non-callable event listener identifier"],
    ['function handler() {} handler = 1; document.querySelector("#hello").addEventListener("click", handler);', "js.event_contract_invalid", "reassigned named event callback"],
    ['function handler() { document.querySelector("#hello").textContent = "Loaded"; } onload = handler;', "js.identifier_reassignment_forbidden", "global load-handler assignment"],
    ['function handler() { document.querySelector("#hello").textContent = "Loaded"; } onclick = handler;', "js.identifier_reassignment_forbidden", "global click-handler assignment"],
    ['name = "stored";', "js.identifier_reassignment_forbidden", "window.name storage assignment"],
    ['creatorState = "stored";', "js.identifier_reassignment_forbidden", "arbitrary implicit browser-global assignment"],
  ]) {
    assertIssue(output(scriptBundle(source)), code, `${label} is rejected deterministically without executing generated JavaScript`);
  }
  assert(validateRaw(output(scriptBundle('document.querySelector("#hello").classList.remove("pending");'))).validation.valid, "safe classList.remove remains available without permitting destructive element removal");
  assert(validateRaw(output(scriptBundle('function updateLabel() { document.querySelector("#hello").textContent = "Updated"; } document.querySelector("#hello").addEventListener("click", updateLabel);'))).validation.valid, "named non-recursive DOM event function remains valid");
  assert(validateRaw(output(scriptBundle('document.querySelector("#hello").addEventListener("click", () => { document.querySelector("#hello").textContent = "Updated"; });'))).validation.valid, "direct non-recursive event arrow callback remains valid");
  assert(validateRaw(output(scriptBundle('function updateLabel() { document.querySelector("#hello").textContent = "Updated"; } const handler = updateLabel; document.querySelector("#hello").addEventListener("click", handler);'))).validation.valid, "non-recursive named function aliases remain valid event handlers");
  assertIssue(output(scriptBundle('let text = "x"; text = text + "y"; document.querySelector("#hello").textContent = text;')), "js.dom_mutation_value_invalid", "dynamic accessible-name replacement is rejected even when its string work is otherwise bounded");
  assert(validateRaw(output(bundle([
    htmlFile(baseHtml({ body: '<button id="hello" type="button">Say hello</button><label for="value-field">Value</label><input id="value-field" type="text"><label for="toggle-field">Toggle</label><input id="toggle-field" type="checkbox"><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: 'const button = document.querySelector("#hello"); const valueField = document.querySelector("#value-field"); const toggleField = document.querySelector("#toggle-field"); button.textContent = "Ready"; button.disabled = false; valueField.value = "ready"; valueField.disabled = false; toggleField.checked = true; button.classList.add("ready"); button.classList.remove("pending"); button.classList.toggle("active");' },
  ]))).validation.valid, "exact literal text, typed value/checked/disabled, and classList mutations remain valid");
  for (const [body, source, code, label] of [
    ['<main id="replace-target"><h2>Protected child</h2></main><script src="app.js" defer></script>', 'document.querySelector("#replace-target").textContent = "Gone";', "js.dom_mutation_target_invalid", "container descendant deletion"],
    ['<button id="hello" type="button">Say hello</button><script src="app.js" defer></script>', 'document.querySelector("#hello").textContent = "";', "js.dom_mutation_value_invalid", "empty button accessible-name replacement"],
    ['<label id="label-target" for="field">Field</label><input id="field" type="text"><script src="app.js" defer></script>', 'document.querySelector("#label-target").textContent = "Changed";', "js.dom_mutation_target_invalid", "label accessible-name mutation"],
  ]) {
    assertIssue(output(bundle([htmlFile(baseHtml({ body })), { path: "app.js", mediaType: "text/javascript", content: source }])), code, `${label} is rejected before preview`);
  }
  for (const [html, source, label] of [
    [baseHtml({ body: '<script src="app.js" defer></script>' }).replace("<h1>D2 Builder Site</h1>", '<h1 id="heading-target">D2 Builder Site</h1>'), 'document.querySelector("#heading-target").textContent = "Changed";', "required h1 name mutation"],
    [baseHtml({ body: '<script src="app.js" defer></script>' }).replace("<title>D2 Builder Site</title>", '<title id="title-target">D2 Builder Site</title>'), 'document.querySelector("#title-target").textContent = "Changed";', "required title name mutation"],
  ]) {
    assertIssue(output(bundle([htmlFile(html), { path: "app.js", mediaType: "text/javascript", content: source }])), "js.dom_mutation_target_invalid", `${label} is rejected before preview`);
  }
  assertIssue(output(bundle([
    htmlFile(baseHtml({ body: '<link id="local-style" rel="stylesheet" href="styles.css"><button id="hello" type="button">Hello</button><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: 'document.querySelector("#local-style").disabled = true;' },
    { path: "styles.css", mediaType: "text/css", content: "button { color: #123456; }" },
  ])), "js.dom_mutation_target_invalid", "resource element disabled mutation is rejected by HTML target typing");
  assertIssue(output(bundle([
    htmlFile(baseHtml({ body: '<button id="hello" type="button">Hello</button><script src="app.js" defer></script><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: "const state = 1;" },
  ])), "js.duplicate_load", "the same classic script cannot execute twice in one HTML global environment");
  assertIssue(output(bundle([
    htmlFile(baseHtml({ body: '<button id="hello" type="button">Hello</button><script src="app.js" defer></script><script src="b.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: "const state = 1;" },
    { path: "b.js", mediaType: "text/javascript", content: "const state = 2;" },
  ])), "js.multiple_files_forbidden", "multiple classic scripts cannot create cross-file lexical or callable ambiguity");
  assert(validateRaw(output(bundle([
    htmlFile(baseHtml({ body: '<button id="hello" type="button">Hello</button><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: 'document.querySelector("#hello").classList.add("ready");' },
    { path: "second.html", mediaType: "text/html", content: baseHtml({ body: '<button id="hello" type="button">Second</button><script src="app.js" defer></script>' }) },
  ]))).validation.valid, "one script may be referenced once by each separate HTML document when every exact target resolves");
  const staticStringExpansion = ["const value0 = 'x';", ...Array.from({ length: 40 }, (_, index) => `const value${index + 1} = value${index} + value${index};`)].join("\n");
  const staticContainerExpansion = ["const value0 = ['x'];", ...Array.from({ length: 40 }, (_, index) => `const value${index + 1} = [value${index}, value${index}];`)].join("\n");
  const logicalAndExpansion = ["let value0 = 'x';", ...Array.from({ length: 30 }, (_, index) => `let value${index + 1} = true && (value${index} + value${index});`)].join("\n");
  const nullishExpansion = ["let value0 = 'x';", ...Array.from({ length: 30 }, (_, index) => `let value${index + 1} = null ?? (value${index} + value${index});`)].join("\n");
  assertIssue(output(scriptBundle(staticStringExpansion)), "js.static_value_amplification", "tiny-source exponential string declaration expansion is rejected before preview");
  assertIssue(output(scriptBundle(`${staticContainerExpansion}\ndocument.querySelector("#hello").textContent = value40;`)), "js.static_value_amplification", "tiny-source shared-container expansion and implicit DOM coercion are rejected before preview");
  assertIssue(output(scriptBundle(`${staticContainerExpansion}\nconst output = JSON.stringify(value40);`)), "js.static_value_amplification", "shared-container JSON serialization cannot cross the static expansion ceiling");
  assertIssue(output(scriptBundle(logicalAndExpansion)), "js.static_value_amplification", "logical-AND alias expansion is included in the static work ceiling");
  assertIssue(output(scriptBundle(nullishExpansion)), "js.static_value_amplification", "nullish alias expansion is included in the static work ceiling");
  assert(validateRaw(output(scriptBundle('const labels = ["one", "two", "three"]; document.querySelector("#hello").textContent = "Ready";'))).validation.valid, "small flat local literals remain valid without container coercion");
  const boundedLoopLiteralWork = `for (let index = 0; index < 100; index += 1) { const values = [${Array.from({ length: 100 }, () => "0").join(",")}]; }`;
  assert(codeValidationModule.validateCreatorJavaScript("app.js", boundedLoopLiteralWork).length === 0, "direct AST validation accepts bounded loop iterations multiplied by small literal body work");
  assert(validateRaw(output(scriptBundle(boundedLoopLiteralWork))).validation.valid, "full provider output accepts bounded loop iterations and body work below the aggregate ceiling");

  for (const [html, code, label] of [
    [baseHtml({ body: "<section />" }), "html.syntax_subset", "self-closing non-void element"],
    [`text${baseHtml()}`, "html.syntax_subset", "non-whitespace text before the document root"],
    [`${baseHtml()}text`, "html.syntax_subset", "non-whitespace text after the document root"],
    [`${baseHtml()}<html lang="en"><head><title>Second</title></head><body><main><h1>Second</h1></main></body></html>`, "html.syntax_subset", "multiple top-level HTML roots"],
    [baseHtml().replace("<title>D2 Builder Site</title>", "<title>D2 <span>Builder</span></title>"), "html.syntax_subset", "markup nested inside title raw-text content"],
    [baseHtml({ body: "<textarea aria-label=\"Notes\"><strong>Unsafe</strong></textarea>" }), "html.syntax_subset", "markup nested inside textarea raw-text content"],
    [baseHtml({ body: "<select aria-label=\"Choice\"><div>Unsafe</div></select>" }), "html.syntax_subset", "non-option content nested inside select"],
    [baseHtml().replace("</head><body>", "</head>reparented text<body>"), "html.syntax_subset", "non-whitespace text directly under the document root"],
    [baseHtml().replace("</body></html>", "</body>reparented text</html>"), "html.syntax_subset", "trailing non-whitespace text directly under the document root"],
    [baseHtml().replace("<title>D2 Builder Site</title>", "head text<title>D2 Builder Site</title>"), "html.syntax_subset", "non-whitespace text directly under head"],
    [baseHtml().replace("<title>D2 Builder Site</title>", "<p>Body content in head</p><title>D2 Builder Site</title>"), "html.syntax_subset", "body-content element directly under head"],
    [baseHtml({ body: "<ul>direct text<li>Item</li></ul>" }), "html.syntax_subset", "non-whitespace text directly under a structural list parent"],
    [baseHtml({ body: "<table>direct text<caption>Title</caption><thead><tr><th scope=\"col\">Name</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></table>" }), "html.syntax_subset", "non-whitespace text directly under a structural table parent"],
    [baseHtml({ body: "<details>leading text<summary>More</summary><p>Details</p></details>" }), "a11y.details_summary", "non-whitespace text before the first disclosure summary"],
    [baseHtml({ body: "<fieldset>leading text<legend>Settings</legend><label for=\"field-leading\">Field</label><input id=\"field-leading\" type=\"text\"></fieldset>" }), "a11y.semantic_group_invalid", "non-whitespace text before the first fieldset legend"],
    [baseHtml({ body: "<p>before<div>inside</div>after</p>" }), "html.syntax_subset", "block descendant that browsers reparent out of a paragraph"],
    [baseHtml({ body: "<p>outer<p>inner</p>end</p>" }), "html.syntax_subset", "nested paragraph that triggers implicit browser closure"],
    [baseHtml({ body: "<h2>two<h3>three</h3>end</h2>" }), "html.syntax_subset", "nested heading that violates phrasing-only heading content"],
    ['<!doctype html><html lang="en"><body><title>Wrong</title><main><h1>Wrong</h1></main></body><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head></html>', "html.document_topology", "head/body order and title-parent mismatch"],
    [baseHtml().replace("<body>", "<body hidden>"), "a11y.required_semantics_hidden", "hidden required body"],
    [baseHtml().replace("<main>", '<main aria-hidden="true">'), "a11y.required_semantics_hidden", "aria-hidden required main"],
    [baseHtml().replace("<h1>", '<h1 role="presentation">'), "a11y.required_semantics_hidden", "role-overridden primary heading"],
    [baseHtml().replace("<main>", "<details><main>").replace("</main>", "</main></details>"), "a11y.required_semantics_hidden", "required content inside collapsed details"],
    [baseHtml({ body: '<label for="named"><span hidden>Hidden label</span></label><input id="named" type="text">' }), "a11y.control_label", "hidden-only explicit control label"],
    [baseHtml({ body: '<button type="button"><span hidden>Hidden button name</span></button>' }), "a11y.button_name", "hidden-only button text"],
    [baseHtml({ body: '<a href="#target"><span hidden>Hidden link name</span></a><section id="target"><h2>Target</h2></section>' }), "a11y.link_name", "hidden-only link text"],
    [baseHtml({ body: '<button type="button" aria-hidden="true">Hidden interaction</button>' }), "a11y.interactive_hidden", "assistive-technology-hidden interactive control"],
    [baseHtml({ body: '<button type="button" role="heading">Wrong role</button>' }), "a11y.role_invalid", "native button semantics overridden by ARIA role"],
    [baseHtml({ body: '<div role="button" tabindex="0">Synthetic control</div>' }), "a11y.role_invalid", "synthetic interactive role without native keyboard semantics"],
    [baseHtml({ body: '<button type="button" tabindex="1">Positive order</button>' }), "a11y.keyboard_order", "positive tabindex keyboard-order override"],
    [baseHtml({ body: '<div tabindex="0">Synthetic tab stop</div>' }), "a11y.keyboard_order", "non-native synthetic tab stop"],
    [baseHtml({ body: '<button type="button" aria-hidden="yes">Invalid ARIA</button>' }), "a11y.aria_value_invalid", "invalid aria-hidden boolean"],
    [baseHtml({ body: '<span id="empty-name"></span><button type="button" aria-labelledby="empty-name">Visible fallback</button>' }), "a11y.name_override_forbidden", "empty referenced button name override"],
    [baseHtml({ body: '<button type="button" aria-labelledby="missing-name">Visible fallback</button>' }), "a11y.name_override_forbidden", "missing referenced button name override"],
    [baseHtml({ body: '<label for="named-control">Visible label</label><span id="empty-control-name"></span><input id="named-control" type="text" aria-labelledby="empty-control-name">' }), "a11y.name_override_forbidden", "native control label overridden by an empty reference"],
    [baseHtml().replace("<h1>D2 Builder Site</h1>", '<span id="empty-heading-name"></span><h1 aria-labelledby="empty-heading-name">D2 Builder Site</h1>'), "a11y.name_override_forbidden", "primary heading name overridden by an empty reference"],
    [baseHtml({ body: '<button type="button" aria-label="\u200B">Visible fallback</button>' }), "a11y.aria_name_invalid", "invisible aria-label overriding visible button text"],
    [baseHtml({ body: '<button type="button" aria-disabled="true">Enabled action</button>' }), "html.attribute_forbidden", "ARIA disabled state contradicting an enabled native button"],
    [baseHtml({ body: '<label for="checked-state">State</label><input id="checked-state" type="checkbox" checked aria-checked="false">' }), "html.attribute_forbidden", "ARIA checked state contradicting a native checkbox"],
    [baseHtml({ body: '<button type="button" aria-braillelabel="\u200B">Visible action</button>' }), "html.attribute_forbidden", "blank braille-name override outside the exact ARIA subset"],
    [baseHtml({ body: '<p role="status" aria-live="banana">Ready</p>' }), "a11y.aria_value_invalid", "invalid live-region politeness value"],
    [baseHtml({ body: '<button type="button" aria-describedby="missing-description">Action</button>' }), "a11y.aria_reference_invalid", "missing visible description reference"],
    [baseHtml({ body: '<p id="hidden-description" hidden>Unavailable</p><button type="button" aria-describedby="hidden-description">Action</button>' }), "a11y.aria_reference_invalid", "hidden description reference"],
    [baseHtml({ body: '<p id="duplicate-description">First</p><p id="duplicate-description">Second</p><button type="button" aria-describedby="duplicate-description">Action</button>' }), "a11y.aria_reference_invalid", "ambiguous duplicate description reference"],
    [baseHtml({ body: '<button type="button">Outer<button type="button">Inner</button></button>' }), "html.syntax_subset", "button nested inside button"],
    [baseHtml({ body: '<button type="button">Outer<input type="text" aria-label="Nested"></button>' }), "html.syntax_subset", "interactive input nested inside button"],
    [baseHtml({ body: '<button type="button">Outer<details><summary>More</summary><p>Nested disclosure</p></details></button>' }), "html.syntax_subset", "interactive details disclosure nested inside button"],
    [baseHtml({ body: '<a href="#target">Outer<button type="button">Nested</button></a><section id="target"><h2>Target</h2></section>' }), "html.syntax_subset", "button nested inside anchor"],
    [baseHtml({ body: '<a href="#target">Outer<details><summary>More</summary><p>Nested disclosure</p></details></a><section id="target"><h2>Target</h2></section>' }), "html.syntax_subset", "interactive details disclosure nested inside anchor"],
    [baseHtml({ body: '<a href="#target">Outer<a href="#target">Nested</a></a><section id="target"><h2>Target</h2></section>' }), "html.syntax_subset", "anchor nested inside anchor"],
    [baseHtml({ body: '<form><label for="outer">Outer</label><input id="outer" type="text"><form><button type="button">Nested</button></form></form>' }), "html.syntax_subset", "form nested inside form"],
    [baseHtml({ body: '<label>Outer<label>Nested<input type="text"></label></label>' }), "html.syntax_subset", "label nested inside label"],
    [baseHtml({ body: '<label>Name <input id="first" type="text"><input id="second" type="text"></label>' }), "a11y.label_ambiguous", "one implicit label wrapping multiple controls"],
    [baseHtml({ body: '<label for="first">Name <input id="second" type="text"></label><input id="first" type="text">' }), "a11y.label_ambiguous", "explicit label target conflicting with its nested control"],
    [baseHtml({ body: '<details><summary>More <button type="button">Do</button></summary><p>Details</p></details>' }), "html.syntax_subset", "button nested inside the disclosure summary control"],
    [baseHtml({ body: '<details><summary>More <a href="#target">Help</a></summary><p id="target">Details</p></details>' }), "html.syntax_subset", "link nested inside the disclosure summary control"],
    [baseHtml({ body: '<details><summary>More <input type="text" aria-label="Nested"></summary><p>Details</p></details>' }), "html.syntax_subset", "input nested inside the disclosure summary control"],
    [baseHtml({ body: '<label for="question">Question <a href="#help">Help</a></label><input id="question" type="text"><p id="help">Help</p>' }), "html.syntax_subset", "unrelated interactive link nested inside an explicit label"],
    [baseHtml({ body: '<label for="missing">Missing target</label><input id="actual" type="text" aria-label="Actual">' }), "a11y.label_ambiguous", "explicit label with no exact labelable target"],
    [baseHtml({ body: '<a>Missing destination</a>' }), "html.anchor_href_required", "anchor without a semantic local destination"],
    [baseHtml({ body: '<a tabindex="0">Still missing destination</a>' }), "html.anchor_href_required", "focusable anchor without a semantic local destination"],
    [baseHtml({ body: '<button>Implicit submit button</button>' }), "html.button_type_required", "button without an explicit safe type"],
    [baseHtml({ body: '<button type="submit">Submit</button>' }), "html.button_type_required", "submitting button type"],
    [baseHtml({ body: '<button type="wat">Unknown</button>' }), "html.button_type_required", "unknown button type"],
    [baseHtml({ body: '<form><label for="field">Field</label><input id="field" type="text"></form>' }), "html.form_forbidden", "implicit form submission context"],
    [baseHtml({ body: '<details><summary></summary><p>More</p></details>' }), "a11y.details_summary", "empty disclosure summary"],
    [baseHtml({ body: '<details><p>More</p></details>' }), "a11y.details_summary", "missing disclosure summary"],
    [baseHtml({ body: '<summary id="standalone-summary">Standalone action</summary>' }), "a11y.details_summary", "summary without an immediate details parent"],
    [baseHtml({ body: '<li>Orphan item</li>' }), "html.syntax_subset", "list item without an immediate list parent"],
    [baseHtml({ body: '<ul><p>Not an item</p></ul>' }), "html.syntax_subset", "non-item child under an unordered list"],
    [baseHtml({ body: '<dt>Orphan term</dt><dd>Orphan description</dd>' }), "html.syntax_subset", "description terms without an immediate description-list parent"],
    [baseHtml({ body: '<dl><p>Wrong child</p></dl>' }), "html.syntax_subset", "non-term child under a description list"],
    [baseHtml({ body: '<legend>Orphan group name</legend>' }), "html.syntax_subset", "legend without an immediate fieldset parent"],
    [baseHtml({ body: '<fieldset><label for="field-no-legend">Field</label><input id="field-no-legend" type="text"></fieldset>' }), "a11y.semantic_group_invalid", "fieldset without a first meaningful legend"],
    [baseHtml({ body: '<option value="orphan">Orphan option</option>' }), "html.syntax_subset", "option without an immediate select parent"],
    [baseHtml({ body: '<label for="empty-select">Choice</label><select id="empty-select"></select>' }), "a11y.semantic_group_invalid", "labelled select without any options"],
    [baseHtml({ body: '<label for="blank-select">Choice</label><select id="blank-select"><option value="blank">   </option></select>' }), "a11y.semantic_group_invalid", "labelled select with a blank option"],
    [baseHtml({ body: '<caption>Orphan caption</caption>' }), "html.syntax_subset", "caption without an immediate table parent"],
    [baseHtml({ body: '<tr><td>Orphan cell</td></tr>' }), "html.syntax_subset", "table row without an immediate table section parent"],
    [baseHtml({ body: '<table><tbody><tr><td>Cell only</td></tr></tbody></table>' }), "a11y.table_structure", "data table without caption or scoped headers"],
    [baseHtml({ body: '<table><caption>Scores</caption><thead><tr><th>Name</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></table>' }), "a11y.table_structure", "table header without an exact scope"],
    [baseHtml({ body: '<table><caption>Scores</caption><thead><tr><th scope="col">Name</th><th scope="col">Score</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></table>' }), "a11y.table_structure", "table body row with fewer cells than its header"],
    [baseHtml({ body: '<table><caption>Scores</caption><thead><tr><th scope="col" colspan="2">Combined</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></table>' }), "html.attribute_forbidden", "table span outside the exact equal-column topology"],
    [baseHtml({ body: '<nav><a href="#one">One</a></nav><nav><a href="#two">Two</a></nav><section id="one"><h2>One</h2></section><section id="two"><h2>Two</h2></section>' }), "a11y.landmark_ambiguous", "multiple indistinguishable navigation landmarks"],
    [baseHtml().replace('<html lang="en">', '<html lang="x">'), "a11y.language_invalid", "one-letter language subtag"],
    [baseHtml().replace('<html lang="en">', '<html lang="123">'), "a11y.language_invalid", "numeric-only primary language subtag"],
    [baseHtml().replace('<html lang="en">', '<html lang="@@@">'), "a11y.language_invalid", "punctuation-only language tag"],
    [baseHtml().replace('<html lang="en">', '<html lang="en_US">'), "a11y.language_invalid", "underscore-separated language tag"],
    [baseHtml().replace('<html lang="en">', '<html lang="ar" dir="@@@">'), "a11y.direction_invalid", "punctuation-only text direction"],
    [baseHtml().replace('<html lang="en">', '<html lang="ar" dir="sideways">'), "a11y.direction_invalid", "unknown text direction keyword"],
    [baseHtml({ body: '<progress max="100" value="30"></progress>' }), "a11y.control_label", "unnamed progress range"],
    [baseHtml({ body: '<meter min="0" max="1" value=".5"></meter>' }), "a11y.control_label", "unnamed meter range"],
    [baseHtml({ body: '<img src="icon.svg" alt=" " />' }), "a11y.image_alt", "whitespace-only image alternative text"],
    [baseHtml({ body: '<img src="icon.svg" alt="" role="img" />' }), "a11y.image_alt", "unnamed exposed image role"],
    [baseHtml().replace("<title>D2 Builder Site</title>", "<title>\u200B</title>"), "a11y.names_required", "literal zero-width-only document title"],
    [baseHtml().replace("<h1>D2 Builder Site</h1>", "<h1>&#8203;</h1>"), "a11y.names_required", "numeric-entity zero-width-only primary heading"],
    [baseHtml().replace("<h1>D2 Builder Site</h1>", "<h1>&ZeroWidthSpace;</h1>"), "a11y.names_required", "named-entity zero-width-only primary heading"],
    [baseHtml({ body: '<button type="button">\u200B</button>' }), "a11y.button_name", "zero-width-only button text"],
    [baseHtml({ body: '<button type="button" aria-label="\u200B"></button>' }), "a11y.button_name", "zero-width-only button aria-label"],
    [baseHtml({ body: '<label for="empty-name">&#8203;</label><input id="empty-name" type="text">' }), "a11y.control_label", "zero-width-only associated control label"],
    [baseHtml({ body: '<a href="#target">&ZeroWidthSpace;</a><section id="target"><h2>Target</h2></section>' }), "a11y.link_name", "zero-width-only link text"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport">'), "html.metadata_required", "viewport metadata without exact content"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="width=999999999">'), "html.metadata_required", "unbounded numeric viewport width"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'), "html.metadata_required", "zoom-disabling viewport metadata"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="\u00a0width=device-width, initial-scale=1\u00a0">'), "html.metadata_required", "viewport metadata wrapped in non-breaking spaces"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="width\u2003=\u2003device-width, initial-scale=1">'), "html.metadata_required", "viewport metadata using em spaces around equals"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="width=device-width\u2028, initial-scale=1">'), "html.metadata_required", "viewport metadata using a line separator before the comma"],
    [baseHtml().replace(viewportMarkup, '<meta name="viewport" content="width=device-width,\u202finitial-scale=1">'), "html.metadata_required", "viewport metadata using a narrow non-breaking space"],
    [baseHtml().replace(viewportMarkup, `${viewportMarkup}<meta name="viewport" content="width=999999999">`), "html.metadata_required", "duplicate conflicting viewport metadata"],
    [baseHtml().replace('<meta charset="utf-8">', "").replace(viewportMarkup, '<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">'), "html.metadata_required", "one mixed charset and viewport meta"],
    [baseHtml().replace(viewportMarkup, "").replace("<body>", `<body>${viewportMarkup}`), "html.metadata_required", "viewport metadata outside head"],
  ]) {
    assert(
      markupValidationModule.validateCreatorHtml("index.html", html).issues.some((issue) => issue.code === code),
      `${label} is rejected directly by structured HTML and accessibility validation`
    );
    assertIssue(output(bundle([htmlFile(html)])), code, `${label} is rejected by structured HTML and accessibility validation`);
  }
  assertIssue(output(bundle([
    htmlFile(baseHtml({ body: '<summary id="standalone-summary">Standalone action</summary><script src="app.js" defer></script>' })),
    { path: "app.js", mediaType: "text/javascript", content: 'const summary = document.querySelector("#standalone-summary"); summary.addEventListener("click", () => { summary.classList.toggle("active"); });' },
  ])), "a11y.details_summary", "standalone summary remains blocking when JavaScript targets it as an interactive event control");
  for (const [html, label] of [
    [baseHtml(), "one exact UTF-8 charset and zoom-preserving viewport metadata pair"],
    [baseHtml({ body: '<label>Visible nested label <input type="text"></label>' }), "visible nested control label"],
    [baseHtml({ body: '<label for="same-control">Visible dual-mode label <input id="same-control" type="text"></label>' }), "explicit label target matching its one nested control"],
    [baseHtml({ body: '<details><summary>More information</summary><p>Bounded details</p></details>' }), "one visible named disclosure summary"],
    [baseHtml({ body: '<details> \t\n<summary>More information</summary><p>Bounded details</p></details>' }), "grammar whitespace before one first disclosure summary"],
    [baseHtml({ body: '<ul><li>First item</li><li>Second item</li></ul><ol><li>Ordered item</li></ol>' }), "meaningful immediate list items"],
    [baseHtml({ body: '<dl><dt>Mode</dt><dd>Static website</dd><dt>Boundary</dt><dd>Local machine</dd></dl>' }), "meaningful exact description-list pairs"],
    [baseHtml({ body: '<fieldset><legend>Project settings</legend><label for="project-name">Name</label><input id="project-name" type="text"></fieldset>' }), "fieldset with one first meaningful legend and labelled control"],
    [baseHtml({ body: '<fieldset> \t\n<legend>Project settings</legend><label for="project-name-space">Name</label><input id="project-name-space" type="text"></fieldset>' }), "grammar whitespace before one first meaningful fieldset legend"],
    [baseHtml({ body: '<p>Plain <strong>strong</strong> and <a href="#inline-target">linked</a> text.</p><section id="inline-target"><h2>Target</h2></section>' }), "phrasing descendants inside a paragraph"],
    [baseHtml({ body: '<h2>Plain <span>inline</span> heading</h2>' }), "phrasing descendants inside a heading"],
    [baseHtml({ body: '<label for="mode-select">Mode</label><select id="mode-select"><option value="static">Static website</option><option value="browser">Browser app</option></select>' }), "labelled select with meaningful immediate options"],
    [baseHtml({ body: '<table><caption>Scores</caption><thead><tr><th scope="col">Name</th><th scope="col">Score</th></tr></thead><tbody><tr><th scope="row">Ada</th><td>10</td></tr></tbody></table>' }), "captioned table with scoped column and row headers"],
    [baseHtml({ body: '<nav><a href="#destination">Local destination</a></nav><section id="destination"><h2>Destination</h2></section>' }), "one exposed navigation landmark"],
    [baseHtml().replace('<html lang="en">', '<html lang="en-GB">'), "language tag with a region"],
    [baseHtml().replace('<html lang="en">', '<html lang="ar">'), "right-to-left primary language tag"],
    [baseHtml().replace('<html lang="en">', '<html lang="zh-Hans-CN">'), "language tag with script and region subtags"],
    [baseHtml().replace('<html lang="en">', '<html lang="ar" dir="rtl">'), "explicit right-to-left document direction"],
    [baseHtml().replace('<html lang="en">', '<html lang="en" dir="ltr">'), "explicit left-to-right document direction"],
    [baseHtml().replace('<html lang="en">', '<html lang="en" dir="auto">'), "automatic document direction"],
    [baseHtml({ body: '<progress aria-label="Upload progress" max="100" value="30"></progress><label for="local-meter">Completion</label><meter id="local-meter" min="0" max="1" value=".5"></meter>' }), "named progress and explicitly labelled meter ranges"],
    [baseHtml({ body: '<button type="button"><span>Visible button name</span></button>' }), "visible descendant button name"],
    [baseHtml({ body: '<a href="#target"><span>Visible link name</span></a><section id="target"><h2>Target</h2></section>' }), "visible descendant link name"],
    [baseHtml({ body: '<button type="button" tabindex="0">Native tab stop</button><p role="status">Ready</p>' }), "native zero tabindex and passive status role"],
    [baseHtml({ body: '<p id="action-description">Runs one local calculation.</p><button type="button" aria-describedby="action-description">Calculate</button>' }), "one visible meaningful aria-describedby target"],
    [baseHtml({ body: '<a href="#target">Sibling link</a><button type="button">Sibling button</button><label for="sibling">Sibling field</label><input id="sibling" type="text"><section id="target"><h2>Target</h2></section>' }), "sibling anchors, buttons, labels, and inputs without a submission context"],
    [baseHtml().replace("<title>D2 Builder Site</title>", "<title>\u72B6\u6001 \u{1F389}</title>").replace("<h1>D2 Builder Site</h1>", "<h1>!!!</h1>"), "CJK, emoji, and punctuation accessible title and heading text"],
    [baseHtml({ body: '<button type="button">\u{1F389}</button><label for="named-cjk">\u72B6\u6001</label><input id="named-cjk" type="text"><a href="#target">!!!</a><section id="target"><h2>Target</h2></section>' }), "emoji, CJK, and punctuation interactive names"],
  ]) {
    assert(validateRaw(output(bundle([htmlFile(html)]))).validation.valid, `${label} remains valid`);
  }
  const safeIcon = { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>' };
  for (const [html, files, label] of [
    [baseHtml({ body: '<img src="icon.svg" alt="Status" width="1" height="4096">' }), [safeIcon], "bounded image dimensions"],
    [baseHtml({ body: '<label for="notes-bounded">Notes</label><textarea id="notes-bounded" rows="40" cols="120"></textarea>' }), [], "bounded textarea rows and columns"],
  ]) {
    assert(validateRaw(output(bundle([htmlFile(html), ...files]))).validation.valid, `${label} remain valid`);
  }
  for (const [html, files, label] of [
    [baseHtml({ body: '<img src="icon.svg" alt="Status" width="0">' }), [safeIcon], "zero image width"],
    [baseHtml({ body: '<img src="icon.svg" alt="Status" height="4097">' }), [safeIcon], "oversized image height"],
    [baseHtml({ body: '<img src="icon.svg" alt="Status" width="1px">' }), [safeIcon], "unit-bearing image width"],
    [baseHtml({ body: '<img src="icon.svg" alt="Status" width=" 1">' }), [safeIcon], "whitespace-prefixed image width"],
    [baseHtml({ body: '<label for="notes-zero">Notes</label><textarea id="notes-zero" rows="0"></textarea>' }), [], "zero textarea rows"],
    [baseHtml({ body: '<label for="notes-large">Notes</label><textarea id="notes-large" cols="121"></textarea>' }), [], "oversized textarea columns"],
    [baseHtml({ body: '<label for="notes-unit">Notes</label><textarea id="notes-unit" rows="1e2"></textarea>' }), [], "exponent textarea rows"],
  ]) {
    assertIssue(output(bundle([htmlFile(html), ...files])), "html.dimension_invalid", `${label} is rejected before preview readiness`);
  }
  assert(validateRaw(output(bundle([htmlFile(baseHtml({ body: '<img src="icon.svg" alt="" role="presentation">' })), safeIcon]))).validation.valid, "exact decorative image alternative text remains valid");
  assert(validateRaw(output(bundle([htmlFile(baseHtml({ body: '<img src="icon.svg" alt="" role="img" aria-label="Status icon">' })), safeIcon]))).validation.valid, "ARIA-named exposed image role remains valid");

  for (const [source, code, label] of [
    ['<g></g>', "svg.syntax_subset", "missing SVG document root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>', "svg.syntax_subset", "multiple top-level SVG roots"],
    ['text<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>', "svg.syntax_subset", "text outside the SVG root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><svg viewBox="0 0 1 1"></svg></svg>', "svg.root_required", "nested SVG root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-labelledby="missing-name"></svg>', "a11y.name_override_forbidden", "SVG referenced accessible-name override"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-label="\u200B"></svg>', "a11y.aria_name_invalid", "SVG invisible literal accessible name"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="button" aria-label="Click"></svg>', "a11y.svg_role_invalid", "interactive button role on a passive SVG root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="dialog"></svg>', "a11y.svg_role_invalid", "dialog role on a passive SVG root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="none" aria-label="Image"></svg>', "a11y.svg_role_invalid", "presentational SVG root with a contradictory accessible name"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img"></svg>', "a11y.svg_role_invalid", "image-role SVG root without a meaningful literal name"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g role="img" aria-label="Child"><circle cx="5" cy="5" r="4"/></g></svg>', "a11y.svg_role_invalid", "independent image role on a passive SVG child"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" aria-label="Child"/></svg>', "a11y.svg_name_scope", "accessible-name override on a passive SVG shape"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 10"></svg>', "svg.root_contract", "zero-width SVG viewBox"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 Infinity 10"></svg>', "svg.root_contract", "non-finite SVG viewBox"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,,0,10,10"></svg>', "svg.root_contract", "malformed repeated-comma SVG viewBox"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0\u00a00\u00a010\u00a010"></svg>', "svg.root_contract", "non-breaking-space SVG viewBox separators"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0\u20030\u200310\u200310"></svg>', "svg.root_contract", "em-space SVG viewBox separators"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0\u20280\u202810\u202810"></svg>', "svg.root_contract", "line-separator SVG viewBox separators"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0\u202f0\u202f10\u202f10"></svg>', "svg.root_contract", "narrow-non-breaking-space SVG viewBox separators"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000001 10"></svg>', "svg.root_contract", "excessive SVG viewBox dimension"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="0"></svg>', "svg.root_contract", "zero explicit SVG width"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" height="1000001"></svg>', "svg.root_contract", "excessive explicit SVG height"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10px"></svg>', "svg.root_contract", "unit-bearing explicit SVG root width"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z" fill="u\\72l(h\\74tps:\\2f\\2fevil.example/a.svg)"/></svg>', "svg.escape_forbidden", "CSS-escaped remote SVG paint URL"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z" clip-path="u\\72l(#clip)"/></svg>', "svg.escape_forbidden", "CSS-escaped SVG clip-path token"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><linearGradient id="paint" fill="url(#paint)"><stop offset="0" stop-color="#fff"/></linearGradient></svg>', "svg.reference_unsafe", "self-referential SVG resource"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z" fill="url(#paint)"/><linearGradient id="paint"><stop offset="0" stop-color="#fff"/></linearGradient></svg>', "svg.reference_unsafe", "forward SVG resource reference"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect id="shape" x="0" y="0" width="1" height="1"/><path d="M0 0h10v10z" fill="url(#shape)"/></svg>', "svg.reference_unsafe", "paint reference to a non-gradient element"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><linearGradient id="paint"><stop offset="0" stop-color="#fff"/></linearGradient><path d="url(#paint)"/></svg>', "svg.reference_unsafe", "resource URL syntax in a non-resource attribute"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><linearGradient id="paint"><stop offset="0" stop-color="#fff"/></linearGradient><path d="M0 0h10v10z" clip-path="url(#paint)"/></svg>', "svg.reference_unsafe", "clip path reference to a gradient"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><clipPath id="clip"><path d="M0 0h10v10z"/></clipPath><path d="M0 0h10v10z" mask="url(#clip)"/></svg>', "svg.reference_unsafe", "mask reference to a clip path"],
  ]) {
    assertIssue(output(svgBundle(source)), code, `${label} is rejected by structured SVG validation`);
  }
  for (const [source, label] of [
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>', "space-separated bounded SVG viewBox"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,10,10"><circle cx="5" cy="5" r="4"/></svg>', "comma-separated bounded SVG viewBox"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><circle cx="5" cy="5" r="4"/></svg>', "positive bounded explicit SVG root dimensions"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-label="Status"><circle cx="5" cy="5" r="4"/></svg>', "meaningfully named passive image role on the SVG root"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="presentation"><circle cx="5" cy="5" r="4"/></svg>', "nameless passive presentation role for an outer image alternative"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><linearGradient id="paint"><stop offset="0" stop-color="#fff"/></linearGradient><path d="M0 0h10v10z" fill="url(#paint)"/></svg>', "literal earlier local SVG paint fragment"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><clipPath id="clip"><path d="M0 0h10v10z"/></clipPath><path d="M0 0h10v10z" clip-path="url(#clip)"/></svg>', "literal earlier local SVG clip-path fragment"],
    ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><mask id="fade"><rect x="0" y="0" width="10" height="10" fill="#fff"/></mask><path d="M0 0h10v10z" mask="url(#fade)"/></svg>', "literal earlier local SVG mask fragment"],
  ]) {
    assert(validateRaw(output(svgBundle(source))).validation.valid, `${label} remains valid`);
  }

  for (const [source, code, label] of [
    ["body { color: red; \u0001 }", "css.control_character", "CSS control character"],
    ["body { color: #fff\u00a0; background: #000; }", "css.non_ascii_syntax_character", "non-breaking space appended to a color token"],
    ["body { color: #fff\u2003!important; background: #000; }", "css.non_ascii_syntax_character", "em space before important"],
    ["body { color: #fff; background: #000\u2028; }", "css.non_ascii_syntax_character", "line separator appended to a background token"],
    ["body { color: #fff\u202f; background: #000; }", "css.non_ascii_syntax_character", "narrow non-breaking space appended to a color token"],
    ['body { background: u/**/rl("https://evil.example/asset.png"); }', "css.comment_forbidden", "comment-obfuscated remote CSS URL token"],
    ["/* ordinary author comment */ body { color: red; }", "css.comment_forbidden", "ordinary CSS comment outside the conservative v0 subset"],
    ["@media screen;", "css.at_rule_block_required", "blockless media at-rule"],
    ['@supports (background: url("https://evil.example/x.png")) { body { color: #10243e; background: #f8fafc; } }', "css.at_rule_prelude_forbidden", "remote URL inside a supports prelude"],
    ['@supports (@import url("https://evil.example/x.css")) { body { color: #10243e; background: #f8fafc; } }', "css.at_rule_prelude_forbidden", "import token inside a supports prelude"],
    ['@media url("https://evil.example/x.png") { body { color: #10243e; background: #f8fafc; } }', "css.at_rule_prelude_forbidden", "remote URL inside a media prelude"],
    ["@media (min-width: calc(1px)) { body { color: #10243e; background: #f8fafc; } }", "css.at_rule_prelude_forbidden", "dynamic media feature value"],
    ["color: black;", "css.ast_topology_forbidden", "declaration outside a qualified style rule"],
    ["@media (min-width: 1px) { color: black; }", "css.ast_topology_forbidden", "declaration directly inside a media block"],
    ["body { background: white; @media (min-width: 1px) { color: white; } }", "css.ast_topology_forbidden", "nested media block used to bypass same-rule contrast validation"],
    ["body { background: white; .nested { color: white; } }", "css.ast_topology_forbidden", "nested qualified rule outside the v0 topology"],
    ["@media (min-width: 1px) { body { @supports (display: block) { color: black; } } }", "css.ast_topology_forbidden", "multiply nested conditional block"],
    [".first, { color: red; }", "css.selector_invalid", "empty selector-list component"],
    ["body { color: ; }", "css.declaration_value_invalid", "empty declaration value"],
    ["body { width: calc(1px + ); }", "css.math_value_invalid", "trailing CSS math operator"],
    ["main > { color: red; }", "css.selector_invalid", "missing selector after child combinator"],
    ["main] { color: red; }", "css.selector_invalid", "stray selector bracket"],
    ["body { animation: pulse 1s infinite; } @keyframes pulse { from { opacity: 0.8; } to { opacity: 1; } }", "css.motion_forbidden", "infinite CSS animation shorthand"],
    ["body { animation-name: pulse; animation-iteration-count: infinite; }", "css.motion_forbidden", "infinite CSS animation iteration count"],
    ["body { animation-iteration-count: calc(infinity); }", "css.motion_forbidden", "calculated infinite animation iteration count"],
    ["body { animation-iteration-count: calc(1 / 0); }", "css.motion_forbidden", "division-by-zero animation iteration count"],
    ["body { animation: pulse 1ms 999999999; }", "css.motion_forbidden", "effectively unbounded animation iteration count"],
    ["body { animation-duration: 999999999s; }", "css.motion_forbidden", "effectively unbounded animation duration"],
    ["body { transition: opacity 999999999s; }", "css.motion_forbidden", "effectively unbounded transition shorthand"],
    ["body { transition-duration: 999999999s; }", "css.motion_forbidden", "effectively unbounded transition duration"],
    ["body { transition: all calc(infinity * 1s); }", "css.motion_forbidden", "calculated infinite transition"],
    ["h1 { display: none; }", "css.rendering_suppression_forbidden", "required heading removed from rendering"],
    ["main { visibility: hidden !important; }", "css.rendering_suppression_forbidden", "required landmark hidden from rendering"],
    ["body { content-visibility: hidden; }", "css.rendering_suppression_forbidden", "document content visibility suppression"],
    ["h1 { opacity: 0; }", "css.rendering_suppression_forbidden", "fully transparent required heading"],
    ["h1 { opacity: .000001; }", "css.rendering_suppression_forbidden", "near-transparent required heading"],
    ["h1 { display: contents; }", "css.rendering_suppression_forbidden", "required heading box and semantic rendering suppression"],
    ["h1 { opacity: calc(1 - 1); }", "css.rendering_suppression_forbidden", "dynamic zero-opacity bypass"],
    [":root { --hide: none; } h1 { display: var(--hide); }", "css.remote_or_dynamic_value", "custom-property rendering-suppression bypass"],
    ["h1 { transform: scale(0); }", "css.rendering_suppression_forbidden", "transform scale suppression"],
    ["h1 { scale: 0; }", "css.rendering_suppression_forbidden", "individual scale suppression"],
    ["h1 { zoom: 0; }", "css.rendering_suppression_forbidden", "zoom suppression"],
    ["h1 { clip: rect(0, 0, 0, 0); }", "css.rendering_suppression_forbidden", "legacy clipping suppression"],
    ["h1 { clip-path: inset(50%); }", "css.rendering_suppression_forbidden", "clip-path suppression"],
    ["h1 { font-size: 0; }", "css.rendering_suppression_forbidden", "zero-size heading suppression"],
    ["h1 { color: transparent; }", "css.rendering_suppression_forbidden", "transparent heading text"],
    ["h1 { color: rgb(0 0 0 / 0); }", "css.rendering_suppression_forbidden", "modern zero-alpha heading text"],
    ["h1 { color: rgba(0, 0, 0, .000001); }", "css.rendering_suppression_forbidden", "near-zero-alpha heading text"],
    ["h1 { color: #00000001; }", "css.rendering_suppression_forbidden", "near-zero-alpha hexadecimal heading text"],
    ["h1 { font-size: .000001px; }", "css.rendering_suppression_forbidden", "near-zero pixel heading size"],
    ["h1 { font-size: 1e-9rem; }", "css.rendering_suppression_forbidden", "near-zero exponent rem heading size"],
    ["h1 { line-height: .000001; }", "css.rendering_suppression_forbidden", "near-zero heading line height"],
    ["main { height: 0; overflow: hidden; }", "css.rendering_suppression_forbidden", "zero-height clipped main content"],
    ["main { max-height: 0; overflow: clip; }", "css.rendering_suppression_forbidden", "zero maximum-height clipped main content"],
    ["main { width: 0; overflow: hidden; white-space: nowrap; }", "css.rendering_suppression_forbidden", "zero-width clipped main content"],
    ["main { max-inline-size: 0; overflow: clip; white-space: nowrap; }", "css.rendering_suppression_forbidden", "zero maximum-inline-size clipped main content"],
    ["body { height: 1px; overflow: hidden; }", "css.rendering_suppression_forbidden", "near-zero clipped body content"],
    ["main { max-height: .1px; overflow: clip; }", "css.rendering_suppression_forbidden", "near-zero maximum-height clipped main content"],
    ["h1 { line-height: 0; overflow: hidden; }", "css.rendering_suppression_forbidden", "zero-line-height clipped heading content"],
    ["main { position: absolute; left: -999999px; }", "css.rendering_suppression_forbidden", "extreme off-screen main content"],
    ["main { position: absolute; left: -999px; }", "css.rendering_suppression_forbidden", "viewport-scale off-screen main content"],
    ["main { position: absolute; margin-left: -999999px; }", "css.rendering_suppression_forbidden", "negative-margin off-screen main content"],
    ["main { position: relative; left: -99999px; }", "css.rendering_suppression_forbidden", "relative-position off-screen main content"],
    ["main { position: absolute; left: 100vw; }", "css.rendering_suppression_forbidden", "positive viewport-position displacement"],
    ["main { margin-left: 100vw; }", "css.rendering_suppression_forbidden", "positive viewport-margin displacement"],
    ["main { position: fixed; right: 100vw; }", "css.rendering_suppression_forbidden", "fixed-position viewport displacement"],
    ["main { width: 100vw; box-sizing: border-box; padding-left: 100vw; overflow: hidden; white-space: nowrap; }", "css.rendering_suppression_forbidden", "viewport-sized padding content displacement"],
    ["main { width: 100vw; box-sizing: border-box; border-left: 100vw solid transparent; overflow: hidden; white-space: nowrap; }", "css.rendering_suppression_forbidden", "viewport-sized border content displacement"],
    ["main { width: 100vw; box-sizing: border-box; padding-left: 100svw; overflow: hidden; white-space: nowrap; }", "css.rendering_suppression_forbidden", "modern viewport-unit padding displacement"],
    ["main { margin-left: 100000in; }", "css.rendering_suppression_forbidden", "absolute physical-unit margin displacement"],
    ["main { position: absolute; left: 100000pt; }", "css.rendering_suppression_forbidden", "absolute typographic-unit position displacement"],
    ['h1 { position: absolute; offset-path: path("M -9999 -9999"); offset-distance: 100%; }', "css.rendering_suppression_forbidden", "motion-path off-screen displacement"],
    ['h1 { offset: path("M -9999 -9999") 100%; }', "css.rendering_suppression_forbidden", "motion shorthand off-screen displacement"],
    ['h1 { motion-path: path("M -9999 -9999"); motion-offset: 100%; }', "css.rendering_suppression_forbidden", "legacy motion-path off-screen displacement"],
    ["h1 { position: absolute; top: anchor(--missing top, -9999px); }", "css.rendering_suppression_forbidden", "anchor-position off-screen displacement"],
    ['body::before { content: ""; position: fixed; inset: 0; z-index: 999999; }', "css.interaction_suppression_forbidden", "generated pointer-blocking viewport overlay"],
    [".overlay { position: fixed; inset: 0; z-index: 999; background: #fff; }", "css.interaction_suppression_forbidden", "ordinary fixed full-viewport overlay"],
    [".overlay { position: absolute; inset: 0; background: #fff; }", "css.interaction_suppression_forbidden", "ordinary absolute full-cover overlay"],
    [".overlay { position: fixed; inset-block: 0; inset-inline: 0; background: #fff; }", "css.interaction_suppression_forbidden", "logical-inset fixed overlay"],
    [".overlay { position: sticky; top: 0; z-index: 9; }", "css.interaction_suppression_forbidden", "sticky stacked overlay"],
    ["main { display: grid; } .content, .overlay { grid-area: 1 / 1; }", "css.interaction_suppression_forbidden", "overlapping explicit grid placement"],
    [".overlay { contain: paint; width: 0; height: 0; }", "css.interaction_suppression_forbidden", "paint-containment clipping suppression"],
    ["h1 { -webkit-transform: scale(0); }", "css.vendor_property_forbidden", "vendor transform suppression"],
    ["h1 { -webkit-clip-path: inset(50%); }", "css.vendor_property_forbidden", "vendor clip-path suppression"],
    ["h1 { -webkit-transition: opacity 999999999s; }", "css.vendor_property_forbidden", "vendor transition bypass"],
    ["button:focus { outline: none; }", "css.interaction_suppression_forbidden", "removed focus outline"],
    ["input:focus { outline-width: 0; }", "css.interaction_suppression_forbidden", "zero-width focus outline"],
    ["button:focus-visible { outline-color: transparent; }", "css.interaction_suppression_forbidden", "transparent focus outline"],
    ["button:focus-visible { outline: 1px solid rgba(255, 255, 255, 0); }", "css.interaction_suppression_forbidden", "zero-alpha functional color inside focus-outline shorthand"],
    ["button:focus-visible { outline: 1px solid #ffffff00; }", "css.interaction_suppression_forbidden", "zero-alpha hexadecimal color inside focus-outline shorthand"],
    ["button:focus-visible { outline-color: #00000001; }", "css.interaction_suppression_forbidden", "near-zero-alpha hexadecimal focus outline"],
    ["button:focus-visible { outline-width: .000001px; }", "css.interaction_suppression_forbidden", "near-zero focus outline width"],
    ["button:focus-visible { outline: 1e-9px solid #000; }", "css.interaction_suppression_forbidden", "near-zero exponent focus outline width"],
    ["button:focus-visible { outline: 2px solid rgba(0, 0, 0, 0e0); }", "css.interaction_suppression_forbidden", "exponent-form zero-alpha focus outline"],
    ["button:focus-visible { outline-color: rgb(0 0 0 / -0); }", "css.interaction_suppression_forbidden", "signed zero-alpha focus outline"],
    ["button:focus-visible { outline-color: rgb(0 0 0 / calc(0)); }", "css.interaction_suppression_forbidden", "calculated zero-alpha focus outline"],
    ["button:focus-visible { outline-width: env(safe-area-inset-top); }", "css.interaction_suppression_forbidden", "environment-derived zero-width focus outline"],
    ["h1 { color: rgb(0 0 0 / 0e9); }", "css.rendering_suppression_forbidden", "exponent-form zero-alpha heading text"],
    ["h1 { color: rgb(0 0 0 / calc(0)); }", "css.rendering_suppression_forbidden", "calculated zero-alpha heading text"],
    ["h1 { font-size: 0e9px; }", "css.rendering_suppression_forbidden", "exponent-form zero-size heading"],
    ["h1 { font-size: calc(0px); }", "css.rendering_suppression_forbidden", "calculated zero-size heading"],
    ["h1 { font-size: min(0px, 0px); }", "css.rendering_suppression_forbidden", "minimum-function zero-size heading"],
    ["h1 { font-size: clamp(0px, 0px, 0px); }", "css.rendering_suppression_forbidden", "clamped zero-size heading"],
    ["h1 { font-size: env(safe-area-inset-top); }", "css.rendering_suppression_forbidden", "environment-derived zero-size heading"],
    ["h1 { font: 0 sans-serif; }", "css.rendering_suppression_forbidden", "font shorthand zero-size heading"],
    ["button { all: unset; }", "css.interaction_suppression_forbidden", "all-property native interaction reset"],
    ["button:focus-visible { all: initial; }", "css.interaction_suppression_forbidden", "all-property focus reset"],
    ["button { appearance: none; }", "css.interaction_suppression_forbidden", "native control appearance reset"],
    ["button { outline-offset: -999px; }", "css.interaction_suppression_forbidden", "negative focus-outline offset"],
    ["input { caret-color: transparent; }", "css.interaction_suppression_forbidden", "hidden text caret"],
    ["input { accent-color: transparent; }", "css.interaction_suppression_forbidden", "hidden native selection state"],
    ["main { forced-color-adjust: none; }", "css.interaction_suppression_forbidden", "disabled forced-colors adaptation"],
    ["html { scroll-behavior: smooth; }", "css.motion_forbidden", "smooth scrolling motion"],
    ["button { pointer-events: none; }", "css.interaction_suppression_forbidden", "disabled pointer interaction"],
    ["html { touch-action: none; }", "css.interaction_suppression_forbidden", "disabled touch and pinch-zoom interaction"],
    ["button { cursor: none; }", "css.interaction_suppression_forbidden", "hidden interaction cursor"],
    ["div { font-size: 50%; }", "css.property_or_value_forbidden", "compounding percentage font size"],
    ["div { font-size: .5em; }", "css.property_or_value_forbidden", "compounding em font size"],
    ["div { font-size: smaller; }", "css.property_or_value_forbidden", "compounding smaller font keyword"],
    ["html { overflow: hidden; }", "css.rendering_suppression_forbidden", "root document scrolling suppression"],
    ["body { overflow-y: clip; }", "css.rendering_suppression_forbidden", "body block scrolling suppression"],
    ["nav { display: flex; flex-direction: row-reverse; }", "css.interaction_suppression_forbidden", "reversed visual navigation order"],
    ["button { order: -1; }", "css.interaction_suppression_forbidden", "explicit visual order override"],
    ["h1 { letter-spacing: -1000px; }", "css.property_or_value_forbidden", "letter-overlap text suppression"],
    ["h1 { word-spacing: -1000px; }", "css.property_or_value_forbidden", "word-overlap text suppression"],
    ["h1 { writing-mode: vertical-lr; height: 1px; }", "css.property_or_value_forbidden", "writing-mode clipping suppression"],
    ["div { position: relative; left: 128px; }", "css.property_or_value_forbidden", "composable relative displacement"],
    ["div { margin-left: 8rem; }", "css.property_or_value_forbidden", "composable margin displacement"],
    ["div { padding-left: 8rem; }", "css.property_or_value_forbidden", "composable padding displacement"],
    ["body { color: #fff; background: #fff; }", "css.contrast_insufficient", "identical hexadecimal foreground and background"],
    ["body { color: white; background-color: white; }", "css.contrast_insufficient", "identical named foreground and background"],
    ["html { background: rgb(255 255 255); } body { color: rgb(255 255 255); }", "css.contrast_insufficient", "split RGB document foreground and background"],
    ["body { color: #ffffff; background: #fffffe; }", "css.contrast_insufficient", "near-identical literal document colors"],
    ["body { color: #fff; background: #000; }", "css.contrast_insufficient", "dark global background cannot rely on inherited foreground over user-agent interactive colors"],
    ["body { background: #000; } p { color: #fff; }", "css.contrast_insufficient", "partial local foreground cannot hide default black text on a black global background"],
    ["body { color: #fff; } p { background: #000; }", "css.contrast_insufficient", "partial local background cannot hide inherited white text on a default white background"],
    ["body { background: #fff; } button:focus { outline: 2px solid #fff; }", "css.property_or_value_forbidden", "custom focus indicator color that could match its background"],
  ]) {
    assert(
      codeValidationModule.validateCreatorCss("styles.css", source).some((issue) => issue.code === code),
      `${label} is rejected directly by structured PostCSS validation`
    );
    assertIssue(output(stylesheetBundle(source)), code, `${label} is rejected after structured PostCSS parsing`);
  }
  const nestedShrinkingMarkup = Array.from({ length: 20 }, () => '<div class="shrink">').join("") +
    "<p>Visible bounded content</p>" +
    Array.from({ length: 20 }, () => "</div>").join("");
  assertIssue(
    output(bundle([
      htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">', body: nestedShrinkingMarkup })),
      { path: "styles.css", mediaType: "text/css", content: ".shrink { font-size: .5em; }" },
    ])),
    "css.property_or_value_forbidden",
    "a full nested bundle cannot compound individually small relative font sizes into invisible content"
  );
  const splitCascadeHtml = baseHtml({
    head: '<link rel="stylesheet" href="one.css"><link rel="stylesheet" href="two.css">',
    body: '<p class="x y">Split cascade</p>',
  });
  assertIssue(
    output(bundle([
      htmlFile(splitCascadeHtml),
      { path: "one.css", mediaType: "text/css", content: ".x { color: #767676; }" },
      { path: "two.css", mediaType: "text/css", content: ".y { background: #767676; }" },
    ])),
    "css.contrast_insufficient",
    "bundle-wide validation rejects same-element low contrast assembled across separate stylesheet files"
  );
  assert(validateRaw(output(stylesheetBundle('@media (min-width: 40rem) { body { color: #10243e; } } @supports (display: block) { main { display: block; } }'))).validation.valid, "complete local media and supports blocks remain valid when every declaration stays inside the exact safe subset");
  assert(validateRaw(output(stylesheetBundle('@media screen and (prefers-color-scheme: dark) and (min-width: 640px) { body { color: #10243e; background: #f8fafc; } }'))).validation.valid, "bounded exact media feature conjunction remains valid without resource or dynamic tokens");
  assertIssue(output(bundle([
    htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">', body: '<a href="other.html">Local page</a>' })),
    { path: "styles.css", mediaType: "text/css", content: "body { color: #fff; background: #000; }" },
    { path: "other.html", mediaType: "text/html", content: baseHtml() },
  ])), "css.contrast_insufficient", "dark background with an unstyled local anchor cannot become preview-ready through inherited foreground assumptions");
  const explicitAnchorContrast = validateRaw(output(bundle([
    htmlFile(baseHtml({ head: '<link rel="stylesheet" href="styles.css">', body: '<a href="other.html">Local page</a>' })),
    { path: "other.html", mediaType: "text/html", content: baseHtml() },
    { path: "styles.css", mediaType: "text/css", content: "body { color: #10243e; background: #f8fafc; } a { color: #10243e; }" },
  ])));
  assert(
    explicitAnchorContrast.validation.valid,
    `light global background and explicit high-contrast anchor color remain preview-ready (${explicitAnchorContrast.validation.issues.map((issue) => issue.code).join(",") || "no issues"})`
  );
  assertIssue(output(stylesheetBundle('body { animation: pulse 1s ease 2; animation-iteration-count: 2; } @keyframes pulse { from { opacity: 0.8; } to { opacity: 1; } }')), "css.motion_forbidden", "even finite CSS motion is conservatively rejected from static v0");
  assert(validateRaw(output(stylesheetBundle('body { display: block; color: #10243e; background: #f8fafc; } h1 { font-size: 2rem; line-height: 1.2; }'))).validation.valid, "opaque high-contrast semantic presentation remains valid CSS");
  assert(validateRaw(output(stylesheetBundle('button { cursor: pointer; }'))).validation.valid, "ordinary cursor styling remains valid while native focus indication is left intact");
  assert(validateRaw(output(stylesheetBundle('h1 { color: rgb(20 30 40); font-size: 2rem; }'))).validation.valid, "opaque literal RGB colors and root-relative font sizes remain valid CSS");
  assert(validateRaw(output(stylesheetBundle('h1 { color: #141e28; font-size: 8px; line-height: 0.8; } main { display: block; }'))).validation.valid, "declared minimum safe size, line height, and ordinary block flow remain valid CSS");
  assert(validateRaw(output(stylesheetBundle('main { overflow-wrap: anywhere; word-break: break-word; }'))).validation.valid, "ordinary bounded text wrapping remains valid CSS");
  assert(validateRaw(output(stylesheetBundle('main > p:first-child { color: #123456; }'))).validation.valid, "complete child combinator and allowlisted pseudo-class selector remains valid CSS");
  assertIssue(output(bundle([htmlFile(), { path: "data.json", mediaType: "application/json", content: '{"outer":{"value":1,"value":2}}' }])), "json.duplicate_key", "nested duplicate JSON artifact keys are rejected before parse collapse");
  assert(validateRaw(output(bundle([htmlFile(), { path: "data.json", mediaType: "application/json", content: '{"outer":{"value":1},"items":[1,2,3]}' }]))).validation.valid, "unique nested JSON artifact keys remain valid");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<img src="icon.svg" alt="">' })), { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><script>alert(1)</script></svg>' }])), "svg.element_forbidden", "dangerous SVG scripts are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<img src="icon.svg" alt="">' })), { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><image href="https://evil.example/a.png"/></svg>' }])), "svg.attribute_forbidden", "SVG external-reference attributes are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<img src="icon.svg" alt="">' })), { path: "icon.svg", mediaType: "image/svg+xml", content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z" fill="url(https://evil.example/a.svg)"/></svg>' }])), "svg.reference_unsafe", "SVG remote paint references are rejected");
  assertIssue(output(bundle([htmlFile(baseHtml({ body: '<img src="missing.svg" alt="Missing">' }))])), "reference.missing_or_unsafe", "broken local references are rejected");

  const fixtureOutputs = [
    output(warningBundle),
    output(replacementBundle),
    output(titledBundle("D2 Generation Crash Recovery Site", true)),
    output(titledBundle("D2 Repair Crash Recovery Site", false)),
    output(titledBundle("D2 Repair Crash Recovery Site", true)),
    output(titledBundle("D2 Failed Repair Recovery Site", false)),
    "{",
    output(titledBundle("D2 Repair Capacity Site", false)),
    output(titledBundle("D2 Corrupt Orphan Recovery Site", true)),
    ...invalidPolicyCases.map((fixture) =>
      output(invalidPolicyBundle(fixture.generationTitle, fixture.kind))
    ),
    ...invalidPolicyCases.flatMap((fixture) => [
      output(titledBundle(fixture.repairTitle, false)),
      output(invalidPolicyBundle(fixture.repairTitle, fixture.kind)),
    ]),
    output(invalidPolicyBundle("D2 Invalid Generation Persistence Site", "file-count")),
    output(titledBundle("D2 Invalid Repair Persistence Site", false)),
    output(invalidPolicyBundle("D2 Invalid Repair Persistence Site", "invalid-path")),
    output(invalidPolicyBundle("D2 Invalid Terminal Mismatch Site", "aggregate-size")),
    output(titledBundle("D2 Post Validation Kill Generation Site", true)),
    output(titledBundle("D2 Post Validation Kill Repair Site", false)),
    output(titledBundle("D2 Post Validation Kill Repair Site", true)),
    output(titledBundle("D2 Orphan Missing Audit Reference Site", true)),
    output(titledBundle("D2 Orphan Extra Audit Reference Site", true)),
    output(titledBundle("D2 Orphan Reordered Audit Reference Site", true)),
    output(titledBundle("D2 Orphan Timestamp Mismatch Site", true)),
    output(titledBundle("D2 Ready Cancellation Provenance Site", true)),
    output(titledBundle("D2 Preview Cancellation Provenance Site", true)),
    output(titledBundle("D2 Post Rename Reconciliation Site", true)),
    output(titledBundle("D2 Run Output Binding Site", true)),
    output(titledBundle("D2 Run Output Hash Binding Site", true)),
    output(titledBundle("D2 Contradictory Lifecycle Result Site", true)),
    output(titledBundle("D2 framed-v1 Execution Downgrade Site", true)),
    output(titledBundle("D2 raw-v1 Execution Downgrade Site", true)),
    output(titledBundle("D2 Lost Generation Response Site", true)),
    output(titledBundle("D2 Independent Clock Rollback Site", true)),
    output(titledBundle("D2 Lost Repair Response Site", false)),
    output(titledBundle("D2 Lost Repair Response Site", true)),
    output(titledBundle("D2 Unconfirmed Execution Recovery Site", true)),
    output(titledBundle("D2 Preview Capacity Journey Site", true)),
    output(titledBundle("D2 Repair Capacity Journey Site", false)),
    output(titledBundle("D2 Repair Capacity Journey Site", true)),
    output(titledBundle("D2 Ambiguous Repair Binding Site", false)),
    output(titledBundle("D2 Lost Repair Approval Site", false)),
  ];
  const fixtureAdapter = {
    identity: {
      providerId: "ollama-local",
      providerLabel: "Local Ollama",
      modelId: "gpt-oss:20b",
      modelLabel: "gpt-oss:20b",
      modelKey: "ollama-local::gpt-oss:20b",
      locality: "local",
      dataBoundary: "local-machine",
      costClass: "local-no-provider-token-charge",
      approvedMaximumOutputTokens: 4096,
    },
    async getAvailability() {
      fixtureAvailabilityCalls += 1;
      return { providerAvailable: true, modelAvailable: true, quotaState: "not-applicable", errorCode: null, safeErrorMessage: null };
    },
    async generateApprovedText(input) {
      const current = fixtureOutputs[fixtureDeliveries];
      assert(input.model === "gpt-oss:20b" && input.maximumOutputTokens === 4096, "fixture boundary receives the exact approved runtime model envelope");
      assert(input.approvedRequestText.includes("codexforge.creator.bundle.v1"), "fixture boundary receives the exact creator contract instruction");
      if (!current) throw new Error("No additional fixture output is authorized");
      fixtureDeliveries += 1;
      return { outputText: current, doneReason: "stop", totalDurationNanoseconds: 1, loadDurationNanoseconds: 0, promptEvalCount: 1, evalCount: 1 };
    },
  };

  try {
    const lifecycle = adapterModule.createCreatorGenerationLifecycleAdapterForTesting(suffix, fixtureAdapter);
    const wholeTreePublicationCalls = [];
    let visibleRevisionStageMutationCalls = 0;
    const observedFilesystem = new Proxy(persistence.filesystem, {
      get(target, property, receiver) {
        if (property === "publishTreeExclusive") {
          return async (targetSegments, orderedEntries) => {
            wholeTreePublicationCalls.push({
              targetSegments: [...targetSegments],
              orderedEntries: orderedEntries.map(([relativeSegments, data]) => [
                [...relativeSegments],
                Buffer.from(data),
              ]),
            });
            return target.publishTreeExclusive(targetSegments, orderedEntries);
          };
        }
        const value = Reflect.get(target, property, receiver);
        if (
          typeof value === "function" &&
          ["createDirectoryExclusive", "writeExclusive", "renameDirectoryExclusive", "removeOwnedTree"].includes(String(property))
        ) {
          return async (...args) => {
            if (
              args.some(
                (argument) =>
                  Array.isArray(argument) &&
                  argument.some((segment) => typeof segment === "string" && segment.startsWith(".stage-r"))
              )
            ) {
              visibleRevisionStageMutationCalls += 1;
            }
            return value.apply(target, args);
          };
        }
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
    const observedPersistence = { ...persistence, filesystem: observedFilesystem };
    const service = serviceModule.createCreatorService({ persistence: observedPersistence, lifecycle });
    const input = {
      creatorKind: "website-browser-app",
      projectTitle: "D2 Builder Site",
      description: "Create an accessible static local browser page with a button, local stylesheet, and local JavaScript.",
    };
    const rejectedTreeTarget = ["tree-publication-policy", "must-remain-absent"];
    for (const [name, entries] of [
      ["case-insensitive duplicate", [
        [["asset.txt"], Buffer.from("one")],
        [["ASSET.TXT"], Buffer.from("two")],
      ]],
      ["file and ancestor collision", [
        [["assets"], Buffer.from("file")],
        [["assets", "app.js"], Buffer.from("child")],
      ]],
      ["inverse file and ancestor collision", [
        [["assets", "app.js"], Buffer.from("child")],
        [["ASSETS"], Buffer.from("file")],
      ]],
      ["late unsafe segment", [
        [["safe.txt"], Buffer.from("safe")],
        [["..", "escape.txt"], Buffer.from("blocked")],
      ]],
      ["excessive relative depth", [
        [["a", "b", "c", "d", "e", "file.txt"], Buffer.from("blocked")],
      ]],
      ["excessive relative segment length", [
        [[`${"a".repeat(45)}.txt`], Buffer.from("blocked")],
      ]],
      ["excessive relative path length", [
        [["a".repeat(43), "b".repeat(43), `${"c".repeat(35)}.txt`], Buffer.from("blocked")],
      ]],
      ["non-buffer payload", [
        [["not-buffer.txt"], "blocked"],
      ]],
      ["excessive entry count", Array.from({ length: 16 }, (_, index) => [
        [`file-${String(index).padStart(2, "0")}.txt`],
        Buffer.from(String(index)),
      ])],
      ["excessive aggregate bytes", [
        [["one.bin"], Buffer.alloc(600_000, 0x31)],
        [["two.bin"], Buffer.alloc(600_000, 0x32)],
      ]],
    ]) {
      await expectFailure(
        () => persistence.filesystem.publishTreeExclusive(rejectedTreeTarget, entries),
        "unsafe_artifact_path",
        `whole-tree publication rejects ${name} before mutation`
      );
    }
    await expectFailure(
      () => persistence.filesystem.publishTreeExclusive(
        null,
        [[['file.txt'], Buffer.from('blocked')]]
      ),
      "unsafe_artifact_path",
      "whole-tree publication rejects a malformed runtime target through the bounded creator error"
    );
    await expectFailure(
      () => persistence.filesystem.listDirectory(["tree-publication-policy"]),
      "not_found",
      "all malformed whole-tree inputs leave their parent and target absent"
    );
    const maximumTransportEntries = [
      ...Array.from({ length: 12 }, (_, index) => [
        ["files", `file-${String(index).padStart(2, "0")}.txt`],
        Buffer.from(`artifact-${index}`),
      ]),
      [["manifest.json"], Buffer.from('{"manifest":true}\n')],
      [["validation.json"], Buffer.alloc(30_000, 0x20)],
      [["revision.json"], Buffer.from('{"revision":1}\n')],
    ];
    await persistence.filesystem.publishTreeExclusive(
      ["tree-publication-policy", "valid-envelope"],
      maximumTransportEntries
    );
    assert(
      (await persistence.filesystem.listDirectory([
        "tree-publication-policy",
        "valid-envelope",
        "files",
      ])).length === 12 &&
        (await persistence.filesystem.readBuffer([
          "tree-publication-policy",
          "valid-envelope",
          "validation.json",
        ])).length === 30_000,
      "whole-tree transport admits twelve artifact entries plus three bounded metadata entries in one complete commit"
    );
    await persistence.filesystem.removeOwnedTree(["tree-publication-policy"]);
    let mainProject = (await service.createProject(input, "macro-d2-main-create-0001")).project;
    assert(
      mainProject.approvalPacket?.targetArtifactRevision === 1 &&
        mainProject.approvalPacket.destinationBoundary === mainProject.plan?.destinationBoundary &&
        mainProject.approvalPacket.destinationBoundary.endsWith(`/projects/${mainProject.identity.projectId}/revisions/000001/files`),
      "generation approval packet binds exact artifact revision 1 and the displayed immutable destination"
    );
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "execute-generation", expectedRevision: mainProject.stateRevision }, "macro-d2-no-approval"),
      "invalid_transition",
      "service rejects execution before approval"
    );
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "start-preview", expectedRevision: mainProject.stateRevision }, "macro-d2-preview-before-validation"),
      "preview_blocked",
      "service rejects preview before validation"
    );
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "approve-generation", expectedRevision: mainProject.stateRevision }, "macro-d2-main-approve-0001")).project;
    const executionExpectedRevision = mainProject.stateRevision;
    const executionKey = "macro-d2-main-execute-0001";
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "execute-generation", expectedRevision: executionExpectedRevision }, executionKey)).project;
    assert(
      mainProject.status === "ready" && mainProject.validation?.valid,
      `approved fixture output validates and materializes as ready (status=${mainProject.status}; failure=${mainProject.failureCode ?? "none"}; validation=${mainProject.validation?.valid ?? "missing"})`
    );
    assert(mainProject.materializations.length === 1 && mainProject.materializations[0].artifactRevision === 1, "first valid artifact publishes as immutable revision 1");
    assert(mainProject.validation.issues.some((issue) => issue.severity === "warning"), "ready project retains honest validation warning for optional repair");
    assert(mainProject.exportManifest && materializationModule.verifyCreatorExportManifestDigest(mainProject.exportManifest), "deterministic export manifest digest verifies");
    assertWholeTreePublicationCall(
      wholeTreePublicationCalls[0],
      mainProject.identity.projectId,
      1,
      warningBundle,
      "generation whole-tree publication"
    );
    assert(
      wholeTreePublicationCalls.length === 1 && visibleRevisionStageMutationCalls === 0,
      "generation performs one whole-tree call and no visible revision-stage mutation"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      mainProject.identity.projectId,
      "generation publication exposes only complete numeric revisions"
    );
    const firstFile = await materializationModule.readCreatorRevisionFile({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 1, filePath: "index.html" });
    assert(firstFile.mediaType === "text/html" && firstFile.bytes.toString("utf8").includes("D2 Builder Site"), "materialized revision file is readable through exact inventory and hash binding");

    const executionReplay = await service.actOnProject(mainProject.identity.projectId, { action: "execute-generation", expectedRevision: executionExpectedRevision }, executionKey);
    assert(executionReplay.replayed && fixtureDeliveries === 1, "duplicate execution idempotency performs no second fixture delivery");
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "execute-generation", expectedRevision: mainProject.stateRevision }, "macro-d2-double-execution-new-key"),
      "invalid_transition",
      "new-key double execution is rejected"
    );

    const restorePreActivationManifest = await tamperManifestWithValidSelfDigest(mainProject.identity.projectId, 1);
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "start-preview", expectedRevision: mainProject.stateRevision }, "macro-d2-preview-corrupt-publication"),
      "export_digest_mismatch",
      "preview activation rejects a self-digested publication that differs from immutable project state"
    );
    assert((await persistence.readProject(mainProject.identity.projectId)).status === "ready", "failed preview activation leaves the ready state unchanged");
    await restorePreActivationManifest();
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "start-preview", expectedRevision: mainProject.stateRevision }, "macro-d2-preview-start-0001")).project;
    assert(mainProject.status === "preview_available" && mainProject.preview.status === "active", "explicit preview start binds one exact active preview");
    const restoreActivePreviewManifest = await tamperManifestWithValidSelfDigest(mainProject.identity.projectId, 1);
    await expectFailure(
      () => service.readActivePreviewFile({ projectId: mainProject.identity.projectId, previewId: mainProject.preview.previewId, artifactRevision: 1, filePath: "index.html" }),
      "export_digest_mismatch",
      "active preview read remains bound to the immutable state-approved manifest digest"
    );
    await restoreActivePreviewManifest();
    const previewFile = await service.readActivePreviewFile({ projectId: mainProject.identity.projectId, previewId: mainProject.preview.previewId, artifactRevision: 1, filePath: "index.html" });
    assert(previewFile.mediaType === "text/html", "preview enforces manifest content type");
    const previewJs = await service.readActivePreviewFile({ projectId: mainProject.identity.projectId, previewId: mainProject.preview.previewId, artifactRevision: 1, filePath: "app.js" });
    assert(previewJs.mediaType === "text/javascript", "preview prevents content-type confusion across inventory entries");
    await expectFailure(
      () => service.readActivePreviewFile({ projectId: mainProject.identity.projectId, previewId: mainProject.preview.previewId, artifactRevision: 1, filePath: "../index.html" }),
      "not_found",
      "preview traversal is rejected by exact inventory lookup"
    );
    const stoppedPreviewId = mainProject.preview.previewId;
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "stop-preview", expectedRevision: mainProject.stateRevision }, "macro-d2-preview-stop-0001")).project;
    await expectFailure(
      () => service.readActivePreviewFile({ projectId: mainProject.identity.projectId, previewId: stoppedPreviewId, artifactRevision: 1, filePath: "index.html" }),
      "preview_not_active",
      "preview content is unavailable immediately after stop"
    );
    assert(
      wholeTreePublicationCalls.length === 1 && visibleRevisionStageMutationCalls === 0,
      "preview start, reads, traversal rejection, and stop do not publish or expose another revision"
    );

    await fsp.writeFile(path.join(privateAlphaRoot, "KILL_SWITCH"), "1\n", { flag: "w" });
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "start-preview", expectedRevision: mainProject.stateRevision }, "macro-d2-preview-kill-switch"),
      "kill_switch_blocked",
      "existing kill switch blocks preview activation"
    );
    await fsp.rm(path.join(privateAlphaRoot, "KILL_SWITCH"), { force: true });
    let killProject = (await service.createProject({ ...input, projectTitle: "D2 Kill Switch Site" }, "macro-d2-kill-create-0001")).project;
    killProject = (await service.actOnProject(killProject.identity.projectId, { action: "approve-generation", expectedRevision: killProject.stateRevision }, "macro-d2-kill-approve-0001")).project;
    await fsp.writeFile(path.join(privateAlphaRoot, "KILL_SWITCH"), "1\n", { flag: "w" });
    killProject = (await service.actOnProject(killProject.identity.projectId, { action: "execute-generation", expectedRevision: killProject.stateRevision }, "macro-d2-kill-execute-0001")).project;
    assert(killProject.status === "failed" && killProject.failureCode === "kill_switch_blocked" && fixtureDeliveries === 1, "existing kill switch blocks provider execution before fixture delivery");
    await fsp.rm(path.join(privateAlphaRoot, "KILL_SWITCH"), { force: true });
    const failedApprovalBeforeCancel = JSON.stringify(killProject.approvalPacket);
    const failedBindingsBeforeCancel = JSON.stringify(killProject.runBindings);
    killProject = (await service.actOnProject(
      killProject.identity.projectId,
      { action: "cancel", expectedRevision: killProject.stateRevision },
      "macro-d2-failed-cancel-provenance"
    )).project;
    assert(
      killProject.status === "canceled" &&
        JSON.stringify(killProject.approvalPacket) === failedApprovalBeforeCancel &&
        JSON.stringify(killProject.runBindings) === failedBindingsBeforeCancel &&
        killProject.auditEvents.at(-1)?.eventType === "creator.canceled",
      "post-attempt failed cancellation preserves the exact approved packet and run provenance"
    );

    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "request-repair", expectedRevision: mainProject.stateRevision }, "macro-d2-repair-request-0001")).project;
    assert(
      mainProject.status === "awaiting_repair_approval" &&
        mainProject.repair.attempt === 1 &&
        mainProject.repair.sourceArtifactRevision === 1 &&
        mainProject.approvalPacket?.sourceArtifactRevision === 1 &&
        mainProject.approvalPacket.targetArtifactRevision === 2 &&
        mainProject.approvalPacket.destinationBoundary.endsWith(`/projects/${mainProject.identity.projectId}/revisions/000002/files`) &&
        fixtureDeliveries === 1,
      "repair request binds a separate awaiting-approval run to exact source revision 1 and target destination revision 2 without automatic execution"
    );
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "request-repair", expectedRevision: mainProject.stateRevision }, "macro-d2-repair-request-0002"),
      "repair_limit_reached",
      "more than one repair request is rejected"
    );
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "approve-repair", expectedRevision: mainProject.stateRevision }, "macro-d2-repair-approve-0001")).project;
    assert(mainProject.status === "repair_approved" && fixtureDeliveries === 1, "repair approval remains separate from repair execution");
    const repairExecutionExpectedRevision = mainProject.stateRevision;
    const repairExecutionKey = "macro-d2-repair-execute-0001";
    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "execute-repair", expectedRevision: repairExecutionExpectedRevision }, repairExecutionKey)).project;
    assert(
      mainProject.status === "ready" &&
        mainProject.materializations.length === 2 &&
        mainProject.materializations[1].artifactRevision === 2 &&
        mainProject.materializations[1].destinationLabel === mainProject.approvalPacket?.destinationBoundary,
      "one valid repair publishes complete replacement revision 2 at the separately approved destination"
    );
    assertWholeTreePublicationCall(
      wholeTreePublicationCalls[1],
      mainProject.identity.projectId,
      2,
      replacementBundle,
      "repair whole-tree publication"
    );
    assert(
      wholeTreePublicationCalls.length === 2 && visibleRevisionStageMutationCalls === 0,
      "generation and repair each perform one whole-tree call with no visible revision-stage mutation"
    );
    const preserved = await materializationModule.readCreatorRevisionFile({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 1, filePath: "index.html" });
    assert(
      preserved.sha256 === firstFile.sha256 && preserved.bytes.equals(firstFile.bytes),
      "repair preserves prior valid artifact revision 1 byte-for-byte"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      mainProject.identity.projectId,
      "repair publication exposes only complete numeric revisions"
    );
    assert(fixtureDeliveries === 2, "generation and one repair use exactly two fixture deliveries total");
    const repairReplay = await service.actOnProject(mainProject.identity.projectId, { action: "execute-repair", expectedRevision: repairExecutionExpectedRevision }, repairExecutionKey);
    assert(repairReplay.replayed && fixtureDeliveries === 2, "duplicate repair execution replays without a second attempt");
    await expectFailure(
      () => service.actOnProject(mainProject.identity.projectId, { action: "request-repair", expectedRevision: mainProject.stateRevision }, "macro-d2-third-repair-action"),
      "repair_limit_reached",
      "repair remains capped after success"
    );

    const currentBinding = mainProject.runBindings.at(-1);
    for (const { fixture, result } of malformedVoidProviderResults) {
      await expectFailure(
        () => materializationModule.materializeCreatorArtifact({
          persistence,
          projectId: mainProject.identity.projectId,
          projectTitle: mainProject.identity.projectTitle,
          sourceRequestDigest: mainProject.request.requestDigest,
          artifactRevision: 3,
          bundle: result.parse.bundle,
          validation: result.validation,
          runBinding: currentBinding,
          auditReferenceIds: [],
          materializedAt: new Date().toISOString(),
        }),
        "materialization_blocked",
        `${fixture.name} unterminated provider bundle cannot cross the materialization boundary`
      );
    }
    await expectFailure(
      () => materializationModule.readCreatorMaterializationPublication({
        persistence,
        projectId: mainProject.identity.projectId,
        artifactRevision: 3,
      }),
      "not_found",
      "unterminated void-tag validation publishes no materialization revision"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      mainProject.identity.projectId,
      "unterminated void-tag materialization attempts leave no transient revision residue"
    );
    const ancestorCollisionBundle = bundle([
      htmlFile(),
      {
        path: "index.html/app.js",
        mediaType: "text/javascript",
        content: "const app = 1;",
      },
    ]);
    const ancestorCollisionResult = validateRaw(output(ancestorCollisionBundle));
    assert(
      ancestorCollisionResult.bundle === null &&
        ancestorCollisionResult.validation.issues.some(
          (issue) => issue.code === "path.file_directory_collision"
        ) &&
        ancestorCollisionResult.validation.issues.some(
          (issue) => issue.code === "preview.not_ready"
        ),
      "file and ancestor collisions block both artifact acceptance and preview readiness"
    );
    const ancestorInventory = ancestorCollisionBundle.files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      byteLength: Buffer.byteLength(file.content, "utf8"),
      sha256: cryptoModule.hashCreatorSha256(Buffer.from(file.content, "utf8")),
    }));
    const forgedAncestorValidation = {
      validationVersion: 1,
      valid: true,
      completedAt: "2026-08-01T12:00:00.000Z",
      stagesCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      issues: [],
      issueDigest: cryptoModule.hashCreatorCanonicalJson([]),
      bundleDigest: cryptoModule.hashCreatorCanonicalJson({
        contractVersion: ancestorCollisionBundle.contractVersion,
        projectTitle: ancestorCollisionBundle.projectTitle,
        creatorKind: ancestorCollisionBundle.creatorKind,
        entrypoint: ancestorCollisionBundle.entrypoint,
        files: ancestorCollisionBundle.files,
        explanation: null,
      }),
      manifestDigest: cryptoModule.hashCreatorCanonicalJson({
        entrypoint: ancestorCollisionBundle.entrypoint,
        files: ancestorInventory,
      }),
    };
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 3,
        bundle: ancestorCollisionBundle,
        validation: forgedAncestorValidation,
        runBinding: currentBinding,
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_blocked",
      "materialization revalidates and blocks file and ancestor collisions before publication"
    );
    await expectFailure(
      () => materializationModule.readCreatorMaterializationPublication({
        persistence,
        projectId: mainProject.identity.projectId,
        artifactRevision: 3,
      }),
      "not_found",
      "file and ancestor collision cannot publish a forged-valid revision"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      mainProject.identity.projectId,
      "file and ancestor collision leaves no transient revision residue"
    );
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 3,
        bundle: mainProject.artifactProposal,
        validation: mainProject.validation,
        runBinding: { ...currentBinding, providerKey: "groq-cloud" },
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_blocked",
      "provider/model mismatch blocks materialization"
    );
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 3,
        bundle: mainProject.artifactProposal,
        validation: { ...mainProject.validation, manifestDigest: "a".repeat(64) },
        runBinding: currentBinding,
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_blocked",
      "validation manifest digest mismatch blocks materialization before publication"
    );

    const revisionTwoBefore = await materializationModule.readCreatorRevisionFile({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 2, filePath: "index.html" });
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 2,
        bundle: mainProject.artifactProposal,
        validation: mainProject.validation,
        runBinding: currentBinding,
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_failed",
      "existing artifact revision cannot be silently overwritten"
    );
    const revisionTwoAfter = await materializationModule.readCreatorRevisionFile({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 2, filePath: "index.html" });
    assert(revisionTwoBefore.sha256 === revisionTwoAfter.sha256, "write failure rollback preserves the previous complete revision");
    await assertNoTransientRevisionEntries(
      persistence,
      mainProject.identity.projectId,
      "failed publication leaves no transient revision entry"
    );

    mainProject = (await service.actOnProject(mainProject.identity.projectId, { action: "export", expectedRevision: mainProject.stateRevision }, "macro-d2-export-0001")).project;
    assert(mainProject.status === "exported", "explicit export verification advances to exported");
    const restoreExportManifest = await tamperManifestWithValidSelfDigest(mainProject.identity.projectId, 2);
    await expectFailure(
      () => service.readExportManifest(mainProject.identity.projectId, 2),
      "export_digest_mismatch",
      "manifest download rejects a self-digested disk manifest that differs from immutable project state"
    );
    await expectFailure(
      () => service.readExportFile({ projectId: mainProject.identity.projectId, artifactRevision: 2, filePath: "index.html" }),
      "export_digest_mismatch",
      "file download rejects a self-digested disk manifest that differs from immutable project state"
    );
    await restoreExportManifest();
    const manifest = await service.readExportManifest(mainProject.identity.projectId, 2);
    assert(manifest.manifestVersion === "codexforge.creator.export.v1" && materializationModule.verifyCreatorExportManifestDigest(manifest), "exported manifest is deterministic and digest-valid");
    assert(!materializationModule.verifyCreatorExportManifestDigest({ ...manifest, aggregateBytes: manifest.aggregateBytes + 1 }), "export digest mismatch is detected deterministically");
    const exportedFile = await service.readExportFile({ projectId: mainProject.identity.projectId, artifactRevision: 2, filePath: "styles.css" });
    assert(exportedFile.mediaType === "text/css" && exportedFile.bytes.length > 0, "individual validated static files are downloadable after export verification");

    let generationReadyWriteFailuresRemaining = 2;
    const generationCrashPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          generationReadyWriteFailuresRemaining > 0 &&
          project.identity.projectTitle === "D2 Generation Crash Recovery Site" &&
          project.status === "ready"
        ) {
          generationReadyWriteFailuresRemaining -= 1;
          throw new Error("deterministic final state write failure");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const generationCrashService = serviceModule.createCreatorService({ persistence: generationCrashPersistence, lifecycle });
    let generationCrashProject = (await generationCrashService.createProject(
      { ...input, projectTitle: "D2 Generation Crash Recovery Site" },
      "macro-d2-generation-crash-create"
    )).project;
    generationCrashProject = (await generationCrashService.actOnProject(
      generationCrashProject.identity.projectId,
      { action: "approve-generation", expectedRevision: generationCrashProject.stateRevision },
      "macro-d2-generation-crash-approve"
    )).project;
    const generationCrashExpectedRevision = generationCrashProject.stateRevision;
    const generationCrashKey = "macro-d2-generation-crash-execute";
    const deliveriesBeforeGenerationCrash = fixtureDeliveries;
    await expectFailure(
      () => generationCrashService.actOnProject(
        generationCrashProject.identity.projectId,
        { action: "execute-generation", expectedRevision: generationCrashExpectedRevision },
        generationCrashKey
      ),
      "internal_failure",
      "crash after generation publication reports a bounded internal failure"
    );
    generationCrashProject = await persistence.readProject(generationCrashProject.identity.projectId);
    assert(generationReadyWriteFailuresRemaining === 0 && generationCrashProject.status === "validating" && generationCrashProject.materializations.length === 0, "generation crash leaves an exact validating recovery record without claiming readiness");
    const orphanedGenerationPublication = await materializationModule.readCreatorMaterializationPublication({
      persistence,
      projectId: generationCrashProject.identity.projectId,
      artifactRevision: 1,
    });
    assert(orphanedGenerationPublication.materialization.artifactRevision === 1, "generation crash preserves one complete immutable publication for reconciliation");
    generationCrashProject = await explicitlyRecoverProject(
      generationCrashService,
      generationCrashProject,
      "macro-d2-generation-crash-explicit-recovery",
      "generation publication recovery"
    );
    assert(
      generationCrashProject.status === "ready" && generationCrashProject.materializations.length === 1,
      `explicit current-revision generation recovery adopts the exact published revision after reload (status ${generationCrashProject.status}, materializations ${generationCrashProject.materializations.length})`
    );
    assert(fixtureDeliveries === deliveriesBeforeGenerationCrash + 1, "generation recovery performs no second provider-bound fixture delivery");
    assert(generationCrashProject.auditEvents.filter((event) => event.eventType === "validation.completed").length === 1 && generationCrashProject.auditEvents.filter((event) => event.eventType === "revision.materialized").length === 1, "generation recovery retains one validation and one materialization audit event");

    let repairReadyWriteFailuresRemaining = 2;
    const repairCrashPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          repairReadyWriteFailuresRemaining > 0 &&
          project.identity.projectTitle === "D2 Repair Crash Recovery Site" &&
          project.status === "ready" &&
          project.materializations.length === 2
        ) {
          repairReadyWriteFailuresRemaining -= 1;
          throw new Error("deterministic repair final state write failure");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const repairCrashService = serviceModule.createCreatorService({ persistence: repairCrashPersistence, lifecycle });
    let repairCrashProject = (await repairCrashService.createProject(
      { ...input, projectTitle: "D2 Repair Crash Recovery Site" },
      "macro-d2-repair-crash-create"
    )).project;
    repairCrashProject = (await repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "approve-generation", expectedRevision: repairCrashProject.stateRevision }, "macro-d2-repair-crash-generation-approve")).project;
    repairCrashProject = (await repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "execute-generation", expectedRevision: repairCrashProject.stateRevision }, "macro-d2-repair-crash-generation-execute")).project;
    repairCrashProject = (await repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "request-repair", expectedRevision: repairCrashProject.stateRevision }, "macro-d2-repair-crash-request")).project;
    repairCrashProject = (await repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "approve-repair", expectedRevision: repairCrashProject.stateRevision }, "macro-d2-repair-crash-approve")).project;
    const repairCrashExpectedRevision = repairCrashProject.stateRevision;
    const repairCrashKey = "macro-d2-repair-crash-execute";
    const deliveriesBeforeRepairCrash = fixtureDeliveries;
    await expectFailure(
      () => repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "execute-repair", expectedRevision: repairCrashExpectedRevision }, repairCrashKey),
      "internal_failure",
      "crash after repair publication reports a bounded internal failure"
    );
    repairCrashProject = await persistence.readProject(repairCrashProject.identity.projectId);
    assert(repairReadyWriteFailuresRemaining === 0 && repairCrashProject.status === "validating" && repairCrashProject.artifactProposalBinding.purpose === "repair", "repair crash retains the exact repair-purpose recovery binding");
    await expectFailure(
      () => repairCrashService.actOnProject(repairCrashProject.identity.projectId, { action: "execute-generation", expectedRevision: repairCrashProject.stateRevision }, "macro-d2-cross-purpose-recovery"),
      "idempotency_conflict",
      "generation action cannot adopt a repair publication"
    );
    repairCrashProject = await explicitlyRecoverProject(
      repairCrashService,
      repairCrashProject,
      "macro-d2-repair-crash-explicit-recovery",
      "repair publication recovery"
    );
    assert(repairCrashProject.status === "ready" && repairCrashProject.materializations.length === 2, "separate explicit repair recovery adopts replacement revision 2");
    assert(fixtureDeliveries === deliveriesBeforeRepairCrash + 1, "repair recovery performs no second provider-bound fixture delivery");

    const failedRepairService = serviceModule.createCreatorService({ persistence, lifecycle });
    let failedRepairProject = (await failedRepairService.createProject(
      { ...input, projectTitle: "D2 Failed Repair Recovery Site" },
      "macro-d2-failed-repair-create"
    )).project;
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "approve-generation", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-generation-approve")).project;
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "execute-generation", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-generation-execute")).project;
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "request-repair", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-request")).project;
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "approve-repair", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-approve")).project;
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "execute-repair", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-execute")).project;
    assert(failedRepairProject.status === "failed" && failedRepairProject.materializations.length === 1, "failed repair preserves the prior valid revision without automatic retry");
    failedRepairProject = (await failedRepairService.actOnProject(failedRepairProject.identity.projectId, { action: "export", expectedRevision: failedRepairProject.stateRevision }, "macro-d2-failed-repair-export")).project;
    assert(failedRepairProject.status === "exported" && failedRepairProject.exportManifest.artifactRevision === 1, "failed repair remains recoverable through explicit export of the preserved revision");
    const preservedFailedRepairFile = await failedRepairService.readExportFile({ projectId: failedRepairProject.identity.projectId, artifactRevision: 1, filePath: "index.html" });
    assert(preservedFailedRepairFile.bytes.toString("utf8").includes("D2 Failed Repair Recovery Site"), "failed repair export reads the hash-verified preserved artifact");

    let capacityProject = (await service.createProject(
      { ...input, projectTitle: "D2 Repair Capacity Site" },
      "macro-d2-repair-capacity-create"
    )).project;
    capacityProject = (await service.actOnProject(capacityProject.identity.projectId, { action: "approve-generation", expectedRevision: capacityProject.stateRevision }, "macro-d2-repair-capacity-approve")).project;
    capacityProject = (await service.actOnProject(capacityProject.identity.projectId, { action: "execute-generation", expectedRevision: capacityProject.stateRevision }, "macro-d2-repair-capacity-execute")).project;
    const paddedAuditEvents = [...capacityProject.auditEvents];
    const paddedIds = new Set(paddedAuditEvents.map((event) => event.eventId));
    let paddedOrdinal = 0;
    while (paddedAuditEvents.length < 117) {
      const eventId = `ed${paddedOrdinal.toString(16).padStart(22, "0")}`;
      paddedOrdinal += 1;
      if (paddedIds.has(eventId)) continue;
      paddedIds.add(eventId);
      paddedAuditEvents.push({
        eventId,
        eventType: "validation.completed",
        occurredAt: capacityProject.updatedAt,
        actor: "system",
        previousState: "ready",
        resultingState: "ready",
        stateRevision: capacityProject.stateRevision,
        sourceRunId: null,
        artifactRevision: 1,
        idempotencyKeyHash: null,
        mutationDigest: null,
        summary: "Deterministic bounded audit capacity fixture.",
      });
    }
    const capacityProbeProject = {
      ...capacityProject,
      auditEvents: paddedAuditEvents,
    };
    const capacityProbePersistence = {
      ...persistence,
      async withProjectLock(_projectId, operation) { return operation(); },
      async readProject() { return capacityProbeProject; },
    };
    const capacityProbeService = serviceModule.createCreatorService({
      persistence: capacityProbePersistence,
      lifecycle,
    });
    await expectFailure(
      () => capacityProbeService.actOnProject(capacityProject.identity.projectId, { action: "request-repair", expectedRevision: capacityProject.stateRevision }, "macro-d2-repair-capacity-request"),
      "audit_capacity_reached",
      "repair is refused before leaving ready when the complete repair-preview-export lifecycle cannot fit"
    );
    const capacityAfterRefusal = await persistence.readProject(capacityProject.identity.projectId);
    assert(capacityAfterRefusal.status === "ready" && capacityAfterRefusal.repair === null && capacityAfterRefusal.stateRevision === capacityProject.stateRevision, "repair capacity refusal preserves the ready revision and export recovery path without publishing the synthetic capacity probe");
    const terminalRepairBindLifecycle = {
      ...lifecycle,
      async bindRun(bindInput) {
        const run = await lifecycle.bindRun(bindInput);
        if (bindInput.purpose !== "repair") return run;
        return {
          ...run,
          state: "canceled",
          revision: run.revision + 1,
          updatedAt: new Date(Date.parse(run.updatedAt) + 1).toISOString(),
          cancellation: {
            cancellationId: "terminal-repair-bind",
            canceledAt: new Date(Date.parse(run.updatedAt) + 1).toISOString(),
            actor: "local-operator",
            reason: "Deterministic terminal repair-bind substitution.",
            previousRevision: run.revision,
            resultingRevision: run.revision + 1,
          },
        };
      },
    };
    const terminalRepairBindService = serviceModule.createCreatorService({
      persistence,
      lifecycle: terminalRepairBindLifecycle,
    });
    const deliveriesBeforeTerminalRepairBind = fixtureDeliveries;
    const terminalRepairBindProject = (await terminalRepairBindService.actOnProject(
      capacityProject.identity.projectId,
      { action: "request-repair", expectedRevision: capacityProject.stateRevision },
      "macro-d2-terminal-repair-bind"
    )).project;
    assert(
      terminalRepairBindProject.status === "awaiting_repair_approval" &&
        terminalRepairBindProject.failureCode === null &&
        terminalRepairBindProject.repair?.attempt === 1 &&
        terminalRepairBindProject.runBindings.filter((binding) => binding.purpose === "repair").length === 1 &&
        terminalRepairBindProject.runBindings.some((binding) => binding.purpose === "repair" && binding.sourceRunRevision === 1 && binding.approvalRecordedAt === null && binding.executionAttempted === false) &&
        terminalRepairBindProject.auditEvents.filter((event) => event.eventType === "repair.run_bound").length === 1 &&
        terminalRepairBindProject.auditEvents.filter((event) => event.eventType === "repair.result_rejected").length === 0 &&
        terminalRepairBindProject.auditEvents.filter((event) => event.eventType === "failure.recorded").length === 0 &&
        terminalRepairBindProject.materializations.length === 1 &&
        fixtureDeliveries === deliveriesBeforeTerminalRepairBind,
      `a substituted terminal bind response cannot replace the exact recovered server-owned awaiting-approval repair run (${JSON.stringify({ status: terminalRepairBindProject.status, failureCode: terminalRepairBindProject.failureCode, repair: terminalRepairBindProject.repair, runBindings: terminalRepairBindProject.runBindings, repairRunBound: terminalRepairBindProject.auditEvents.filter((event) => event.eventType === "repair.run_bound").length, failures: terminalRepairBindProject.auditEvents.filter((event) => event.eventType === "failure.recorded").length, deliveriesBeforeTerminalRepairBind, fixtureDeliveries })})`
    );

    let corruptOrphanReadyWriteFailuresRemaining = 2;
    const corruptOrphanPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          corruptOrphanReadyWriteFailuresRemaining > 0 &&
          project.identity.projectTitle === "D2 Corrupt Orphan Recovery Site" &&
          project.status === "ready"
        ) {
          corruptOrphanReadyWriteFailuresRemaining -= 1;
          throw new Error("deterministic corrupt orphan final state write failure");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const corruptOrphanService = serviceModule.createCreatorService({ persistence: corruptOrphanPersistence, lifecycle });
    let corruptOrphanProject = (await corruptOrphanService.createProject(
      { ...input, projectTitle: "D2 Corrupt Orphan Recovery Site" },
      "macro-d2-corrupt-orphan-create"
    )).project;
    corruptOrphanProject = (await corruptOrphanService.actOnProject(corruptOrphanProject.identity.projectId, { action: "approve-generation", expectedRevision: corruptOrphanProject.stateRevision }, "macro-d2-corrupt-orphan-approve")).project;
    const corruptOrphanExpectedRevision = corruptOrphanProject.stateRevision;
    await expectFailure(
      () => corruptOrphanService.actOnProject(corruptOrphanProject.identity.projectId, { action: "execute-generation", expectedRevision: corruptOrphanExpectedRevision }, "macro-d2-corrupt-orphan-execute"),
      "internal_failure",
      "corrupt-orphan fixture publishes before the injected final state failure"
    );
    corruptOrphanProject = await persistence.readProject(corruptOrphanProject.identity.projectId);
    const corruptOrphanManifestPath = await persistence.filesystem.resolve([
      "projects",
      corruptOrphanProject.identity.projectId,
      "revisions",
      "000001",
      "manifest.json",
    ]);
    await fsp.writeFile(corruptOrphanManifestPath, "{", { flag: "w" });
    corruptOrphanProject = await explicitlyRecoverProject(
      corruptOrphanService,
      corruptOrphanProject,
      "macro-d2-corrupt-orphan-explicit-recovery",
      "corrupt orphan publication recovery"
    );
    assert(corruptOrphanProject.status === "failed" && corruptOrphanProject.failureCode === "materialization_failed", "malformed existing publication is rejected as corruption rather than treated as absent");
    assert(fs.existsSync(path.dirname(corruptOrphanManifestPath)), "corrupt orphan recovery does not overwrite or remove the rejected revision");
    await assertNoTransientRevisionEntries(
      persistence,
      corruptOrphanProject.identity.projectId,
      "corrupt orphan recovery leaves no replacement publication residue"
    );

    const invalidGenerationDeliveryStart = fixtureDeliveries;
    for (const fixture of invalidPolicyCases) {
      const prefix = `macro-d2-invalid-generation-${fixture.kind}`;
      let project = (await service.createProject(
        { ...input, projectTitle: fixture.generationTitle },
        `${prefix}-create`
      )).project;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "approve-generation", expectedRevision: project.stateRevision },
        `${prefix}-approve`
      )).project;
      const expectedRevision = project.stateRevision;
      const executeKey = `${prefix}-execute`;
      const deliveriesBefore = fixtureDeliveries;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "execute-generation", expectedRevision },
        executeKey
      )).project;
      assert(
        fixtureDeliveries === deliveriesBefore + 1 &&
          project.status === "rejected_output" &&
          project.failureCode ===
            (fixture.issueCode.startsWith("contract.")
              ? "output_contract_invalid"
              : "output_validation_failed") &&
          project.artifactProposal === null &&
          project.artifactProposalBinding?.purpose === "generation" &&
          project.validation?.valid === false &&
          project.validation.bundleDigest === null &&
          project.validation.manifestDigest === null &&
          project.validation.issues.some((issue) => issue.code === fixture.issueCode) &&
          (fixture.issueCode.startsWith("contract.")
            ? JSON.stringify(project.validation.stagesCompleted) === "[1]" &&
              project.validation.issues.every((issue) => issue.code !== "preview.not_ready")
            : project.validation.issues.some((issue) => issue.code === "preview.not_ready")) &&
          project.materializations.length === 0 &&
          project.exportManifest === null &&
          project.preview.status === "inactive" &&
          project.preview.previewId === null &&
          project.preview.artifactRevision === null,
        `${fixture.kind} generation output atomically reaches bounded rejected_output without persisting the invalid proposal`
      );
      assert(
        project.auditEvents.filter((event) => event.eventType === "output.received").length === 1 &&
          project.auditEvents.filter((event) => event.eventType === "validation.completed").length === 1 &&
          project.auditEvents.filter((event) => event.eventType === "output.rejected").length === 1 &&
          project.auditEvents.filter((event) => event.eventType === "revision.materialized").length === 0,
        `${fixture.kind} generation rejection has one exact bounded audit sequence and no materialization claim`
      );
      assert(
        project.validation.issues.every((issue) =>
          issue.code.length <= 80 &&
          (issue.filePath === null || issue.filePath.length <= 120) &&
          issue.message.length <= 240 &&
          issue.suggestedRepairContext.length <= 240 &&
          !/[\p{Cc}\p{Cf}\p{Cs}]/u.test(`${issue.code}${issue.filePath || ""}${issue.message}${issue.suggestedRepairContext}`)
        ),
        `${fixture.kind} generation rejection persists only bounded control-free diagnostics`
      );
      await expectFailure(
        () => materializationModule.readCreatorMaterializationPublication({
          persistence,
          projectId: project.identity.projectId,
          artifactRevision: 1,
        }),
        "not_found",
        `${fixture.kind} generation rejection publishes no artifact revision`
      );
      const terminalRevision = project.stateRevision;
      const deliveriesBeforePreview = fixtureDeliveries;
      await expectFailure(
        () => service.actOnProject(
          project.identity.projectId,
          { action: "start-preview", expectedRevision: terminalRevision },
          `${prefix}-preview-blocked`
        ),
        "preview_blocked",
        `${fixture.kind} generation rejection cannot activate preview`
      );
      const afterBlockedPreview = await persistence.readProject(project.identity.projectId);
      assert(
        afterBlockedPreview.stateRevision === terminalRevision &&
          afterBlockedPreview.status === "rejected_output" &&
          afterBlockedPreview.preview.status === "inactive" &&
          fixtureDeliveries === deliveriesBeforePreview,
        `${fixture.kind} blocked preview leaves the terminal rejection and provider-delivery count unchanged`
      );
      const replay = await service.actOnProject(
        project.identity.projectId,
        { action: "execute-generation", expectedRevision },
        executeKey
      );
      assert(
        replay.replayed &&
          replay.project.stateRevision === terminalRevision &&
          fixtureDeliveries === deliveriesBefore + 1,
        `${fixture.kind} generation rejection replays idempotently without another provider-bound delivery`
      );
      const rejectedApprovalBeforeCancel = JSON.stringify(project.approvalPacket);
      const rejectedBindingsBeforeCancel = JSON.stringify(project.runBindings);
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "cancel", expectedRevision: project.stateRevision },
        `${prefix}-cancel`
      )).project;
      assert(
        project.status === "canceled" &&
          JSON.stringify(project.approvalPacket) === rejectedApprovalBeforeCancel &&
          JSON.stringify(project.runBindings) === rejectedBindingsBeforeCancel &&
          project.auditEvents.at(-1)?.eventType === "creator.canceled" &&
          fixtureDeliveries === deliveriesBefore + 1,
        `${fixture.kind} post-execution rejection cancellation preserves exact approval and run provenance without another delivery`
      );
    }
    assert(
      fixtureDeliveries === invalidGenerationDeliveryStart + invalidPolicyCases.length,
      "all invalid generation classes use exactly one explicit fixture delivery each"
    );

    const invalidRepairDeliveryStart = fixtureDeliveries;
    for (const fixture of invalidPolicyCases) {
      const prefix = `macro-d2-invalid-repair-${fixture.kind}`;
      let project = (await service.createProject(
        { ...input, projectTitle: fixture.repairTitle },
        `${prefix}-create`
      )).project;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "approve-generation", expectedRevision: project.stateRevision },
        `${prefix}-generation-approve`
      )).project;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "execute-generation", expectedRevision: project.stateRevision },
        `${prefix}-generation-execute`
      )).project;
      assert(
        project.status === "ready" && project.materializations.length === 1,
        `${fixture.kind} repair fixture begins with one valid immutable revision`
      );
      const preservedManifestDigest = project.exportManifest?.manifestDigest;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "request-repair", expectedRevision: project.stateRevision },
        `${prefix}-request`
      )).project;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "approve-repair", expectedRevision: project.stateRevision },
        `${prefix}-approve`
      )).project;
      const repairExpectedRevision = project.stateRevision;
      const repairExecuteKey = `${prefix}-execute`;
      const deliveriesBeforeRepair = fixtureDeliveries;
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "execute-repair", expectedRevision: repairExpectedRevision },
        repairExecuteKey
      )).project;
      assert(
        fixtureDeliveries === deliveriesBeforeRepair + 1 &&
          project.status === "failed" &&
          project.failureCode ===
            (fixture.issueCode.startsWith("contract.")
              ? "output_contract_invalid"
              : "output_validation_failed") &&
          project.repair?.attempt === 1 &&
          project.artifactProposal === null &&
          project.artifactProposalBinding?.purpose === "repair" &&
          project.validation?.issues.some((issue) => issue.code === fixture.issueCode) &&
          (fixture.issueCode.startsWith("contract.")
            ? JSON.stringify(project.validation?.stagesCompleted) === "[1]" &&
              project.validation?.issues.every((issue) => issue.code !== "preview.not_ready")
            : project.validation?.issues.some((issue) => issue.code === "preview.not_ready")) &&
          project.materializations.length === 1 &&
          project.exportManifest?.manifestDigest === preservedManifestDigest &&
          project.preview.status === "inactive" &&
          project.preview.previewId === null &&
          project.preview.artifactRevision === 1,
        `${fixture.kind} repair rejection consumes the one attempt and atomically preserves revision 1`
      );
      assert(
        project.auditEvents.filter((event) => event.eventType === "output.received").length === 2 &&
          project.auditEvents.filter((event) => event.eventType === "validation.completed").length === 2 &&
          project.auditEvents.filter((event) => event.eventType === "repair.result_rejected").length === 1 &&
          project.auditEvents.filter((event) => event.eventType === "failure.recorded").length === 1,
        `${fixture.kind} repair rejection records one exact terminal audit sequence`
      );
      assert(
        project.validation.issues.every((issue) =>
          issue.code.length <= 80 &&
          (issue.filePath === null || issue.filePath.length <= 120) &&
          issue.message.length <= 240 &&
          issue.suggestedRepairContext.length <= 240 &&
          !/[\p{Cc}\p{Cf}\p{Cs}]/u.test(`${issue.code}${issue.filePath || ""}${issue.message}${issue.suggestedRepairContext}`)
        ),
        `${fixture.kind} repair rejection persists only bounded control-free diagnostics while preserving revision 1`
      );
      await expectFailure(
        () => materializationModule.readCreatorMaterializationPublication({
          persistence,
          projectId: project.identity.projectId,
          artifactRevision: 2,
        }),
        "not_found",
        `${fixture.kind} repair rejection publishes no replacement revision`
      );
      const terminalRevision = project.stateRevision;
      const replay = await service.actOnProject(
        project.identity.projectId,
        { action: "execute-repair", expectedRevision: repairExpectedRevision },
        repairExecuteKey
      );
      assert(
        replay.replayed &&
          replay.project.stateRevision === terminalRevision &&
          fixtureDeliveries === deliveriesBeforeRepair + 1,
        `${fixture.kind} repair rejection replays idempotently without another provider-bound delivery`
      );
      await expectFailure(
        () => service.actOnProject(
          project.identity.projectId,
          { action: "request-repair", expectedRevision: project.stateRevision },
          `${prefix}-second-request`
        ),
        "repair_limit_reached",
        `${fixture.kind} failed repair cannot request a second attempt`
      );
      const failedRepairRevision = project.stateRevision;
      const deliveriesBeforePreview = fixtureDeliveries;
      await expectFailure(
        () => service.actOnProject(
          project.identity.projectId,
          { action: "start-preview", expectedRevision: failedRepairRevision },
          `${prefix}-preview-blocked`
        ),
        "preview_blocked",
        `${fixture.kind} failed repair cannot activate preview from its preserved prior revision`
      );
      const afterBlockedPreview = await persistence.readProject(project.identity.projectId);
      assert(
        afterBlockedPreview.stateRevision === failedRepairRevision &&
          afterBlockedPreview.status === "failed" &&
          afterBlockedPreview.materializations.length === 1 &&
          afterBlockedPreview.preview.status === "inactive" &&
          fixtureDeliveries === deliveriesBeforePreview,
        `${fixture.kind} blocked repair preview leaves the failed state, prior revision, and provider-delivery count unchanged`
      );
      project = (await service.actOnProject(
        project.identity.projectId,
        { action: "export", expectedRevision: project.stateRevision },
        `${prefix}-export`
      )).project;
      const preservedFile = await service.readExportFile({
        projectId: project.identity.projectId,
        artifactRevision: 1,
        filePath: "index.html",
      });
      assert(
        project.status === "exported" &&
          project.exportManifest?.artifactRevision === 1 &&
          preservedFile.bytes.toString("utf8").includes(fixture.repairTitle),
        `${fixture.kind} failed repair remains recoverable through explicit export of revision 1`
      );
    }
    assert(
      fixtureDeliveries === invalidRepairDeliveryStart + invalidPolicyCases.length * 2,
      "all invalid repair classes use one generation and one separately approved repair delivery each"
    );

    let invalidGenerationTerminalWriteFailed = false;
    const invalidGenerationPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          !invalidGenerationTerminalWriteFailed &&
          project.identity.projectTitle === "D2 Invalid Generation Persistence Site" &&
          project.status === "rejected_output"
        ) {
          invalidGenerationTerminalWriteFailed = true;
          throw new Error("deterministic invalid-generation terminal write failure");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const invalidGenerationService = serviceModule.createCreatorService({
      persistence: invalidGenerationPersistence,
      lifecycle,
    });
    let invalidGenerationPersistenceProject = (await invalidGenerationService.createProject(
      { ...input, projectTitle: "D2 Invalid Generation Persistence Site" },
      "macro-d2-invalid-generation-persistence-create"
    )).project;
    invalidGenerationPersistenceProject = (await invalidGenerationService.actOnProject(
      invalidGenerationPersistenceProject.identity.projectId,
      { action: "approve-generation", expectedRevision: invalidGenerationPersistenceProject.stateRevision },
      "macro-d2-invalid-generation-persistence-approve"
    )).project;
    const invalidGenerationPersistenceDeliveries = fixtureDeliveries;
    invalidGenerationPersistenceProject = (await invalidGenerationService.actOnProject(
      invalidGenerationPersistenceProject.identity.projectId,
      { action: "execute-generation", expectedRevision: invalidGenerationPersistenceProject.stateRevision },
      "macro-d2-invalid-generation-persistence-execute"
    )).project;
    const durableInvalidGeneration = await persistence.readProject(
      invalidGenerationPersistenceProject.identity.projectId
    );
    assert(
      invalidGenerationTerminalWriteFailed &&
        fixtureDeliveries === invalidGenerationPersistenceDeliveries + 1 &&
        invalidGenerationPersistenceProject.status === "rejected_output" &&
        durableInvalidGeneration.status === "rejected_output" &&
        durableInvalidGeneration.auditEvents.filter((event) => event.eventType === "output.rejected").length === 1,
      "one terminal persistence failure is reconciled once without stranding invalid generation or repeating provider execution"
    );

    let invalidRepairTerminalWriteFailed = false;
    const invalidRepairPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          !invalidRepairTerminalWriteFailed &&
          project.identity.projectTitle === "D2 Invalid Repair Persistence Site" &&
          project.status === "failed" &&
          project.artifactProposalBinding?.purpose === "repair"
        ) {
          invalidRepairTerminalWriteFailed = true;
          await persistence.writeNextProject(project, expectedPreviousRevision);
          throw new Error("deterministic post-publication invalid-repair terminal write failure");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const invalidRepairService = serviceModule.createCreatorService({
      persistence: invalidRepairPersistence,
      lifecycle,
    });
    let invalidRepairPersistenceProject = (await invalidRepairService.createProject(
      { ...input, projectTitle: "D2 Invalid Repair Persistence Site" },
      "macro-d2-invalid-repair-persistence-create"
    )).project;
    invalidRepairPersistenceProject = (await invalidRepairService.actOnProject(
      invalidRepairPersistenceProject.identity.projectId,
      { action: "approve-generation", expectedRevision: invalidRepairPersistenceProject.stateRevision },
      "macro-d2-invalid-repair-persistence-generation-approve"
    )).project;
    invalidRepairPersistenceProject = (await invalidRepairService.actOnProject(
      invalidRepairPersistenceProject.identity.projectId,
      { action: "execute-generation", expectedRevision: invalidRepairPersistenceProject.stateRevision },
      "macro-d2-invalid-repair-persistence-generation-execute"
    )).project;
    const invalidRepairPreservedDigest = invalidRepairPersistenceProject.exportManifest?.manifestDigest;
    invalidRepairPersistenceProject = (await invalidRepairService.actOnProject(
      invalidRepairPersistenceProject.identity.projectId,
      { action: "request-repair", expectedRevision: invalidRepairPersistenceProject.stateRevision },
      "macro-d2-invalid-repair-persistence-request"
    )).project;
    invalidRepairPersistenceProject = (await invalidRepairService.actOnProject(
      invalidRepairPersistenceProject.identity.projectId,
      { action: "approve-repair", expectedRevision: invalidRepairPersistenceProject.stateRevision },
      "macro-d2-invalid-repair-persistence-approve"
    )).project;
    const invalidRepairPersistenceDeliveries = fixtureDeliveries;
    invalidRepairPersistenceProject = (await invalidRepairService.actOnProject(
      invalidRepairPersistenceProject.identity.projectId,
      { action: "execute-repair", expectedRevision: invalidRepairPersistenceProject.stateRevision },
      "macro-d2-invalid-repair-persistence-execute"
    )).project;
    const durableInvalidRepair = await persistence.readProject(
      invalidRepairPersistenceProject.identity.projectId
    );
    assert(
      invalidRepairTerminalWriteFailed &&
        fixtureDeliveries === invalidRepairPersistenceDeliveries + 1 &&
        durableInvalidRepair.status === "failed" &&
        durableInvalidRepair.repair?.attempt === 1 &&
        durableInvalidRepair.materializations.length === 1 &&
        durableInvalidRepair.exportManifest?.manifestDigest === invalidRepairPreservedDigest &&
        durableInvalidRepair.auditEvents.filter((event) => event.eventType === "repair.result_rejected").length === 1,
      "one terminal persistence failure is reconciled once without stranding invalid repair or losing revision 1"
    );
    await expectFailure(
      () => materializationModule.readCreatorMaterializationPublication({
        persistence,
        projectId: durableInvalidRepair.identity.projectId,
        artifactRevision: 2,
      }),
      "not_found",
      "persistence-reconciled invalid repair still publishes no replacement revision"
    );

    let mismatchTerminalWriteFailed = false;
    let serveMismatchedTerminal = false;
    let mismatchedTerminalCandidate = null;
    const mismatchedTerminalPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          !mismatchTerminalWriteFailed &&
          project.identity.projectTitle === "D2 Invalid Terminal Mismatch Site" &&
          project.status === "rejected_output"
        ) {
          mismatchTerminalWriteFailed = true;
          serveMismatchedTerminal = true;
          mismatchedTerminalCandidate = project;
          throw new Error("deterministic terminal write failure with mismatched readback");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
      async readProject(projectId) {
        if (serveMismatchedTerminal && mismatchedTerminalCandidate) {
          serveMismatchedTerminal = false;
          return {
            ...mismatchedTerminalCandidate,
            failureMessage: "A different terminal record must never be adopted by subset match.",
          };
        }
        return persistence.readProject(projectId);
      },
    };
    const mismatchedTerminalService = serviceModule.createCreatorService({
      persistence: mismatchedTerminalPersistence,
      lifecycle,
    });
    let mismatchedTerminalProject = (await mismatchedTerminalService.createProject(
      { ...input, projectTitle: "D2 Invalid Terminal Mismatch Site" },
      "macro-d2-invalid-terminal-mismatch-create"
    )).project;
    mismatchedTerminalProject = (await mismatchedTerminalService.actOnProject(
      mismatchedTerminalProject.identity.projectId,
      { action: "approve-generation", expectedRevision: mismatchedTerminalProject.stateRevision },
      "macro-d2-invalid-terminal-mismatch-approve"
    )).project;
    const mismatchedExpectedRevision = mismatchedTerminalProject.stateRevision;
    const mismatchedExecuteKey = "macro-d2-invalid-terminal-mismatch-execute";
    const mismatchedDeliveriesBefore = fixtureDeliveries;
    await expectFailure(
      () => mismatchedTerminalService.actOnProject(
        mismatchedTerminalProject.identity.projectId,
        { action: "execute-generation", expectedRevision: mismatchedExpectedRevision },
        mismatchedExecuteKey
      ),
      "internal_failure",
      "terminal reconciliation rejects a subset-matching but canonically different readback"
    );
    mismatchedTerminalProject = await persistence.readProject(
      mismatchedTerminalProject.identity.projectId
    );
    assert(
      mismatchTerminalWriteFailed &&
        mismatchedTerminalProject.status === "generating" &&
        fixtureDeliveries === mismatchedDeliveriesBefore + 1,
      "mismatched terminal readback makes no false durable-state claim and performs one provider-bound delivery"
    );
    await expectFailure(
      () => mismatchedTerminalService.actOnProject(
        mismatchedTerminalProject.identity.projectId,
        { action: "cancel", expectedRevision: mismatchedTerminalProject.stateRevision },
        mismatchedExecuteKey
      ),
      "idempotency_conflict",
      "an in-progress execution idempotency key cannot be rebound to a different mutation"
    );
    mismatchedTerminalProject = await explicitlyRecoverProject(
      mismatchedTerminalService,
      mismatchedTerminalProject,
      "macro-d2-invalid-terminal-mismatch-recover",
      "mismatched terminal output recovery"
    );
    assert(
      mismatchedTerminalProject.status === "rejected_output" &&
        mismatchedTerminalProject.failureCode === "output_validation_failed" &&
        fixtureDeliveries === mismatchedDeliveriesBefore + 1 &&
        mismatchedTerminalProject.auditEvents.filter(
          (event) => event.eventType === "output.rejected"
        ).length === 1,
      "separate explicit recovery reconciles the exact result without a second provider execution"
    );

    let terminalLifecycleRun = null;
    const terminalLifecycle = {
      ...lifecycle,
      async getRun(input) {
        return terminalLifecycleRun?.runId === input.runId
          ? terminalLifecycleRun
          : lifecycle.getRun(input);
      },
      async executeRun(executionInput) {
        const approvedRun = await lifecycle.getRun({
          projectId: executionInput.projectId,
          purpose: executionInput.purpose,
          runId: executionInput.runId,
          ownershipBindingId: executionInput.ownershipBindingId,
        });
        const blockedAt = new Date().toISOString();
        const errorCode = "kill_switch_blocked";
        const safeErrorMessage = "Deterministic terminal lifecycle block.";
        terminalLifecycleRun = {
          ...approvedRun,
          state: "blocked",
          revision: approvedRun.revision + 1,
          updatedAt: blockedAt,
          execution: {
            executionId: "d2-terminal-lifecycle-execution",
            status: "blocked",
            idempotencyKeyHash: adapterModule.buildCreatorExecutionIdempotencyKeyHash(
              executionInput.projectId,
              executionInput.purpose,
              executionInput.executionIntentIdempotencyKeyHash
            ),
            approvalScopeHash: executionInput.expectedApprovalScopeHash,
            startedAt: blockedAt,
            completedAt: blockedAt,
            previousRevision: approvedRun.revision,
            runningRevision: null,
            resultingRevision: approvedRun.revision + 1,
            outputText: null,
            outputSha256: null,
            doneReason: null,
            totalDurationNanoseconds: null,
            loadDurationNanoseconds: null,
            promptEvalCount: null,
            evalCount: null,
            provider: "ollama-local",
            model: "gpt-oss:20b",
            errorCode,
            safeErrorMessage,
            responseStatus: 409,
          },
        };
        return {
          run: terminalLifecycleRun,
          outputText: null,
          replayed: false,
          responseStatus: 409,
          errorCode,
          safeErrorMessage,
        };
      },
    };
    const terminalLifecycleService = serviceModule.createCreatorService({ persistence, lifecycle: terminalLifecycle });
    let terminalLifecycleProject = (await terminalLifecycleService.createProject(
      { ...input, projectTitle: "D2 Terminal Lifecycle Binding Site" },
      "macro-d2-terminal-lifecycle-create"
    )).project;
    terminalLifecycleProject = (await terminalLifecycleService.actOnProject(
      terminalLifecycleProject.identity.projectId,
      { action: "approve-generation", expectedRevision: terminalLifecycleProject.stateRevision },
      "macro-d2-terminal-lifecycle-approve"
    )).project;
    const deliveriesBeforeTerminalLifecycle = fixtureDeliveries;
    terminalLifecycleProject = (await terminalLifecycleService.actOnProject(
      terminalLifecycleProject.identity.projectId,
      { action: "execute-generation", expectedRevision: terminalLifecycleProject.stateRevision },
      "macro-d2-terminal-lifecycle-execute"
    )).project;
    const observedTerminalRun = await getExactBoundRun(
      terminalLifecycle,
      terminalLifecycleProject,
      terminalLifecycleProject.runBindings[0]
    );
    assert(
      terminalLifecycleProject.status === "failed" &&
        terminalLifecycleProject.failureCode === "kill_switch_blocked" &&
        terminalLifecycleProject.runBindings[0].sourceRunRevision === observedTerminalRun.revision &&
        observedTerminalRun.state === "blocked" &&
        fixtureDeliveries === deliveriesBeforeTerminalLifecycle,
      "terminal blocked lifecycle output is exact-binding validated and its returned run revision is durably recorded without provider delivery"
    );

    let canceledBindingProject = (await service.createProject(
      { ...input, projectTitle: "D2 Cancellation Run Revision Site" },
      "macro-d2-cancellation-revision-create"
    )).project;
    canceledBindingProject = (await service.actOnProject(
      canceledBindingProject.identity.projectId,
      { action: "cancel", expectedRevision: canceledBindingProject.stateRevision },
      "macro-d2-cancellation-revision-cancel"
    )).project;
    const canceledRun = await getExactBoundRun(
      lifecycle,
      canceledBindingProject,
      canceledBindingProject.runBindings[0]
    );
    assert(
      canceledBindingProject.status === "canceled" &&
        canceledRun.state === "canceled" &&
        canceledBindingProject.runBindings[0].sourceRunRevision === canceledRun.revision &&
        canceledBindingProject.approvalPacket.privateAlphaRunRevision === canceledRun.revision,
      "creator cancellation durably records the exact returned canceled run revision in both binding and approval packet"
    );

    const createIdentityKey = "macro-d2-create-identity-key";
    const createIdentityInput = { ...input, projectTitle: "D2 Create Identity Site" };
    const createdIdentity = await service.createProject(createIdentityInput, createIdentityKey);
    const replayedIdentity = await service.createProject(createIdentityInput, createIdentityKey);
    assert(
      createdIdentity.created === true &&
        replayedIdentity.created === false &&
        replayedIdentity.project.identity.projectId === createdIdentity.project.identity.projectId &&
        replayedIdentity.project.stateRevision === createdIdentity.project.stateRevision,
      "exact create replay remains bound to the original create mutation kind, request digest, and historical revision"
    );
    await expectFailure(
      () => service.createProject({ ...createIdentityInput, projectTitle: "D2 Changed Create Identity Site" }, createIdentityKey),
      "idempotency_conflict",
      "a create idempotency key cannot be rebound to a different creator request identity"
    );

    let postValidationKillEngaged = true;
    const postValidationKillLifecycle = {
      ...lifecycle,
      async readKillSwitch() {
        return { killSwitchEngaged: postValidationKillEngaged, sources: [], checkedAt: new Date().toISOString() };
      },
    };
    const postValidationKillService = serviceModule.createCreatorService({ persistence, lifecycle: postValidationKillLifecycle });
    let postValidationGeneration = (await postValidationKillService.createProject(
      { ...input, projectTitle: "D2 Post Validation Kill Generation Site" },
      "macro-d2-post-validation-kill-generation-create"
    )).project;
    postValidationGeneration = (await postValidationKillService.actOnProject(
      postValidationGeneration.identity.projectId,
      { action: "approve-generation", expectedRevision: postValidationGeneration.stateRevision },
      "macro-d2-post-validation-kill-generation-approve"
    )).project;
    const postValidationGenerationRevision = postValidationGeneration.stateRevision;
    const postValidationGenerationKey = "macro-d2-post-validation-kill-generation-execute";
    const deliveriesBeforePostValidationGeneration = fixtureDeliveries;
    await expectFailure(
      () => postValidationKillService.actOnProject(
        postValidationGeneration.identity.projectId,
        { action: "execute-generation", expectedRevision: postValidationGenerationRevision },
        postValidationGenerationKey
      ),
      "kill_switch_blocked",
      "post-validation kill switch blocks publication while preserving the validated generation result"
    );
    postValidationGeneration = await persistence.readProject(postValidationGeneration.identity.projectId);
    assert(
      postValidationGeneration.status === "validating" &&
        postValidationGeneration.validation?.valid === true &&
        postValidationGeneration.artifactProposal !== null &&
        postValidationGeneration.materializations.length === 0 &&
        fixtureDeliveries === deliveriesBeforePostValidationGeneration + 1,
      "generation remains in exact recoverable validating state after post-validation kill-switch activation"
    );
    await expectFailure(
      () => postValidationKillService.actOnProject(
        postValidationGeneration.identity.projectId,
        { action: "cancel", expectedRevision: postValidationGeneration.stateRevision },
        postValidationGenerationKey
      ),
      "idempotency_conflict",
      "validating generation key cannot be rebound to cancellation"
    );
    await expectFailure(
      () => postValidationKillService.actOnProject(
        postValidationGeneration.identity.projectId,
        { action: "cancel", expectedRevision: postValidationGeneration.stateRevision },
        "macro-d2-post-validation-kill-generation-distinct-cancel"
      ),
      "idempotency_conflict",
      "a distinct cancellation key cannot supersede an in-progress validation recovery intent"
    );
    postValidationKillEngaged = false;
    postValidationGeneration = await explicitlyRecoverProject(
      postValidationKillService,
      postValidationGeneration,
      "macro-d2-post-validation-kill-generation-recover",
      "post-validation generation publication recovery"
    );
    assert(
      postValidationGeneration.status === "ready" &&
        postValidationGeneration.materializations.length === 1 &&
        fixtureDeliveries === deliveriesBeforePostValidationGeneration + 1,
      "explicit generation recovery publishes the validated result without a second provider delivery"
    );

    postValidationKillEngaged = false;
    let postValidationRepair = (await postValidationKillService.createProject(
      { ...input, projectTitle: "D2 Post Validation Kill Repair Site" },
      "macro-d2-post-validation-kill-repair-create"
    )).project;
    postValidationRepair = (await postValidationKillService.actOnProject(
      postValidationRepair.identity.projectId,
      { action: "approve-generation", expectedRevision: postValidationRepair.stateRevision },
      "macro-d2-post-validation-kill-repair-generation-approve"
    )).project;
    postValidationRepair = (await postValidationKillService.actOnProject(
      postValidationRepair.identity.projectId,
      { action: "execute-generation", expectedRevision: postValidationRepair.stateRevision },
      "macro-d2-post-validation-kill-repair-generation-execute"
    )).project;
    assert(postValidationRepair.status === "ready" && postValidationRepair.validation.issues.length > 0, "repair kill-switch fixture starts from one valid warning-bearing revision");
    postValidationRepair = (await postValidationKillService.actOnProject(
      postValidationRepair.identity.projectId,
      { action: "request-repair", expectedRevision: postValidationRepair.stateRevision },
      "macro-d2-post-validation-kill-repair-request"
    )).project;
    postValidationRepair = (await postValidationKillService.actOnProject(
      postValidationRepair.identity.projectId,
      { action: "approve-repair", expectedRevision: postValidationRepair.stateRevision },
      "macro-d2-post-validation-kill-repair-approve"
    )).project;
    const postValidationRepairRevision = postValidationRepair.stateRevision;
    const postValidationRepairKey = "macro-d2-post-validation-kill-repair-execute";
    const deliveriesBeforePostValidationRepair = fixtureDeliveries;
    postValidationKillEngaged = true;
    await expectFailure(
      () => postValidationKillService.actOnProject(
        postValidationRepair.identity.projectId,
        { action: "execute-repair", expectedRevision: postValidationRepairRevision },
        postValidationRepairKey
      ),
      "kill_switch_blocked",
      "post-validation kill switch blocks repair publication while preserving its single returned replacement"
    );
    postValidationRepair = await persistence.readProject(postValidationRepair.identity.projectId);
    assert(
      postValidationRepair.status === "validating" &&
        postValidationRepair.artifactProposalBinding?.purpose === "repair" &&
        postValidationRepair.repair?.attempt === 1 &&
        postValidationRepair.materializations.length === 1 &&
        fixtureDeliveries === deliveriesBeforePostValidationRepair + 1,
      "repair remains in exact recoverable validating state with prior immutable revision preserved"
    );
    postValidationKillEngaged = false;
    postValidationRepair = await explicitlyRecoverProject(
      postValidationKillService,
      postValidationRepair,
      "macro-d2-post-validation-kill-repair-recover",
      "post-validation repair publication recovery"
    );
    assert(
      postValidationRepair.status === "ready" &&
        postValidationRepair.materializations.length === 2 &&
        fixtureDeliveries === deliveriesBeforePostValidationRepair + 1,
      "explicit repair recovery publishes revision 2 without a second provider delivery or repair attempt"
    );

    async function assertOrphanPublicationMutationRejected(title, prefix, mutateManifest, label) {
      let readyWriteFailuresRemaining = 2;
      const crashPersistence = {
        ...persistence,
        async writeNextProject(project, expectedPreviousRevision) {
          if (readyWriteFailuresRemaining > 0 && project.identity.projectTitle === title && project.status === "ready") {
            readyWriteFailuresRemaining -= 1;
            throw new Error(`deterministic ${label} final-state failure`);
          }
          return persistence.writeNextProject(project, expectedPreviousRevision);
        },
      };
      const crashService = serviceModule.createCreatorService({ persistence: crashPersistence, lifecycle });
      let project = (await crashService.createProject({ ...input, projectTitle: title }, `${prefix}-create`)).project;
      project = (await crashService.actOnProject(project.identity.projectId, { action: "approve-generation", expectedRevision: project.stateRevision }, `${prefix}-approve`)).project;
      const executeRevision = project.stateRevision;
      const deliveriesBefore = fixtureDeliveries;
      await expectFailure(
        () => crashService.actOnProject(project.identity.projectId, { action: "execute-generation", expectedRevision: executeRevision }, `${prefix}-execute`),
        "internal_failure",
        `${label} fixture leaves one immutable orphan publication after a deterministic final-state failure`
      );
      project = await persistence.readProject(project.identity.projectId);
      const manifestPath = await persistence.filesystem.resolve(["projects", project.identity.projectId, "revisions", "000001", "manifest.json"]);
      const original = await fsp.readFile(manifestPath);
      const parsed = JSON.parse(original.toString("utf8"));
      const { manifestDigest: _manifestDigest, ...manifestBase } = parsed;
      const changedBase = mutateManifest(manifestBase);
      const changed = { ...changedBase, manifestDigest: cryptoModule.hashCreatorCanonicalJson(changedBase) };
      await fsp.writeFile(manifestPath, `${cryptoModule.serializeCreatorCanonicalJson(changed)}\n`, { flag: "w" });
      try {
        project = await explicitlyRecoverProject(
          crashService,
          project,
          `${prefix}-recover`,
          `${label} recovery`
        );
        assert(
          readyWriteFailuresRemaining === 0 &&
            project.status === "failed" &&
            project.failureCode === "materialization_failed" &&
            project.materializations.length === 0 &&
            fixtureDeliveries === deliveriesBefore + 1,
          `${label} is rejected rather than adopted and recovery performs no second provider delivery`
        );
      } finally {
        await fsp.writeFile(manifestPath, original, { flag: "w" });
      }
    }
    await assertOrphanPublicationMutationRejected(
      "D2 Orphan Missing Audit Reference Site",
      "macro-d2-orphan-missing-audit",
      (manifest) => ({ ...manifest, auditReferenceIds: manifest.auditReferenceIds.slice(1) }),
      "orphan publication with an omitted audit reference"
    );
    await assertOrphanPublicationMutationRejected(
      "D2 Orphan Extra Audit Reference Site",
      "macro-d2-orphan-extra-audit",
      (manifest) => ({ ...manifest, auditReferenceIds: [...manifest.auditReferenceIds, "f".repeat(24)] }),
      "orphan publication with an extra audit reference"
    );
    await assertOrphanPublicationMutationRejected(
      "D2 Orphan Reordered Audit Reference Site",
      "macro-d2-orphan-reordered-audit",
      (manifest) => ({ ...manifest, auditReferenceIds: [...manifest.auditReferenceIds].reverse() }),
      "orphan publication with reordered audit references"
    );
    await assertOrphanPublicationMutationRejected(
      "D2 Orphan Timestamp Mismatch Site",
      "macro-d2-orphan-timestamp",
      (manifest) => ({ ...manifest, createdAt: "2000-01-01T00:00:00.000Z" }),
      "orphan publication with mismatched creation and materialization timestamps"
    );

    async function createReadyCancellationFixture(title, prefix) {
      let project = (await service.createProject({ ...input, projectTitle: title }, `${prefix}-create`)).project;
      project = (await service.actOnProject(project.identity.projectId, { action: "approve-generation", expectedRevision: project.stateRevision }, `${prefix}-approve`)).project;
      return (await service.actOnProject(project.identity.projectId, { action: "execute-generation", expectedRevision: project.stateRevision }, `${prefix}-execute`)).project;
    }
    let readyCancellationProject = await createReadyCancellationFixture(
      "D2 Ready Cancellation Provenance Site",
      "macro-d2-ready-cancel-provenance"
    );
    const readyApprovalBeforeCancel = JSON.stringify(readyCancellationProject.approvalPacket);
    const readyBindingsBeforeCancel = JSON.stringify(readyCancellationProject.runBindings);
    const readyAuditCountBeforeCancel = readyCancellationProject.auditEvents.length;
    readyCancellationProject = (await service.actOnProject(
      readyCancellationProject.identity.projectId,
      { action: "cancel", expectedRevision: readyCancellationProject.stateRevision },
      "macro-d2-ready-cancel-provenance-cancel"
    )).project;
    assert(
      readyCancellationProject.status === "canceled" &&
        JSON.stringify(readyCancellationProject.approvalPacket) === readyApprovalBeforeCancel &&
        JSON.stringify(readyCancellationProject.runBindings) === readyBindingsBeforeCancel &&
        readyCancellationProject.auditEvents.length === readyAuditCountBeforeCancel + 1 &&
        readyCancellationProject.auditEvents.at(-1)?.eventType === "creator.canceled",
      "ready cancellation preserves executed approval provenance and records only creator cancellation"
    );

    let previewCancellationProject = await createReadyCancellationFixture(
      "D2 Preview Cancellation Provenance Site",
      "macro-d2-preview-cancel-provenance"
    );
    previewCancellationProject = (await service.actOnProject(
      previewCancellationProject.identity.projectId,
      { action: "start-preview", expectedRevision: previewCancellationProject.stateRevision },
      "macro-d2-preview-cancel-provenance-start"
    )).project;
    const previewApprovalBeforeCancel = JSON.stringify(previewCancellationProject.approvalPacket);
    const previewBindingsBeforeCancel = JSON.stringify(previewCancellationProject.runBindings);
    const previewAuditCountBeforeCancel = previewCancellationProject.auditEvents.length;
    previewCancellationProject = (await service.actOnProject(
      previewCancellationProject.identity.projectId,
      { action: "cancel", expectedRevision: previewCancellationProject.stateRevision },
      "macro-d2-preview-cancel-provenance-cancel"
    )).project;
    assert(
      previewCancellationProject.status === "canceled" &&
        previewCancellationProject.preview.status === "stopped" &&
        JSON.stringify(previewCancellationProject.approvalPacket) === previewApprovalBeforeCancel &&
        JSON.stringify(previewCancellationProject.runBindings) === previewBindingsBeforeCancel &&
        previewCancellationProject.auditEvents.length === previewAuditCountBeforeCancel + 2 &&
        JSON.stringify(previewCancellationProject.auditEvents.slice(-2).map((event) => event.eventType)) === JSON.stringify(["preview.stopped", "creator.canceled"]),
      "preview cancellation preserves executed provenance and records exact preview-stop and creator-cancel audit events"
    );

    const stateIntegrityProject = (await service.createProject(
      { ...input, projectTitle: "D2 Persisted State Integrity Site" },
      "macro-d2-persisted-state-integrity-create"
    )).project;
    const statePath = await persistence.filesystem.resolve([
      "projects", stateIntegrityProject.identity.projectId, "state-revisions",
      `${String(stateIntegrityProject.stateRevision).padStart(6, "0")}.json`,
    ]);
    const originalStateBytes = await fsp.readFile(statePath);
    const originalEnvelope = JSON.parse(originalStateBytes.toString("utf8"));
    async function assertStateTamperRejected(serialized, label) {
      await fsp.writeFile(statePath, serialized, { flag: "w" });
      try {
        await expectFailure(
          () => persistence.readProject(stateIntegrityProject.identity.projectId),
          "record_corrupt",
          label
        );
      } finally {
        await fsp.writeFile(statePath, originalStateBytes, { flag: "w" });
      }
    }
    async function assertChecksummedProjectMutationRejected(baseProject, mutateProject, label) {
      const mutatedStatePath = await persistence.filesystem.resolve([
        "projects", baseProject.identity.projectId, "state-revisions",
        `${String(baseProject.stateRevision).padStart(6, "0")}.json`,
      ]);
      const originalBytes = await fsp.readFile(mutatedStatePath);
      const original = JSON.parse(originalBytes.toString("utf8"));
      const changedProject = mutateProject(structuredClone(original.project));
      const changedEnvelope = {
        checksum: cryptoModule.hashCreatorCanonicalJson(changedProject),
        project: changedProject,
      };
      await fsp.writeFile(mutatedStatePath, `${cryptoModule.serializeCreatorCanonicalJson(changedEnvelope)}\n`, { flag: "w" });
      try {
        await expectFailure(
          () => persistence.readProject(baseProject.identity.projectId),
          "record_corrupt",
          label
        );
      } finally {
        await fsp.writeFile(mutatedStatePath, originalBytes, { flag: "w" });
      }
    }
    async function assertHistoricalChecksummedProjectMutationRejected(baseProject, stateRevision, mutateProject, label) {
      const mutatedStatePath = await persistence.filesystem.resolve([
        "projects", baseProject.identity.projectId, "state-revisions",
        `${String(stateRevision).padStart(6, "0")}.json`,
      ]);
      const originalBytes = await fsp.readFile(mutatedStatePath);
      const original = JSON.parse(originalBytes.toString("utf8"));
      const changedProject = mutateProject(structuredClone(original.project));
      const changedEnvelope = {
        checksum: cryptoModule.hashCreatorCanonicalJson(changedProject),
        project: changedProject,
      };
      await fsp.writeFile(mutatedStatePath, `${cryptoModule.serializeCreatorCanonicalJson(changedEnvelope)}\n`, { flag: "w" });
      try {
        await expectFailure(
          () => persistence.readProject(baseProject.identity.projectId),
          "record_corrupt",
          label
        );
      } finally {
        await fsp.writeFile(mutatedStatePath, originalBytes, { flag: "w" });
      }
    }
    async function assertChecksummedHistoryMutationRejected(baseProject, firstRevision, mutateProject, label) {
      const originals = [];
      try {
        for (let revision = firstRevision; revision <= baseProject.stateRevision; revision += 1) {
          const revisionPath = await persistence.filesystem.resolve([
            "projects", baseProject.identity.projectId, "state-revisions",
            `${String(revision).padStart(6, "0")}.json`,
          ]);
          const originalBytes = await fsp.readFile(revisionPath);
          const original = JSON.parse(originalBytes.toString("utf8"));
          const changedProject = mutateProject(structuredClone(original.project));
          const changedEnvelope = {
            checksum: cryptoModule.hashCreatorCanonicalJson(changedProject),
            project: changedProject,
          };
          originals.push({ revisionPath, originalBytes });
          await fsp.writeFile(revisionPath, `${cryptoModule.serializeCreatorCanonicalJson(changedEnvelope)}\n`, { flag: "w" });
        }
        await expectFailure(
          () => persistence.readProject(baseProject.identity.projectId),
          "record_corrupt",
          label
        );
      } finally {
        for (const original of originals) {
          await fsp.writeFile(original.revisionPath, original.originalBytes, { flag: "w" });
        }
      }
    }
    const canonicalProject = cryptoModule.serializeCreatorCanonicalJson(originalEnvelope.project);
    await assertStateTamperRejected(
      `{"checksum":"${originalEnvelope.checksum}","check\\u0073um":"${originalEnvelope.checksum}","project":${canonicalProject}}\n`,
      "self-checksummed project envelope rejects escaped-equivalent duplicate object keys"
    );
    const noncanonicalProject = { ...originalEnvelope.project, updatedAt: originalEnvelope.project.updatedAt.replace(/\.\d{3}Z$/, "Z") };
    const noncanonicalEnvelope = {
      checksum: cryptoModule.hashCreatorCanonicalJson(noncanonicalProject),
      project: noncanonicalProject,
    };
    await assertStateTamperRejected(
      `${cryptoModule.serializeCreatorCanonicalJson(noncanonicalEnvelope)}\n`,
      "self-checksummed project envelope rejects a parseable but noncanonical timestamp"
    );
    await assertChecksummedProjectMutationRejected(
      stateIntegrityProject,
      (project) => {
        const changedPlan = { ...project.plan, destinationBoundary: ".codexforge/creator/projects/forged/revisions/000001/files" };
        const { planDigest: _planDigest, ...planWithoutDigest } = changedPlan;
        changedPlan.planDigest = cryptoModule.hashCreatorCanonicalJson(planWithoutDigest);
        project.plan = changedPlan;
        project.approvalPacket = { ...project.approvalPacket, planDigest: changedPlan.planDigest };
        return project;
      },
      "self-checksummed creator plan cannot substitute a different destination boundary"
    );
    await assertChecksummedHistoryMutationRejected(
      stateIntegrityProject,
      2,
      (project) => {
        project.plan = {
          ...project.plan,
          orderedSteps: ["Deploy automatically without approval."],
          capabilityStatement: "Builds and deploys an unrestricted full-stack application.",
          limitationStatement: "No limitations.",
        };
        const { planDigest: _planDigest, ...planWithoutDigest } = project.plan;
        project.plan.planDigest = cryptoModule.hashCreatorCanonicalJson(planWithoutDigest);
        if (project.approvalPacket) project.approvalPacket = { ...project.approvalPacket, planDigest: project.plan.planDigest };
        return project;
      },
      "self-checksummed plan history cannot rewrite exact server-owned steps, capability, or limitation truth"
    );
    await assertChecksummedProjectMutationRejected(
      stateIntegrityProject,
      (project) => {
        project.runBindings[0] = { ...project.runBindings[0], sourceArtifactRevision: 1 };
        project.approvalPacket = {
          ...project.approvalPacket,
          sourceArtifactRevision: 1,
          targetArtifactRevision: 2,
          destinationBoundary: `.codexforge/creator/projects/${project.identity.projectId}/revisions/000002/files`,
        };
        return project;
      },
      "self-checksummed generation provenance cannot claim a source artifact or revision-2 destination"
    );
    assert(
      stateIntegrityProject.runBindings.every((binding) => /^[a-f0-9]{24}$/.test(binding.sourceRunId)) &&
        /^[a-f0-9]{24}$/.test(stateIntegrityProject.approvalPacket.privateAlphaRunId),
      "persisted creator source identity uses the exact 24-hex Private Alpha run-ID shape"
    );
    await assertChecksummedProjectMutationRejected(
      stateIntegrityProject,
      (project) => {
        const invalidRunId = "not-a-private-alpha-run";
        project.runBindings[0] = { ...project.runBindings[0], sourceRunId: invalidRunId };
        project.approvalPacket = { ...project.approvalPacket, privateAlphaRunId: invalidRunId };
        const runBoundIndex = project.auditEvents.findIndex((event) => event.eventType === "run.bound");
        project.auditEvents[runBoundIndex] = { ...project.auditEvents[runBoundIndex], sourceRunId: invalidRunId };
        return project;
      },
      "self-checksummed creator provenance rejects a non-Private-Alpha source-run identity even when all references agree"
    );
    await assertChecksummedProjectMutationRejected(
      stateIntegrityProject,
      (project) => {
        project.request = { ...project.request, description: "\u0301\ufe0f" };
        project.request.requestDigest = cryptoModule.hashCreatorCanonicalJson({
          creatorKind: project.request.creatorKind,
          projectTitle: project.request.projectTitle,
          description: project.request.description,
        });
        project.plan = { ...project.plan, requestDigest: project.request.requestDigest };
        const { planDigest: _planDigest, ...planWithoutDigest } = project.plan;
        project.plan.planDigest = cryptoModule.hashCreatorCanonicalJson(planWithoutDigest);
        project.approvalPacket = { ...project.approvalPacket, planDigest: project.plan.planDigest };
        project.runBindings[0] = {
          ...project.runBindings[0],
          requestEnvelopeDigest: cryptoModule.hashCreatorSha256(contractModule.buildCreatorGenerationInstruction({
            projectTitle: project.identity.projectTitle,
            description: project.request.description,
          })),
        };
        return project;
      },
      "self-checksummed persisted creator brief rejects visually empty Unicode even with recomputed request, plan, and run digests"
    );
    await assertChecksummedProjectMutationRejected(
      mainProject,
      (project) => {
        project.repair = { ...project.repair, sourceArtifactRevision: null };
        return project;
      },
      "self-checksummed repair record cannot diverge from its run binding and approval packet source revision"
    );
    await assertChecksummedProjectMutationRejected(
      mainProject,
      (project) => {
        const repairBindingIndex = project.runBindings.findIndex((binding) => binding.purpose === "repair");
        project.repair = { ...project.repair, sourceArtifactRevision: null };
        project.runBindings[repairBindingIndex] = { ...project.runBindings[repairBindingIndex], sourceArtifactRevision: null };
        project.approvalPacket = {
          ...project.approvalPacket,
          sourceArtifactRevision: null,
          targetArtifactRevision: 1,
          destinationBoundary: `.codexforge/creator/projects/${project.identity.projectId}/revisions/000001/files`,
        };
        return project;
      },
      "self-checksummed repair packet and binding cannot approve revision 1 after immutable revision 1 already exists"
    );
    const repairRequestedRevision = mainProject.auditEvents.find((event) => event.eventType === "repair.requested")?.stateRevision;
    assert(Number.isSafeInteger(repairRequestedRevision), "repair audit exposes its exact historical request revision for provenance tamper checks");
    await assertHistoricalChecksummedProjectMutationRejected(
      mainProject,
      repairRequestedRevision,
      (project) => {
        project.repair = {
          ...project.repair,
          validationIssueDigest: "0".repeat(64),
          issueCodes: ["forged.repair.issue"],
          repairContextDigest: "1".repeat(64),
        };
        return project;
      },
      "historical repair-request revision rejects forged validation issue and repair-instruction provenance"
    );
    await assertHistoricalChecksummedProjectMutationRejected(
      mainProject,
      repairRequestedRevision,
      (project) => {
        project.repair = null;
        return project;
      },
      "historical repair-request phase cannot omit the consumed one-attempt repair record"
    );
    await assertChecksummedProjectMutationRejected(
      readyCancellationProject,
      (project) => {
        project.runBindings = project.runBindings.map((binding) => ({
          ...binding,
          sourceRunRevision: binding.sourceRunRevision + 1,
        }));
        return project;
      },
      "self-checksummed ready cancellation cannot advance an already completed source-run revision"
    );
    await assertChecksummedProjectMutationRejected(
      previewCancellationProject,
      (project) => {
        project.runBindings = project.runBindings.map((binding) => ({
          ...binding,
          sourceRunRevision: binding.sourceRunRevision + 2,
        }));
        return project;
      },
      "self-checksummed preview cancellation cannot forge a post-execution source-run revision jump"
    );
    await assertChecksummedProjectMutationRejected(
      terminalRepairBindProject,
      (project) => {
        const generationBindingIndex = project.runBindings.findIndex(
          (binding) => binding.purpose === "generation"
        );
        project.runBindings[generationBindingIndex] = {
          ...project.runBindings[generationBindingIndex],
          sourceRunRevision: project.runBindings[generationBindingIndex].sourceRunRevision + 2,
        };
        return project;
      },
      "self-checksummed repair-bind failure cannot advance the preserved generation source-run revision"
    );
    await assertChecksummedProjectMutationRejected(
      readyCancellationProject,
      (project) => {
        project.approvalPacket = { ...project.approvalPacket, status: "canceled" };
        return project;
      },
      "self-checksummed post-execution creator cancellation cannot rewrite the approved Private Alpha packet as canceled"
    );
    await assertChecksummedProjectMutationRejected(
      readyCancellationProject,
      (project) => {
        project.failureCode = "internal_failure";
        project.failureMessage = "Invented canceled-state failure.";
        return project;
      },
      "self-checksummed canceled creator cannot invent failure evidence without an exact failure transition"
    );
    const repairAcceptedEvent = mainProject.auditEvents.find((event) => event.eventType === "repair.result_accepted");
    assert(repairAcceptedEvent && Number.isSafeInteger(repairAcceptedEvent.stateRevision), "repair acceptance exposes its exact publication revision for provenance checks");
    await assertHistoricalChecksummedProjectMutationRejected(
      mainProject,
      repairAcceptedEvent.stateRevision,
      (project) => {
        const eventIndex = project.auditEvents.findIndex((event) => event.eventId === repairAcceptedEvent.eventId);
        project.auditEvents[eventIndex] = { ...project.auditEvents[eventIndex], artifactRevision: 1 };
        return project;
      },
      "self-checksummed repair acceptance cannot claim the preserved prior artifact instead of its exact replacement revision"
    );
    const repairExecutionEvent = mainProject.auditEvents.find((event) =>
      event.eventType === "execution.requested" &&
      event.sourceRunId === mainProject.runBindings.find((binding) => binding.purpose === "repair")?.sourceRunId
    );
    const generationRunId = mainProject.runBindings.find((binding) => binding.purpose === "generation")?.sourceRunId;
    assert(repairExecutionEvent && generationRunId, "repair execution and generation run expose exact distinct provenance for history checks");
    await assertChecksummedHistoryMutationRejected(
      mainProject,
      repairExecutionEvent.stateRevision,
      (project) => {
        const eventIndex = project.auditEvents.findIndex((event) => event.eventId === repairExecutionEvent.eventId);
        if (eventIndex >= 0) project.auditEvents[eventIndex] = { ...project.auditEvents[eventIndex], sourceRunId: generationRunId };
        return project;
      },
      "self-checksummed repair execution history cannot be rebound consistently to the completed generation run"
    );
    const repairFailureEvent = failedRepairProject.auditEvents.find((event) => event.eventType === "failure.recorded");
    const failedRepairGenerationRunId = failedRepairProject.runBindings.find((binding) => binding.purpose === "generation")?.sourceRunId;
    assert(repairFailureEvent && failedRepairGenerationRunId, "failed repair exposes exact failure and generation provenance for tamper checks");
    await assertHistoricalChecksummedProjectMutationRejected(
      failedRepairProject,
      repairFailureEvent.stateRevision,
      (project) => {
        const eventIndex = project.auditEvents.findIndex((event) => event.eventId === repairFailureEvent.eventId);
        project.auditEvents[eventIndex] = { ...project.auditEvents[eventIndex], sourceRunId: failedRepairGenerationRunId };
        return project;
      },
      "self-checksummed failed repair cannot bind failure evidence to the completed generation run"
    );
    await assertHistoricalChecksummedProjectMutationRejected(
      mainProject,
      repairAcceptedEvent.stateRevision,
      (project) => {
        project.artifactProposal = { ...project.artifactProposal, explanation: "Substituted after validation." };
        project.validation = {
          ...project.validation,
          bundleDigest: cryptoModule.hashCreatorCanonicalJson({
            contractVersion: project.artifactProposal.contractVersion,
            projectTitle: project.artifactProposal.projectTitle,
            creatorKind: project.artifactProposal.creatorKind,
            entrypoint: project.artifactProposal.entrypoint,
            files: project.artifactProposal.files,
            explanation: project.artifactProposal.explanation,
          }),
        };
        const validationDigest = validationModule.buildCreatorValidationDigest(project.validation);
        project.materializations = project.materializations.map((materialization) =>
          materialization.artifactRevision === repairAcceptedEvent.artifactRevision
            ? { ...materialization, validationDigest }
            : materialization
        );
        project.exportManifest = { ...project.exportManifest, validationDigest };
        const { manifestDigest: _manifestDigest, ...manifestWithoutDigest } = project.exportManifest;
        project.exportManifest.manifestDigest = cryptoModule.hashCreatorCanonicalJson(manifestWithoutDigest);
        return project;
      },
      "self-checksummed publication cannot substitute provider proposal text after validation even with recomputed downstream digests"
    );
    await assertChecksummedProjectMutationRejected(
      readyCancellationProject,
      (project) => {
        project.materializations = [
          ...project.materializations,
          {
            ...project.materializations[0],
            artifactRevision: 2,
            destinationLabel: `.codexforge/creator/projects/${project.identity.projectId}/revisions/000002/files`,
          },
        ];
        return project;
      },
      "self-checksummed project cannot append a second materialization without one exact repair publication transition"
    );
    assert((await persistence.readProject(stateIntegrityProject.identity.projectId)).stateRevision === stateIntegrityProject.stateRevision, "persisted state integrity fixtures restore the exact valid immutable revision");

    const validationPath = await persistence.filesystem.resolve([
      "projects", mainProject.identity.projectId, "revisions", "000002", "validation.json",
    ]);
    const originalValidationBytes = await fsp.readFile(validationPath);
    const originalValidationSource = originalValidationBytes.toString("utf8").trim();
    async function assertValidationMetadataTamperRejected(serialized, label) {
      await fsp.writeFile(validationPath, `${serialized}\n`, { flag: "w" });
      try {
        await expectFailure(
          () => materializationModule.readCreatorMaterializationPublication({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 2 }),
          "export_digest_mismatch",
          label
        );
      } finally {
        await fsp.writeFile(validationPath, originalValidationBytes, { flag: "w" });
      }
    }
    const duplicateValidationSource = originalValidationSource.replace('"valid":true', '"valid":true,"v\\u0061lid":true');
    assert(duplicateValidationSource !== originalValidationSource, "validation metadata duplicate-key fixture changes the exact serialized document");
    await assertValidationMetadataTamperRejected(duplicateValidationSource, "publication validation metadata rejects escaped-equivalent duplicate keys");
    const parsedValidation = JSON.parse(originalValidationSource);
    await assertValidationMetadataTamperRejected(
      cryptoModule.serializeCreatorCanonicalJson({ ...parsedValidation, unexpectedValidationField: true }),
      "publication validation metadata rejects unknown fields even when JSON remains well formed"
    );
    assert((await materializationModule.readCreatorMaterializationPublication({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 2 })).manifest.manifestDigest === mainProject.exportManifest.manifestDigest, "publication validation metadata restore preserves the exact immutable revision binding");

    const staleBundle = {
      ...mainProject.artifactProposal,
      files: mainProject.artifactProposal.files.map((file, index) => index === 0 ? { ...file, content: `${file.content}\n<!-- stale validation content mutation -->` } : file),
    };
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 3,
        bundle: staleBundle,
        validation: mainProject.validation,
        runBinding: currentBinding,
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_blocked",
      "materialization re-runs the complete validator and rejects changed content paired with stale valid metadata"
    );
    const forgedWarning = {
      code: "test.warning_block_mismatch",
      stage: 8,
      severity: "warning",
      filePath: "index.html",
      message: "A warning cannot claim to block materialization.",
      suggestedRepairContext: "Preserve exact severity and blocking semantics.",
      blocksMaterialization: true,
    };
    const forgedIssues = [...mainProject.validation.issues, forgedWarning];
    const forgedWarningValidation = {
      ...mainProject.validation,
      issues: forgedIssues,
      issueDigest: cryptoModule.hashCreatorCanonicalJson(forgedIssues),
    };
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence,
        projectId: mainProject.identity.projectId,
        projectTitle: mainProject.identity.projectTitle,
        sourceRequestDigest: mainProject.request.requestDigest,
        artifactRevision: 3,
        bundle: mainProject.artifactProposal,
        validation: forgedWarningValidation,
        runBinding: currentBinding,
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_blocked",
      "materialization rejects warning severity and blocksMaterialization inconsistency even with a recomputed issue digest"
    );
    await expectFailure(
      () => materializationModule.readCreatorMaterializationPublication({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 3 }),
      "not_found",
      "stale bundle and forged validation attempts publish no revision or metadata"
    );

    const unexpectedRevisionEntryPath = await persistence.filesystem.resolve([
      "projects", mainProject.identity.projectId, "revisions", "000002", "unexpected.txt",
    ]);
    await fsp.writeFile(unexpectedRevisionEntryPath, "unexpected\n", { flag: "wx" });
    try {
      await expectFailure(
        () => materializationModule.readCreatorMaterializationPublication({
          persistence,
          projectId: mainProject.identity.projectId,
          artifactRevision: 2,
        }),
        "export_digest_mismatch",
        "complete publication reconciliation rejects an unlisted revision-tree entry"
      );
    } finally {
      await fsp.rm(unexpectedRevisionEntryPath, { force: true });
    }
    assert(
      (await materializationModule.readCreatorMaterializationPublication({
        persistence,
        projectId: mainProject.identity.projectId,
        artifactRevision: 2,
      })).manifest.manifestDigest === mainProject.exportManifest.manifestDigest,
      "removing the test-owned unexpected entry restores the exact immutable publication"
    );

    for (const metadataName of ["manifest.json", "validation.json", "revision.json"]) {
      const metadataPath = await persistence.filesystem.resolve([
        "projects", mainProject.identity.projectId, "revisions", "000002", metadataName,
      ]);
      const canonicalMetadata = await fsp.readFile(metadataPath);
      const parseEquivalentNoncanonicalMetadata = `${JSON.stringify(
        JSON.parse(canonicalMetadata.toString("utf8")),
        null,
        2
      )}\n`;
      assert(
        !canonicalMetadata.equals(Buffer.from(parseEquivalentNoncanonicalMetadata, "utf8")),
        `${metadataName} noncanonical fixture changes bytes without changing parsed JSON`
      );
      await fsp.writeFile(metadataPath, parseEquivalentNoncanonicalMetadata, { flag: "w" });
      try {
        await expectFailure(
          () => materializationModule.readCreatorMaterializationPublication({
            persistence,
            projectId: mainProject.identity.projectId,
            artifactRevision: 2,
          }),
          "export_digest_mismatch",
          `complete publication reconciliation rejects parse-equivalent noncanonical ${metadataName} bytes`
        );
      } finally {
        await fsp.writeFile(metadataPath, canonicalMetadata, { flag: "w" });
      }
    }
    assert(
      (await materializationModule.readCreatorMaterializationPublication({
        persistence,
        projectId: mainProject.identity.projectId,
        artifactRevision: 2,
      })).manifest.manifestDigest === mainProject.exportManifest.manifestDigest,
      "restoring every canonical metadata byte sequence restores the exact immutable publication"
    );

    const exportManifestPath = await persistence.filesystem.resolve([
      "projects", mainProject.identity.projectId, "revisions", "000002", "manifest.json",
    ]);
    const originalExportManifestBytes = await fsp.readFile(exportManifestPath);
    const diskManifest = JSON.parse(originalExportManifestBytes.toString("utf8"));
    const { manifestDigest: _diskManifestDigest, ...diskManifestBase } = diskManifest;
    const reboundManifestBase = { ...diskManifestBase, projectTitle: "D2 Rebound Manifest Title" };
    const reboundManifest = {
      ...reboundManifestBase,
      manifestDigest: cryptoModule.hashCreatorCanonicalJson(reboundManifestBase),
    };
    await fsp.writeFile(exportManifestPath, `${cryptoModule.serializeCreatorCanonicalJson(reboundManifest)}\n`, { flag: "w" });
    try {
      const selfValidPublication = await materializationModule.readCreatorMaterializationPublication({ persistence, projectId: mainProject.identity.projectId, artifactRevision: 2 });
      assert(selfValidPublication.manifest.projectTitle === "D2 Rebound Manifest Title", "self-digested disk manifest fixture remains internally valid before project binding validation");
      await expectFailure(
        () => service.readExportManifest(mainProject.identity.projectId, 2),
        "export_digest_mismatch",
        "export read rejects an internally valid manifest that is not byte-exactly bound to immutable project state"
      );
      await expectFailure(
        () => service.readExportFile({ projectId: mainProject.identity.projectId, artifactRevision: 2, filePath: "index.html" }),
        "export_digest_mismatch",
        "export file read rejects the same full-publication binding mismatch"
      );
    } finally {
      await fsp.writeFile(exportManifestPath, originalExportManifestBytes, { flag: "w" });
    }
    assert((await service.readExportManifest(mainProject.identity.projectId, 2)).manifestDigest === mainProject.exportManifest.manifestDigest, "full export publication binding restore returns the exact project-approved manifest");

    let postRenameProjectId = null;
    let postRenameFailureInjected = false;
    const postRenameFilesystem = new Proxy(persistence.filesystem, {
      get(target, property, receiver) {
        if (property === "publishTreeExclusive") {
          return async (targetSegments, orderedEntries) => {
            await target.publishTreeExclusive(targetSegments, orderedEntries);
            if (
              !postRenameFailureInjected &&
              postRenameProjectId &&
              targetSegments.join("/") === `projects/${postRenameProjectId}/revisions/000001`
            ) {
              postRenameFailureInjected = true;
              throw new Error("deterministic post-publication response failure");
            }
          };
        }
        const value = Reflect.get(target, property, receiver);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
    const postRenamePersistence = { ...persistence, filesystem: postRenameFilesystem };
    const postRenameService = serviceModule.createCreatorService({
      persistence: postRenamePersistence,
      lifecycle,
    });
    let postRenameProject = (await postRenameService.createProject(
      { ...input, projectTitle: "D2 Post Rename Reconciliation Site" },
      "macro-d2-post-rename-create"
    )).project;
    postRenameProjectId = postRenameProject.identity.projectId;
    postRenameProject = (await postRenameService.actOnProject(
      postRenameProject.identity.projectId,
      { action: "approve-generation", expectedRevision: postRenameProject.stateRevision },
      "macro-d2-post-rename-approve"
    )).project;
    const deliveriesBeforePostRename = fixtureDeliveries;
    postRenameProject = (await postRenameService.actOnProject(
      postRenameProject.identity.projectId,
      { action: "execute-generation", expectedRevision: postRenameProject.stateRevision },
      "macro-d2-post-rename-execute"
    )).project;
    assert(
      postRenameFailureInjected &&
        postRenameProject.status === "ready" &&
        postRenameProject.materializations.length === 1 &&
        postRenameProject.failureCode === null &&
        fixtureDeliveries === deliveriesBeforePostRename + 1,
      "post-publication response failure reconciles only the exact complete publication instead of terminalizing it"
    );
    const reconciledPostRenamePublication = await materializationModule.readCreatorMaterializationPublication({
      persistence,
      projectId: postRenameProject.identity.projectId,
      artifactRevision: 1,
    });
    assert(
      reconciledPostRenamePublication.manifest.manifestDigest === postRenameProject.exportManifest?.manifestDigest,
      "post-publication reconciliation retains one exact digest-bound publication"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      postRenameProject.identity.projectId,
      "post-publication reconciliation leaves no transient revision residue"
    );
    let conflictingPostRenameInjected = false;
    const conflictingPostRenameFilesystem = new Proxy(persistence.filesystem, {
      get(target, property, receiver) {
        if (property === "publishTreeExclusive") {
          return async (targetSegments, orderedEntries) => {
            await target.publishTreeExclusive(targetSegments, orderedEntries);
            if (
              !conflictingPostRenameInjected &&
              targetSegments.join("/") === `projects/${postRenameProject.identity.projectId}/revisions/000002`
            ) {
              conflictingPostRenameInjected = true;
              const manifestPath = await target.resolve([...targetSegments, "manifest.json"]);
              const manifest = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
              const { manifestDigest: _manifestDigest, ...manifestBase } = manifest;
              const conflictingBase = { ...manifestBase, projectTitle: "Conflicting Post Rename Publication" };
              const conflictingManifest = {
                ...conflictingBase,
                manifestDigest: cryptoModule.hashCreatorCanonicalJson(conflictingBase),
              };
              await fsp.writeFile(
                manifestPath,
                `${cryptoModule.serializeCreatorCanonicalJson(conflictingManifest)}\n`,
                { flag: "w" }
              );
              throw new Error("deterministic conflicting post-publication response failure");
            }
          };
        }
        const value = Reflect.get(target, property, receiver);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
    const conflictingPostRenamePersistence = { ...persistence, filesystem: conflictingPostRenameFilesystem };
    const deliveriesBeforeConflictingPostRename = fixtureDeliveries;
    await expectFailure(
      () => materializationModule.materializeCreatorArtifact({
        persistence: conflictingPostRenamePersistence,
        projectId: postRenameProject.identity.projectId,
        projectTitle: postRenameProject.identity.projectTitle,
        sourceRequestDigest: postRenameProject.request.requestDigest,
        artifactRevision: 2,
        bundle: postRenameProject.artifactProposal,
        validation: postRenameProject.validation,
        runBinding: postRenameProject.runBindings[0],
        auditReferenceIds: [],
        materializedAt: new Date().toISOString(),
      }),
      "materialization_failed",
      "post-publication reconciliation rejects a self-digested publication that differs from the exact attempted bytes"
    );
    const conflictingPostRenamePublication = await materializationModule.readCreatorMaterializationPublication({
      persistence,
      projectId: postRenameProject.identity.projectId,
      artifactRevision: 2,
    });
    assert(
      conflictingPostRenameInjected &&
        conflictingPostRenamePublication.manifest.projectTitle === "Conflicting Post Rename Publication" &&
        fixtureDeliveries === deliveriesBeforeConflictingPostRename,
      "conflicting post-publication revision is never adopted, overwritten, or retried"
    );
    await assertNoTransientRevisionEntries(
      persistence,
      postRenameProject.identity.projectId,
      "conflicting post-publication revision is not accompanied by transient residue"
    );

    const substitutedApprovalLifecycle = {
      ...lifecycle,
      async approveRun(approvalInput) {
        const run = await lifecycle.approveRun(approvalInput);
        const substitutedRequestText = `${run.request.normalizedRequestText}\nSubstituted approval response.`;
        return {
          ...run,
          request: { ...run.request, normalizedRequestText: substitutedRequestText },
          approvalScope: {
            ...run.approvalScope,
            normalizedRequestHash: cryptoModule.hashCreatorSha256(substitutedRequestText),
          },
        };
      },
    };
    const substitutedApprovalService = serviceModule.createCreatorService({
      persistence,
      lifecycle: substitutedApprovalLifecycle,
    });
    let substitutedApprovalProject = (await substitutedApprovalService.createProject(
      { ...input, projectTitle: "D2 Approval Binding Site" },
      "macro-d2-approval-binding-create"
    )).project;
    const deliveriesBeforeSubstitutedApproval = fixtureDeliveries;
    substitutedApprovalProject = (await substitutedApprovalService.actOnProject(
      substitutedApprovalProject.identity.projectId,
      { action: "approve-generation", expectedRevision: substitutedApprovalProject.stateRevision },
      "macro-d2-approval-binding-approve"
    )).project;
    const exactSubstitutedApprovalRun = await getExactBoundRun(
      lifecycle,
      substitutedApprovalProject,
      substitutedApprovalProject.runBindings[0]
    );
    assert(
      substitutedApprovalProject.status === "approved" &&
        substitutedApprovalProject.approvalPacket?.status === "approved" &&
        !exactSubstitutedApprovalRun.request.normalizedRequestText.includes("Substituted approval response") &&
        substitutedApprovalProject.approvalPacket.privateAlphaRunRevision === exactSubstitutedApprovalRun.revision &&
        substitutedApprovalProject.auditEvents.filter((event) => event.eventType === "approval.recorded").length === 1 &&
        fixtureDeliveries === deliveriesBeforeSubstitutedApproval,
      "substituted approval response is discarded in favor of the exact persisted approved run without provider delivery"
    );
    const forgedApprovalRecordLifecycle = {
      ...lifecycle,
      async approveRun(approvalInput) {
        const run = await lifecycle.approveRun(approvalInput);
        return {
          ...run,
          approval: run.approval ? {
            ...run.approval,
            approvalScopeHash: "f".repeat(64),
            previousRevision: run.approval.previousRevision + 1,
          } : null,
        };
      },
    };
    const forgedApprovalRecordService = serviceModule.createCreatorService({
      persistence,
      lifecycle: forgedApprovalRecordLifecycle,
    });
    let forgedApprovalRecordProject = (await forgedApprovalRecordService.createProject(
      { ...input, projectTitle: "D2 Approval Record Binding Site" },
      "macro-d2-approval-record-create"
    )).project;
    forgedApprovalRecordProject = (await forgedApprovalRecordService.actOnProject(
      forgedApprovalRecordProject.identity.projectId,
      { action: "approve-generation", expectedRevision: forgedApprovalRecordProject.stateRevision },
      "macro-d2-approval-record-approve"
    )).project;
    const exactForgedApprovalRun = await getExactBoundRun(
      lifecycle,
      forgedApprovalRecordProject,
      forgedApprovalRecordProject.runBindings[0]
    );
    assert(
      forgedApprovalRecordProject.status === "approved" &&
        forgedApprovalRecordProject.approvalPacket?.approvalScopeHash === exactForgedApprovalRun.approvalScopeHash &&
        forgedApprovalRecordProject.approvalPacket.privateAlphaRunRevision === exactForgedApprovalRun.revision &&
        forgedApprovalRecordProject.auditEvents.filter((event) => event.eventType === "approval.recorded").length === 1 &&
        fixtureDeliveries === deliveriesBeforeSubstitutedApproval,
      "forged approval response is discarded and only the exact persisted approval evidence is recorded"
    );

    let recordedExecutionOutput = null;
    const substitutedOutputLifecycle = {
      ...lifecycle,
      async executeRun(executionInput) {
        const result = await lifecycle.executeRun(executionInput);
        recordedExecutionOutput = result.run.execution?.outputText ?? null;
        return {
          ...result,
          outputText: result.outputText?.replace("Say hello", "Substituted hello") ?? null,
        };
      },
    };
    const substitutedOutputService = serviceModule.createCreatorService({
      persistence,
      lifecycle: substitutedOutputLifecycle,
    });
    let substitutedOutputProject = (await substitutedOutputService.createProject(
      { ...input, projectTitle: "D2 Run Output Binding Site" },
      "macro-d2-output-binding-create"
    )).project;
    substitutedOutputProject = (await substitutedOutputService.actOnProject(
      substitutedOutputProject.identity.projectId,
      { action: "approve-generation", expectedRevision: substitutedOutputProject.stateRevision },
      "macro-d2-output-binding-approve"
    )).project;
    const substitutedOutputExpectedRevision = substitutedOutputProject.stateRevision;
    const deliveriesBeforeSubstitutedOutput = fixtureDeliveries;
    substitutedOutputProject = (await substitutedOutputService.actOnProject(
      substitutedOutputProject.identity.projectId,
      { action: "execute-generation", expectedRevision: substitutedOutputExpectedRevision },
      "macro-d2-output-binding-execute"
    )).project;
    assert(
      substitutedOutputProject.status === "failed" &&
        substitutedOutputProject.failureCode === "provider_binding_mismatch" &&
        substitutedOutputProject.artifactProposal === null &&
        substitutedOutputProject.materializations.length === 0 &&
        typeof recordedExecutionOutput === "string" &&
        fixtureDeliveries === deliveriesBeforeSubstitutedOutput + 1,
      "top-level lifecycle output substitution fails closed against the exact source-run output without publication"
    );
    const substitutedOutputReplay = await substitutedOutputService.actOnProject(
      substitutedOutputProject.identity.projectId,
      { action: "execute-generation", expectedRevision: substitutedOutputExpectedRevision },
      "macro-d2-output-binding-execute"
    );
    assert(
      substitutedOutputReplay.replayed && fixtureDeliveries === deliveriesBeforeSubstitutedOutput + 1,
      "source-run output mismatch remains one-attempt and idempotent without retry or fallback"
    );
    const forgedOutputHashLifecycle = {
      ...lifecycle,
      async executeRun(executionInput) {
        const result = await lifecycle.executeRun(executionInput);
        return {
          ...result,
          run: {
            ...result.run,
            execution: result.run.execution ? {
              ...result.run.execution,
              outputSha256: "0".repeat(64),
            } : null,
          },
        };
      },
    };
    const forgedOutputHashService = serviceModule.createCreatorService({
      persistence,
      lifecycle: forgedOutputHashLifecycle,
    });
    let forgedOutputHashProject = (await forgedOutputHashService.createProject(
      { ...input, projectTitle: "D2 Run Output Hash Binding Site" },
      "macro-d2-output-hash-create"
    )).project;
    forgedOutputHashProject = (await forgedOutputHashService.actOnProject(
      forgedOutputHashProject.identity.projectId,
      { action: "approve-generation", expectedRevision: forgedOutputHashProject.stateRevision },
      "macro-d2-output-hash-approve"
    )).project;
    const deliveriesBeforeForgedOutputHash = fixtureDeliveries;
    forgedOutputHashProject = (await forgedOutputHashService.actOnProject(
      forgedOutputHashProject.identity.projectId,
      { action: "execute-generation", expectedRevision: forgedOutputHashProject.stateRevision },
      "macro-d2-output-hash-execute"
    )).project;
    assert(
      forgedOutputHashProject.status === "failed" &&
        forgedOutputHashProject.failureCode === "provider_binding_mismatch" &&
        forgedOutputHashProject.artifactProposal === null &&
        forgedOutputHashProject.materializations.length === 0 &&
        fixtureDeliveries === deliveriesBeforeForgedOutputHash + 1,
      "forged source-run output hash fails closed before validation or materialization"
    );
    const contradictoryLifecycleResult = {
      ...lifecycle,
      async executeRun(executionInput) {
        const result = await lifecycle.executeRun(executionInput);
        return {
          ...result,
          run: {
            ...result.run,
            cancellation: {
              cancellationId: "contradictory-terminal-result",
              canceledAt: result.run.updatedAt,
              actor: "local-operator",
              reason: "Contradictory deterministic terminal lifecycle response.",
              previousRevision: result.run.revision,
              resultingRevision: result.run.revision + 1,
            },
          },
        };
      },
    };
    const contradictoryLifecycleService = serviceModule.createCreatorService({
      persistence,
      lifecycle: contradictoryLifecycleResult,
    });
    let contradictoryLifecycleProject = (await contradictoryLifecycleService.createProject(
      { ...input, projectTitle: "D2 Contradictory Lifecycle Result Site" },
      "macro-d2-contradictory-lifecycle-create"
    )).project;
    contradictoryLifecycleProject = (await contradictoryLifecycleService.actOnProject(
      contradictoryLifecycleProject.identity.projectId,
      { action: "approve-generation", expectedRevision: contradictoryLifecycleProject.stateRevision },
      "macro-d2-contradictory-lifecycle-approve"
    )).project;
    const contradictoryLifecycleExpectedRevision = contradictoryLifecycleProject.stateRevision;
    const deliveriesBeforeContradictoryLifecycle = fixtureDeliveries;
    contradictoryLifecycleProject = (await contradictoryLifecycleService.actOnProject(
      contradictoryLifecycleProject.identity.projectId,
      { action: "execute-generation", expectedRevision: contradictoryLifecycleExpectedRevision },
      "macro-d2-contradictory-lifecycle-execute"
    )).project;
    assert(
      contradictoryLifecycleProject.status === "failed" &&
        contradictoryLifecycleProject.failureCode === "provider_binding_mismatch" &&
        contradictoryLifecycleProject.artifactProposal === null &&
        contradictoryLifecycleProject.materializations.length === 0 &&
        fixtureDeliveries === deliveriesBeforeContradictoryLifecycle + 1,
      "terminal lifecycle result carrying contradictory cancellation evidence fails closed before validation and publication"
    );
    const contradictoryLifecycleReplay = await contradictoryLifecycleService.actOnProject(
      contradictoryLifecycleProject.identity.projectId,
      { action: "execute-generation", expectedRevision: contradictoryLifecycleExpectedRevision },
      "macro-d2-contradictory-lifecycle-execute"
    );
    assert(contradictoryLifecycleReplay.replayed && fixtureDeliveries === deliveriesBeforeContradictoryLifecycle + 1, "contradictory terminal lifecycle evidence remains one-attempt and idempotent without retry or fallback");

    for (const [downgradeLabel, buildDowngradeHash] of [
      ["framed-v1", adapterModule.buildHistoricalCreatorExecutionIdempotencyKeyHash],
      ["raw-v1", adapterModule.buildLegacyCreatorExecutionIdempotencyKeyHash],
    ]) {
      let downgradedTerminalRun = null;
      const downgradedLifecycle = {
        ...lifecycle,
        async getRun(runInput) {
          return downgradedTerminalRun?.runId === runInput.runId
            ? downgradedTerminalRun
            : lifecycle.getRun(runInput);
        },
        async executeRun(executionInput) {
          const result = await lifecycle.executeRun(executionInput);
          downgradedTerminalRun = {
            ...result.run,
            execution: result.run.execution
              ? {
                  ...result.run.execution,
                  idempotencyKeyHash: buildDowngradeHash(
                    executionInput.projectId,
                    executionInput.purpose
                  ),
                }
              : null,
          };
          throw new Error(`deterministic ${downgradeLabel} terminal substitution after publication`);
        },
      };
      const downgradedService = serviceModule.createCreatorService({
        persistence,
        lifecycle: downgradedLifecycle,
      });
      let downgradedProject = (await downgradedService.createProject(
        { ...input, projectTitle: `D2 ${downgradeLabel} Execution Downgrade Site` },
        `macro-d2-${downgradeLabel}-downgrade-create`
      )).project;
      downgradedProject = (await downgradedService.actOnProject(
        downgradedProject.identity.projectId,
        { action: "approve-generation", expectedRevision: downgradedProject.stateRevision },
        `macro-d2-${downgradeLabel}-downgrade-approve`
      )).project;
      const downgradedApprovedRevision = downgradedProject.stateRevision;
      const downgradeActionKey = `macro-d2-${downgradeLabel}-downgrade-execute`;
      const deliveriesBeforeDowngrade = fixtureDeliveries;
      downgradedProject = (await downgradedService.actOnProject(
        downgradedProject.identity.projectId,
        { action: "execute-generation", expectedRevision: downgradedApprovedRevision },
        downgradeActionKey
      )).project;
      assert(
        downgradedProject.status === "failed" &&
          downgradedProject.failureCode === "provider_binding_mismatch" &&
          downgradedProject.artifactProposal === null &&
          downgradedProject.materializations.length === 0 &&
          fixtureDeliveries === deliveriesBeforeDowngrade + 1,
        `${downgradeLabel} terminal execution identity cannot replace the exact persisted v2 creator intent`
      );
      const downgradedReplay = await downgradedService.actOnProject(
        downgradedProject.identity.projectId,
        { action: "execute-generation", expectedRevision: downgradedApprovedRevision },
        downgradeActionKey
      );
      assert(
        downgradedReplay.replayed && fixtureDeliveries === deliveriesBeforeDowngrade + 1,
        `${downgradeLabel} downgrade rejection is durable and cannot trigger a second provider attempt`
      );
    }

    let loseGenerationResponse = true;
    const lostGenerationResponseLifecycle = {
      ...lifecycle,
      async executeRun(executionInput) {
        const result = await lifecycle.executeRun(executionInput);
        if (loseGenerationResponse && executionInput.purpose === "generation") {
          loseGenerationResponse = false;
          throw new Error("deterministic generation response loss after terminal lifecycle publication");
        }
        return result;
      },
    };
    const lostGenerationResponseService = serviceModule.createCreatorService({
      persistence,
      lifecycle: lostGenerationResponseLifecycle,
    });
    let lostGenerationResponseProject = (await lostGenerationResponseService.createProject(
      { ...input, projectTitle: "D2 Lost Generation Response Site" },
      "macro-d2-lost-generation-response-create"
    )).project;
    lostGenerationResponseProject = (await lostGenerationResponseService.actOnProject(
      lostGenerationResponseProject.identity.projectId,
      { action: "approve-generation", expectedRevision: lostGenerationResponseProject.stateRevision },
      "macro-d2-lost-generation-response-approve"
    )).project;
    const deliveriesBeforeLostGenerationResponse = fixtureDeliveries;
    lostGenerationResponseProject = (await lostGenerationResponseService.actOnProject(
      lostGenerationResponseProject.identity.projectId,
      { action: "execute-generation", expectedRevision: lostGenerationResponseProject.stateRevision },
      "macro-d2-lost-generation-response-execute"
    )).project;
    const expectedLostGenerationExecutionHash =
      adapterModule.buildCreatorExecutionIdempotencyKeyHash(
        lostGenerationResponseProject.identity.projectId,
        "generation",
        cryptoModule.hashCreatorSha256("macro-d2-lost-generation-response-execute")
      );
    assert(
      !loseGenerationResponse &&
        lostGenerationResponseProject.status === "ready" &&
        lostGenerationResponseProject.materializations.length === 1 &&
        lostGenerationResponseProject.runBindings[0].executionIdempotencyKeyHash ===
          expectedLostGenerationExecutionHash &&
        fixtureDeliveries === deliveriesBeforeLostGenerationResponse + 1,
      `a lost generation response is reconciled from the exact terminal source run without a second provider delivery: ${JSON.stringify({ status: lostGenerationResponseProject.status, materializations: lostGenerationResponseProject.materializations.length, actualHash: lostGenerationResponseProject.runBindings[0].executionIdempotencyKeyHash, expectedHash: expectedLostGenerationExecutionHash, deliveries: fixtureDeliveries - deliveriesBeforeLostGenerationResponse })}`
    );
    const lostGenerationBinding = lostGenerationResponseProject.runBindings[0];
    let mismatchedIntentRejected = false;
    try {
      await lifecycle.executeRun({
        projectId: lostGenerationResponseProject.identity.projectId,
        purpose: "generation",
        runId: lostGenerationBinding.sourceRunId,
        ownershipBindingId: lostGenerationBinding.ownershipBindingId,
        expectedRunRevision: lostGenerationBinding.sourceRunRevision - 2,
        expectedApprovalScopeHash: lostGenerationBinding.approvalScopeHash,
        expectedRequestEnvelopeDigest: lostGenerationBinding.requestEnvelopeDigest,
        executionIntentIdempotencyKeyHash: "0".repeat(64),
      });
    } catch (error) {
      mismatchedIntentRejected = String(error).includes("execution identity");
    }
    assert(
      mismatchedIntentRejected &&
        fixtureDeliveries === deliveriesBeforeLostGenerationResponse + 1,
      "a different v2 execution intent is rejected against the terminal run before retry or provider delivery"
    );

    const futureCreatorNow = "2099-01-01T00:00:00.000Z";
    const rollbackIndependentClockService = serviceModule.createCreatorService({
      persistence,
      lifecycle,
      now: () => futureCreatorNow,
    });
    let rollbackIndependentClockProject = (await rollbackIndependentClockService.createProject(
      { ...input, projectTitle: "D2 Independent Clock Rollback Site" },
      "macro-d2-independent-clock-create"
    )).project;
    rollbackIndependentClockProject = (await rollbackIndependentClockService.actOnProject(
      rollbackIndependentClockProject.identity.projectId,
      { action: "approve-generation", expectedRevision: rollbackIndependentClockProject.stateRevision },
      "macro-d2-independent-clock-approve"
    )).project;
    const deliveriesBeforeIndependentClock = fixtureDeliveries;
    rollbackIndependentClockProject = (await rollbackIndependentClockService.actOnProject(
      rollbackIndependentClockProject.identity.projectId,
      { action: "execute-generation", expectedRevision: rollbackIndependentClockProject.stateRevision },
      "macro-d2-independent-clock-execute"
    )).project;
    const rollbackIndependentClockBinding = rollbackIndependentClockProject.runBindings[0];
    const rollbackIndependentClockRun = await getExactBoundRun(
      lifecycle,
      rollbackIndependentClockProject,
      rollbackIndependentClockBinding
    );
    assert(
      rollbackIndependentClockProject.status === "ready" &&
        rollbackIndependentClockBinding.approvalRecordedAt <
          rollbackIndependentClockBinding.boundAt &&
        rollbackIndependentClockBinding.executionRequestedAt === futureCreatorNow &&
        rollbackIndependentClockRun.execution?.startedAt < futureCreatorNow &&
        rollbackIndependentClockRun.execution.idempotencyKeyHash ===
          rollbackIndependentClockBinding.executionIdempotencyKeyHash &&
        fixtureDeliveries === deliveriesBeforeIndependentClock + 1,
      "independent store clocks may roll back while exact v2 execution causality remains hash-bound and one-attempt"
    );

    let loseRepairResponse = true;
    const lostRepairResponseLifecycle = {
      ...lifecycle,
      async executeRun(executionInput) {
        const result = await lifecycle.executeRun(executionInput);
        if (loseRepairResponse && executionInput.purpose === "repair") {
          loseRepairResponse = false;
          throw new Error("deterministic repair response loss after terminal lifecycle publication");
        }
        return result;
      },
    };
    const lostRepairResponseService = serviceModule.createCreatorService({
      persistence,
      lifecycle: lostRepairResponseLifecycle,
    });
    let lostRepairResponseProject = (await lostRepairResponseService.createProject(
      { ...input, projectTitle: "D2 Lost Repair Response Site" },
      "macro-d2-lost-repair-response-create"
    )).project;
    lostRepairResponseProject = (await lostRepairResponseService.actOnProject(
      lostRepairResponseProject.identity.projectId,
      { action: "approve-generation", expectedRevision: lostRepairResponseProject.stateRevision },
      "macro-d2-lost-repair-response-generation-approve"
    )).project;
    const deliveriesBeforeLostRepairResponse = fixtureDeliveries;
    lostRepairResponseProject = (await lostRepairResponseService.actOnProject(
      lostRepairResponseProject.identity.projectId,
      { action: "execute-generation", expectedRevision: lostRepairResponseProject.stateRevision },
      "macro-d2-lost-repair-response-generation-execute"
    )).project;
    lostRepairResponseProject = (await lostRepairResponseService.actOnProject(
      lostRepairResponseProject.identity.projectId,
      { action: "request-repair", expectedRevision: lostRepairResponseProject.stateRevision },
      "macro-d2-lost-repair-response-request"
    )).project;
    lostRepairResponseProject = (await lostRepairResponseService.actOnProject(
      lostRepairResponseProject.identity.projectId,
      { action: "approve-repair", expectedRevision: lostRepairResponseProject.stateRevision },
      "macro-d2-lost-repair-response-approve"
    )).project;
    lostRepairResponseProject = (await lostRepairResponseService.actOnProject(
      lostRepairResponseProject.identity.projectId,
      { action: "execute-repair", expectedRevision: lostRepairResponseProject.stateRevision },
      "macro-d2-lost-repair-response-execute"
    )).project;
    assert(
      !loseRepairResponse &&
        lostRepairResponseProject.status === "ready" &&
        lostRepairResponseProject.materializations.length === 2 &&
        lostRepairResponseProject.repair?.attempt === 1 &&
        fixtureDeliveries === deliveriesBeforeLostRepairResponse + 2,
      "a lost repair response is reconciled from the exact terminal source run without a second repair attempt"
    );

    const unconfirmedExecutionLifecycle = {
      ...lifecycle,
      async executeRun() {
        throw new Error("deterministic unconfirmed execution response before provider delivery");
      },
    };
    const unconfirmedExecutionService = serviceModule.createCreatorService({
      persistence,
      lifecycle: unconfirmedExecutionLifecycle,
    });
    let unconfirmedExecutionProject = (await unconfirmedExecutionService.createProject(
      { ...input, projectTitle: "D2 Unconfirmed Execution Recovery Site" },
      "macro-d2-unconfirmed-execution-create"
    )).project;
    unconfirmedExecutionProject = (await unconfirmedExecutionService.actOnProject(
      unconfirmedExecutionProject.identity.projectId,
      { action: "approve-generation", expectedRevision: unconfirmedExecutionProject.stateRevision },
      "macro-d2-unconfirmed-execution-approve"
    )).project;
    const unconfirmedApprovedRevision = unconfirmedExecutionProject.stateRevision;
    const unconfirmedExecuteKey = "macro-d2-unconfirmed-execution-execute";
    const deliveriesBeforeUnconfirmedExecution = fixtureDeliveries;
    await expectFailure(
      () => unconfirmedExecutionService.actOnProject(
        unconfirmedExecutionProject.identity.projectId,
        { action: "execute-generation", expectedRevision: unconfirmedApprovedRevision },
        unconfirmedExecuteKey
      ),
      "execution_blocked",
      "an unconfirmed execution response fails closed without claiming a provider result"
    );
    unconfirmedExecutionProject = await persistence.readProject(unconfirmedExecutionProject.identity.projectId);
    assert(
      unconfirmedExecutionProject.status === "generating" &&
        fixtureDeliveries === deliveriesBeforeUnconfirmedExecution,
      "unconfirmed execution remains durably recoverable and performs no hidden provider delivery"
    );
    unconfirmedExecutionProject = await explicitlyRecoverProject(
      service,
      unconfirmedExecutionProject,
      "macro-d2-unconfirmed-execution-recover",
      "unconfirmed execution recovery"
    );
    assert(
      unconfirmedExecutionProject.status === "ready" &&
        unconfirmedExecutionProject.materializations.length === 1 &&
        fixtureDeliveries === deliveriesBeforeUnconfirmedExecution + 1,
      "a separate explicit recovery reconciles the unconfirmed attempt exactly once without retry storm or substitution"
    );

    async function cyclePreviewToAuditTarget(project, target, prefix) {
      let cycle = 0;
      assert(project.status === "ready" && (target - project.auditEvents.length) % 2 === 0, `${prefix} target is reachable by complete preview cycles`);
      while (project.auditEvents.length < target) {
        project = (await service.actOnProject(
          project.identity.projectId,
          { action: "start-preview", expectedRevision: project.stateRevision },
          `${prefix}-start-${cycle}`
        )).project;
        project = (await service.actOnProject(
          project.identity.projectId,
          { action: "stop-preview", expectedRevision: project.stateRevision },
          `${prefix}-stop-${cycle}`
        )).project;
        cycle += 1;
      }
      assert(project.auditEvents.length === target && project.status === "ready", `${prefix} reaches the exact ready-state audit target without truncation`);
      return project;
    }

    let previewCapacityJourney = (await service.createProject(
      { ...input, projectTitle: "D2 Preview Capacity Journey Site" },
      "macro-d2-preview-capacity-journey-create"
    )).project;
    previewCapacityJourney = (await service.actOnProject(previewCapacityJourney.identity.projectId, { action: "approve-generation", expectedRevision: previewCapacityJourney.stateRevision }, "macro-d2-preview-capacity-journey-approve")).project;
    previewCapacityJourney = (await service.actOnProject(previewCapacityJourney.identity.projectId, { action: "execute-generation", expectedRevision: previewCapacityJourney.stateRevision }, "macro-d2-preview-capacity-journey-execute")).project;
    previewCapacityJourney = await cyclePreviewToAuditTarget(previewCapacityJourney, 124, "macro-d2-preview-capacity-journey-cycle");
    previewCapacityJourney = (await service.actOnProject(previewCapacityJourney.identity.projectId, { action: "start-preview", expectedRevision: previewCapacityJourney.stateRevision }, "macro-d2-preview-capacity-journey-final-start")).project;
    previewCapacityJourney = (await service.actOnProject(previewCapacityJourney.identity.projectId, { action: "stop-preview", expectedRevision: previewCapacityJourney.stateRevision }, "macro-d2-preview-capacity-journey-final-stop")).project;
    previewCapacityJourney = (await service.actOnProject(previewCapacityJourney.identity.projectId, { action: "export", expectedRevision: previewCapacityJourney.stateRevision }, "macro-d2-preview-capacity-journey-export")).project;
    assert(
      previewCapacityJourney.status === "exported" &&
        previewCapacityJourney.exportManifest?.artifactRevision === 1 &&
        previewCapacityJourney.auditEvents.length === 127 &&
        previewCapacityJourney.idempotencyRecords.length <= 128,
      "preview admission near exact capacity preserves the complete stop-and-export recovery journey"
    );

    let repairCapacityJourney = (await service.createProject(
      { ...input, projectTitle: "D2 Repair Capacity Journey Site" },
      "macro-d2-repair-capacity-journey-create"
    )).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "approve-generation", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-generation-approve")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "execute-generation", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-generation-execute")).project;
    repairCapacityJourney = await cyclePreviewToAuditTarget(repairCapacityJourney, 112, "macro-d2-repair-capacity-journey-cycle");
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "request-repair", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-request")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "approve-repair", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-approve")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "execute-repair", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-execute")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "start-preview", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-extra-start")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "stop-preview", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-extra-stop")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "start-preview", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-start")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "stop-preview", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-stop")).project;
    repairCapacityJourney = (await service.actOnProject(repairCapacityJourney.identity.projectId, { action: "export", expectedRevision: repairCapacityJourney.stateRevision }, "macro-d2-repair-capacity-journey-export")).project;
    assert(
      repairCapacityJourney.status === "exported" &&
        repairCapacityJourney.exportManifest?.artifactRevision === 2 &&
        repairCapacityJourney.auditEvents.length === 127 &&
        repairCapacityJourney.idempotencyRecords.length <= 128,
      "near-capacity repair admission preserves its complete separately approved journey and two reserved bind-recovery events"
    );

    const ambiguousGenerationKey = "macro-d2-ambiguous-generation-binding-create";
    const ambiguousGenerationTitle = "D2 Ambiguous Generation Binding Site";
    let loseGenerationBindResponse = true;
    let failGenerationBindRecovery = true;
    const ambiguousGenerationBindingLifecycle = {
      ...lifecycle,
      async bindRun(bindInput) {
        const run = await lifecycle.bindRun(bindInput);
        if (loseGenerationBindResponse && bindInput.purpose === "generation") {
          loseGenerationBindResponse = false;
          throw new Error("deterministic generation bind response loss after Private Alpha publication");
        }
        return run;
      },
      async recoverBoundRun(bindInput) {
        if (failGenerationBindRecovery && bindInput.purpose === "generation") {
          failGenerationBindRecovery = false;
          throw new Error("deterministic transient generation bind recovery read failure");
        }
        return lifecycle.recoverBoundRun(bindInput);
      },
    };
    const ambiguousGenerationBindingService = serviceModule.createCreatorService({
      persistence,
      lifecycle: ambiguousGenerationBindingLifecycle,
    });
    const deliveriesBeforeAmbiguousGenerationBind = fixtureDeliveries;
    await expectFailure(
      () => ambiguousGenerationBindingService.createProject(
        { ...input, projectTitle: ambiguousGenerationTitle },
        ambiguousGenerationKey
      ),
      "run_binding_failed",
      "ambiguous generation binding returns a bounded error without terminalizing the prepared plan"
    );
    const ambiguousGenerationProjectId = cryptoModule.hashCreatorSha256(`creator-project:${ambiguousGenerationKey}`).slice(0, 24);
    let ambiguousGenerationProject = await persistence.readProject(ambiguousGenerationProjectId);
    assert(
      !loseGenerationBindResponse &&
        !failGenerationBindRecovery &&
        ambiguousGenerationProject.status === "draft" &&
        ambiguousGenerationProject.plan !== null &&
        ambiguousGenerationProject.failureCode === null &&
        ambiguousGenerationProject.runBindings.length === 0 &&
        fixtureDeliveries === deliveriesBeforeAmbiguousGenerationBind,
      "ambiguous generation binding preserves a durable recoverable draft and performs no provider delivery"
    );
    ambiguousGenerationProject = (await service.createProject(
      { ...input, projectTitle: ambiguousGenerationTitle },
      ambiguousGenerationKey
    )).project;
    assert(
      ambiguousGenerationProject.status === "awaiting_generation_approval" &&
        ambiguousGenerationProject.runBindings.filter((binding) => binding.purpose === "generation").length === 1 &&
        ambiguousGenerationProject.failureCode === null &&
        fixtureDeliveries === deliveriesBeforeAmbiguousGenerationBind,
      "same-key create replay reconciles the exact latent generation run without creating or executing another run"
    );

    let loseRepairBindResponse = true;
    let failRepairBindRecovery = true;
    const ambiguousRepairBindingLifecycle = {
      ...lifecycle,
      async bindRun(bindInput) {
        const run = await lifecycle.bindRun(bindInput);
        if (loseRepairBindResponse && bindInput.purpose === "repair") {
          loseRepairBindResponse = false;
          throw new Error("deterministic repair bind response loss after Private Alpha publication");
        }
        return run;
      },
      async recoverBoundRun(bindInput) {
        if (failRepairBindRecovery && bindInput.purpose === "repair") {
          failRepairBindRecovery = false;
          throw new Error("deterministic transient repair bind recovery read failure");
        }
        return lifecycle.recoverBoundRun(bindInput);
      },
    };
    const ambiguousRepairBindingService = serviceModule.createCreatorService({
      persistence,
      lifecycle: ambiguousRepairBindingLifecycle,
    });
    let ambiguousRepairProject = (await ambiguousRepairBindingService.createProject(
      { ...input, projectTitle: "D2 Ambiguous Repair Binding Site" },
      "macro-d2-ambiguous-repair-binding-create"
    )).project;
    ambiguousRepairProject = (await ambiguousRepairBindingService.actOnProject(ambiguousRepairProject.identity.projectId, { action: "approve-generation", expectedRevision: ambiguousRepairProject.stateRevision }, "macro-d2-ambiguous-repair-binding-generation-approve")).project;
    ambiguousRepairProject = (await ambiguousRepairBindingService.actOnProject(ambiguousRepairProject.identity.projectId, { action: "execute-generation", expectedRevision: ambiguousRepairProject.stateRevision }, "macro-d2-ambiguous-repair-binding-generation-execute")).project;
    const ambiguousRepairExpectedRevision = ambiguousRepairProject.stateRevision;
    const ambiguousRepairRequestKey = "macro-d2-ambiguous-repair-binding-request";
    const deliveriesBeforeAmbiguousRepairBind = fixtureDeliveries;
    await expectFailure(
      () => ambiguousRepairBindingService.actOnProject(
        ambiguousRepairProject.identity.projectId,
        { action: "request-repair", expectedRevision: ambiguousRepairExpectedRevision },
        ambiguousRepairRequestKey
      ),
      "run_binding_failed",
      "ambiguous repair binding returns a bounded error without consuming a terminal failure state"
    );
    ambiguousRepairProject = await persistence.readProject(ambiguousRepairProject.identity.projectId);
    assert(
      ambiguousRepairProject.status === "repair_requested" &&
        ambiguousRepairProject.repair?.attempt === 1 &&
        ambiguousRepairProject.runBindings.every((binding) => binding.purpose !== "repair") &&
        ambiguousRepairProject.failureCode === null &&
        fixtureDeliveries === deliveriesBeforeAmbiguousRepairBind,
      "ambiguous repair binding preserves the one explicit request and prior valid revision without another provider delivery"
    );
    const ambiguousRepairCancellationExpectedRevision = ambiguousRepairProject.stateRevision;
    const ambiguousRepairCancellationKey = "macro-d2-ambiguous-repair-binding-cancel";
    ambiguousRepairProject = (await service.actOnProject(
      ambiguousRepairProject.identity.projectId,
      { action: "cancel", expectedRevision: ambiguousRepairCancellationExpectedRevision },
      ambiguousRepairCancellationKey
    )).project;
    const ambiguousRepairCancellationIntent = ambiguousRepairProject.auditEvents.find(
      (event) =>
        event.eventType === "cancellation.requested" &&
        event.idempotencyKeyHash === cryptoModule.hashCreatorSha256(ambiguousRepairCancellationKey)
    );
    assert(
      ambiguousRepairProject.status === "canceled" &&
        ambiguousRepairProject.runBindings.filter((binding) => binding.purpose === "repair").length === 1 &&
        ambiguousRepairProject.approvalPacket?.purpose === "repair" &&
        ambiguousRepairProject.approvalPacket.status === "canceled" &&
        ambiguousRepairCancellationIntent?.sourceRunId === null &&
        ambiguousRepairProject.materializations.length === 1 &&
        fixtureDeliveries === deliveriesBeforeAmbiguousRepairBind,
      "separate explicit cancellation uses canonical no-source intent provenance, then reconciles and cancels the exact latent repair run while preserving revision 1"
    );
    const ambiguousRepairCancellationReplay = await service.actOnProject(
      ambiguousRepairProject.identity.projectId,
      { action: "cancel", expectedRevision: ambiguousRepairCancellationExpectedRevision },
      ambiguousRepairCancellationKey
    );
    assert(
      ambiguousRepairCancellationReplay.replayed &&
        ambiguousRepairCancellationReplay.project.stateRevision === ambiguousRepairProject.stateRevision &&
        ambiguousRepairCancellationReplay.project.runBindings.filter(
          (binding) => binding.purpose === "repair"
        ).length === 1,
      "latent repair cancellation replay preserves one exact canceled repair run and creator revision"
    );

    let loseGenerationApprovalResponse = true;
    let failGenerationApprovalRecovery = true;
    const lostGenerationApprovalLifecycle = {
      ...lifecycle,
      async approveRun(approvalInput) {
        const run = await lifecycle.approveRun(approvalInput);
        if (loseGenerationApprovalResponse) {
          loseGenerationApprovalResponse = false;
          throw new Error("deterministic generation approval response loss after Private Alpha publication");
        }
        return run;
      },
      async getRun(input) {
        if (failGenerationApprovalRecovery) {
          failGenerationApprovalRecovery = false;
          throw new Error("deterministic generation approval recovery read failure");
        }
        return lifecycle.getRun(input);
      },
    };
    const lostGenerationApprovalService = serviceModule.createCreatorService({ persistence, lifecycle: lostGenerationApprovalLifecycle });
    let lostGenerationApprovalProject = (await lostGenerationApprovalService.createProject(
      { ...input, projectTitle: "D2 Lost Generation Approval Site" },
      "macro-d2-lost-generation-approval-create"
    )).project;
    const lostGenerationApprovalExpectedRevision = lostGenerationApprovalProject.stateRevision;
    const lostGenerationApprovalKey = "macro-d2-lost-generation-approval-approve";
    const deliveriesBeforeLostGenerationApproval = fixtureDeliveries;
    await expectFailure(
      () => lostGenerationApprovalService.actOnProject(
        lostGenerationApprovalProject.identity.projectId,
        { action: "approve-generation", expectedRevision: lostGenerationApprovalExpectedRevision },
        lostGenerationApprovalKey
      ),
      "approval_failed",
      "unconfirmed generation approval response leaves one durable approval intent"
    );
    lostGenerationApprovalProject = await persistence.readProject(lostGenerationApprovalProject.identity.projectId);
    assert(
      lostGenerationApprovalProject.status === "awaiting_generation_approval" &&
        lostGenerationApprovalProject.auditEvents.filter((event) => event.eventType === "approval.requested").length === 1 &&
        lostGenerationApprovalProject.auditEvents.every((event) => event.eventType !== "approval.recorded") &&
        fixtureDeliveries === deliveriesBeforeLostGenerationApproval,
      "generation approval intent is durable before the external approval boundary and performs no execution"
    );
    await expectFailure(
      () => service.actOnProject(
        lostGenerationApprovalProject.identity.projectId,
        { action: "cancel", expectedRevision: lostGenerationApprovalProject.stateRevision },
        lostGenerationApprovalKey
      ),
      "idempotency_conflict",
      "an approval key that reached Private Alpha cannot be rebound to cancellation after response loss"
    );
    lostGenerationApprovalProject = await explicitlyRecoverProject(
      lostGenerationApprovalService,
      lostGenerationApprovalProject,
      "macro-d2-lost-generation-approval-recover",
      "lost generation approval response recovery"
    );
    assert(
      lostGenerationApprovalProject.status === "approved" &&
        lostGenerationApprovalProject.auditEvents.filter((event) => event.eventType === "approval.requested").length === 1 &&
        lostGenerationApprovalProject.auditEvents.filter((event) => event.eventType === "approval.recorded").length === 1 &&
        fixtureDeliveries === deliveriesBeforeLostGenerationApproval,
      "explicit generation approval recovery reconciles the exact approved source run without execution or a second approval intent"
    );

    let lostRepairApprovalProject = (await service.createProject(
      { ...input, projectTitle: "D2 Lost Repair Approval Site" },
      "macro-d2-lost-repair-approval-create"
    )).project;
    lostRepairApprovalProject = (await service.actOnProject(lostRepairApprovalProject.identity.projectId, { action: "approve-generation", expectedRevision: lostRepairApprovalProject.stateRevision }, "macro-d2-lost-repair-approval-generation-approve")).project;
    lostRepairApprovalProject = (await service.actOnProject(lostRepairApprovalProject.identity.projectId, { action: "execute-generation", expectedRevision: lostRepairApprovalProject.stateRevision }, "macro-d2-lost-repair-approval-generation-execute")).project;
    lostRepairApprovalProject = (await service.actOnProject(lostRepairApprovalProject.identity.projectId, { action: "request-repair", expectedRevision: lostRepairApprovalProject.stateRevision }, "macro-d2-lost-repair-approval-request")).project;
    let loseRepairApprovalResponse = true;
    let failRepairApprovalRecovery = true;
    const lostRepairApprovalLifecycle = {
      ...lifecycle,
      async approveRun(approvalInput) {
        const run = await lifecycle.approveRun(approvalInput);
        if (loseRepairApprovalResponse) {
          loseRepairApprovalResponse = false;
          throw new Error("deterministic repair approval response loss after Private Alpha publication");
        }
        return run;
      },
      async getRun(input) {
        if (failRepairApprovalRecovery) {
          failRepairApprovalRecovery = false;
          throw new Error("deterministic repair approval recovery read failure");
        }
        return lifecycle.getRun(input);
      },
    };
    const lostRepairApprovalService = serviceModule.createCreatorService({ persistence, lifecycle: lostRepairApprovalLifecycle });
    const lostRepairApprovalExpectedRevision = lostRepairApprovalProject.stateRevision;
    const lostRepairApprovalKey = "macro-d2-lost-repair-approval-approve";
    const deliveriesBeforeLostRepairApproval = fixtureDeliveries;
    await expectFailure(
      () => lostRepairApprovalService.actOnProject(
        lostRepairApprovalProject.identity.projectId,
        { action: "approve-repair", expectedRevision: lostRepairApprovalExpectedRevision },
        lostRepairApprovalKey
      ),
      "approval_failed",
      "unconfirmed repair approval response leaves one durable approval intent"
    );
    lostRepairApprovalProject = await persistence.readProject(lostRepairApprovalProject.identity.projectId);
    assert(
      lostRepairApprovalProject.status === "awaiting_repair_approval" &&
        lostRepairApprovalProject.auditEvents.filter((event) => event.eventType === "approval.requested").length === 2 &&
        lostRepairApprovalProject.auditEvents.filter((event) => event.eventType === "approval.recorded").length === 1 &&
        fixtureDeliveries === deliveriesBeforeLostRepairApproval,
      "repair approval intent is separately durable before the external repair approval boundary"
    );
    await expectFailure(
      () => service.actOnProject(
        lostRepairApprovalProject.identity.projectId,
        { action: "cancel", expectedRevision: lostRepairApprovalProject.stateRevision },
        lostRepairApprovalKey
      ),
      "idempotency_conflict",
      "a repair approval key cannot be rebound to cancellation after response loss"
    );
    lostRepairApprovalProject = await explicitlyRecoverProject(
      lostRepairApprovalService,
      lostRepairApprovalProject,
      "macro-d2-lost-repair-approval-recover",
      "lost repair approval response recovery"
    );
    assert(
      lostRepairApprovalProject.status === "repair_approved" &&
        lostRepairApprovalProject.auditEvents.filter((event) => event.eventType === "approval.requested").length === 2 &&
        lostRepairApprovalProject.auditEvents.filter((event) => event.eventType === "approval.recorded").length === 2 &&
        fixtureDeliveries === deliveriesBeforeLostRepairApproval,
      "explicit repair approval recovery reconciles the exact separately approved repair run without execution"
    );

    let listClock = Date.parse("2099-01-01T00:00:00.000Z");
    const orderedListService = serviceModule.createCreatorService({
      persistence,
      lifecycle,
      now: () => new Date(listClock++).toISOString(),
    });
    const orderedListProjects = [];
    for (let index = 0; index < 21; index += 1) {
      orderedListProjects.push((await orderedListService.createProject(
        { ...input, projectTitle: `D2 Ordered List Site ${String(index).padStart(2, "0")}` },
        `macro-d2-ordered-list-create-${String(index).padStart(2, "0")}`
      )).project);
    }
    const boundedLatestProjects = await orderedListService.listProjects(20);
    const expectedLatestProjectIds = orderedListProjects.slice(1).reverse().map((project) => project.identity.projectId);
    assert(
      JSON.stringify(boundedLatestProjects.map((project) => project.identity.projectId)) === JSON.stringify(expectedLatestProjectIds),
      "bounded project listing reads the complete bounded inventory, sorts by exact newest timestamp, and only then applies its limit"
    );

    function makeMutationRequest({
      url = "http://localhost/api/codexforge/creator/projects",
      host = "localhost",
      origin = "http://localhost",
      fetchSite = "same-origin",
      extraHeaders = [],
    } = {}) {
      const headers = new Headers([["Content-Type", "application/json"]]);
      if (host !== null) headers.set("Host", host);
      if (origin !== null) headers.set("Origin", origin);
      if (fetchSite !== null) headers.set("Sec-Fetch-Site", fetchSite);
      for (const [name, value] of extraHeaders) headers.append(name, value);
      return new Request(url, { method: "POST", headers, body: '{"ok":true}' });
    }
    function makeRawCreatorRequest(url, values) {
      const normalized = new Map(
        Object.entries(values).map(([name, value]) => [name.toLowerCase(), value])
      );
      return {
        url,
        headers: {
          get(name) {
            return normalized.get(name.toLowerCase()) ?? null;
          },
        },
      };
    }
    async function expectCreatorRequestFailure(
      request,
      status,
      message,
      mutation = true,
      listenerAddresses = ["127.0.0.1"]
    ) {
      const error = await expectFailure(
        () => httpModule.assertCreatorLoopbackRequest(request, mutation, listenerAddresses),
        "origin_forbidden",
        message
      );
      assert(error.status === status, `${message} returns bounded HTTP ${status}`);
    }

    const httpRequest = makeMutationRequest();
    httpModule.assertCreatorLoopbackRequest(httpRequest, true, ["127.0.0.1"]);
    assert((await httpModule.readCreatorJsonBody(httpRequest)).ok === true, "API accepts matching HTTP Origin and Host with bounded JSON");
    function requestWithRawJsonBody(source) {
      return new Request("http://localhost/api/codexforge/creator/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", Host: "localhost", Origin: "http://localhost" },
        body: source,
      });
    }
    await expectFailure(
      () => httpModule.readCreatorJsonBody(requestWithRawJsonBody('{"ok":true,"ok":false}')),
      "invalid_request",
      "API rejects exact duplicate JSON request keys before parse collapse"
    );
    await expectFailure(
      () => httpModule.readCreatorJsonBody(requestWithRawJsonBody('{"ok":true,"o\\u006b":false}')),
      "invalid_request",
      "API rejects escaped-equivalent duplicate JSON request keys before parse collapse"
    );
    const exactJsonBody = await httpModule.readCreatorJsonBody(requestWithRawJsonBody('{"ok":true,"nested":{"value":1}}'));
    assert(exactJsonBody.ok === true && exactJsonBody.nested.value === 1, "API continues to accept bounded exact JSON with unique keys");
    const httpDefaultPortRequest = makeMutationRequest({ host: "LOCALHOST:80" });
    httpModule.assertCreatorLoopbackRequest(httpDefaultPortRequest, true, ["127.0.0.1"]);
    assert(true, "API normalizes an explicit HTTP default port consistently");
    const httpsRequest = makeMutationRequest({
      url: "https://localhost/api/codexforge/creator/projects",
      host: "LOCALHOST:443",
      origin: "HTTPS://LOCALHOST:443",
    });
    httpModule.assertCreatorLoopbackRequest(httpsRequest, true, ["127.0.0.1"]);
    assert(true, "API accepts matching HTTPS Origin and Host with default-port normalization");
    const nonDefaultPortRequest = makeMutationRequest({
      url: "http://127.0.0.1:56911/api/codexforge/creator/projects",
      host: "127.0.0.1:56911",
      origin: "http://127.0.0.1:56911",
    });
    httpModule.assertCreatorLoopbackRequest(nonDefaultPortRequest, true, ["127.0.0.1"]);
    assert(true, "API accepts an exact matching non-default port");
    const webpackAuthorityRequest = makeMutationRequest({
      url: "http://localhost:3000/api/codexforge/creator/projects",
      host: "127.0.0.1:56912",
      origin: "http://127.0.0.1:56912",
    });
    httpModule.assertCreatorLoopbackRequest(webpackAuthorityRequest, true, ["127.0.0.1"]);
    assert(true, "API trusts exact browser-visible Host and Origin when Next internal loopback authority differs");
    const ipv6Request = makeMutationRequest({
      url: "http://[::1]:3000/api/codexforge/creator/projects",
      host: "[::1]:56913",
      origin: "http://[::1]:56913",
    });
    httpModule.assertCreatorLoopbackRequest(ipv6Request, true, ["::1"]);
    assert(true, "API accepts exact bracketed IPv6 loopback authority");
    const forwardedIgnoredRequest = makeMutationRequest({
      extraHeaders: [["X-Forwarded-Host", "evil.example"], ["X-Forwarded-Proto", "https"]],
    });
    httpModule.assertCreatorLoopbackRequest(forwardedIgnoredRequest, true, ["127.0.0.1"]);
    assert(true, "API ignores spoofed forwarded authority when real Host and Origin are valid");
    const missingFetchMetadataRequest = makeMutationRequest({ fetchSite: null });
    httpModule.assertCreatorLoopbackRequest(missingFetchMetadataRequest, true, ["127.0.0.1"]);
    assert(true, "API preserves established optional Sec-Fetch-Site behavior");

    await expectCreatorRequestFailure(
      makeMutationRequest(),
      503,
      "API rejects loopback-looking headers when the actual listener is wildcard-bound",
      true,
      ["0.0.0.0"]
    );
    await expectCreatorRequestFailure(
      new Request("http://example.com/api/codexforge/creator/projects", {
        method: "GET",
        headers: { Host: "example.com" },
      }),
      404,
      "API rejects non-loopback internal and external request authorities",
      false
    );
    await expectCreatorRequestFailure(makeMutationRequest({ origin: null }), 403, "API rejects missing mutation Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ host: null }), 404, "API rejects missing external Host");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://example.com" }), 403, "API rejects a different Origin host");
    await expectCreatorRequestFailure(
      makeMutationRequest({
        url: "http://localhost:56911/api/codexforge/creator/projects",
        host: "localhost:56911",
        origin: "http://localhost:56912",
      }),
      403,
      "API rejects a different Origin port"
    );
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "https://localhost" }), 403, "API rejects an Origin scheme different from the trusted request URL");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://127.0.0.1" }), 403, "API does not treat localhost and 127.0.0.1 as interchangeable");
    await expectCreatorRequestFailure(
      makeMutationRequest({
        host: "127.0.0.1.evil.example",
        origin: "http://127.0.0.1.evil.example",
      }),
      404,
      "API rejects matched non-loopback lookalike authorities"
    );
    await expectCreatorRequestFailure(
      makeMutationRequest({ host: "127.0.0.1", origin: "http://user:pass@127.0.0.1" }),
      403,
      "API rejects credential-bearing Origin"
    );
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost@127.0.0.1.evil.example" }), 403, "API rejects userinfo lookalike Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "null" }), 403, "API rejects opaque null Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://[::1" }), 403, "API rejects malformed Origin");
    await expectCreatorRequestFailure(
      makeMutationRequest({ extraHeaders: [["Origin", "http://127.0.0.1"]] }),
      403,
      "API rejects multiple comma-combined Origin values"
    );
    await expectCreatorRequestFailure(
      makeMutationRequest({ extraHeaders: [["Host", "127.0.0.1"]] }),
      404,
      "API rejects multiple comma-combined Host values"
    );
    await expectCreatorRequestFailure(makeMutationRequest({ fetchSite: "cross-site" }), 403, "API rejects cross-site Sec-Fetch-Site");
    await expectCreatorRequestFailure(makeMutationRequest({ fetchSite: "same-site" }), 403, "API preserves exact same-origin-only fetch metadata policy");
    await expectCreatorRequestFailure(
      makeMutationRequest({
        origin: "http://127.0.0.1",
        extraHeaders: [["X-Forwarded-Host", "127.0.0.1"]],
      }),
      403,
      "Spoofed x-forwarded-host cannot rescue a real authority mismatch"
    );
    await expectCreatorRequestFailure(
      makeMutationRequest({
        origin: "https://localhost",
        extraHeaders: [["X-Forwarded-Proto", "https"]],
      }),
      403,
      "Spoofed x-forwarded-proto cannot rescue a real scheme mismatch"
    );
    await expectCreatorRequestFailure(
      makeMutationRequest({
        url: "http://localhost/api/codexforge/creator/projects",
        host: "127.0.0.1",
        origin: "http://localhost",
      }),
      403,
      "API rejects external Host mismatch even when internal URL matches Origin"
    );
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost/path" }), 403, "API rejects path content in Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost?query=1" }), 403, "API rejects query content in Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost#fragment" }), 403, "API rejects fragment content in Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "ftp://localhost" }), 403, "API rejects non-HTTP Origin schemes");
    await expectCreatorRequestFailure(makeMutationRequest({ host: "localhost/path" }), 404, "API rejects path content in Host");
    await expectCreatorRequestFailure(makeMutationRequest({ host: "user@localhost" }), 404, "API rejects userinfo in Host");
    await expectCreatorRequestFailure(
      makeRawCreatorRequest("http://localhost/api/codexforge/creator/projects", {
        Host: "localhost",
        Origin: "http://local host",
        "Sec-Fetch-Site": "same-origin",
      }),
      403,
      "API rejects whitespace in Origin"
    );
    await expectCreatorRequestFailure(
      makeRawCreatorRequest("http://localhost/api/codexforge/creator/projects", {
        Host: "local\u0000host",
        Origin: "http://localhost",
        "Sec-Fetch-Site": "same-origin",
      }),
      404,
      "API rejects control characters in Host"
    );
    for (const invalidAuthority of [
      "127.1",
      "2130706433",
      "0177.0.0.1",
      "localhost.",
      "localhost:0",
      "localhost:080",
      "localhost:65536",
      "::1",
      "[::1",
    ]) {
      await expectCreatorRequestFailure(
        makeMutationRequest({ host: invalidAuthority, origin: "http://localhost" }),
        404,
        `API rejects non-canonical or malformed Host authority ${invalidAuthority}`
      );
    }
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost\\evil" }), 403, "API rejects backslash authority confusion in Origin");
    await expectCreatorRequestFailure(makeMutationRequest({ origin: "http://localhost/" }), 403, "API rejects trailing path syntax in Origin");
    const oversizedRequest = new Request("http://localhost/api/codexforge/creator/projects", { method: "POST", headers: { "Content-Type": "application/json", "Origin": "http://localhost" }, body: `{"x":"${"x".repeat(17000)}"}` });
    await expectFailure(() => httpModule.readCreatorJsonBody(oversizedRequest), "body_too_large", "streamed oversized API body is rejected");

    activityTrap.assertZeroActivity();
    assert(activityCounters.fetch === 0 && activityCounters.externalNetwork === 0 && activityCounters.credentialResolution === 0, "D2 traps and proves zero fetch, external network, and credential reads");
    assert(fixtureOutputs.length === 83, "D2 declares the exact complete deterministic provider-output inventory");
    assert(
      fixtureDeliveries === fixtureOutputs.length,
      "D2 consumes every deterministic fixture exactly once through an explicit generation or repair attempt"
    );
    assert(fs.existsSync(productionCreatorRoot) === productionCreatorBefore, "D2 does not create or mutate the production creator root");
    const productionPrivateAlphaAfter = fs.existsSync(productionPrivateAlphaRoot)
      ? (await fsp.readdir(productionPrivateAlphaRoot)).sort().join("\n")
      : "absent";
    assert(productionPrivateAlphaAfter === productionPrivateAlphaBefore, "D2 does not mutate production Private Alpha data");
  } finally {
    await persistence.cleanupTestRoot().catch(() => undefined);
    await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
  }
  assert(!fs.existsSync(path.resolve(repoRoot, ".codexforge", "creator-tests", suffix)), "D2 creator test root is cleaned");
  assert(!fs.existsSync(privateAlphaRoot), "D2 Private Alpha test root is cleaned");
  console.log(`[COUNTERS] ${activityTrap.formatCounters({ fixtureDelivery: fixtureDeliveries, fixtureAvailability: fixtureAvailabilityCalls })}`);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$runtimeReloadScript = @'
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const repoRoot = path.resolve(process.argv[2]);
const mode = process.argv[3];
const suffix = "macro-d2-static-website-builder";
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
const fsp = fs.promises;
function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}
const trap = require(path.join(repoRoot, "scripts", "codexforge-creator-deterministic-activity-trap.cjs")).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [
    path.join(repoRoot, ".codexforge", "creator-tests", suffix),
    path.join(repoRoot, ".codexforge", "private-alpha-tests", suffix),
  ],
  allowedMkdirPaths: [
    path.join(repoRoot, ".codexforge"),
    path.join(repoRoot, ".codexforge", "creator-tests"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests"),
  ],
});
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  const resolvedFilename = Module._resolveFilename(request, parent, isMain);
  return trap.wrapLoadedModule(resolvedFilename, originalLoad.apply(this, arguments));
};
require.extensions[".ts"] = function (module, filename) {
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const errors = (output.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );
  assert(errors.length === 0, `runtime-reload TypeScript syntax passes for ${path.relative(repoRoot, filename)}`);
  module._compile(output.outputText, filename);
};
async function main() {
  const registryKey = Symbol.for("codexforge.creator.runtime-service-registry.v1");
  const runtimePath = path.join(repoRoot, "src", "lib", "codexforge", "creator", "creator-runtime.server.ts");
  if (mode === "cleanup") {
    const persistencePath = path.join(repoRoot, "src", "lib", "codexforge", "creator", "creator-persistence.server.ts");
    const persistence = require(persistencePath).createCreatorPersistenceForTesting(suffix);
    await persistence.cleanupTestRoot();
    const privateAlphaBase = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
    const privateAlphaRoot = path.resolve(privateAlphaBase, suffix);
    const relative = path.relative(privateAlphaBase, privateAlphaRoot);
    assert(
      relative === suffix && !path.isAbsolute(relative),
      "runtime-reload cleanup owns one exact deterministic Private Alpha suffix"
    );
    await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
    assert(
      !fs.existsSync(path.resolve(repoRoot, ".codexforge", "creator-tests", suffix)) &&
        !fs.existsSync(privateAlphaRoot),
      "runtime-reload cleanup removes only both exact owned deterministic roots after the handle-owning process exits"
    );
    trap.assertZeroActivity();
    return;
  }
  if (mode === "invalid-cache") {
    Object.defineProperty(process, registryKey, {
      value: Object.freeze({ version: 1, has: null, get: null, register: null, size: null }),
      configurable: false,
      enumerable: false,
      writable: false,
    });
    let failedClosed = false;
    try {
      require(runtimePath);
    } catch (error) {
      failedClosed = error instanceof Error && error.message === "Creator runtime process cache is invalid.";
    }
    assert(failedClosed, "an invalid preseeded process registry fails closed before constructing a creator service");
    trap.assertZeroActivity();
    return;
  }
  if (mode !== "open-root-reload") throw new Error("Unknown runtime reload mode.");
  Object.defineProperty(process.env, "CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE", {
    value: "1", configurable: true, enumerable: true, writable: true,
  });
  Object.defineProperty(process.env, "CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX", {
    value: suffix, configurable: true, enumerable: true, writable: true,
  });
  const firstModule = require(runtimePath);
  const firstService = firstModule.getCreatorRuntimeService();
  const created = await firstService.createProject(
    {
      creatorKind: "website-browser-app",
      projectTitle: "D2 Runtime Reload Root Handle",
      description: "Create one bounded static page without approving or executing generation.",
    },
    "macro-d2-runtime-reload-create-0001"
  );
  assert(
    created.created &&
      created.project.status === "awaiting_generation_approval" &&
      created.project.approvalPacket.status === "awaiting" &&
      created.project.runBindings.length === 1 &&
      created.project.runBindings[0].executionAttempted === false &&
      created.project.artifactProposal === null &&
      created.project.materializations.length === 0 &&
      created.project.preview.status === "inactive",
    "independent runtime-reload process opens one real deterministic removable root without approval, execution, artifact, publication, or preview"
  );
  delete require.cache[require.resolve(runtimePath)];
  const secondModule = require(runtimePath);
  const secondService = secondModule.getCreatorRuntimeService();
  assert(secondService === firstService, "recompiled runtime module reuses the exact service while its removable native-root handle remains open");
  const reread = await secondService.getProject(created.project.identity.projectId);
  assert(
    reread.identity.projectId === created.project.identity.projectId &&
      reread.status === "awaiting_generation_approval" &&
      reread.stateRevision === created.project.stateRevision,
    "recompiled runtime reads the exact persisted project without a second conflicting root handle"
  );
  const descriptor = Object.getOwnPropertyDescriptor(process, registryKey);
  assert(
    descriptor &&
      descriptor.configurable === false &&
      descriptor.enumerable === false &&
      descriptor.writable === false &&
      Object.isFrozen(descriptor.value) &&
      descriptor.value.size() === 1,
    "opened-root runtime registry remains immutable, hidden, exact, and bounded to one active suffix"
  );
  trap.assertZeroActivity();
  console.log(`[COUNTERS] ${trap.formatCounters({})}`);
}
main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$activityProbeScript = @'
"use strict";
const fs = require("node:fs");
const fsp = fs.promises;
const path = require("node:path");
const repoRoot = path.resolve(process.argv[2]);
const probeRoot = path.resolve(process.argv[3]);
const mkdirSyncBeforeTrap = fs.mkdirSync.bind(fs);
const rmSyncBeforeTrap = fs.rmSync.bind(fs);
const writeFileSyncBeforeTrap = fs.writeFileSync.bind(fs);
const symlinkSyncBeforeTrap = fs.symlinkSync.bind(fs);
mkdirSyncBeforeTrap(probeRoot, { recursive: true });
const mkdirParent = path.join(probeRoot, "mkdir-parent");
const ownedTree = path.join(mkdirParent, "owned-tree");
const outsideTree = path.join(probeRoot, "outside-sibling");
const escapeLink = path.join(ownedTree, "escape-junction");
mkdirSyncBeforeTrap(mkdirParent, { recursive: true });
mkdirSyncBeforeTrap(ownedTree, { recursive: true });
mkdirSyncBeforeTrap(outsideTree, { recursive: true });
writeFileSyncBeforeTrap(path.join(outsideTree, "sentinel.txt"), "unchanged");
symlinkSyncBeforeTrap(outsideTree, escapeLink, "junction");
const trap = require(path.join(repoRoot, "scripts", "codexforge-creator-deterministic-activity-trap.cjs")).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [ownedTree],
  allowedMkdirPaths: [probeRoot, mkdirParent],
});
function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}
async function expectBlocked(operation, message) {
  try {
    await operation();
  } catch (error) {
    assert(String(error && error.message).includes("deterministic creator smoke"), message);
    return;
  }
  throw new Error(`${message}: expected the mutation trap to reject the operation`);
}
async function main() {
  try {
    await fsp.mkdir(mkdirParent, { recursive: true });
    fs.mkdirSync(mkdirParent, { recursive: true });
    assert(fs.existsSync(mkdirParent), "activity trap permits its broad bootstrap parent only through exact mkdir operations");
    await expectBlocked(() => fsp.writeFile(path.join(mkdirParent, "async-escape.txt"), "blocked"), "activity trap blocks async writes directly beneath an allowed mkdir-only parent");
    await expectBlocked(() => Promise.resolve().then(() => fs.writeFileSync(path.join(mkdirParent, "sync-escape.txt"), "blocked")), "activity trap blocks sync writes directly beneath an allowed mkdir-only parent");
    await expectBlocked(() => fsp.rm(mkdirParent, { recursive: true, force: true }), "activity trap blocks async recursive removal of an allowed mkdir-only parent");
    await expectBlocked(() => Promise.resolve().then(() => fs.rmSync(mkdirParent, { recursive: true, force: true })), "activity trap blocks sync recursive removal of an allowed mkdir-only parent");
    await expectBlocked(() => fsp.writeFile(path.join(escapeLink, "escaped.txt"), "blocked"), "activity trap rejects an allowed-tree write through a test-owned junction to an outside sibling");
    assert(fs.readFileSync(path.join(outsideTree, "sentinel.txt"), "utf8") === "unchanged" && !fs.existsSync(path.join(outsideTree, "escaped.txt")), "junction rejection leaves every outside-sibling byte unchanged");
    await fsp.mkdir(path.join(ownedTree, "child"), { recursive: true });
    await fsp.writeFile(path.join(ownedTree, "child", "async.txt"), "owned");
    fs.writeFileSync(path.join(ownedTree, "child", "sync.txt"), "owned");
    assert(fs.readFileSync(path.join(ownedTree, "child", "async.txt"), "utf8") === "owned", "activity trap permits writes inside the exact owned child tree");
    await fsp.rm(ownedTree, { recursive: true, force: true });
    assert(!fs.existsSync(ownedTree), "activity trap permits cleanup of only the exact owned child tree");
    assert(trap.counters.arbitraryFilesystemMutation === 5, `activity trap records the exact four broad-parent and one junction-escape rejection attempts (observed ${trap.counters.arbitraryFilesystemMutation})`);
    for (const [name, count] of Object.entries(trap.counters)) {
      if (name !== "arbitraryFilesystemMutation") assert(count === 0, `activity trap standalone probe keeps ${name} activity at zero`);
    }
  } finally {
    rmSyncBeforeTrap(probeRoot, { recursive: true, force: true });
  }
}
main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$activityProbePath = Join-Path $env:TEMP "codexforge-macro-d2-activity-trap-probe.js"
$activityProbeRoot = Join-Path $env:TEMP ("codexforge-macro-d2-activity-trap-" + [Guid]::NewGuid().ToString("N"))
[System.IO.File]::WriteAllText($activityProbePath, $activityProbeScript, [System.Text.Encoding]::ASCII)
try {
  & node $activityProbePath $root $activityProbeRoot
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] D2 activity-trap probe exited with code $LASTEXITCODE" }
} finally {
  Remove-Item -LiteralPath $activityProbePath -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $activityProbeRoot -Recurse -Force -ErrorAction SilentlyContinue
}

$runtimeReloadPath = Join-Path $env:TEMP "codexforge-macro-d2-runtime-reload.js"
[System.IO.File]::WriteAllText($runtimeReloadPath, $runtimeReloadScript, [System.Text.Encoding]::ASCII)
try {
  & node $runtimeReloadPath $root "cleanup"
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] D2 pre-reload deterministic cleanup exited with code $LASTEXITCODE" }
  & node $runtimeReloadPath $root "invalid-cache"
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] D2 invalid runtime-cache probe exited with code $LASTEXITCODE" }
  & node $runtimeReloadPath $root "open-root-reload"
  $runtimeReloadExitCode = $LASTEXITCODE
  & node $runtimeReloadPath $root "cleanup"
  $runtimeReloadCleanupExitCode = $LASTEXITCODE
} finally {
  Remove-Item -LiteralPath $runtimeReloadPath -Force -ErrorAction SilentlyContinue
}
if ($runtimeReloadCleanupExitCode -ne 0) { throw "[FAIL] D2 post-reload deterministic cleanup exited with code $runtimeReloadCleanupExitCode" }

$tempNodeScript = Join-Path $env:TEMP "codexforge-macro-d2-creator-smoke.js"
[System.IO.File]::WriteAllText($tempNodeScript, $nodeScript, [System.Text.Encoding]::ASCII)
try {
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] D2 Node harness exited with code $LASTEXITCODE" }
} finally {
  Remove-Item -LiteralPath $tempNodeScript -Force -ErrorAction SilentlyContinue
}
if ($runtimeReloadExitCode -ne 0) { throw "[FAIL] D2 opened-root runtime reload probe exited with code $runtimeReloadExitCode" }

Write-Host "[PASS] CodexForge Macro Phase D2 static Website/Browser App builder foundation smoke complete."
