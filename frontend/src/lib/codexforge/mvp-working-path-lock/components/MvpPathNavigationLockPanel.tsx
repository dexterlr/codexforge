"use client";
import type { MvpPathNavigationLock } from "../mvp-working-path-types";
import { copy, eyebrow, panel, title } from "./MvpPathStyles";
export function MvpPathNavigationLockPanel({ navigation }: { navigation: MvpPathNavigationLock }) { return <section style={panel} data-codexforge-mvp-navigation-lock="MvpPathNavigationLockPanel renders Open Coding MVP Path Command Palette Workflow Wizard agrees"><span style={eyebrow}>Navigation</span><h2 style={title}>{navigation.commandPaletteLabel}</h2><p style={copy}>{navigation.primaryRoute} is the command palette and wizard target.</p></section>; }
