param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Shot Library Reuse System" `
  -ScriptFile "smoke-codexforge-shot-library-reuse-system.ps1" `
  -Domain "src\lib\codexforge\shot-library-reuse-system" `
  -Route "src\app\shot-library" `
  -MainPanel "ShotLibraryReuseSystemPanel" `
  -CommandLabel "Go to Shot Library" `
  -Modules @("shot-library-types.ts","shot-template.ts","shot-template-category.ts","shot-reuse-plan.ts","shot-continuity-note.ts","shot-library-safety.ts","shot-library-handoff.ts","shot-library-summary.ts","index.ts") `
  -Components @("ShotLibraryReuseSystemPanel.tsx","ShotTemplatePanel.tsx","ShotTemplateCategoryPanel.tsx","ShotReusePlanPanel.tsx","ShotContinuityNotePanel.tsx","ShotLibrarySafetyPanel.tsx","ShotLibraryHandoffPanel.tsx","ShotLibrarySummaryPanel.tsx","ShotLibrarySafetyStrip.tsx","ShotLibraryEmptyState.tsx","index.ts") `
  -Exports @("buildShotTemplate","buildDefaultShotTemplates","buildShotTemplateCategory","buildShotReusePlan","buildShotContinuityNote","buildShotLibrarySafety","buildShotLibraryHandoff","buildShotLibrarySummary","summarizeShotLibrary") `
  -PlainEnglish @("Shot library","Reuse proven shot patterns in storyboards and local video drafts.","Choose shot template","shot id","label","category","visual description","camera movement","subject movement","duration hint","keyframe need","best use","avoid use","continuity notes","local draft suitability","opening shot","establishing shot","product hero","close-up detail","reveal","orbit","dolly","push-in","pull-back","transition","ending shot","social hook","before/after","comparison","No generation button","No provider calls","Copy shot handoff allowed","reusable plan templates","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/storyboard","/video-prompt","/keyframes","/local-video-draft","/video-review","/consistency-kit")
