import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { useControls } from "leva";

/*const lookAtFlovatar = new Vector3(0, 0, 0);
const OrbitCamera = () => {
  // We can use .lookAt property to update
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  // useFrame((state) => controls.current.update());
  useFrame((state) => {
    state.camera.lookAt(lookAtFlovatar);
    // cameraRef.current.update();
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[3, 2, -10]}
      fov={75}
      zoom={1}
      onUpdate={(c) => c.updateProjectionMatrix()}
    />
  );
};*/

extend({ OrbitControls });
const OrbitCamera = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());

  const { position } = useControls({
    position: {
      x: 0,
      y: 2,
      z: -20,
    },
  });

  return (
    <group>
      <PerspectiveCamera
        makeDefault
        position={[position.x, position.y, position.z]}
      />
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={false}
        maxAzimuthAngle={Math.PI * 1.2}
        minAzimuthAngle={Math.PI * 1.2 - Math.PI / 4}
        maxPolarAngle={Math.PI / 4 + Math.PI / 4}
        minPolarAngle={Math.PI / 4}
        enableDamping
        rotateSpeed={0.5}
        dampingFactor={0.05}
      />
    </group>
  );
};

export default OrbitCamera;
