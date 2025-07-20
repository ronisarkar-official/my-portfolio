import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        background: 'transparent',
      }}>
      <div className="spinner"></div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          fontSize: 16,
          color: '#ffffff',
          fontWeight: 600,
          textShadow: '0 0 6px rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
        }}>
        {progress !== 0 ? `${progress.toFixed(1)}%` : 'Loading...'}
      </motion.p>
    </Html>
  );
};

export default CanvasLoader;
