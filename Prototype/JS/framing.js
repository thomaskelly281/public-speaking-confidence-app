const framingStandBack = document.getElementById("framingStandBack");
const framingPerfect = document.getElementById("framingPerfect");

setInterval(() => {
    framingPerfect.style.display = "block";
    framingStandBack.style.display = "none";

    var audio = new Audio('framing_perfect.mp3');
    audio.play();
}, 4000); // Change frame in 4 seconds

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


videoElement.addEventListener('loadedmetadata', function () {
    // These lines may be adjusted or removed depending on the desired behavior
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
});