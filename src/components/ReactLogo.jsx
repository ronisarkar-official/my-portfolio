import React, { useRef } from 'react';
import {Float, useGLTF } from '@react-three/drei';

const ReactLogo = (props) => {
  const { nodes, materials } = useGLTF('/models/react.glb');
  return (
    <Float floatIntensity={1} >
      <group position={[8,8,0]} scale={0.005} {...props} dispose={null} >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['React-Logo_Material002_0'].geometry}
          material={materials['Material.002']}
          position={[0, 8.94, 220.1]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[39.17, 39.17, 52.73]}
        />
      </group>
    </Float>
  );
};

useGLTF.preload('/models/react.glb');
export default ReactLogo;
