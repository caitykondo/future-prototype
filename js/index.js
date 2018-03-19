const heroElement = document.getElementsByClassName('hero')[0];
const heroButton = document.getElementById('hero__button');
const heroTextContainer = document.getElementById('hero-text-container');
const sideTrackerCounter = document.getElementById('side-tracker-counter');
const overlayLoader = document.getElementById('overlay');

window.addEventListener('load', e => {
  overlayLoader.classList.add('overlay--animation');
})

/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////
const scene = new THREE.Scene();
scene.position.set( 0 , 0, 0);
scene.rotation.set( 0, 141, 0)

const camera = new THREE.PerspectiveCamera(
  3.5, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  1, // Near
  1000, // Far
 );
camera.position.set(270, 2, 100); // X Y Z //X270
camera.zoom = 0.1;
camera.lookAt( scene.position );

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
heroElement.appendChild( renderer.domElement );

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////
const controls = new THREE.OrbitControls( camera , renderer.domElement);
controls.rotateSpeed = 0.1;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.1;
controls.enableZoom = true;
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.minDistance = 180;
controls.maxDistance = 250;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI/2;


/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var lightColor = '#fff',
    ambientLight = new THREE.AmbientLight( '#fff' ),
    frontDebrisLight = new THREE.PointLight(lightColor, 10, 0, 5, 500);
    hemiLight = new THREE.HemisphereLight( lightColor, lightColor, -4 );
    cameraLight = new THREE.PointLight( lightColor, 1, 0 );

hemiLight.position.set( 0, 0, 0 );
frontDebrisLight.position.set( 0, 8, 0);
cameraLight.position.set( -100, 0, 0 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( cameraLight );
scene.add( frontDebrisLight );

/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderLandscape() {
  renderer.render( scene, camera );
}

controls.addEventListener( 'change', renderLandscape );

function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();

///////////////////////////////////////
// Window Resizing
///////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.position.set(270, 2, 100);
  camera.zoom = 1;
  camera.updateProjectionMatrix();
  renderLandscape();
}, false );

/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
    loader = new THREE.ColladaLoader();

function loadSpacescape( collada ) {
  spacescape = collada.scene;
  spacescape.position.set(0, -7, -1);
  scene.add(spacescape);
  renderLandscape();

   const launchedSpacescapeAnimation = () =>{
    if(spacescape.position.x >= -800){
      requestAnimationFrame(launchedSpacescapeAnimation);
      spacescape.position.set = {
        x: spacescape.position.x -= 10,
        y: spacescape.position.y,
        z: spacescape.position.z,
       };
      renderer.render(scene, camera);
    }
  }
  heroButton.addEventListener('click', e => {
    launchedSpacescapeAnimation();
  })
}

function loadClouds( collada ) {
  clouds = collada.scene;
  clouds.position.set(1000, 4, 6);
  scene.add(clouds);
  renderLandscape();
   // TRIGGERED ANIMATION
  const launchedCloudsAnimation = () =>{
    if(clouds.position.x >= -400){
      requestAnimationFrame(launchedCloudsAnimation);
      clouds.position.set = {
        x: clouds.position.x -= 12,
        y: clouds.position.y -= 0.0143,
        z: clouds.position.z += 0.00002,
       };
      renderer.render(scene, camera);
    }
  }
  heroButton.addEventListener('click', e => {
    launchedCloudsAnimation();
  })
}

function loadMoon( collada ) {
  moon = collada.scene;
  moon.position.set(1000, 5, -50);
  // moon.position.set(10, 5, 0);
  moon.rotation.set(70, 0, 206);
  scene.add(moon);
  renderLandscape();
  // SET COLORS
  moon.children.map( child => {
    if(child.material){
      child.material.color = {r: 254, g: 186, b: 0};
    }
  });
  // TRIGGERED ANIMATION
  const launchedMoonAnimation = () =>{
    if(moon.position.x >= -300){
      requestAnimationFrame(launchedMoonAnimation);
      moon.position.set = {
        x: moon.position.x -= 8,
        y: moon.position.y -= 0.1,
        z: moon.position.z += 0.3,
       };
      moon.scale.set(
        moon.scale.x += 0.0025,
        moon.scale.y += 0.0025,
        moon.scale.z += 0.0025,
      );
      renderer.render(scene, camera);
    }
  }
  heroButton.addEventListener('click', e => {
    launchedMoonAnimation();
  })
}

function loadPlanet( collada ) {
  planet = collada.scene;
  planet.position.set(600, -20, 8);
  planet.scale.set(0.75, 0.75, 0.75);
  scene.add(planet);
  renderLandscape();
  // TRIGGERED ANIMATION
  const launchedPlanetAnimation = () =>{
    if(planet.position.x >= -250){
      requestAnimationFrame(launchedPlanetAnimation);
      planet.position.set = {
        x: planet.position.x -= 8,
        y: planet.position.y += 0.3,
        z: planet.position.z += 0.2,
       };
      planet.scale.set(
        planet.scale.x += 0.02,
        planet.scale.y += 0.02,
        planet.scale.z += 0.02,
      );
      renderer.render(scene, camera);
    }
  }
  heroButton.addEventListener('click', e => {
    launchedPlanetAnimation();
  })
}

