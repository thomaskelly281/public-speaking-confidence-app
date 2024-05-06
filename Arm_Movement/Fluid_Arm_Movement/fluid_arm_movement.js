
////////////////////////////////////////////////////////
// Canvas and Camera
////////////////////////////////////////////////////////

const videoElement = document.querySelector('video');
const canvasElement = document.querySelector('canvas');
const canvasCtx = canvasElement.getContext('2d');

// Function to get pixel values from computed style
function getPixelValue(value) {
    return parseInt(value.replace('px', ''), 10); // Removes the 'px' and converts to integer
}

// Get computed style
const videoComputedStyle = window.getComputedStyle(videoElement);
const videoWidth = getPixelValue(videoComputedStyle.width);
const videoHeight = getPixelValue(videoComputedStyle.height);

// Initialize the camera with dynamic dimensions
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: videoWidth,
    height: videoHeight
});
camera.start();

// Ensure canvas matches video dimensions
canvasElement.style.width = `${videoWidth}px`;
canvasElement.style.height = `${videoHeight}px`;
canvasElement.width = videoWidth;
canvasElement.height = videoHeight;

////////////////////////////////////////////////////////
// Ellipses
////////////////////////////////////////////////////////

let ball_y_height = 600;

let greenTime1 = 0;  // Counter for the first ellipse
let greenTime2 = 0;  // Counter for the second ellipse

let lastFrameTime = Date.now();  // Tracks the time of the last frame to calculate delta

// Initial positions for the animated ellipses
let ellipse1 = { x: 100, y: ball_y_height, radius: 50, color: '#FF0000', handInside: false };
let ellipse2 = { x: 200, y: ball_y_height, radius: 50, color: '#FF0000', handInside: false };

function updateEllipseStatusAndColor(ellipse) {
    if (ellipse.handInside) {
        ellipse.color = '#00FF00';
    } else {
        ellipse.color = '#FF0000';
    }
    drawEllipse(ellipse);
}

function drawGlowingEllipse(x, y, radius, color) {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, 2 * Math.PI);
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = 4;
    canvasCtx.shadowBlur = 20;
    canvasCtx.shadowColor = color;
    canvasCtx.stroke();
    canvasCtx.shadowBlur = 0;
    canvasCtx.shadowColor = 'rgba(0, 0, 0, 0)';
}

const centerX = canvasElement.width / 2;  // Central x position on the canvas
const edgeBuffer = 100; // Buffer from the edge of the canvas
const maxAmplitude = (canvasElement.width / 2) - edgeBuffer; // Maximum displacement from the center

let time = 0;  // Time variable to drive the oscillation
const frequency = 0.03;  // Frequency of the oscillation - controls the speed

function animateEllipses() {
    // Calculate the amplitude dynamically to keep the ellipses within bounds
    const currentAmplitude = maxAmplitude - (0.2 * maxAmplitude * Math.cos(time)); // Reduce amplitude over time

    // Adjust x positions calculation to reduce time spent in the center
    ellipse1.x = centerX - (currentAmplitude * Math.pow(Math.sin(time), 3) + edgeBuffer);
    ellipse2.x = centerX + (currentAmplitude * Math.pow(Math.sin(time), 3) + edgeBuffer);


    // Ensure ellipses do not touch the center or each other by maintaining a minimum edge buffer
    if (Math.abs(ellipse1.x - centerX) < edgeBuffer) {
        ellipse1.x = centerX - edgeBuffer;
    }
    if (Math.abs(ellipse2.x - centerX) < edgeBuffer) {
        ellipse2.x = centerX + edgeBuffer;
    }

    // Adjust y positions based on x positions to mimic the swinging motion
    ellipse1.y = ball_y_height + 50 * Math.cos(Math.abs(ellipse1.x - centerX) / currentAmplitude * Math.PI / 2);
    ellipse2.y = ball_y_height + 50 * Math.cos(Math.abs(ellipse2.x - centerX) / currentAmplitude * Math.PI / 2);

    // Clear only the previous areas of the ellipses
    clearEllipseArea(ellipse1.prevX, ellipse1.prevY, ellipse1.radius + 5);
    clearEllipseArea(ellipse2.prevX, ellipse2.prevY, ellipse2.radius + 5);

    // Draw ellipses at new positions
    drawEllipse(ellipse1);
    drawEllipse(ellipse2);

    // Store the current positions as previous for the next frame
    ellipse1.prevX = ellipse1.x;
    ellipse1.prevY = ellipse1.y;
    ellipse2.prevX = ellipse2.x;
    ellipse2.prevY = ellipse2.y;

    // Increment time for the next frame
    time += frequency;
    requestAnimationFrame(animateEllipses);
}

