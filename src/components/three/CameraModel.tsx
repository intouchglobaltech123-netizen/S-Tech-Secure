import { useMemo } from "react";
import * as THREE from "three";

export type CameraKind = "bullet" | "dome" | "ptz";

/**
 * Procedural, reasonably detailed surveillance camera geometry.
 * Materials are memoised module-side so all six hero cameras share them.
 */
function useMaterials() {
  return useMemo(() => {
    const housing = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d9dde4"),
      metalness: 0.85,
      roughness: 0.28,
    });
    const graphite = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2a2f38"),
      metalness: 0.6,
      roughness: 0.45,
    });
    const plastic = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#14181f"),
      metalness: 0.2,
      roughness: 0.65,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0b1220"),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      reflectivity: 1,
    });
    const lensCoat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3f8dff"),
      emissive: new THREE.Color("#2f7bff"),
      emissiveIntensity: 0.9,
      metalness: 0.9,
      roughness: 0.15,
    });
    const led = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#101820"),
      emissive: new THREE.Color("#7fd4ff"),
      emissiveIntensity: 0.35,
      roughness: 0.3,
    });
    return { housing, graphite, plastic, glass, lensCoat, led };
  }, []);
}

function Screws({
  radius,
  count = 4,
  z = 0,
  material,
}: {
  radius: number;
  count?: number;
  z?: number;
  material: THREE.Material;
}) {
  const positions = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.PI / 4;
        return [Math.cos(a) * radius, Math.sin(a) * radius, z] as [number, number, number];
      }),
    [count, radius, z],
  );
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p} material={material}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 8]} />
        </mesh>
      ))}
    </>
  );
}

function Mount({ materials }: { materials: ReturnType<typeof useMaterials> }) {
  return (
    <group>
      {/* wall plate */}
      <mesh position={[0, -0.62, 0]} material={materials.graphite}>
        <cylinderGeometry args={[0.26, 0.28, 0.06, 24]} />
      </mesh>
      <Screws radius={0.18} z={0} material={materials.plastic} />
      {/* arm */}
      <mesh position={[0, -0.35, 0]} material={materials.housing}>
        <cylinderGeometry args={[0.055, 0.075, 0.5, 18]} />
      </mesh>
      {/* knuckle joint */}
      <mesh position={[0, -0.1, 0]} material={materials.graphite}>
        <sphereGeometry args={[0.1, 20, 16]} />
      </mesh>
    </group>
  );
}

export function BulletCamera({ materials }: { materials: ReturnType<typeof useMaterials> }) {
  return (
    <group>
      <Mount materials={materials} />
      <group position={[0, 0.02, 0]}>
        {/* body */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.housing}>
          <cylinderGeometry args={[0.17, 0.17, 0.92, 32]} />
        </mesh>
        {/* rear cap */}
        <mesh position={[0, 0, -0.48]} rotation={[Math.PI / 2, 0, 0]} material={materials.graphite}>
          <cylinderGeometry args={[0.172, 0.15, 0.08, 32]} />
        </mesh>
        {/* sunshade */}
        <mesh position={[0, 0.05, 0.06]} rotation={[Math.PI / 2, 0, 0]} material={materials.graphite}>
          <cylinderGeometry args={[0.2, 0.2, 0.72, 32, 1, true, 0, Math.PI]} />
        </mesh>
        {/* lens barrel */}
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} material={materials.graphite}>
          <cylinderGeometry args={[0.155, 0.165, 0.14, 32]} />
        </mesh>
        {/* glass */}
        <mesh position={[0, 0, 0.575]} rotation={[Math.PI / 2, 0, 0]} material={materials.glass}>
          <cylinderGeometry args={[0.14, 0.14, 0.03, 32]} />
        </mesh>
        {/* lens coating */}
        <mesh position={[0, 0, 0.585]} material={materials.lensCoat}>
          <circleGeometry args={[0.088, 32]} />
        </mesh>
        {/* IR ring */}
        <mesh position={[0, 0, 0.565]} material={materials.led}>
          <ringGeometry args={[0.1, 0.135, 32]} />
        </mesh>
        <Screws radius={0.12} z={0.6} material={materials.plastic} />
        {/* cable gland */}
        <mesh position={[0, -0.04, -0.6]} rotation={[Math.PI / 2, 0, 0]} material={materials.plastic}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
        </mesh>
      </group>
    </group>
  );
}

export function DomeCamera({ materials }: { materials: ReturnType<typeof useMaterials> }) {
  return (
    <group>
      <Mount materials={materials} />
      <group position={[0, 0.05, 0]}>
        {/* base ring */}
        <mesh position={[0, 0.1, 0]} material={materials.housing}>
          <cylinderGeometry args={[0.42, 0.44, 0.16, 36]} />
        </mesh>
        {/* dome */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI, 0, 0]} material={materials.glass}>
          <sphereGeometry args={[0.4, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* inner gimbal */}
        <mesh position={[0, -0.04, 0.05]} rotation={[Math.PI / 2.4, 0, 0]} material={materials.plastic}>
          <cylinderGeometry args={[0.14, 0.16, 0.2, 24]} />
        </mesh>
        <mesh position={[0, -0.1, 0.15]} rotation={[Math.PI / 2.4, 0, 0]} material={materials.lensCoat}>
          <circleGeometry args={[0.08, 28]} />
        </mesh>
        <mesh position={[0, -0.02, -0.16]} material={materials.led}>
          <sphereGeometry args={[0.05, 14, 12]} />
        </mesh>
        <Screws radius={0.34} count={3} z={0} material={materials.plastic} />
      </group>
    </group>
  );
}

export function PtzCamera({ materials }: { materials: ReturnType<typeof useMaterials> }) {
  return (
    <group>
      <Mount materials={materials} />
      <group position={[0, 0.08, 0]}>
        {/* pan base */}
        <mesh position={[0, 0.22, 0]} material={materials.housing}>
          <cylinderGeometry args={[0.3, 0.34, 0.22, 32]} />
        </mesh>
        {/* yoke arms */}
        <mesh position={[-0.28, 0.02, 0]} material={materials.graphite}>
          <boxGeometry args={[0.07, 0.34, 0.16]} />
        </mesh>
        <mesh position={[0.28, 0.02, 0]} material={materials.graphite}>
          <boxGeometry args={[0.07, 0.34, 0.16]} />
        </mesh>
        {/* tilt head */}
        <group position={[0, -0.06, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.housing}>
            <cylinderGeometry args={[0.24, 0.24, 0.5, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} material={materials.graphite}>
            <cylinderGeometry args={[0.19, 0.21, 0.12, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.27]} rotation={[Math.PI / 2, 0, 0]} material={materials.glass}>
            <cylinderGeometry args={[0.17, 0.17, 0.03, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.285]} material={materials.lensCoat}>
            <circleGeometry args={[0.1, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.27]} material={materials.led}>
            <ringGeometry args={[0.12, 0.16, 32]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function CameraModel({ kind }: { kind: CameraKind }) {
  const materials = useMaterials();
  if (kind === "dome") return <DomeCamera materials={materials} />;
  if (kind === "ptz") return <PtzCamera materials={materials} />;
  return <BulletCamera materials={materials} />;
}
