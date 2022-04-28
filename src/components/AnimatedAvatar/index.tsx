import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, Suspense, useEffect, useState } from "react";
import Avatar from "./Avatar";

interface Props {}

const AnimatedAvatar: FC<Props> = () => {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Let model follow the cursor
  const updateRotation = (event: MouseEvent) => {
    const xAxis = (event.clientX / window.innerWidth) * 2;
    const yAxis = (event.clientY / window.innerHeight) * 2;

    setRotation([
      // Vertical constraints
      yAxis * 0.5 - 0.5,
      // Horizontal constraints
      xAxis * 0.9 - 0.9,
      0,
    ]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateRotation);
    return () => {
      window.removeEventListener("mousemove", updateRotation);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.9} />
      <spotLight intensity={0.5} position={[5, 0, 0]} />

      <PresentationControls
        config={{ mass: 2, tension: 500, friction: 26 }}
        rotation={[0.1, 0, 0]}
        // @ts-ignore
        snap={{ mass: 1, tension: 500 }}
        polar={[-Math.PI / 7, Math.PI / 4]} // Vertical limits
        azimuth={[-Math.PI / 5, Math.PI / 5]} // Horizontal limits
      >
        <Suspense fallback={null}>
          <Avatar rotation={rotation} />
        </Suspense>
      </PresentationControls>

      <PerspectiveCamera
        makeDefault
        aspect={1200 / 600}
        // @ts-ignore
        radius={(1200 + 600) / 4}
        fov={25}
        position={[0, 0, 20]}
        onUpdate={(c) => c.updateProjectionMatrix()}
      />
    </Canvas>
  );
};

export { AnimatedAvatar };