function loadDestinationDebris( collada ) {
  destinationDebris = collada.scene;
  destinationDebris.position.set(2000, 0, -5);
  destinationDebris.scale.set(1, 1, 1);
  // SET COLORS
  destinationDebris.children.map( child => {
    if(child.material){
      child.material.transparent = true;//{r: 0,  g: 200, b: 200}
      child.material.opacity = 0.5;
      child.material.shininess = 0;
      child.material.specular = {r: 0, b: 60, g: 8};
    }
  });
  scene.add(destinationDebris);
  renderLandscape();
  // INITIAL ANIMATION
  const staticDebrisAnimation = () => {
    requestAnimationFrame(staticDebrisAnimation);
    destinationDebris.rotation.set = {
      x: destinationDebris.rotation.x += 0.0005,
      y: destinationDebris.rotation.y += 0.0001,
      z: 0,
    };
    renderer.render(scene, camera);
  };

  // TRIGGERED ANIMATION
  function launchedDestinationDebrisAnimation(){
    if(destinationDebris.position.x > 25){
      requestAnimationFrame(launchedDestinationDebrisAnimation);
      destinationDebris.position.set = {
        x: destinationDebris.position.x -= 10,
        y: destinationDebris.position.y,
        z: destinationDebris.position.z,
       };
      renderer.render(scene, camera);
    }
    else {
      heroTextContainer.classList.add('hero-text-container--show');
      pointCloud.material.opacity = 0;
    }
  }
  heroButton.addEventListener('click', e => {
    launchedDestinationDebrisAnimation();
  })
  staticDebrisAnimation();
}

function loadFrontDebris( collada ) {
  frontDebris = collada.scene;
  frontDebris.position.set(0, 8, 0);
  frontDebris.scale.set(0.25, 0.25, 0.25);
  scene.add(frontDebris);
  renderLandscape();
  // INITIAL ANIMATION
  const initialFrontDebrisAnimation = () => {
    if( !launched ){
      requestAnimationFrame(initialFrontDebrisAnimation);
      frontDebris.rotation.set = {
        x: frontDebris.rotation.x += 0.0001,
        y: frontDebris.rotation.y += 0.0001,
        z: 0,
      };
      renderer.render(scene, camera);
    }
  };

  // TRIGGERED ANIMATION
  function launchedFrontDebrisAnimation(){
    if(frontDebris.position.x >= -300){
      requestAnimationFrame(launchedFrontDebrisAnimation);
      frontDebris.position.set = {
        x: frontDebris.position.x -= 5,
        y: frontDebris.position.y,
        z: frontDebris.position.z,
       };
      renderer.render(scene, camera);
    }
  }
  heroButton.addEventListener('click', e => {
    launchedFrontDebrisAnimation();
  })
  initialFrontDebrisAnimation();
}

loader.load( './assets/models/landscape.dae', loadSpacescape);
loader.load( './assets/models/clouds.dae', loadClouds);
loader.load( './assets/models/moon.dae', loadMoon);
loader.load( './assets/models/planet.dae', loadPlanet);
loader.load( './assets/models/space-debris.dae', loadDestinationDebris);
loader.load( './assets/models/space-debris.dae', loadFrontDebris);

var material = new THREE.PointsMaterial({
  color: 0xffffcc
});
var geometry = new THREE.Geometry();
var x, y, z;
for(let i = 0; i < 5000; i ++){
  x = (Math.random() * 2000) - 0;
  y = (Math.random() * 80) - 0;
  z = (Math.random() * 40) - 0;
  geometry.vertices.push(new THREE.Vector3(x, y, z));
}
function launchedPointCloudAnimation(){
  if(pointCloud.position.x >= -6000){
    requestAnimationFrame(launchedPointCloudAnimation);
    pointCloud.position.set = {
      x: pointCloud.position.x -= 15,
      y: pointCloud.position.y,
      z: pointCloud.position.z,
     };
    renderer.render(scene, camera);
  }
}
heroButton.addEventListener('click', e => {
  launchedPointCloudAnimation();
})

var pointCloud = new THREE.Points(geometry, material);
pointCloud.position.set(0, -6, -20);
pointCloud.material.size = 5;
pointCloud.material.transparent = true;
pointCloud.material.opacity = 0.2;

const svgTrackerMap = document.getElementById('tracker-map-container');

const animateSvgMap = () => {
  svgTrackerMap.classList.add('tracker-map-container--launched');
}

//////////////////////////////////
// Event Triggers
//////////////////////////////////

const heroLaunchedClass = 'hero--launched';
let launched = false;

function positionCameraForLaunch(){
  camera.position.set(270, 0, 100); // X Y Z
  camera.zoom = 0.1;
  camera.lookAt( scene.position );
}

function incrementSideCounter(){
  let count = 0;
  setInterval( function(){
    if(count <= 999){
      sideTrackerCounter.innerHTML = count + '00';
      count = count + 1 * 2;
    }
  }, 5);
}

heroButton.addEventListener('click', e => {
  launched = true;
  positionCameraForLaunch();
  heroElement.classList.add(heroLaunchedClass);
  heroButton.classList.add('hero__button--hide');
  scene.add(pointCloud);
  animateSvgMap();
  incrementSideCounter();
  clearInterval(incrementSideCounter);
})

