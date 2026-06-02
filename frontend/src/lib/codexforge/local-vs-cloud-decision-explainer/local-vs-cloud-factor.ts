import type { LocalVsCloudFactor, LocalVsCloudFactorId } from "./local-vs-cloud-types";

const FACTOR_COPY: Record<LocalVsCloudFactorId, string> = {
  privacy: "Local keeps prompts and assets on the workstation; cloud may require sharing reviewed material later.",
  cost: "Local drafts save money; cloud can cost money or credits.",
  speed: "Local can be fast for short tests; cloud may be useful when local attempts fail.",
  quality: "Local is the default for drafts; cloud may help with final quality later.",
  "local hardware fit": "Local is preferred when the workstation can handle the job.",
  "workflow availability": "Use local when a reviewed workflow exists; cloud is only a fallback if a needed workflow is unavailable.",
  "artifact readiness": "Cloud should wait until local artifacts, prompts, and references are reviewed.",
  "failure risk": "Local failures cost time; cloud failures may cost credits too.",
  "provider availability": "No provider is connected here; provider availability is only a review signal.",
  "manual effort": "Manual review protects beginners from spending credits by mistake.",
  "cloud credit risk": "Credit risk must be understood before a future manual cloud handoff.",
};

export function buildLocalVsCloudFactor(
  factor: LocalVsCloudFactorId,
  input: Partial<LocalVsCloudFactor> = {}
): LocalVsCloudFactor {
  return {
    id: input.id ?? `local-vs-cloud-factor-${factor.replace(/[^a-z0-9]+/g, "-")}`,
    factor: input.factor ?? factor,
    localImpact: input.localImpact ?? "Local-first keeps the work cheaper and more private.",
    cloudImpact: input.cloudImpact ?? "Cloud may improve final quality later but can add cost and privacy review.",
    plainEnglish: input.plainEnglish ?? FACTOR_COPY[factor],
  };
}

export function buildDefaultLocalVsCloudFactors(): LocalVsCloudFactor[] {
  return ([
    "privacy",
    "cost",
    "speed",
    "quality",
    "local hardware fit",
    "workflow availability",
    "artifact readiness",
    "failure risk",
    "provider availability",
    "manual effort",
    "cloud credit risk",
  ] as const).map((factor) => buildLocalVsCloudFactor(factor));
}
