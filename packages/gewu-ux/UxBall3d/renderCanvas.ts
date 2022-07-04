function getCanvasBounds(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return [0, 0, rect.width, rect.height];
}

export interface BallProps {
  dotRad?: number;
  rad?: number;
  lat?: number;
  lon?: number;
  pi?: number;
  rotationSpeed?: number;
  canvas?: HTMLCanvasElement;
}

// Rotates points in cylendrical coordinates about its Z axis
// Accepts a rotation angle (ro) and an array ( z, rad, th )
// Returns an array with three float values ( z, rad, th )
function rotate(ro: number, pointZRadTh: number[]) {
  const rotatedPointZRadTh = [];
  rotatedPointZRadTh[0] = pointZRadTh[0];
  rotatedPointZRadTh[1] = pointZRadTh[1];
  rotatedPointZRadTh[2] = pointZRadTh[2] + ro;
  return rotatedPointZRadTh;
}

// Converts cylendrical coordinates to cartesian coordinates
// Accepts an array with three float values ( z, rad, th )
// Returns an array with three float values ( z, x, y )
function depolar(pointZRadTh: number[]) {
  const pointZXY = [];
  pointZXY[0] = pointZRadTh[0];
  pointZXY[1] = pointZRadTh[1] * Math.sin(pointZRadTh[2]);
  pointZXY[2] = pointZRadTh[1] * Math.cos(pointZRadTh[2]);
  return pointZXY;
}

// Converts 3D cartesian coordinates to 2D isometric coordinates
// Accepts an array with three float values ( z, x, y)
// Returns an array with two float values ( x, y )
function iso(pi: number, pointZXY: number[]) {
  const isoXY = [];
  const th = pi / 6;
  isoXY[0] = pointZXY[1] * Math.cos(th) - pointZXY[2] * Math.cos(th);
  isoXY[1] = pointZXY[1] * Math.sin(th) + pointZXY[2] * Math.sin(th) + pointZXY[0];
  return isoXY;
}

export function renderCanvas({
  canvas,
  dotRad = 0.7,
  rad = 1.34,
  lat = 24,
  lon = 50,
  pi = 3.14,
  rotationSpeed = 1,
}: BallProps) {
  //   const sphereChange = false;

  // FUNCTIONS

  // Canvas adjustment for high DPI displays
  const setupCanvas = (canvas: HTMLCanvasElement) => {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();

    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext("2d");
    if (context) {
      // Scale all drawing operations by the dpr, so you
      // don't have to worry about the difference.
      context.scale(dpr, dpr);
    }

    return context;
  };

  // Allow browser to set it's own FPS
  //   if (!window.requestAnimationFrame) {
  //     window.requestAnimationFrame = (function (callback:()=>void) {
  //       return function (callback) {
  //         window.setTimeout(callback, 1000 / 60);
  //       };
  //     })();
  //   }

  // Loops through sphere array and plots points
  // Accepts array ( id, ( z, rad, th ) ), ro, context
  const drawSphere = (sphere: number[][], ro: number, context: CanvasRenderingContext2D) => {
    for (let id = 0; id < sphere.length; id++) {
      const [x, y] = viewport(iso(pi, depolar(rotate(ro, sphere[id]))));
      context.fillRect(x - dotRad, y - dotRad, 2 * dotRad, 2 * dotRad);
    }
  };

  // Gets actual canvas bounds for calculating viewport with responsive canvas
  // Accepts canvas
  // Returns array ( left, top, right, bottom )

  // Updates sphere position, clears canvas, draws new sphere and updates animation frame
  // Accepts sphere array (id, (z, rad, th)), canvas, context, startTime (time)
  // Based on https://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/
  const animate = (
    sphere: number[][],
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    startTime: number,
  ) => {
    // Update
    const time = Date.now() - startTime;
    let ro = (((rotationSpeed / 100) * time) / 1000) * 2 * pi;
    if (ro >= 2 * pi) {
      ro = ro - 2 * pi;
    }

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSphere(sphere, ro, context);
  };

  // Scales and translates points in the viewport to fit the canvas
  // Accepts an array with two float values (x, y)
  // Returns an array with two integer values (u, v)
  function viewport(viewportXY: number[]) {
    const canvasXY = [];
    const viewportWidth = viewportBounds[2] - viewportBounds[0];
    const viewportHeight = viewportBounds[3] - viewportBounds[1];
    const canvasWidth = canvasBounds[2] - canvasBounds[0];
    const canvasHeight = canvasBounds[3] - canvasBounds[1];
    canvasXY[0] = Math.round((viewportXY[0] / viewportWidth) * canvasWidth + canvasWidth / 2);
    canvasXY[1] = Math.round((viewportXY[1] / viewportHeight) * canvasHeight + canvasHeight / 2);
    return canvasXY;
  }

  // Define sphere centered on the origin
  // Accepts three floats: radius, # of latitude lines, # of longitude lines
  // Returns two dimensional array of the form: ( point id (id), ( height (z), radius (rad), angle (th) ))
  function defineSphere(sphereRad: number, sphereLat: number, sphereLon: number) {
    const sphere = [] as number[][];
    let id = 0;
    // Z increment is sphere height divided by number of latitude lines
    const zInc = (2 * sphereRad) / sphereLat;
    // Start at the lowest point and loop through the lines of latitude
    for (let z_i = 0; z_i <= sphereLat; z_i++) {
      // Calc height from z index
      const z = -sphereRad + z_i * zInc;
      // Find the radius of a circle at that line of latitude
      const rad = Math.sqrt(Math.pow(sphereRad, 2) - Math.pow(z, 2));
      // Theta increment is circumference divided by the number of lines of longitude
      const thInc = (2 * pi) / sphereLon;

      // If there is a radius, loop around latitude line and make points where longitudes intersect
      if (rad != 0) {
        for (let th_i = 0; th_i < sphereLon; th_i++) {
          // Create array for point id;
          sphere[id] = [];
          // Calc angle from theta index
          const th = th_i * thInc;
          // Assign coordinates to array;
          sphere[id][0] = z;
          sphere[id][1] = rad;
          sphere[id][2] = th;
          id = id + 1;
        }
      } else {
        // Create array for point id
        sphere[id] = [];
        // Assign coordinates to array;
        sphere[id][0] = z;
        sphere[id][1] = 0;
        sphere[id][2] = 0;
        id = id + 1;
      }
    }
    return sphere;
  }

  // Add Event Listeners for input changes

  const context = setupCanvas(canvas!);

  // Establish viewport
  const p = 1.75;
  const viewportBounds = [-p, p, p, -p]; // (left, top, right, bottom)
  const canvasBounds = getCanvasBounds(canvas!); // (left, top, right, bottom)

  // Set draw color
  context!.fillStyle = "rgb(255, 255, 255, 1)";

  // Define sphere properties from HTML inputs

  const sphere = defineSphere(rad, lat, lon);
  const startTime = Date.now();

  const timer = setInterval(() => {
    animate(sphere, canvas!, context!, startTime);
  }, 24);
  return () => {
    clearInterval(timer);
  };
}
