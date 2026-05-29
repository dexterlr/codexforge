"use client";
import type { MvpPathRouteMap } from "../mvp-working-path-types";
import { copy, eyebrow, list, panel, title } from "./MvpPathStyles";
export function MvpPathRouteMapPanel({ routeMap }: { routeMap: MvpPathRouteMap }) { return <section style={panel} data-codexforge-mvp-route-map="MvpPathRouteMapPanel renders no duplicate route clouds advanced routes secondary"><span style={eyebrow}>Route map</span><h2 style={title}>Canonical route map</h2><ul style={list}>{routeMap.routes.map((route) => <li key={route}>{route}</li>)}</ul><p style={copy}>Advanced routes stay secondary.</p></section>; }
