"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativeCostRoute } from "../creative-cost-saver-types";

export function CreativeCostRoutePanel({ routes }: { routes: CreativeCostRoute[] }) {
  return (
    <PreviewFoundationCard title="Cost-saving routes">
      {routes.map((route) => (
        <div key={route.id}>
          <PreviewFoundationCopy>{route.decision}: {route.whyThisRoute}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[route.nextStep, route.cloudPosture, route.manualGate]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
