import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Soft volumetric scan beam — an additive cone with vertical falloff.
 * Deliberately low intensity: surveillance light, not a neon laser.
 */
export function ScanBeam({
  length = 4,
  radius = 0.7,
  intensity = 1,
}: {
  length?: number;
  radius?: number;
  intensity?: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uIntensity: { value: intensity },
          uColor: { value: new THREE.Color("#4c9dff") },
        },
        vertexShader: /* glsl */ `
          varying float vY;
          void main() {
            vY = uv.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uIntensity;
          uniform vec3 uColor;
          varying float vY;
          void main() {
            float falloff = pow(vY, 1.8) * 0.5;
            gl_FragColor = vec4(uColor, falloff * uIntensity * 0.5);
          }
        `,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const intensityUniform = material.uniforms["uIntensity"];
  if (intensityUniform) intensityUniform.value = intensity;

  return (
    <mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <coneGeometry args={[radius, length, 28, 1, true]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
