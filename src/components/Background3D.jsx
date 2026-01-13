import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

function ParticleSphere({ count = 8000, ...props }) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }))

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15
        ref.current.rotation.y -= delta / 20
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={props.color || "#00ff88"}
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    )
}

function Rig() {
    useFrame((state) => {
        // Safe lerp for camera position
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -state.mouse.x / 2, 0.05)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -state.mouse.y / 2, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function Background3D() {
    return (
        <div className="absolute inset-0 z-0 bg-[#030305]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleSphere color="#00ff88" count={12000} />
                <ParticleSphere color="#3b82f6" count={8000} />
                <Rig />
            </Canvas>
        </div>
    )
}
