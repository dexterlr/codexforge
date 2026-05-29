"use client";
import type { MvpPathDefinition } from "../mvp-working-path-types";
import { copy, eyebrow, panel, title } from "./MvpPathStyles";
export function MvpPathDefinitionPanel({ definition }: { definition: MvpPathDefinition }) { return <section style={panel} data-codexforge-mvp-path-definition="MvpPathDefinitionPanel renders one canonical path advanced routes secondary"><span style={eyebrow}>Definition</span><h2 style={title}>{definition.title}</h2><p style={copy}>{definition.steps.length} routes locked into one working path.</p></section>; }
