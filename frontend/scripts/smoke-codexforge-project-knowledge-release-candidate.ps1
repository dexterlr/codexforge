param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\project-knowledge-release-candidate"
$route = "src\app\project-knowledge-release-candidate"
$protectedRoutes = @(
  "/local-project-snapshot-review",
  "/local-project-change-timeline",
  "/local-project-decision-log",
  "/local-project-runbook-export-review",
  "/project-memory-promotion-boundary",
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 351 Project Knowledge Release Candidate" `
  -ScriptFile "smoke-codexforge-project-knowledge-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProjectKnowledgeReleaseCandidatePanel" `
  -CommandLabel "Go to Project Knowledge Release Candidate" `
  -Modules @("project-knowledge-release-candidate-types.ts","project-knowledge-release-candidate-summary.ts","index.ts") `
  -Components @("ProjectKnowledgeReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildProjectKnowledgeReleaseCandidateStableKey","buildProjectKnowledgeReleaseCandidate","buildProjectKnowledgeReleaseCandidates","buildProjectKnowledgeReleaseCandidateBoundary","buildProjectKnowledgeReleaseCandidateModel","summarizeProjectKnowledgeReleaseCandidate","PROJECT_KNOWLEDGE_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Project knowledge release candidate","Project knowledge release remains review-only","No project files are read from this page","No memory is promoted automatically","Release decision","Known gaps") `
  -PlainEnglish @("Release candidate identity","Covered project knowledge surfaces","Snapshot readiness","Timeline readiness","Decision log readiness","Runbook export readiness","Memory promotion readiness","Next recommended route","advanced release details collapsed/secondary","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values","route changes require review before removal") `
  -ExtraRoutes @("/local-project-snapshot-review","/local-project-runbook-export-review","/project-memory-promotion-boundary","/unified-workspace-home-review")

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Project Knowledge Release Candidate smoke passed."
