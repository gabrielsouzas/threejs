import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading the texture of the object
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug - Controla parametros via tela para facilitar o dev
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
//const geometry = new THREE.TorusGeometry( .9, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials - Aparência do objeto

//const material = new THREE.MeshBasicMaterial()
// Definição da classe do material que vai ser utilizada
const material = new THREE.MeshStandardMaterial()
// Propriedades do material
material.metalness = 0.7
material.roughness = 0.2
// Seta a textura criada da pasta textures
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// Light 1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity = 10

scene.add(pointLight2)

// Cria um folder para controlar a primeira luz na tela
const light1 = gui.addFolder('Light 1')

// Adiciona o controle na tela da prop position da pointLight2
//gui.add(pointLight2.position, 'y')

// Adiciona o controle na tela da prop position da pointLight2 mas dessa vez com um slider de controle por causa dos parametros min, max e step
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// Helper para ver o pointer que cria a luz no objeto
const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)

// Light 3

const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.set(0.69,-3,-1.98)
pointLight3.intensity = 10

scene.add(pointLight3)

// Cria um folder para controlar a segunda luz na tela
const light2 = gui.addFolder('Light 2')

light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// Definição da cor para a manipulação na tela
const light2Color = {
    color: 0xff0000
}

// Adição da cor para manipulação na tela
light2.addColor(light2Color, 'color').onChange(() => {
    pointLight3.color.set(light2Color.color)
})

// Helper para ver o pointer que cria a luz no objeto
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()