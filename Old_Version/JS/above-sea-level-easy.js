let handpose;
let detections = [];

let canvas;
let video;

let armsDown = 0;
let armsUp = 0;

let jump = 0.3;

let counter = 0;
let armUpCounter = 0;

let maxSeaLevel = 80;
let minSeaLevel = 55;
let baseHeight = 240; //The lower the number the higher on the screen

const bodyFrame = document.getElementById("bodyFrame");
const armUpPercentageTile = document.getElementById("arms-up-percentage");

let sea = document.getElementById("sea");
//   let seaLevel = sea.style.height;
let seaLevel = parseInt(sea.style.height, 10) || 50; // Fallback to 200 if not set

navigator.mediaDevices.getUserMedia({
  video: { width: 1280, height: 720 }, // Requesting HD resolution
});

function setup() {
  canvas = createCanvas(windowHeight * 0.43, windowHeight * 0.93, WEBGL); //3D mode!!!
  canvas.parent("mediapipe-holder");
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.parent("mediapipe-holder");

  video.id("video");
  video.size(width, height);

  const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  };

  playIntro();
  handpose = ml5.handpose(video, options, modelReady);
  colorMode(HSB);
}

function modelReady() {
  console.log("Model ready!");
  bodyFrame.style.display = "none";
  playCountdown();
  playSpeech();
  handpose.on("predict", (results) => {
    detections = results;
  });
}

function draw() {
  clear();
  // In webgl mode, the origin of the coordinate is set to the center.
  // So I re-positioned it to the top-left.
  translate(-width / 2, -height / 2);

  if (detections.length > 0) {
    // Draw hand skeleton and landmarks as before
    drawLines([0, 5, 9, 13, 17, 0]); //palm
    drawLines([0, 1, 2, 3, 4]); //thumb
    drawLines([5, 6, 7, 8]); //index finger
    drawLines([9, 10, 11, 12]); //middle finger
    drawLines([13, 14, 15, 16]); //ring finger
    drawLines([17, 18, 19, 20]); //pinky

    drawLandmarks([0, 1], 0); //palm base
    drawLandmarks([1, 5], 60); //thumb
    drawLandmarks([5, 9], 120); //index finger
    drawLandmarks([9, 13], 180); //middle finger
    drawLandmarks([13, 17], 240); //ring finger
    drawLandmarks([17, 21], 300); //pinky

    // New code: Track wrist position
    let wristY = detections[0].landmarks[0][1]; // Assuming the first landmark is the wrist
    console.log("Wrist Y position:", wristY);

    counter = counter += 1;

    // Adjusting the sea level based on the wrist position
    if (wristY < baseHeight) {
      // If the hand is raised above 350 (lower y-coordinate values),
      // decrease the sea level to simulate rising
      seaLevel = Math.max(minSeaLevel, seaLevel - jump); // Ensures minimum height of 100px
      armUpCounter = armUpCounter += 1;
    } else {
      // If the hand is lowered below 350 (higher y-coordinate values),
      // increase the sea level to simulate falling
      seaLevel = Math.min(maxSeaLevel, seaLevel + jump); // Ensures maximum height of 600px
    }

    //   seaLevel = Math.max(0, seaLevel); // Prevents negative values
    sea.style.height = seaLevel + "dvh";
    let armUpPercentage = (armUpCounter / counter) * (100 / 1);
    console.log(
      "You have kept your arms up: " +
        Math.round(armUpPercentage) +
        "% of the time."
    );
    // Optional: Detect raising or lowering based on previous position
    // (You'll need to store and update a variable for the previous Y position to do this comparison)

    if (endScreen.style.display === "block") {
      sea.style.display = "none";
      gradientBackground.style.display = "none";
      armUpPercentageTile.textContent = Math.round(armUpPercentage) + "%";

      noloop();
      return;
    }
  }
}

function drawLandmarks(indexArray, hue) {
  noFill();
  strokeWeight(10);
  for (let i = 0; i < detections.length; i++) {
    for (let j = indexArray[0]; j < indexArray[1]; j++) {
      let x = detections[i].landmarks[j][0];
      let y = detections[i].landmarks[j][1];
      let z = detections[i].landmarks[j][2];
      stroke(hue, 40, 255);
      point(x, y);
    }
  }
}

