"use client";
import type { DemoScreenMap } from "../operator-demo-types";
import { eyebrow, list, panel, title } from "./DemoStyles";
export function DemoScreenMapPanel({ screenMap }: { screenMap: DemoScreenMap }) { return <section style={panel} data-codexforge-demo-screen-map="DemoScreenMapPanel renders advanced details hidden screen map"><span style={eyebrow}>Screen map</span><h2 style={title}>Screens</h2><ul style={list}>{screenMap.routes.map((route) => <li key={route}>{route}</li>)}</ul></section>; }
