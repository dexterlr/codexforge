param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Character Brand Consistency Kit" `
  -ScriptFile "smoke-codexforge-character-brand-consistency-kit.ps1" `
  -Domain "src\lib\codexforge\character-brand-consistency-kit" `
  -Route "src\app\consistency-kit" `
  -MainPanel "CharacterBrandConsistencyKitPanel" `
  -CommandLabel "Go to Consistency Kit" `
  -Modules @("consistency-kit-types.ts","consistency-subject.ts","consistency-identity-card.ts","consistency-visual-rules.ts","consistency-negative-rules.ts","consistency-check.ts","consistency-handoff.ts","consistency-kit-summary.ts","index.ts") `
  -Components @("CharacterBrandConsistencyKitPanel.tsx","ConsistencySubjectPanel.tsx","ConsistencyIdentityCardPanel.tsx","ConsistencyVisualRulesPanel.tsx","ConsistencyNegativeRulesPanel.tsx","ConsistencyCheckPanel.tsx","ConsistencyHandoffPanel.tsx","ConsistencyKitSummaryPanel.tsx","ConsistencyKitSafetyStrip.tsx","ConsistencyKitEmptyState.tsx","index.ts") `
  -Exports @("buildConsistencySubject","buildDefaultConsistencySubjects","buildConsistencyIdentityCard","buildConsistencyVisualRules","buildConsistencyNegativeRules","buildConsistencyCheck","buildConsistencyHandoff","buildConsistencyKitSummary","summarizeConsistencyKit") `
  -PlainEnglish @("Consistency kit","Keep characters, products, and brands consistent across creative work.","Review consistency kit","character","brand","product","location","vehicle","object","mascot","environment","style-system","subject id","label","subject kind","description","must keep","must avoid","colors","materials","silhouette","camera/angle rules","style references as notes only","approval status","prompt includes identity cues","keyframe plan includes identity cues","draft request includes identity cues","negative rules included","brand/character notes reviewed","no hidden asset dependency","No upload requirement","No face identity claims","Copy consistency handoff allowed","notes are planning aids","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/storyboard","/keyframes","/local-keyframes","/local-video-draft","/style-presets","/shot-library")
