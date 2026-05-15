"use client";

import { Line, OrbitControls, Sparkles } from "@react-three/drei";
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

function SceneCameraController(props: { layout: BrainGraph3DLayout; command: BrainGraph3DSceneCommand }) {
  const { camera } = useThree();
  const controlsRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);

  useEffect(() => {
    const target = props.command.kind === "focus-selected" && props.layout.selectedNode
      ? props.layout.selectedNode.position
      : { x: 0, y: 0, z: 0 };
    const distance = props.command.kind === "fit-graph" ? props.layout.boundsRadius * 2.35 : props.layout.boundsRadius * 1.52;

    camera.position.set(target.x + distance * 0.72, target.y + distance * 0.36, target.z + distance);
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
              opacity={cluster.selected ? 0.055 : 0.026}
              transparent
              wireframe
              depthWrite={false}
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
      <pointsMaterial size={1.6} vertexColors opacity={0.38} transparent depthWrite={false} />
    </points>
  );
}

function BrainSceneContents(props: BrainGraph3DSceneProps) {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 160, Math.max(540, props.layout.boundsRadius * 3)]} />
      <ambientLight intensity={0.46} />
      <pointLight position={[120, 160, 180]} intensity={2.4} color="#7dd3fc" />
      <pointLight position={[-180, -40, -140]} intensity={1.5} color="#2dd4bf" />
      <Sparkles count={52} scale={Math.max(240, props.layout.boundsRadius * 1.45)} size={1.3} speed={0.18} opacity={0.26} color="#7dd3fc" />
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
        camera={{ position: [220, 150, 320], fov: 48, near: 0.1, far: 2200 }}
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
