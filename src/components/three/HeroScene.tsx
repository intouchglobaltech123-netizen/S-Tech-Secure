import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CameraModel, type CameraKind } from "./CameraModel";
import { ScanBeam } from "./ScanBeam";
import { heroCameras } from "@/data/site";

const LIFETIME = 6.1;
const STAGGER = 3.05;
const PERIOD = heroCameras.length * STAGGER;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

type Slot = { kind: CameraKind; index: number };

function CameraSlot({
  kind,
  index,
  offset,
  onActive,
}: Slot & { offset: number; onActive: (i: number) => void }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Group>(null);
  const [beamIntensity, setBeamIntensity] = useState(0);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    let local = (t - offset) % PERIOD;
    if (local < 0) local += PERIOD;

    if (local > LIFETIME) {
      g.visible = false;
      return;
    }
    g.visible = true;
    const u = local / LIFETIME;

    // enter 0 -> 0.2, hold 0.2 -> 0.72, exit 0.72 -> 1
    const inT = smoothstep(0, 0.2, u);
    const outT = smoothstep(0.72, 1, u);

    const x = 3.9 * (1 - inT) - 3.9 * outT;
    const y = -2.5 * (1 - inT) - 2.4 * outT;
    const z = -1.6 * (1 - inT) - 1.4 * outT;

    g.position.set(x, y + 0.15, z);
    const scale = 0.72 + 0.28 * inT - 0.3 * outT;
    g.scale.setScalar(scale);

    const fade = Math.min(inT, 1 - outT);
    g.rotation.y = -0.5 + 0.5 * inT + 0.45 * outT;

    // mechanical scan while centred
    if (head.current) {
      const scanU = smoothstep(0.22, 0.7, u);
      const pan = Math.sin(scanU * Math.PI * 2) * 0.42;
      head.current.rotation.y = pan;
      head.current.rotation.x = Math.sin(scanU * Math.PI * 4) * 0.05;
    }
    if (beam.current) {
      beam.current.visible = fade > 0.25;
    }
    const target = fade * (u > 0.24 && u < 0.72 ? 1 : 0.35);
    setBeamIntensity((prev) => prev + (target - prev) * 0.08);

    if (u > 0.28 && u < 0.33) onActive(index);
  });

  return (
    <group ref={group}>
      <group ref={head}>
        <CameraModel kind={kind} />
        <group ref={beam} position={[0, 0, 0.3]}>
          <ScanBeam length={5} radius={0.85} intensity={beamIntensity} />
        </group>
      </group>
    </group>
  );
}

function StaticCamera() {
  return (
    <group position={[0, 0, 0]} rotation={[0, -0.35, 0]} scale={1.05}>
      <CameraModel kind="bullet" />
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.12 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.06 - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#93b7ff" />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#eaf1ff" />
      <directionalLight position={[-6, 2, -3]} intensity={1.5} color="#3d7dff" />
      <pointLight position={[0, -2.5, 3]} intensity={12} distance={9} color="#2f7bff" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.7}
        penumbra={1}
        intensity={22}
        distance={16}
        color="#cfe2ff"
      />
    </>
  );
}

export default function HeroScene({
  reducedMotion = false,
  onActive,
}: {
  reducedMotion?: boolean;
  onActive?: (index: number) => void;
}) {
  const slots = useMemo(
    () =>
      heroCameras.map((c, i) => ({
        kind: c.type,
        index: i,
        offset: i * STAGGER,
      })),
    [],
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.7]}
      frameloop={visible && !reducedMotion ? "always" : "demand"}
      camera={{ position: [0, 0.4, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <Lighting />
      {reducedMotion ? (
        <StaticCamera />
      ) : (
        <Rig>
          {slots.map((s) => (
            <CameraSlot
              key={s.index}
              kind={s.kind}
              index={s.index}
              offset={s.offset}
              onActive={(i) => onActive?.(i)}
            />
          ))}
        </Rig>
      )}
    </Canvas>
  );
}