function clearEllipseArea(x, y, radius) {
    canvasCtx.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
}

function drawEllipse(ellipse) {
    canvasCtx.fillStyle = ellipse.color;
    canvasCtx.beginPath();
    canvasCtx.ellipse(ellipse.x, ellipse.y, ellipse.radius, ellipse.radius, 0, 0, 2 * Math.PI);
    canvasCtx.fill();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const totalTime = greenTime1 + greenTime2; // Sum of green times
    const targetTime = 30; // Target time in seconds
    const percentage = (totalTime / targetTime) * 100;

    // Update the width of the progress bar
    progressBar.style.width = `${Math.min(percentage, 100)}%`; // Cap at 100% to prevent overflow

    if (progressBar.style.width === "100%") {
        window.location.replace("fluid_arm_movement_complete.html");
    }
}

function updateEllipseColor(ellipse, deltaTime) {
    if (ellipse.handInside) {
        if (ellipse.color !== '#B297FF') {
            ellipse.color = '#B297FF';  // Change color to green if not already
        }
        // Increment the green time based on which ellipse this is
        if (ellipse === ellipse1) {
            greenTime1 += deltaTime;
        } else if (ellipse === ellipse2) {
            greenTime2 += deltaTime;
        }
        updateProgressBar();  // Update the progress bar whenever the green time changes
    } else {
        ellipse.color = '#E13700';  // Change color to red if hand is not inside
    }
}
// Function to display the green time counters on the canvas or in the console
function displayGreenTime() {
    console.log(`Right hand has been green for ${greenTime1.toFixed(2)} seconds.`);
    console.log(`Left hand has been green for ${greenTime2.toFixed(2)} seconds.`);
}

// Start the animation loop
requestAnimationFrame(animateEllipses);

////////////////////////////////////////////////////////
// MediaPipe Hands
////////////////////////////////////////////////////////

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

// Function to check if a point is within an ellipse
function isPointInEllipse(pointX, pointY, ellipse) {
    return Math.pow(pointX - ellipse.x, 2) + Math.pow(pointY - ellipse.y, 2) <= Math.pow(ellipse.radius, 2);
}

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

// Updating handInside status based on hand positions from MediaPipe
hands.onResults((results) => {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Reset handInside flags for each moving ellipse at the start of each frame
    ellipse1.handInside = false;
    ellipse2.handInside = false;

    // Process each hand landmark detected
    results.multiHandLandmarks.forEach(landmarks => {
        let handCenterX = 0, handCenterY = 0;
        landmarks.forEach(landmark => {
            handCenterX += landmark.x * canvasElement.width;
            handCenterY += landmark.y * canvasElement.height;
        });
        handCenterX /= landmarks.length;
        handCenterY /= landmarks.length;

        // Check overlap for each ellipse with each hand
        ellipse1.handInside |= isPointInEllipse(handCenterX, handCenterY, ellipse1);  // Update handInside for ellipse1
        ellipse2.handInside |= isPointInEllipse(handCenterX, handCenterY, ellipse2);  // Update handInside for ellipse2
    });

    let deltaTime = (Date.now() - lastFrameTime) / 1000;  // Calculate deltaTime
    lastFrameTime = Date.now();

    // Update colors and track green time
    updateEllipseColor(ellipse1, deltaTime);
    updateEllipseColor(ellipse2, deltaTime);

    drawEllipse(ellipse1);
    drawEllipse(ellipse2);

    displayGreenTime();  // Optionally display the time each ellipse has been green

    canvasCtx.restore();
});

////////////////////////////////////////////////////////
// Hand Ellipses
////////////////////////////////////////////////////////

function checkHandInsideEllipse(handX, handY, ellipse) {
    if (isPointInEllipse(handX, handY, ellipse)) {
        ellipse.handInside = true;
    }
}

function updateEllipseHandState(ellipse, handX, handY) {
    if (isPointInEllipse(handX, handY, ellipse)) {
        ellipse.handInside = true;
    }
}

videoElement.addEventListener('loadedmetadata', function() {
    // These lines may be adjusted or removed depending on the desired behavior
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
});
