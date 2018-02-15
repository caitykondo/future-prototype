/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////

const heroElement = document.getElementById('hero');
const ctaButton = document.getElementById('hero-cta');
const heroTextContainer = document.getElementById('hero-text-container');
const sideTrackerCounter = document.getElementById('side-tracker-counter');

const {
  clientHeight,
  clientWidth,
} = heroElement;

const scene = new THREE.Scene();
scene.position.set( 0 , 0, 0);
scene.rotation.set( 0, 141, 0)

const camera = new THREE.PerspectiveCamera(
  3.5, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
   1, // Near
   10000, // Far
 );
camera.position.set(270, 0, 100); // X Y Z
camera.lookAt( scene.position );



const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize( window.innerWidth, clientHeight );
heroElement.appendChild( renderer.domElement );




/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////
const controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 0.1;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.1;
controls.noZoom = false;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;
controls.minDistance = 180;
controls.maxDistance = 250;



let position = { x : 270, y: 0, z:100 };

ctaButton.addEventListener('click', e => {
  let runCamera = () => {
    setInterval(()=> {
      if(position.y < 18){
        position.y++;
      }
      if(position.x > 190){
        position.x--;
      }
      if(position.z > 5){
        position.z--;
      }
      else {
        return;
      }
      camera.position.set(position.x, position.y, position.z);
      camera.updateProjectionMatrix();
      sideTrackerCounter.innerHTML = (position.x + position.y + position.z ) * 99 ;
    }, 25)
  }
  let timer = runCamera();
  clearInterval(timer);
  heroTextContainer.classList.add('hero-text-container--show');
  console.log(heroTextContainer.classList);
});


// })
/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var lightColor  = '#fff',
    ambientLight  = new THREE.AmbientLight( '#fff' ),
    hemiLight     = new THREE.HemisphereLight( lightColor, lightColor, 0 );
    light         = new THREE.PointLight( lightColor, 1, 100 );
    pointLight2    = new THREE.PointLight( lightColor,  1, 100 );
    pointLight3    = new THREE.PointLight( lightColor,  1, 100 );

hemiLight.position.set( 250, 0, 0 );
pointLight2.position.set( 200, 0, 0 );
pointLight3.position.set( 85, 5, 20);
light.position.set( 0, 70, 20 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( pointLight2 );
scene.add( pointLight3 );
scene.add( light );


/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

// var axisHelper = new THREE.AxisHelper( 1.25 );
// scene.add( axisHelper );


/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderLandscape() {
  renderer.render( scene, camera );
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener( 'change', renderLandscape );

// Avoid constantly rendering the scene by only
// updating the controls every requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();


/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
  renderLandscape();
}, false );


/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
    loader = new THREE.ColladaLoader();

function loadLandscape( collada ) {
  dae = collada.scene;
  dae.position.set(0, -6, -1);
  scene.add(dae);
  renderLandscape();
}

function loadClouds( collada ) {
  dae = collada.scene;
  dae.position.set(5, 4, 6);
  scene.add(dae);
  renderLandscape();
}

function loadMoon( collada ) {
  dae = collada.scene;
  dae.position.set(250, 5, -10);
  dae.rotation.set(70, 0, 206);
  scene.add(dae);
  renderLandscape();
}

function loadPlanet( collada ) {
  dae = collada.scene;
  dae.position.set(100, 5, 8);
  scene.add(dae);
  renderLandscape();
}

loader.options.convertUpAxis = true;
loader.load( './landscape.dae', loadLandscape);
loader.load( './clouds.dae', loadClouds);
loader.load( './moon.dae', loadMoon);
loader.load( './planet.dae', loadPlanet);
