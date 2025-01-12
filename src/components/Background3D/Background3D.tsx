import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  
  // Создаем частицы
  const particleCount = 1000
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z
    }
    return positions
  }, [])

  // Анимация
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = time * 0.1
    ref.current.rotation.y = time * 0.05
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color={getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-color') || '#5288c1'}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

const Background3D = () => {
  return (
    <div className="background-3d">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}

export default Background3D
