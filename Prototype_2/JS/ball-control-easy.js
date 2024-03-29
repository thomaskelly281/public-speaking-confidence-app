let mic;
let canvasHeight = 800;
let canvasWidth = 50;
let ballDiameter = 50;
let currentY;
let targetY;
let sections = 8;
let selectedSection;
let sectionHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  mic = new p5.AudioIn();
  mic.start();

  // Set initial ball position
  targetY = canvasHeight - 100; // Start 100 pixels above the bottom
  currentY = targetY;

  sectionHeight = height / sections;
  // Select a random section, excluding the first one
  // selectedSection = floor(random(1, sections));
  // selectedSection = 0;
  selectedSection = floor(random(2,6));
  print(selectedSection)
  
  frameRate(60);
}

function draw() {
  background(255);
  
  let vol = mic.getLevel();
  targetY = map(vol, 0, 0.1, height - 100, 0); // Adjust the range to account for the starting position
  targetY = constrain(targetY, 100, height - ballDiameter);
  currentY = lerp(currentY, targetY, 0.02); // Smoother movement

  // Determine the ball's section
  let ballSection = getBallSection(currentY);
  noStroke()
  // Check if the ball is within the selected section
  if (ballSection === selectedSection) {
    fill(0, 255, 0); // Change color when in the selected section
  } else {
    fill(255, 165, 0); // Default color
  }

  ellipse(width / 2, currentY, ballDiameter, ballDiameter);
}

function getBallSection(yPosition) {
  return floor(yPosition / sectionHeight);
}

function touchStarted() {
  getAudioContext().resume(); // Ensure microphone access on mobile devices
}

