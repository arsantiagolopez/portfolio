/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    model002: THREE.Mesh;
    ["4_Object06_01_16_16_1"]: THREE.Mesh;
    ["4_Object06_01_16_16_2"]: THREE.Mesh;
    ["4_Object06_01_16_16001"]: THREE.Mesh;
    ["4_Object06_01_16_16002"]: THREE.Mesh;
  };
  materials: {
    ["material_0.001"]: THREE.MeshStandardMaterial;
    ["4_Object06_0.1_16_16"]: THREE.MeshStandardMaterial;
    ["4_Object08_0.1_16_16"]: THREE.MeshStandardMaterial;
  };
};

export default function Avatar({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/3d/avatar.glb") as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.model002.geometry}
        material={materials["material_0.001"]}
        position={[-0.13, -1.35, -1.06]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={22.81}
      />
      <group position={[0, 0.25, 0]}>
        <mesh
          geometry={nodes["4_Object06_01_16_16_1"].geometry}
          material={nodes["4_Object06_01_16_16_1"].material}
        />
        <mesh
          geometry={nodes["4_Object06_01_16_16_2"].geometry}
          material={materials["4_Object08_0.1_16_16"]}
        />
      </group>
      <mesh
        geometry={nodes["4_Object06_01_16_16001"].geometry}
        material={nodes["4_Object06_01_16_16001"].material}
      />
      <mesh
        geometry={nodes["4_Object06_01_16_16002"].geometry}
        material={nodes["4_Object06_01_16_16002"].material}
        position={[0, 0.25, 0]}
      />
    </group>
  );
}

useGLTF.preload("/avatar.glb");
