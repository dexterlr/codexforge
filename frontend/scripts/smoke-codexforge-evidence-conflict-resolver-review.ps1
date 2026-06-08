param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\evidence-conflict-resolver-review"
$route = "src\app\evidence-conflict-resolver-review"

$sharedResearchSafetyMarkers = @(
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no automatic provider send",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no provider retries automatically",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no evidence auto-ingestion",
  "no auto-cite",
  "no auto-citation finalization",
  "no automatic report export",
  "no file export/write behavior",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
  "no claim auto-update",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no provider API calls",
  "no web or provider request sent",
  "no API keys or secrets displayed",
  "no localStorage API key storage",
  "no process.env printing",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension install behavior",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no browser-stored signing secrets",
  "no session token localStorage storage",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no artifact deletion",
  "no process kill/restart/shutdown from UI",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring",
  "no Ruflo/Odysseus runtime integration",
  "no Ruflo/Odysseus dependency references",
  "future adoption requires license/security review"
)

$phaseMarkers = @(
  "Evidence conflict resolver review",
  "Conflicts are not resolved automatically",
  "Stale evidence remains flagged",
  "Final resolution requires explicit review",
  "Proposed resolution options",
  "Freshness recheck route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 332 Evidence Conflict Resolver Review" `
  -ScriptFile "smoke-codexforge-evidence-conflict-resolver-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "EvidenceConflictResolverReviewPanel" `
  -CommandLabel "Go to Evidence Conflict Resolver Review" `
  -Modules @("evidence-conflict-resolver-review-types.ts","evidence-conflict-resolver-review-summary.ts","index.ts") `
  -Components @("EvidenceConflictResolverReviewPanel.tsx","index.ts") `
  -Exports @("buildEvidenceConflictResolverReviewStableKey","buildEvidenceConflictResolverReview","buildEvidenceConflictResolverReviews","buildEvidenceConflictResolverReviewBoundary","buildEvidenceConflictResolverReviewModel","summarizeEvidenceConflictResolverReview","EVIDENCE_CONFLICT_RESOLVER_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Conflict review identity","Source evidence inbox","Conflicting claim summary","Supporting source summary","Opposing source summary","Freshness/staleness signal","Confidence impact","Blocked reasons","advanced conflict details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-evidence-inbox","/research-claim-builder","/research-freshness-recheck-boundary","/research-runbook-finalization")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Evidence Conflict Resolver Review smoke passed."
