param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 803 Project Scaffold Backend Contract" `
  -ScriptFile "smoke-codexforge-project-scaffold-backend-contract.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-backend-contract" `
  -Route "src\app\project-scaffold-backend-contract" `
  -MainPanel "ProjectScaffoldBackendContractPanel" `
  -CommandLabel "Go to Project Scaffold Backend Contract" `
  -Modules @("project-scaffold-backend-contract-model.ts", "index.ts") `
  -Components @("ProjectScaffoldBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldBackendContractStableKey", "buildProjectScaffoldBackendContract", "buildProjectScaffoldBackendContractItems", "buildProjectScaffoldBackendContractBoundary", "buildProjectScaffoldBackendContractModel", "summarizeProjectScaffoldBackendContract", "PROJECT_SCAFFOLD_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Project Scaffold Backend Contract", "Project scaffold backend contract does not create projects", "Project scaffold backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "project type", "template", "target path", "file write dependency", "command/runtime dependency", "approval", "audit/evidence/result/recovery", "validation", "unresolved blockers", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Project scaffold backend contract does not create projects") `
  -RouteHref "/project-scaffold-backend-contract"

Write-Host "[OK] CodexForge Phase 803 project scaffold backend contract smoke passed."
