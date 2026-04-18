// Three.js Scene Setup for a Premium Cybernetic Background
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Add subtle fog for depth and premium feel
scene.fog = new THREE.FogExp2(0x050505, 0.004);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

// --- Particles Network ---
const createParticles = (count, color, size, spread) => {
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * spread;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: size,
        color: color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    return new THREE.Points(geometry, material);
};

// Cyan particles (close)
const particlesCyan = createParticles(1500, 0x00f0ff, 0.15, 150);
scene.add(particlesCyan);

// Purple particles (distant/larger spread)
const particlesPurple = createParticles(1000, 0x7000ff, 0.2, 250);
scene.add(particlesPurple);


// --- Premium Central Geometry (Torus Knot) ---
// Inner glowing solid
const solidGeometry = new THREE.TorusKnotGeometry(12, 3, 100, 16);
const solidMaterial = new THREE.MeshBasicMaterial({
    color: 0x110033,
    transparent: true,
    opacity: 0.4
});
const solidMesh = new THREE.Mesh(solidGeometry, solidMaterial);
scene.add(solidMesh);

// Outer Wireframe
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
});
const wireframeMesh = new THREE.Mesh(solidGeometry, wireframeMaterial);
wireframeMesh.scale.set(1.01, 1.01, 1.01);
scene.add(wireframeMesh);

// Floating Rings around the center
const ringGeometry = new THREE.RingGeometry(22, 22.2, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x7000ff,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
});
const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh1.rotation.x = Math.PI / 2;
scene.add(ringMesh1);

const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh2.rotation.y = Math.PI / 2;
scene.add(ringMesh2);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate core geometries smoothly
    solidMesh.rotation.y = elapsedTime * 0.05;
    solidMesh.rotation.x = elapsedTime * 0.02;
    wireframeMesh.rotation.y = elapsedTime * 0.05;
    wireframeMesh.rotation.x = elapsedTime * 0.02;

    // Rotate rings
    ringMesh1.rotation.z = elapsedTime * 0.1;
    ringMesh2.rotation.z = -elapsedTime * 0.1;

    // Rotate particles slightly in opposite directions
    particlesCyan.rotation.y = -elapsedTime * 0.02;
    particlesPurple.rotation.y = elapsedTime * 0.01;
    particlesPurple.rotation.x = elapsedTime * 0.01;
    
    // Smooth Parallax Mouse Interaction
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    const ease = 0.05;
    
    // Parallax on particles
    particlesCyan.rotation.y += ease * (targetX - particlesCyan.rotation.y);
    particlesCyan.rotation.x += ease * (targetY - particlesCyan.rotation.x);
    
    // Parallax on camera
    camera.position.x += (mouseX * 0.02 - camera.position.x) * ease;
    camera.position.y += (-mouseY * 0.02 - camera.position.y) * ease;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
