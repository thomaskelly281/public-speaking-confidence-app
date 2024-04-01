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
      if (selectedSpeech === '"To be, or not to be" -Willi...') {
        const lines = document.querySelectorAll("#speech-box #toBeLines .line");

        lines.forEach((line, index) => {
          // Specify different durations for each line in milliseconds
          const durations = [
            3000,
            4000,
            1000,
            1000,
            1000,
            1000,
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

          if (endScreen.style.display === "block") {
            localStorage.setItem("ballControlStatus", "Complete");
          }

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
            3000,
            4000,
            1000,
            1000,
            1000,
            1000,
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
            3000,

            4000,
            1000,
            1000,
            1000,
            1000,
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

      // p5.js
      let mic;
      let canvasHeight = 800;
      let canvasWidth = 95;
      let ballDiameter = 75;
      let currentY;
      let targetY;
      let sections = 8;
      let selectedSection;
      let sectionHeight;
      let micSens = 0.095;

      function setup() {
        var canvas = createCanvas(canvasWidth, canvasHeight);
        canvas.parent("sketch-holder");

        mic = new p5.AudioIn();
        mic.start();

        // Set initial ball position
        targetY = canvasHeight - 100; // Start 100 pixels above the bottom
        currentY = targetY;

        sectionHeight = height / sections;
        // Select a random section, excluding the first one
        // selectedSection = floor(random(1, sections));
        // selectedSection = 0;
        selectedSection = floor(random(2, 6));
        print(selectedSection);
        print(typeof selectedSection);

        // const largeAudience = document.getElementById("#large-audience");
        // const smallAudience = document.getElementById("#small-audience");
        // const regularConversation = document.getElementById(
        //   "#regular-conversation"
        // );
        // const quietConversation = document.getElementById(
        //   "#quiet-conversation"
        // );

        // let goal = document.createElement("p");
        let goal = document.getElementById("goal");
        // Get the div element
        let toBe = document.getElementById("toBeLines");
        let weShallFight = document.getElementById("weShallFightLines");
        let navySeal = document.getElementById("navySealLines");

        setGoal(selectedSection);

        frameRate(60);
      }

      function draw() {
        background("#FAFAFA");

        let vol = mic.getLevel();
        targetY = map(vol, 0, micSens, height - 100, 0); // Adjust the range to account for the starting position
        targetY = constrain(targetY, 100, height - ballDiameter);
        currentY = lerp(currentY, targetY, 0.02); // Smoother movement

        // Determine the ball's section
        let ballSection = getBallSection(currentY);
        noStroke();

        // Check if the ball is within the selected section
        if (ballSection === selectedSection) {
          fill("orange"); // Default color
          drawingContext.shadowBlur = 20; // Adjust the glow radius
          drawingContext.shadowColor = "#e13700";
        } else {
          fill("#e13700"); // Default color
          drawingContext.shadowBlur = 0; // Adjust the glow radius
        }

        ellipse(width / 2, currentY, ballDiameter, ballDiameter);
      }

      function getBallSection(yPosition) {
        return floor(yPosition / sectionHeight);
      }

      function touchStarted() {
        getAudioContext().resume(); // Ensure microphone access on mobile devices
      }

      function setGoal(selectedSection) {
        let selectedSection1 = selectedSection;
        let goals = document.querySelectorAll(".goal"); // Get all elements with the class 'goal'

        let goalText = ""; // Initialize the variable to hold the goal text

        // Determine the goal text based on the selected section
        if (selectedSection1 <= 2.5 && selectedSection1 >= 1.5) {
          goalText = "Goal: Project the ball as if to a large audience.";
        } else if (selectedSection1 <= 3.5 && selectedSection1 >= 2.5) {
          goalText = "Goal: Project the ball as if to a small audience.";
        } else if (selectedSection1 <= 4.5 && selectedSection1 >= 3.5) {
          goalText =
            "Goal: Project the ball at the level of a regular conversation.";
        } else if (selectedSection1 <= 5.5 && selectedSection1 >= 4.5) {
          goalText =
            "Goal: Project the ball at the level of a quiet conversation.";
        } else {
          console.log("not working");
        }

        // Apply the goal text to all matched elements
        goals.forEach((goal) => {
          goal.textContent = goalText;
        });
      }

    // const exitButton = document.getElementById("exit-button");
    // const exitScreen = document.getElementById("exit-screen");
    // const exitYesButton = document.getElementById("exit-yes-button");
    // const exitNoButton = document.getElementById("exit-no-button");
    // const exitButtonEnding = document.getElementById("exit-button-ending");

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

    exitButtonEnding.addEventListener("click", () => {
      exitScreen.style.display = "block";
      exitButton.style.display = "none";
      replayIntroButton.style.display = "none";
      speechButton.style.display = "none";
      startButton.style.display = "none";
    });

    const resetButton = document.getElementById("reset-button");

    resetButton.addEventListener("click", () => {
      localStorage.setItem("ballControlStatus", "Incomplete");});