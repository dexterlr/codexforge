param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-2-hardening-pass"
$route = "src\app\beta-2-hardening-pass"
$phaseMarkers = @(
  "Beta 2 hardening pass",
  "Beta 2 hardening pass does not apply changes",
  "Beta 2 hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Release readiness checklist"
)
$plainEnglish = @(
  "Beta 2 hardening identity",
  "regression/safety/docs/onboarding/trial/feedback status",
  "denied hardening actions",
  "unresolved hardening blockers",
  "next milestone route",
  "release readiness dashboard route",
  "next recommended action",
  "no hardening apply behavior",
  "advanced hardening details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-workflow-release-regression-review",
  "/beta-workflow-safety-signoff-review",
  "/beta-workflow-documentation-review",
  "/beta-workflow-onboarding-final-pass",
  "/codexforge-beta-2-release-candidate",
  "/beta-2-controlled-operator-trial",
  "/beta-2-operator-feedback-review",
  "/beta-2-hardening-pass"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 489 Beta 2 Hardening Pass" `
  -ScriptFile "smoke-codexforge-beta-2-hardening-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaTwoHardeningPassPanel" `
  -CommandLabel "Go to Beta 2 Hardening Pass" `
  -Modules @("beta-2-hardening-pass-types.ts","beta-2-hardening-pass-summary.ts","index.ts") `
  -Components @("BetaTwoHardeningPassPanel.tsx","index.ts") `
  -Exports @("buildBetaTwoHardeningPassStableKey","buildBetaTwoHardeningPass","buildBetaTwoHardeningPasses","buildBetaTwoHardeningPassBoundary","buildBetaTwoHardeningPassModel","summarizeBetaTwoHardeningPass","BETA_TWO_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-2-operator-feedback-review","/beta-2-controlled-operator-trial","/codexforge-beta-2-release-candidate","/readiness") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta 2 Hardening Pass smoke passed."
