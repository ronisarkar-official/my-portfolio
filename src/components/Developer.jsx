import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';

const animations = ['idle', 'salute', 'clapping', 'victory'];

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/animations/Developer.glb');

  // Load all animations dynamically and name them
  const loadedAnimations = useMemo(() => {
    return animations.map((anim) => {
      const { animations } = useFBX(`/models/animations/${anim}.fbx`);
      animations[0].name = anim;
      return animations[0];
    });
  }, []);

  const { actions } = useAnimations(loadedAnimations, group);

  useEffect(() => {
    if (actions && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
      return () => actions[animationName].fadeOut(0.5);
    }
  }, [actions, animationName]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Avatar_Transparent.geometry}
        material={materials.Wolf3D_Avatar_Transparent}
        skeleton={nodes.Wolf3D_Avatar_Transparent.skeleton}
      />
    </group>
  );
};

useGLTF.preload('/models/animations/Developer.glb');
export default Developer;
