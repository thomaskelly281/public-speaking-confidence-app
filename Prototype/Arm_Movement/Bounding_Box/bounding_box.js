// This script uses mediapipe to track the users' hands and draws ellipses at their hands' central point
// There is a box the size of their torso which changes the colour of the ellipses
// For 3 seconds the box changes the ellipses to green, then for 2 it changes them to red, they have to move their hands outside of the box when red.



// Initialize the counter
let overlapCounter = 0;

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

const purpleBox = document.getElementById('boundingBox');
const purpleBoxLabel = document.getElementById('boundingBoxLabel');
const purpleBoxLabelP = document.getElementById('boundingBoxLabelP');


////////////////////////////////////////////////////////
// Ellipses
////////////////////////////////////////////////////////

let ball_y_height = 700;

function animateEllipses() {
    requestAnimationFrame(animateEllipses);
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

}

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

function checkAndUpdateEllipse(centerX, centerY, ellipse) {
    if (isPointInEllipse(centerX, centerY, ellipse)) {
        ellipse.handInside = true;
        ellipse.color = '#00FF00';  // Change color to green if hand is inside
    } else {
        ellipse.color = '#EF3B11';  // Revert color to red if hand is not inside
    }
}

function updateAndDrawEllipse(ellipse) {
    drawEllipse(ellipse);
}

const box = {
    x: 0,
    y: canvasElement.height / 2,
    width: canvasElement.width,
    height: canvasElement.height / 2
};

function drawBox() {
    canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';  // Semi-transparent red
    canvasCtx.fillRect(box.x, box.y, box.width, box.height);
}

function isPointInBox(pointX, pointY) {
    return pointX >= box.x && pointX <= (box.x + box.width) &&
        pointY >= box.y && pointY <= (box.y + box.height);
}

// Global flag to determine the color state
let colorState = false;


// Function to toggle the color state
function toggleColorState() {
    colorState = !colorState;

    // Determine the next toggle interval
    let nextInterval = colorState ? 3000 : 2000;  // 2 seconds if false, 3 seconds if true

    // Schedule the next toggle
    setTimeout(toggleColorState, nextInterval);
}

// Start the first toggle after 3 seconds
setTimeout(toggleColorState, 3000);

// Initialize time counters in milliseconds
let greenTime = 0;
let orangeTime = 0;

// Assuming 60 FPS for the animation, this will increment the time by approximately 16.67 milliseconds per frame.
let incrementTime = 1000 / 60;


function drawGlowingEllipse(x, y, radius, isInBox) {
    // Determine color based on the box position and the current color state
    let color;

    if (colorState) {
        purpleBox.style.backgroundColor = "#b397ffad";
        purpleBox.style.border = '0.5dvh solid #700ef0'

        purpleBoxLabel.style.border = '0.5dvh solid #700ef0';

        purpleBoxLabelP.innerHTML = "In.";

        color = isInBox ? '#b397ff' : '#FFA500'; // Green inside, orange outside

        if (isInBox) {
            greenTime += incrementTime; // Increment green time counter
            updateProgressBar(greenTime); // Call to update the progress bar

        } else {
            orangeTime += incrementTime; // Increment orange time counter
        }

    } else {
        purpleBox.style.backgroundColor = "#e13800b1";
        purpleBox.style.border = '0.5dvh solid #FF7C51'
        purpleBoxLabel.style.border = '0.5dvh solid #FF7C51'
        purpleBoxLabelP.innerHTML = "Out.";

        color = isInBox ? '#FFA500' : '#b397ff'; // Orange inside, green outside

        if (isInBox) {
            orangeTime += incrementTime; // Increment orange time counter
        } else {
            greenTime += incrementTime; // Increment green time counter
            updateProgressBar(greenTime);

        }
    }

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, 2 * Math.PI);
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = 4;
    canvasCtx.stroke();
}


function updateProgressBar(greenTime) {
    let progressBar = document.getElementById('progressBar');
    let maxTime = 20000; // 20 seconds in milliseconds
    let width = Math.min(100, (greenTime / maxTime) * 100); // Calculate width percentage
    progressBar.style.width = width + '%'; // Update the width of the progress bar

    if (progressBar.style.width === "100%") {
        window.location.replace("bounding_box_complete.html");
    }
}


// Periodically log the time counters
setInterval(() => {
    console.log(`Time Ellipses Green: ${greenTime / 1000} seconds`);
    console.log(`Time Ellipses Orange: ${orangeTime / 1000} seconds`);
}, 5000); // Log every 5 seconds

function drawEllipse(ellipse) {
    if (ellipse.visible) {
        canvasCtx.fillStyle = ellipse.color;
        canvasCtx.beginPath();
        canvasCtx.ellipse(ellipse.x, ellipse.y, ellipse.radius, ellipse.radius, 0, 0, 2 * Math.PI);
        canvasCtx.fill();
    }
}

hands.onResults((results) => {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    drawBox(); // Draw the semi-transparent red box consistently per frame

    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach(landmarks => {
            let handX = 0, handY = 0;
            landmarks.forEach(landmark => {
                handX += landmark.x * canvasElement.width;
                handY += landmark.y * canvasElement.height;
            });
            handX /= landmarks.length;
            handY /= landmarks.length;

            // Determine if the hand is inside the box
            let isInBox = isPointInBox(handX, handY);

            // Draw the hand-tracking ellipse with dynamic color change
            drawGlowingEllipse(handX, handY, 80, isInBox);
        });
    }

    canvasCtx.restore();
});

// Setup function remains unchanged
function setup() {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    box.y = canvasElement.height / 2; // Update the box y position based on the new canvas height
    box.x = canvasElement.width / 4;
    box.height = canvasElement.height / 2; // Update the box height based on the new canvas height
    box.width = canvasElement.width / 2;
}

videoElement.addEventListener('loadedmetadata', setup);
window.addEventListener('resize', setup);

// Start the animation
requestAnimationFrame(animateEllipses);

videoElement.addEventListener('loadedmetadata', function () {
    // These lines may be adjusted or removed depending on the desired behavior
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
});
