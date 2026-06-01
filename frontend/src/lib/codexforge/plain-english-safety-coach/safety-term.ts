import type { SafetyTerm } from "./safety-coach-types";

export function buildSafetyTerm(input: SafetyTerm): SafetyTerm {
  return input;
}

export function buildDefaultSafetyTerms(): SafetyTerm[] {
  return [
    buildSafetyTerm({ term: "Preview", plainEnglish: "Nothing has changed yet.", example: "Read the proposed wording before approval." }),
    buildSafetyTerm({ term: "Apply", plainEnglish: "A file may change, so approval is required.", example: "Only continue after you understand the file and diff." }),
    buildSafetyTerm({ term: "Approval", plainEnglish: "You choose whether the change is allowed.", example: "Do not approve if the file looks risky." }),
    buildSafetyTerm({ term: "Evidence", plainEnglish: "A short note of what happened.", example: "Record the file, change, and result." }),
    buildSafetyTerm({ term: "Validation", plainEnglish: "Checks you run after changes.", example: "Run checks separately and paste the output." }),
    buildSafetyTerm({ term: "Run history", plainEnglish: "A reviewed note about past work.", example: "Use it to remember what happened." }),
    buildSafetyTerm({ term: "Recovery", plainEnglish: "A calm path when something is blocked or failed.", example: "Use recovery when validation is unclear." }),
    buildSafetyTerm({ term: "Rollback", plainEnglish: "How to undo or back out safely.", example: "Keep the previous wording or restore the file." }),
    buildSafetyTerm({ term: "Safe file", plainEnglish: "A file where a tiny wording change is low risk.", example: "A page or component with display text." }),
    buildSafetyTerm({ term: "Risky file", plainEnglish: "A file that can affect tools, config, runtime, or stored memory.", example: "Avoid package, lock, Brain, runtime, and policy files." }),
  ];
}
