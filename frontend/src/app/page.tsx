import { existsSync } from "fs";
import path from "path";
import { CODEXFORGE_ROUTES } from "@/lib/codexforge/navigation";
import { buildOperatorHomeSummary, type OperatorHomeRouteAvailability } from "@/lib/codexforge/operator-home";
import OperatorHomePageClient from "./page-client";

const OPERATOR_HOME_ROUTES = [
  "/",
  "/start",
  "/ai",
  "/ai-router",
  "/brain",
  "/files",
  "/tasks",
  "/closed-loop",
  "/memory",
  "/creative",
  "/capabilities",
  "/comfyui",
  "/activity",
  "/readiness",
  "/stabilization",
  "/history",
] as const;
const OPERATOR_HOME_PRODUCT_NAME = "CodexForge";

type HomeSurfaceMapItem = {
  path: string;
  label: string;
};

const SURFACE_MAP: readonly HomeSurfaceMapItem[] = [
  { path: "/start", label: "Start" },
  { path: "/files", label: "Files Command Center" },
  { path: "/validation", label: "Validation Runner" },
  { path: "/closed-loop", label: "Closed Loop Fix" },
  { path: "/ai-router", label: "AI Router" },
  { path: "/runs", label: "Operator Run Center" },
  { path: "/capabilities", label: "Capability Cockpit" },
  { path: "/creative", label: "Creative Production Studio" },
  { path: "/creative-executor", label: "Guarded Creative Executor" },
  { path: "/comfyui", label: "ComfyUI Adapter Preview" },
  { path: "/activity", label: "Activity Feed" },
  { path: "/readiness", label: "Product Readiness Audit" },
  { path: "/consolidation", label: "Consolidation" },
  { path: "/handoff", label: "Handoff" },
  { path: "/brain", label: "Brain Command Center" },
  { path: "/history", label: "History" },
  { path: "/ai", label: "AI Workspace" },
  { path: "/clawd", label: "Operator" },
  { path: "/entry", label: "Quick Launch" },
] as const;

function routePagePath(href: (typeof OPERATOR_HOME_ROUTES)[number]): string {
  if (href === "/") return path.join(process.cwd(), "src", "app", "page.tsx");

  return path.join(process.cwd(), "src", "app", href.slice(1), "page.tsx");
}

function buildRouteAvailability(): OperatorHomeRouteAvailability {
  return OPERATOR_HOME_ROUTES.reduce<OperatorHomeRouteAvailability>((availability, href) => {
    availability[href] = existsSync(routePagePath(href));
    return availability;
  }, {});
}

export default function Home() {
  const hasCodexForgeRouteRegistry =
    CODEXFORGE_ROUTES.length > 0 &&
    SURFACE_MAP.length > 0 &&
    OPERATOR_HOME_PRODUCT_NAME === "CodexForge";
  const summary = buildOperatorHomeSummary({
    routeAvailability: buildRouteAvailability(),
    latestMessageAuthorityPreserved: hasCodexForgeRouteRegistry,
  });

  return <OperatorHomePageClient initialData={summary} />;
}