function drawLines(index) {
  stroke(0, 0, 255);
  strokeWeight(3);
  for (let i = 0; i < detections.length; i++) {
    for (let j = 0; j < index.length - 1; j++) {
      let x = detections[i].landmarks[index[j]][0];
      let y = detections[i].landmarks[index[j]][1];
      let z = detections[i].landmarks[index[j]][2];

      let _x = detections[i].landmarks[index[j + 1]][0];
      let _y = detections[i].landmarks[index[j + 1]][1];
      let _z = detections[i].landmarks[index[j + 1]][2];
      line(x, y, z, _x, _y, _z);
    }
  }
}

function windowResized() {
  resizeCanvas(windowHeight * 0.43, windowHeight * 0.93, WEBGL);
}

let progressBar = document.getElementById("progressBar");
let endScreen = document.getElementById("end-screen");
let exitButtonEnding = document.getElementById("exit-button-ending");
let nextSessionButton = document.getElementById("next-session-button");
let homeButton = document.getElementById("home-button");
let retryButton = document.getElementById("retry-button");

const exitButton = document.getElementById("exit-button");
const exitScreen = document.getElementById("exit-screen");
const exitYesButton = document.getElementById("exit-yes-button");
const exitNoButton = document.getElementById("exit-no-button");
const gradientBackground = document.getElementById("gradient-background");

exitButton.addEventListener("click", () => {
  exitScreen.style.display = "block";
  exitButton.style.display = "none";
  replayIntroButton.style.display = "none";
  speechButton.style.display = "none";
  startButton.style.display = "none";
});

exitNoButton.addEventListener("click", () => {
  exitScreen.style.display = "none";
  exitButton.style.display = "block";
  replayIntroButton.style.display = "block";
  speechButton.style.display = "block";
  startButton.style.display = "block";
});

// Put the correct speech on display
const selectedSpeech = localStorage.getItem("speech");
console.log(selectedSpeech);

let delay = 0;

function playIntro() {
  const introLines = document.querySelectorAll(
    "#speech-box #intro .line"
  );

  introLines.forEach((line, index) => {
    // Specify different durations for each line in milliseconds
    const durations = [4000, 4000];

    setTimeout(() => {
      // Before showing the current line, hide all previous lines
      if (index > 0) {
        introLines[index - 1].style.display = "none"; // Hide the previous line
      }
      line.style.display = "block"; // Show the current line
    }, delay);

    // Update the delay for the next line
    delay += durations[index];
  });

  // Optionally, hide the last line after its duration
  setTimeout(() => {
    introLines[introLines.length - 1].style.display = "none";
  }, delay);
}

function playCountdown() {
  const countdownLines = document.querySelectorAll(
    "#speech-box #countdown .line"
  );

  countdownLines.forEach((line, index) => {
    // Specify different durations for each line in milliseconds
    const durations = [3000, 3000, 2000, 1000, 1000, 1000, 1000];

    setTimeout(() => {
      // Before showing the current line, hide all previous lines
      if (index > 0) {
        countdownLines[index - 1].style.display = "none"; // Hide the previous line
      }
      line.style.display = "block"; // Show the current line
    }, delay);

    // Update the delay for the next line
    delay += durations[index];
  });

  // Optionally, hide the last line after its duration
  setTimeout(() => {
    countdownLines[countdownLines.length - 1].style.display = "none";
  }, delay);
}

