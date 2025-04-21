import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float } from '@react-three/drei'
import { motion } from 'framer-motion'

function Model() {
  const gltf = useGLTF('/models/logo.gltf')
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <primitive object={gltf.scene} scale={0.2} position={[0, 0, 0]} />
    </Float>
  )
}

export default function Logo3D() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-xl overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 60], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Model />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

// Pre-load the model
useGLTF.preload('/models/logo.gltf')