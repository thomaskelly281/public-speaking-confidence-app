function preloadMainContent() {
    // This is a simple way to wait for a bit before redirecting.
    // In practice, you might check for specific resources or APIs to finish loading.
    setTimeout(function () {
      window.location.href = "ball-control-menu.html";
    }, 54000); // Wait for 3 seconds before redirecting
  }

  // Call the function to start the process
  preloadMainContent();

  const resetButton = document.getElementById("reset-button");

  resetButton.addEventListener("click", () => {
    localStorage.setItem("ballControlStatus", "Incomplete");
  });

  let progressBar = document.getElementById("progressBar");

  progressBar.style.width = "0dvh";
  animateProgressBar(54000);

  function animateProgressBar(duration) {
    // Remove transition to immediately reset the progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%"; // Immediately reset the progress bar width to 0%

    setTimeout(() => {
      progressBar.style.transition = `width ${duration}ms linear`; // Reapply the transition for smooth animation
      progressBar.style.width = "100%"; // Start the animation to 100% width
    }, 20); // Small delay to ensure the transition re-applies correctly
  }