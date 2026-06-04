param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\pull-request-prep-review"
$route = "src\app\pull-request-prep-review"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Pull Request Prep Review" `
  -ScriptFile "smoke-codexforge-pull-request-prep-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "PullRequestPrepReviewPanel" `
  -CommandLabel "Go to Pull Request Prep Review" `
  -Modules @("pull-request-prep-review-types.ts","pull-request-prep-review-summary.ts","index.ts") `
  -Components @("PullRequestPrepReviewPanel.tsx","index.ts") `
  -Exports @("buildPullRequestPrepReviewStableKey","buildPullRequestPrepReview","buildPullRequestPrepReviews","buildPullRequestPrepReviewBoundary","buildPullRequestPrepReviewModel","summarizePullRequestPrepReview","PULL_REQUEST_PREP_REVIEW_LANGUAGE") `
  -PlainEnglish @("Pull request prep review","Pull requests are not created from this page","PR creation requires explicit approval","Secrets are not included in PR copy","PR prep identity","Branch/tag handoff dependency","Commit summary","Changed areas summary","Validation summary","Test result summary","Risk/secrets status","Suggested PR title","Suggested PR description","PR risk checklist route","Blocked reasons","advanced PR details collapsed/secondary","approved local boundary required","release actions are not run from arbitrary UI","git commands are not run from arbitrary UI","no git command execution from UI","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no branch creation","no tag creation","no PR creation","no release publishing","no push behavior","no merge behavior","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no patch apply behavior","no package install behavior","no provider APIs are called","no GitHub API calls from UI","no automatic provider send","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion") `
  -ExtraRoutes @("/branch-tag-release-handoff","/git-commit-approval","/git-diff-review","/test-result-summary","/pr-risk-checklist")

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
  "Pull request prep review",
  "Pull requests are not created from this page",
  "PR creation requires explicit approval",
  "Secrets are not included in PR copy",
  "Suggested PR title",
  "Suggested PR description"
)) {
  Assert-Contains $source $needle "pull request prep review includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = [ordered]@{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGitCommand\s*\(|executeGitCommand\s*\("
  "no branch creation" = "branchCreationAllowedFromUi:\s*true|createBranch\s*\(|branchCreate\s*\("
  "no tag creation" = "tagCreationAllowedFromUi:\s*true|createTag\s*\(|tagCreate\s*\("
  "no PR creation" = "pullRequestCreationAllowedFromUi:\s*true|createPullRequest\s*\(|createPr\s*\("
  "no release publishing" = "releasePublishAllowedFromUi:\s*true|releasePublishingAllowedFromUi:\s*true|publishRelease\s*\("
  "no push behavior" = "pushBranchesTagsAllowedFromUi:\s*true|pushBranchesAllowedFromUi:\s*true|pushBranch\s*\(|pushTag\s*\(|pushTags\s*\("
  "no merge behavior" = "mergeAllowedFromUi:\s*true|pullRequestMergeAllowedFromUi:\s*true|automaticMergeApprovalAllowed:\s*true|mergePullRequest\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenFilesAllowed:\s*true"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|patchApplicationAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|api\.github|octokit|sendFindingsToProvider\s*\("
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|sendPromptToProvider\s*\(|sendFilesToProvider\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValuesDisplayedAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|appendEventAllowedFromUi:\s*true|saveBrainGraph\s*\(|saveBrainGraphAllowedFromUi:\s*true"
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Pull Request Prep Review smoke passed."
