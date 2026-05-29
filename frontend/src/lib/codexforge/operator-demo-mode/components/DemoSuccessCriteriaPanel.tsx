"use client";
import type { DemoSuccessCriteria } from "../operator-demo-types";
import { eyebrow, list, panel, title } from "./DemoStyles";
export function DemoSuccessCriteriaPanel({ criteria }: { criteria: DemoSuccessCriteria }) { return <section style={panel} data-codexforge-demo-success="DemoSuccessCriteriaPanel renders no fake apply claim no fake validation success"><span style={eyebrow}>Success criteria</span><h2 style={title}>Demo success</h2><ul style={list}>{criteria.criteria.map((item) => <li key={item}>{item}</li>)}</ul></section>; }
