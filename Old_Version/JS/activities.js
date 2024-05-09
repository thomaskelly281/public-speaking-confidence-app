const activities = document.getElementById("activities");

const allFeatures = document.getElementById("all-features");
const vocality = document.getElementById("vocality");
const ballControlTile = document.getElementById("ball-control-tile");
const gestures = document.getElementById("gestures");
const fallingOutTile = document.getElementById("falling-out-tile");
const aboveSeaLevelTile = document.getElementById("above-sea-level-tile");
const audience = document.getElementById("audience");

allFeatures.addEventListener("click", () => {
  ballControlTile.style.display = "block";
  fallingOutTile.style.display = "block";
  aboveSeaLevelTile.style.display = "block";
  allFeatures.style.opacity = 1;
  vocality.style.opacity = 1;
  gestures.style.opacity = 1;
  audience.style.opacity = 1;
  activities.style.justifyContent = "space-between";
});

vocality.addEventListener("click", () => {
  ballControlTile.style.display = "block";
  fallingOutTile.style.display = "none";
  aboveSeaLevelTile.style.display = "none";
  allFeatures.style.opacity = 0.4;
  vocality.style.opacity = 1;
  gestures.style.opacity = 0.4;
  audience.style.opacity = 0.4;
  activities.style.justifyContent = "flex-start";
});

gestures.addEventListener("click", () => {
  ballControlTile.style.display = "none";
  fallingOutTile.style.display = "block";
  aboveSeaLevelTile.style.display = "block";
  allFeatures.style.opacity = 0.4;
  vocality.style.opacity = 0.4;
  gestures.style.opacity = 1;
  audience.style.opacity = 0.4;
  activities.style.justifyContent = "space-between";
});

audience.addEventListener("click", () => {
  ballControlTile.style.display = "none";
  fallingOutTile.style.display = "none";
  aboveSeaLevelTile.style.display = "none";
  allFeatures.style.opacity = 0.4;
  vocality.style.opacity = 0.4;
  gestures.style.opacity = 0.4;
  audience.style.opacity = 1;
  activities.style.justifyContent = "space-between";
});

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
  localStorage.setItem("ballControlStatus", "Incomplete");
});