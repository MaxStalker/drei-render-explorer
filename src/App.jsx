import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { PresentationControls, Center, Billboard } from "@react-three/drei";
import { softShadows } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import "./index.css";

const path = "/models/diorama.glb";
useGLTF.preload(path);
softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 17,
  rings: 11, // Rings (default: 11) must be a int
});

function Flovatar(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const { nodes, materials } = useGLTF(path);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
      <mesh
        {...props}
        ref={ref}
        geometry={nodes.Cube082_1.geometry}
        material={materials.Flovatar}
      />
    </Billboard>
    /*    <group rotation={[0, Math.PI/4, 0]}>
      <mesh
        {...props}
        ref={ref}
        geometry={nodes.Cube082_1.geometry}
        material={materials.Flovatar}
      />
    </group>*/
  );
}

function Torch(props) {
  const ref = useRef();
  const torchColor = "#a22c01";
  const torchIntensity = 8;
  const torchMax = 6;
  const torchDecay = 2;

  const flameColor = "#f88b00";
  const flameIntensity = 20;
  const flameMax = 2;
  const flameDecay = 1;

  return (
    <group {...props}>
      <pointLight
        castShadows
        ref={ref}
        args={[torchColor, torchIntensity, torchMax, torchDecay]}
      />
      <pointLight
        castShadows
        position={[0, -0.6, 0]}
        ref={ref}
        args={[flameColor, flameIntensity, flameMax, flameDecay]}
      />
    </group>
  );
}

function App(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(path);
  /*  const ref = useRef();
   */
  // console.log(ref.current.rotation.x)

  const ambientColor = "#062060";

  return (
    <Canvas flat dpr={[1, 2]} camera={{ fov: 35, position: [0, -2, 22] }}>
      <ambientLight intensity={0.1} args={[ambientColor]} />
      <Torch position={[-1.7, 0.25, 0]} />
      <Torch position={[1.7, 0.25, 0]} />
      <PresentationControls
        global
        rotation={[Math.PI / 10, Math.PI, 0]} // Default rotation
        polar={[-Math.PI / 16, Math.PI / 8]} // Vertical limits
        azimuth={[-Math.PI / 8, Math.PI / 8]} // Horizontal limits
      >
        {/* Flovatar Rendering Here*/}
        <Center>
          <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube082.geometry}
                material={materials.Grossing}
              />
              <Flovatar />
            </group>
          </group>
        </Center>
      </PresentationControls>
    </Canvas>
  );
}

export default App;
