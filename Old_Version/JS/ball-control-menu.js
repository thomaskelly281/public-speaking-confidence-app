// Hiding and Displaying Elements
const exitButton = document.getElementById("exit-button");
const exitScreen = document.getElementById("exit-screen");
const replayIntroButton = document.getElementById("replay-intro-button");
const speechButton = document.getElementById("speech-button");
const startButton = document.getElementById("start-button");
const exitYesButton = document.getElementById("exit-yes-button");
const exitNoButton = document.getElementById("exit-no-button");
const closeButton = document.getElementById("close-button");
const continueButton = document.getElementById("continue-button");
const difficultyEasyImg = document.getElementById("ball-control-easy");
const difficultyMediumImg = document.getElementById(
  "ball-control-medium"
);
const difficultyHardImg = document.getElementById("ball-control-hard");
const difficultyEasyButton = document.getElementById(
  "difficulty-easy-button"
);
const difficultyMediumButton = document.getElementById(
  "difficulty-medium-button"
);
const difficultyHardButton = document.getElementById(
  "difficulty-hard-button"
);

const selectSpeechScreen = document.getElementById(
  "select-speech-screen"
);
const selectedSpeech = document.getElementById("selectedSpeech");

// Speeches
const toBeSelected = document.getElementById("toBeSelected");
const weShallFightSelected = document.getElementById(
  "weShallFightSelected"
);
const navySealSelected = document.getElementById("navySealSelected");
const navySealLibrarySelected = document.getElementById(
  "navySealLibrarySelected"
);
const navySealLibraryUnselected = document.getElementById(
  "navySealLibraryUnselected"
);
const toBeLibrarySelected = document.getElementById(
  "toBeLibrarySelected"
);
const toBeLibraryUnselected = document.getElementById(
  "toBeLibraryUnselected"
);
const weShallFightLibrarySelected = document.getElementById(
  "weShallFightLibrarySelected"
);
const weShallFightLibraryUnselected = document.getElementById(
  "weShallFightLibraryUnselected"
);
const navySealBox = document.getElementById("navy-seal-box");
const toBeBox = document.getElementById("to-be-box");
const weShallFightBox = document.getElementById("we-shall-fight-box");

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

continueButton.addEventListener("click", () => {
  exitScreen.style.display = "none";
  exitButton.style.display = "block";
  replayIntroButton.style.display = "block";
  speechButton.style.display = "block";
  startButton.style.display = "block";
  selectSpeechScreen.style.display = "none";

  if (toBeLibrarySelected.style.display === "block") {
    // Make this the new selected speech on menu page
    selectedSpeech.textContent = "";
    selectedSpeech.textContent = '"To be, or not to be" -Willi...';
  } else if (weShallFightLibrarySelected.style.display === "block") {
    // Make this the new selected speech on menu page
    selectedSpeech.textContent = "";
    selectedSpeech.textContent = '"We shall fight them on t..."';
  } else if (navySealLibrarySelected.style.display === "block") {
    // Make this the new selected speech on menu page
    selectedSpeech.textContent = "";
    selectedSpeech.textContent = '"Navy Seal CopyPasta" -C...';
  }
});

difficultyEasyButton.addEventListener("click", () => {
  difficultyEasyImg.style.display = "block";
  difficultyMediumImg.style.display = "none";
  difficultyHardImg.style.display = "none";

  difficultyEasyButton.style.width = "14dvh";
  difficultyMediumButton.style.width = "12dvh";
  difficultyHardButton.style.width = "12dvh";
});

difficultyMediumButton.addEventListener("click", () => {
  difficultyEasyImg.style.display = "none";
  difficultyMediumImg.style.display = "block";
  difficultyHardImg.style.display = "none";

  difficultyEasyButton.style.width = "12dvh";
  difficultyMediumButton.style.width = "14.5dvh";
  difficultyHardButton.style.width = "12dvh";
});

difficultyHardButton.addEventListener("click", () => {
  difficultyEasyImg.style.display = "none";
  difficultyMediumImg.style.display = "none";
  difficultyHardImg.style.display = "block";

  difficultyEasyButton.style.width = "12dvh";
  difficultyMediumButton.style.width = "12dvh";
  difficultyHardButton.style.width = "14dvh";
});

