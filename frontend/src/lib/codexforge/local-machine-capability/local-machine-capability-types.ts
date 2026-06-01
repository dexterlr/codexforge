export type LocalHardwareProfile = {
  id: string;
  label: string;
  memoryGb: number;
  cpuClass: string;
  motherboard: string;
  powerSupply: string;
  tags: string[];
  manualProfileOnly: boolean;
};

export type LocalGpuProfile = {
  id: string;
  label: string;
  gpuCount: number;
  gpuClass: string;
  cooling: string;
  vramGuidance: string;
  safestParallelUse: string;
};

export type LocalRuntimeCapability = {
  id: string;
  localFirstRecommended: boolean;
  strengths: string[];
  cautions: string[];
  blocked: string;
};

export type LocalAiWorkloadFit = {
  id: string;
  workload: string;
  fit: "excellent" | "strong" | "planned" | "manual";
  guidance: string;
};

export type LocalVideoReadiness = {
  id: string;
  status: "draft-capable" | "planned" | "manual";
  localDraftPotential: string;
  upscalePotential: string;
  cautions: string[];
};

export type LocalMachineCapabilitySummary = {
  hardware: LocalHardwareProfile;
  gpu: LocalGpuProfile;
  runtime: LocalRuntimeCapability;
  workloads: LocalAiWorkloadFit[];
  video: LocalVideoReadiness;
  summary: string;
  nextAction: string;
};