function playSpeech() {
  if (selectedSpeech === '"To be, or not to be" -Willi...') {
    const lines = document.querySelectorAll(
      "#speech-box #toBeLines .line"
    );

    lines.forEach((line, index) => {
      // Specify different durations for each line in milliseconds
      const durations = [
        //   8000,
        //   3000,
        //   4000,
        //   1000,
        //   1000,
        //   1000,
        //   1000,
        2200,
        1800,
        3200,
        2800,
        3000,
        2700,
        2700,
        3000,
        3000,
        3000,
        2400,
        3000,
        3500,
        3500,
        3000,
        3000,
        4000,
      ];

      setTimeout(() => {
        // Before showing the current line, hide all previous lines
        if (index > 0) {
          lines[index - 1].style.display = "none"; // Hide the previous line
        }
        line.style.display = "block"; // Show the current line
        animateProgressBar(durations[index]);
      }, delay);

      // Update the delay for the next line
      delay += durations[index];
    });

    // Optionally, hide the last line after its duration
    setTimeout(() => {
      lines[lines.length - 1].style.display = "none";

      endScreen.style.display = "block";
      gradientBackground.style.display = "none";

      // armUpPercentageTile armUpPercentage

      exitButtonEnding.addEventListener("click", () => {
        exitScreen.style.display = "block";
        exitButton.style.display = "none";
        replayIntroButton.style.display = "none";
        speechButton.style.display = "none";
        startButton.style.display = "none";
      });
    }, delay);
  } else if (selectedSpeech === '"We shall fight them on t..."') {
    const lines = document.querySelectorAll(
      "#speech-box #weShallFightLines .line"
    );

    lines.forEach((line, index) => {
      // Specify different durations for each line in milliseconds
      const durations = [
        //   8000,
        //   3000,
        //   4000,
        //   1000,
        //   1000,
        //   1000,
        //   1000,
        2400,
        2300,
        2400,
        2300,
        2300,
        2300,
        2000,
        2200,
        2500,
        2400,
        2500,
        2600,
        1800,
        2600,
        2800,
        1800,
        2700,
        2300,
        2500,
        2300,
        2600,
        2500,
        3000,
      ];
      setTimeout(() => {
        // Before showing the current line, hide all previous lines
        if (index > 0) {
          lines[index - 1].style.display = "none"; // Hide the previous line
        }
        line.style.display = "block"; // Show the current line
        animateProgressBar(durations[index]);
      }, delay);

      // Update the delay for the next line
      delay += durations[index];
    });

    // Optionally, hide the last line after its duration
    setTimeout(() => {
      lines[lines.length - 1].style.display = "none";
      endScreen.style.display = "block";
      gradientBackground.style.display = "none";

      exitButtonEnding.addEventListener("click", () => {
        exitScreen.style.display = "block";
        exitButton.style.display = "none";
        replayIntroButton.style.display = "none";
        speechButton.style.display = "none";
        startButton.style.display = "none";
      });
    }, delay);
  } else if (selectedSpeech === '"Navy Seal CopyPasta" -C...') {
    const lines = document.querySelectorAll(
      "#speech-box #navySealLines .line"
    );

    lines.forEach((line, index) => {
      // Specify different durations for each line in milliseconds
      const durations = [
        //   8000,
        //   3000,
        //   4000,
        //   1000,
        //   1000,
        //   1000,
        //   1000,
        2000,
        1400,
        2000, //class
        2300,
        2400, //Al-Queda
        2700,
        2600,
        2500,
        3000,
        2500,
        2500,
        3000,
      ];
      setTimeout(() => {
        // Before showing the current line, hide all previous lines
        if (index > 0) {
          lines[index - 1].style.display = "none"; // Hide the previous line
        }
        line.style.display = "block"; // Show the current line
        progressBar.style.width = "0dvh";
        animateProgressBar(durations[index]);
      }, delay);

      // Update the delay for the next line
      delay += durations[index];
    });

    // Optionally, hide the last line after its duration
    setTimeout(() => {
      lines[lines.length - 1].style.display = "none";
      endScreen.style.display = "block";
      gradientBackground.style.display = "none";

      exitButtonEnding.addEventListener("click", () => {
        exitScreen.style.display = "block";
        exitButton.style.display = "none";
        replayIntroButton.style.display = "none";
        speechButton.style.display = "none";
        startButton.style.display = "none";
      });
    }, delay);
  }

  function animateProgressBar(duration) {
    // Remove transition to immediately reset the progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%"; // Immediately reset the progress bar width to 0%

    // Use a slight delay before starting the animation to ensure the reset happens first
    setTimeout(() => {
      progressBar.style.transition = `width ${duration}ms linear`; // Reapply the transition for smooth animation
      progressBar.style.width = "100%"; // Start the animation to 100% width
    }, 20); // Small delay to ensure the transition re-applies correctly
  }
}

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
  localStorage.setItem("ballControlStatus", "Incomplete");
});