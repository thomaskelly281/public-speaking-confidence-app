
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

const greenBox = document.getElementById('green-box')
const redBox = document.getElementById('red-box')

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
        ellipse.color = '#B297FF';  // Change color to green if hand is inside
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

const blueBox1 = {
    x: 0,
    y: canvasElement.height * 0.3,
    width: canvasElement.width / 4,
    height: canvasElement.height * 0.2
};

const blueBox2 = {
    x: canvasElement.width * 0.75,
    y: canvasElement.height * 0.3,
    width: canvasElement.width / 4,
    height: canvasElement.height * 0.2
};

function drawBox() {
    canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';  // Semi-transparent red
    canvasCtx.fillRect(box.x, box.y, box.width, box.height);
}

function isPointInBox(pointX, pointY) {
    return pointX >= box.x && pointX <= (box.x + box.width) && 
           pointY >= box.y && pointY <= (box.y + box.height);
}

function isPointInBlueBox1(pointX, pointY) {
    return pointX >= blueBox1.x && pointX <= (blueBox1.x + blueBox1.width) && 
           pointY >= blueBox1.y && pointY <= (blueBox1.y + blueBox1.height);
}

function isPointInBlueBox2(pointX, pointY) {
    return pointX >= blueBox2.x && pointX <= (blueBox2.x + blueBox2.width) && 
           pointY >= blueBox2.y && pointY <= (blueBox2.y + blueBox2.height);
}
// setTimeout(toggleColorState, 3000);

// Initialize time counters in milliseconds
let greenTime = 0;
let orangeTime = 0;
let blueTime = 0;

// Assuming 60 FPS for the animation, this will increment the time by approximately 16.67 milliseconds per frame.
let incrementTime = 1000 / 60; 

const targetLeft = document.getElementById("target_left");
const targetRight = document.getElementById("target_right");

const boundingBox = document.getElementById("boundingBox");



function drawGlowingEllipse(x, y, radius, isInBox, isInBlueBox1, isInBlueBox2) {
    // Determine color based on the box position and the current color state
    let color;

        // greenBox.style.border = 'dashed 10px green'
        // redBox.style.border = 'dashed 10px red'
        // color = isInBox ? '#FFA500' : '#00FF00'; // Green inside, orange outside

        color = '#B297FF';

        if (isInBox) {
            greenTime += incrementTime;
            targetLeft.style.opacity = "0.4";
            targetRight.style.opacity = "0.4";

            boundingBox.style.opacity = "0.8";
        } else if (isInBlueBox1) {
            blueTime += incrementTime;

            targetRight.style.opacity = "1";

            boundingBox.style.opacity = "0.3";
            
        } else if (isInBlueBox2) {
            blueTime += incrementTime;

            targetLeft.style.opacity = "1";

            boundingBox.style.opacity = "0.3";

        } else {
            orangeTime += incrementTime;

            targetLeft.style.opacity = "0.4";
            targetRight.style.opacity = "0.4";

            boundingBox.style.opacity = "0.4";
        }
    

    // if (progressBar.style.width === "100%") {
    //     window.location.replace("stage_1_end.html");
    // }

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
}


// Periodically log the time counters
setInterval(() => {
    console.log(`Time Ellipses Orange: ${greenTime / 1000} seconds`);
    console.log(`Time Ellipses Green: ${orangeTime / 1000} seconds`);
    console.log(`Time Ellipses Blue1: ${blueTime / 1000} seconds`);

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
            let isInBlueBox1 = isPointInBlueBox1(handX, handY);
            let isInBlueBox2 = isPointInBlueBox2(handX, handY);

            // Draw the hand-tracking ellipse with dynamic color change
            drawGlowingEllipse(handX, handY, 80, isInBox, isInBlueBox1, isInBlueBox2);
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

videoElement.addEventListener('loadedmetadata', function() {
    // These lines may be adjusted or removed depending on the desired behavior
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
});


// greenTime is actually orange and orangeTime is actually green
setInterval(() => {
    localStorage.setItem("stage_4_green", 0);
    let totalTime = blueTime + orangeTime
    let greenPercentage = ((totalTime / (totalTime + greenTime))*(100/1));
    localStorage.setItem("stage_4_green", Math.round(greenPercentage));
    window.location.replace("compound_movement_complete.html");
}, 28000); // Log every 5 seconds
