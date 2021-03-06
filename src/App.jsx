import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { useControls } from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  PresentationControls,
  Center,
  Billboard,
  Backdrop,
} from "@react-three/drei";
import { softShadows } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import "./index.css";
import { FillView } from "./Components";

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
  const { flameColor, flameFalloff, torchColor, flameIntensity = 10 } = props;
  const torchIntensity = 8;
  const torchMax = 6;
  const torchDecay = 2;

  const flameMax = 2;

  return (
    <group {...props} ref={ref}>
      <pointLight
        castShadows
        args={[torchColor, torchIntensity, torchMax, torchDecay]}
      />
      <pointLight
        castShadows
        position={[0, -0.7, 0]}
        args={[flameColor, flameIntensity, flameFalloff, 1.75]}
      />
    </group>
  );
}

function App(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(path);

  // Leva Controls;
  const ambientControls = useControls(
    "Ambient Light",
    {
      color: "#0f0727",
      intensity: {
        value: 0.5,
        min: 0,
        max: 0.5,
        step: 0.01,
      },
    },
    {
      collapsed: true,
    }
  );

  const fillControls = useControls(
    "Fill Light",
    {
      color: "#ffb705",
      intensity: {
        value: 10,
        min: 0,
        max: 10,
        step: 0.01,
      },
    },
    {
      collapsed: true,
    }
  );

  const torchControls = useControls(
    "Torch Controls",
    {
      torchColor: "#a22c01",
      flameColor: `#f55605`,

      flameIntensity: {
        value: 15,
        min: 0,
        max: 20,
        step: 0.01,
      },
      flameFalloff: {
        value: 3.5,
        min: 0,
        max: 20,
        step: 0.01,
      },
    },
    {
      collapsed: true,
    }
  );

  return (
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{ fov: 35, position: [0, -2, 22] }}
      resize={{ scroll: false }}
    >
      <ambientLight
        intensity={ambientControls.intensity}
        args={[ambientControls.color]}
      />

      <Torch position={[-1.7, 0.25, 0]} {...torchControls} />
      <Torch position={[1.7, 0.25, 0]} {...torchControls} />

      <pointLight
        castShadows
        position={[0, 0.75, 3.5]}
        args={[fillControls.color, fillControls.intensity, 3.5, 1]}
      />

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
