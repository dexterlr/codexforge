"use client";

import { Billboard, Line, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ComponentRef, type CSSProperties } from "react";
import * as THREE from "three";
import type {
  BrainGraph3DLayout,
  BrainGraph3DLayoutEdge,
  BrainGraph3DLayoutNode,
  BrainGraph3DSceneCommand,
} from "./brain-graph-3d-types";

type BrainGraph3DSceneProps = {
  layout: BrainGraph3DLayout;
  command: BrainGraph3DSceneCommand;
  onSelectNode: (nodeId: string) => void;
};

function vectorToArray(position: { x: number; y: number; z: number }): [number, number, number] {
  return [position.x, position.y, position.z];
}

function getNodeLabel(entry: BrainGraph3DLayoutNode): string {
  const data = entry.node.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const label = (data as Record<string, unknown>).label;
    if (typeof label === "string" && label.trim()) return label.trim();
  }

  return `${entry.node.kind} ${entry.id}`;
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

function SceneCameraController(props: { layout: BrainGraph3DLayout; command: BrainGraph3DSceneCommand }) {
  const { camera } = useThree();
  const controlsRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);

  useEffect(() => {
    const target = props.command.kind === "focus-selected" && props.layout.selectedNode
      ? props.layout.selectedNode.position
      : { x: 0, y: 0, z: 0 };
    const baseDistance = props.command.kind === "fit-graph" ? props.layout.boundsRadius * 2.18 : props.layout.boundsRadius * 1.34;
    const currentDistance = Math.max(80, camera.position.distanceTo(new THREE.Vector3(target.x, target.y, target.z)));
    const distance = props.command.kind === "zoom-in"
      ? currentDistance * 0.78
      : props.command.kind === "zoom-out"
        ? currentDistance * 1.22
        : baseDistance;
    const yawShift = props.command.kind === "rotate-left" ? -0.34 : props.command.kind === "rotate-right" ? 0.34 : 0;
    const tiltShift = props.command.kind === "tilt-up" ? 0.24 : props.command.kind === "tilt-down" ? -0.24 : 0;
    const currentYaw = Math.atan2(camera.position.x - target.x, camera.position.z - target.z) + yawShift;
    const currentTilt = Math.asin(clamp((camera.position.y - target.y) / currentDistance, -0.7, 0.7)) + tiltShift;
    const clampedTilt = clamp(currentTilt, -0.42, 0.82);

    camera.position.set(
      target.x + Math.sin(currentYaw) * Math.cos(clampedTilt) * distance,
      target.y + Math.sin(clampedTilt) * distance,
      target.z + Math.cos(currentYaw) * Math.cos(clampedTilt) * distance
    );
    camera.lookAt(target.x, target.y, target.z);

    if (controlsRef.current) {
      controlsRef.current.target.set(target.x, target.y, target.z);
      controlsRef.current.update();
    }
  }, [camera, props.command, props.layout.boundsRadius, props.layout.selectedNode]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      enablePan
      enableZoom
      makeDefault
      maxDistance={Math.max(360, props.layout.boundsRadius * 3.5)}
      minDistance={60}
      rotateSpeed={0.58}
      panSpeed={0.72}
      zoomSpeed={0.72}
    />
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function BrainNodeMesh(props: {
  entry: BrainGraph3DLayoutNode;
  onSelectNode: (nodeId: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(clock.elapsedTime * 2.2 + props.entry.importanceRank) * 0.05;
    const selectedScale = props.entry.selected ? 1.35 : 1;
    const hoverScale = hovered ? 1.16 : 1;
    meshRef.current.scale.setScalar(selectedScale * hoverScale + pulse);
  });

  return (
    <group position={vectorToArray(props.entry.position)}>
      {props.entry.selected ? (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[props.entry.radius * 4.2, 0.24, 10, 96]} />
            <meshBasicMaterial color={props.entry.color} opacity={0.42} transparent depthWrite={false} />
          </mesh>
          <mesh rotation={[0.72, 0.18, 0.32]}>
            <torusGeometry args={[props.entry.radius * 5.8, 0.18, 10, 112]} />
            <meshBasicMaterial color="#e0f2fe" opacity={0.30} transparent depthWrite={false} />
          </mesh>
        </>
      ) : null}
      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          props.onSelectNode(props.entry.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[props.entry.radius, 28, 18]} />
        <meshStandardMaterial
          color={props.entry.selected ? "#e0f2fe" : props.entry.color}
          emissive={props.entry.color}
          emissiveIntensity={props.entry.selected ? 2.2 : props.entry.related ? 1.22 : props.entry.dimmed ? 0.16 : 0.52}
          metalness={0.25}
          opacity={props.entry.dimmed ? 0.38 : 0.94}
          roughness={0.28}
          transparent
        />
      </mesh>
      <mesh scale={props.entry.selected ? 2.9 : props.entry.related ? 1.9 : 1.32}>
        <sphereGeometry args={[props.entry.radius, 28, 18]} />
        <meshBasicMaterial
          color={props.entry.color}
          opacity={props.entry.selected ? 0.15 : props.entry.related ? 0.08 : 0.035}
          transparent
          depthWrite={false}
        />
      </mesh>
      {props.entry.labelVisible ? (
        <Billboard position={[0, props.entry.radius * (props.entry.selected ? 2.85 : 2.2), 0]}>
          <Text
            color={props.entry.selected ? "#f0f9ff" : "#bae6fd"}
            fontSize={props.entry.selected ? 8.2 : 5.2}
            anchorX="center"
            anchorY="middle"
            outlineColor="rgba(2,6,23,0.82)"
            outlineWidth={0.18}
            maxWidth={86}
          >
            {truncateText(getNodeLabel(props.entry), props.entry.selected ? 34 : 22)}
          </Text>
        </Billboard>
      ) : null}
    </group>
  );
}