speechButton.addEventListener("click", () => {
  exitScreen.style.display = "none";
  exitButton.style.display = "none";
  replayIntroButton.style.display = "none";
  speechButton.style.display = "none";
  startButton.style.display = "none";
  closeButton.style.display = "block";
  selectSpeechScreen.style.display = "block";

  // Check current selected text & Change 'Selected' image
  if (selectedSpeech.textContent === '"To be, or not to be" -Willi...') {
    toBeSelected.style.display = "block";
    weShallFightSelected.style.display = "none";
    navySealSelected.style.display = "none";

    navySealLibrarySelected.style.display = "none";
    weShallFightLibrarySelected.style.display = "none";
    toBeLibraryUnselected.style.display = "none";
    navySealLibraryUnselected.style.display = "block";
    weShallFightLibraryUnselected.style.display = "block";
    toBeLibrarySelected.style.display = "block";
  } else if (
    selectedSpeech.textContent === '"We shall fight them on t..."'
  ) {
    toBeSelected.style.display = "none";
    weShallFightSelected.style.display = "block";
    navySealSelected.style.display = "none";

    navySealLibrarySelected.style.display = "none";
    weShallFightLibraryUnselected.style.display = "none";
    toBeLibrarySelected.style.display = "none";
    navySealLibraryUnselected.style.display = "block";
    weShallFightLibrarySelected.style.display = "block";
    toBeLibraryUnselected.style.display = "block";
  } else if (
    selectedSpeech.textContent === '"Navy Seal CopyPasta" -C...'
  ) {
    toBeSelected.style.display = "none";
    weShallFightSelected.style.display = "none";
    navySealSelected.style.display = "block";

    navySealLibraryUnselected.style.display = "none";
    weShallFightLibrarySelected.style.display = "none";
    toBeLibrarySelected.style.display = "none";
    navySealLibrarySelected.style.display = "block";
    weShallFightLibraryUnselected.style.display = "block";
    toBeLibraryUnselected.style.display = "block";
  } else {
    toBeSelected.style.display = "block";
    weShallFightSelected.style.display = "none";
    navySealSelected.style.display = "none";

    navySealLibrarySelected.style.display = "none";
    weShallFightLibrarySelected.style.display = "none";
    toBeLibraryUnselected.style.display = "none";
    navySealLibraryUnselected.style.display = "block";
    weShallFightLibraryUnselected.style.display = "block";
    toBeLibrarySelected.style.display = "block";
  }
});

toBeBox.addEventListener("click", () => {
  toBeSelected.style.display = "block";
  weShallFightSelected.style.display = "none";
  navySealSelected.style.display = "none";

  navySealLibrarySelected.style.display = "none";
  weShallFightLibrarySelected.style.display = "none";
  toBeLibraryUnselected.style.display = "none";
  navySealLibraryUnselected.style.display = "block";
  weShallFightLibraryUnselected.style.display = "block";
  toBeLibrarySelected.style.display = "block";
});

navySealBox.addEventListener("click", () => {
  toBeSelected.style.display = "none";
  weShallFightSelected.style.display = "none";
  navySealSelected.style.display = "block";

  navySealLibraryUnselected.style.display = "none";
  weShallFightLibrarySelected.style.display = "none";
  toBeLibrarySelected.style.display = "none";
  navySealLibrarySelected.style.display = "block";
  weShallFightLibraryUnselected.style.display = "block";
  toBeLibraryUnselected.style.display = "block";
});

weShallFightBox.addEventListener("click", () => {
  toBeSelected.style.display = "none";
  weShallFightSelected.style.display = "block";
  navySealSelected.style.display = "none";

  navySealLibrarySelected.style.display = "none";
  weShallFightLibraryUnselected.style.display = "none";
  toBeLibrarySelected.style.display = "none";
  navySealLibraryUnselected.style.display = "block";
  weShallFightLibrarySelected.style.display = "block";
  toBeLibraryUnselected.style.display = "block";
});

closeButton.addEventListener("click", () => {
  exitButton.style.display = "block";
  replayIntroButton.style.display = "block";
  speechButton.style.display = "block";
  startButton.style.display = "block";
  selectSpeechScreen.style.display = "none";
});

startButton.addEventListener("click", () => {
  localStorage.setItem("speech", selectedSpeech.textContent);
});

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
  localStorage.setItem("ballControlStatus", "Incomplete");
});