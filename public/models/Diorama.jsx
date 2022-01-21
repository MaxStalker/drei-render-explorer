import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./pca.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh geometry={nodes.Cube082.geometry} material={materials.Grossing} />
        <mesh
          geometry={nodes.Cube082_1.geometry}
          material={materials.Flovatar}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama.glb");
