import type { ReactNode } from "react";
import type { CodexForgeNavigationRouteHref } from "../navigation-shell/navigation-shell-types";

export type MainPagesGodTierUxState = "ready" | "review" | "blocked" | "planned";

export type MainPagesGodTierUxTone =
  | "home"
  | "workflow"
  | "provider"
  | "video"
  | "review"
  | "cockpit";

export type MainPagesGodTierUxLink = {
  href: CodexForgeNavigationRouteHref;
  label: string;
  detail: string;
  state: MainPagesGodTierUxState;
};

export type MainPagesGodTierUxMetric = {
  label: string;
  value: string;
  detail: string;
  state: MainPagesGodTierUxState;
};

export type MainPagesGodTierUxPipelineStep = {
  id: string;
  label: string;
  detail: string;
  state: MainPagesGodTierUxState;
};

export type MainPagesGodTierUxPanelProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
  tone?: MainPagesGodTierUxTone;
};