function BrainEdgeLine(props: { edge: BrainGraph3DLayoutEdge }) {
  const points = useMemo(() => {
    const from = props.edge.from.position;
    const to = props.edge.to.position;
    const mid = new THREE.Vector3(
      (from.x + to.x) / 2,
      (from.y + to.y) / 2 + (props.edge.selected ? 16 : props.edge.related ? 8 : 3),
      (from.z + to.z) / 2
    );
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(from.x, from.y, from.z),
      mid,
      new THREE.Vector3(to.x, to.y, to.z),
    ]);
    return curve.getPoints(18);
  }, [props.edge]);

  return (
    <Line
      points={points}
      color={props.edge.color}
      lineWidth={props.edge.width}
      opacity={props.edge.opacity}
      transparent
    />
  );
}

function ClusterShells(props: { layout: BrainGraph3DLayout }) {
  return (
    <>
      {props.layout.clusters.map((cluster) => (
        <group key={cluster.key} position={vectorToArray(cluster.center)}>
      <mesh>
        <sphereGeometry args={[cluster.radius, 36, 18]} />
        <meshBasicMaterial
          color={cluster.color}
          opacity={cluster.selected ? 0.078 : 0.022}
          transparent
          wireframe
          depthWrite={false}
        />
      </mesh>
      <mesh scale={[1.08, 0.58, 1.18]}>
        <sphereGeometry args={[cluster.radius * 1.08, 36, 18]} />
        <meshBasicMaterial
          color={cluster.color}
          opacity={cluster.selected ? 0.052 : 0.018}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
        </group>
      ))}
    </>
  );
}

function SignalField(props: { layout: BrainGraph3DLayout }) {
  const positions = useMemo(
    () => Float32Array.from(props.layout.signalField.flatMap((point) => [point.position.x, point.position.y, point.position.z])),
    [props.layout.signalField]
  );
  const colors = useMemo(() => {
    const color = new THREE.Color();
    return Float32Array.from(
      props.layout.signalField.flatMap((point) => {
        color.set(point.color);
        return [color.r, color.g, color.b];
      })
    );
  }, [props.layout.signalField]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.9} vertexColors opacity={0.42} transparent depthWrite={false} sizeAttenuation />
    </points>
  );
}

function BrainSceneContents(props: BrainGraph3DSceneProps) {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 120, Math.max(500, props.layout.boundsRadius * 2.7)]} />
      <ambientLight intensity={0.34} />
      <pointLight position={[140, 180, 240]} intensity={3.2} color="#7dd3fc" />
      <pointLight position={[-220, -60, -170]} intensity={2.1} color="#2dd4bf" />
      <pointLight position={[0, 90, -260]} intensity={1.4} color="#f472b6" />
      <Sparkles count={88} scale={Math.max(310, props.layout.boundsRadius * 1.72)} size={1.55} speed={0.12} opacity={0.32} color="#7dd3fc" />
      <SignalField layout={props.layout} />
      <ClusterShells layout={props.layout} />
      {props.layout.edges.map((edge) => (
        <BrainEdgeLine key={edge.id} edge={edge} />
      ))}
      {props.layout.nodes.map((entry) => (
        <BrainNodeMesh key={entry.id} entry={entry} onSelectNode={props.onSelectNode} />
      ))}
      <SceneCameraController layout={props.layout} command={props.command} />
    </>
  );
}

const canvasWrapStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
};

export function BrainGraph3DScene(props: BrainGraph3DSceneProps) {
  return (
    <div style={canvasWrapStyle} data-codexforge-brain-graph-real-3d-scene="true">
      <Canvas
        camera={{ position: [260, 170, 360], fov: 42, near: 0.1, far: 2400 }}
        dpr={[1, 1.65]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <BrainSceneContents {...props} />
      </Canvas>
    </div>
  );
}
