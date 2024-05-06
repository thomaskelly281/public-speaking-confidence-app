
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

var ding = new Audio('../../Audio/ding2-89720.mp3');


// Ensure canvas matches video dimensions
canvasElement.style.width = `${videoWidth}px`;
canvasElement.style.height = `${videoHeight}px`;
canvasElement.width = videoWidth;
canvasElement.height = videoHeight;

////////////////////////////////////////////////////////
// Ellipses
////////////////////////////////////////////////////////

let ball_y_height = 600;

// Load the target image
const targetImage = new Image();
targetImage.src = '../../Images/target.png';  // Make sure to provide the correct path


// Initial positions for the animated ellipses
let ellipse1 = { x: 100, y: ball_y_height, radius: 50, color: '#EF3B11', handInside: false };
let ellipse2 = { x: 200, y: ball_y_height, radius: 50, color: '#EF3B11', handInside: false };

let staticEllipse1 = { x: 100, y: ellipse1.y - 150, radius: 50, color: '#EF3B11', handInside: false, visible: false };
let staticEllipse2 = { x: canvasElement.width - 100, y: ellipse2.y - 150, radius: 50, color: '#EF3B11', handInside: false, visible: false };

// Initial visibility for static ellipses set to false
staticEllipse1.visible = false;
staticEllipse2.visible = false;

// Function to toggle visibility of static ellipses
function toggleStaticEllipseVisibility() {
    const nextAppearanceTime = Math.random() * 3000 + 5000; // Random time between 5000ms (5s) and 8000ms (8s)

    // Randomly decide which ellipses to show: 1 for just one, 2 for both
    const whichToShow = Math.floor(Math.random() * 3); // Generates 0, 1, or 2

    // Decide based on random number which ellipses to make visible
    if (whichToShow === 0) {
        staticEllipse1.visible = true;
        staticEllipse2.visible = false;
    } else if (whichToShow === 1) {
        staticEllipse1.visible = false;
        staticEllipse2.visible = true;
    } else {
        staticEllipse1.visible = true;
        staticEllipse2.visible = true;
    }

    // Set visibility off after 2 seconds
    setTimeout(() => {
        staticEllipse1.visible = false;
        staticEllipse2.visible = false;

        // Schedule the next toggle
        setTimeout(toggleStaticEllipseVisibility, nextAppearanceTime);
    }, 2000); // Visible for 2000 milliseconds (2 seconds)
}

// Start the initial call to begin the toggling process
toggleStaticEllipseVisibility();

function updateEllipseStatusAndColor(ellipse) {
    if (ellipse.handInside && ellipse.visible) {
        ellipse.color = '#B297FF'; // Change color to green if hand is inside and ellipse is visible
    } else if (!ellipse.handInside) {
        ellipse.color = '#EF3B11'; // Revert color to red if no hand is inside
    }
}

const centerX = canvasElement.width / 2;  // Central x position on the canvas
const edgeBuffer = 100; // Buffer from the edge of the canvas
const maxAmplitude = (canvasElement.width / 2) - edgeBuffer; // Maximum displacement from the center

let time = 0;  // Time variable to drive the oscillation
const frequency = 0.03;  // Frequency of the oscillation - controls the speed


function clearEllipseArea(x, y, radius) {
    canvasCtx.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
}

function updateEllipseColor(ellipse) {
    ellipse.color = ellipse.handInside ? '#B297FF' : '#EF3B11';
}
// Initialize the contact counter
let contactCount = 0;

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

function updateMovingEllipses() {
    // Example position update logic, adjust as necessary
    const currentAmplitude = maxAmplitude - (0.2 * maxAmplitude * Math.cos(time));
    ellipse1.x = centerX - currentAmplitude * Math.sin(time) + (maxAmplitude * 0.2);
    ellipse2.x = centerX + currentAmplitude * Math.sin(time) - (maxAmplitude * 0.2);
    ellipse1.y = ball_y_height + 50 * Math.cos(Math.abs(ellipse1.x - centerX) / currentAmplitude * Math.PI / 2);
    ellipse2.y = ball_y_height + 50 * Math.cos(Math.abs(ellipse2.x - centerX) / currentAmplitude * Math.PI / 2);
    time += frequency;
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

function drawGlowingEllipse(x, y, radius, color) {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, 2 * Math.PI);
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = 4;
    canvasCtx.stroke();
}

// let targetPara = 0;

hands.onResults((results) => {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Reset interaction flags for each ellipse
    [ellipse1, ellipse2, staticEllipse1, staticEllipse2].forEach(ellipse => ellipse.handInside = false);

    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach(landmarks => {
            let handX = 0, handY = 0;
            landmarks.forEach(landmark => {
                handX += landmark.x * canvasElement.width;
                handY += landmark.y * canvasElement.height;
            });
            handX /= landmarks.length;
            handY /= landmarks.length;

            // Check interactions for each ellipse and determine if hand is inside any
            [ellipse1, ellipse2].forEach(ellipse => {
                if (isPointInEllipse(handX, handY, ellipse)) {
                    ellipse.handInside = true;
                }
            });

            // Handle visibility and interactions for static ellipses separately
            [staticEllipse1, staticEllipse2].forEach(ellipse => {
                if (isPointInEllipse(handX, handY, ellipse)) {
                    ellipse.handInside = true;
                    // Hide the static ellipse immediately if a hand is inside
                    if (ellipse.visible) {
                        contactCount += 1;
                        console.log(contactCount)
                        ding.play();

                        document.getElementById("targetPara").innerText = contactCount + "/15";  // Use innerText for plain text
                        // targetPara.innerHTML(contactCount)
                        ellipse.visible = false;

                        if (contactCount === 15) {
                            window.location.replace("exclamations_complete.html");
                        }

                        setTimeout(() => {
                            // Allow the ellipse to reappear according to its toggle schedule
                            ellipse.visible = true;
                        }, 3000); // Ensure the ellipse stays hidden for at least 2 seconds
                    }
                }
            });
        });
    }

    // Draw all ellipses with updated properties
    [ellipse1, ellipse2, staticEllipse1, staticEllipse2].forEach(drawEllipse);

    canvasCtx.restore();
});

function drawEllipse(ellipse) {
    if (ellipse.visible !== false) {
        if (ellipse === staticEllipse1 || ellipse === staticEllipse2) {
            // Draw the image for static ellipses if visible
            if (ellipse.visible) {
                canvasCtx.drawImage(targetImage, ellipse.x - ellipse.radius, ellipse.y - ellipse.radius, ellipse.radius * 2, ellipse.radius * 2);
            }
        } else {
            // Existing code to draw moving ellipses
            canvasCtx.fillStyle = ellipse.handInside ? '#B297FF' : '#EF3B11';
            canvasCtx.beginPath();
            canvasCtx.ellipse(ellipse.x, ellipse.y, ellipse.radius, ellipse.radius, 0, 0, 2 * Math.PI);
            canvasCtx.fill();
        }
    }
}

// Start the animation
requestAnimationFrame(animateEllipses);

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
