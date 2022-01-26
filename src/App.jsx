import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { useControls } from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  PresentationControls,
  PerspectiveCamera,
  Center,
  Billboard,
  Backdrop,
  OrbitControls,
} from "@react-three/drei";
import { softShadows } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import "./index.css";
import { FillView } from "./Components";

import { MathUtils, Vector3 } from "three";
import OrbitCamera from "./OrbitCamera";
import CustomOrbitCamera from "./CustomOrbitCamera";

// Components
import Torch from "./Torch";
import controls from "./controls";

const path = "/models/secondary/dungeon.glb";
//const path = "/models/diorama.glb";
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
    <group>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      ></Billboard>
    </group>
  );
}

const dummy = new Vector3();
const lookAtPos = new Vector3();

/*function Camera(props) {
  const zoom = false;
  useFrame((state, delta) => {
    const step = 0.1;
    state.camera.fov = 50 //MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step);
    /!*state.camera.position.lerp(
      dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10),
      step
    );*!/
    state.camera.setPosition([0, 5, 20])

    lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2);

    state.camera.lookAt(lookAtPos);
    state.camera.updateProjectionMatrix();
  });
  return null;
}*/

function App(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(path);
  const [ambientControls, fillControls, torchControls, camera] = controls();

  console.log({ ambientControls });

  return (
    <Canvas flat dpr={[1, 2]} resize={{ scroll: false }}>
      <ambientLight
        intensity={ambientControls.intensity}
        args={[ambientControls.color]}
      />

      <mesh geometry={nodes.base001.geometry} material={materials.Grossing} />
      <OrbitCamera position={camera.position} />

      {/*      <PresentationControls
        global
        rotation={[Math.PI / 10, Math.PI, 0]} // Default rotation
        polar={[-Math.PI / 16, Math.PI / 8]} // Vertical limits
        azimuth={[-Math.PI / 8, Math.PI / 8]} // Horizontal limits
      >*/}
      {/* Flovatar Rendering Here*/}

      {/*      <group ref={group} {...props} dispose={null}>
        <group rotation={[-Math.PI, 0, -Math.PI]}>
          <Torch position={[-1.7, 3, -0.5]} {...torchControls} />
          <Torch position={[1.7, 3, -0.5]} {...torchControls} />

          <mesh
            geometry={nodes.base001.geometry}
            material={materials.Grossing}
          />
          <mesh
            position={[0, 5, 0]}
            rotation={[Math.PI/2, 0, Math.PI]}
            geometry={nodes.flovatar.geometry}
            material={materials.flovatar}
          />
          <Flovatar position={[0, 5, 0]} rotation={[Math.PI, 0, 0]} />
        </group>
      </group>*/}
    </Canvas>
  );
}

export default App;
