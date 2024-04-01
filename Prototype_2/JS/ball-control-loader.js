function preloadMainContent() {
    // This is a simple way to wait for a bit before redirecting.
    // In practice, you might check for specific resources or APIs to finish loading.
    setTimeout(function () {
      window.location.href = "ball-control-easy.html";
    }, 3000); // Wait for 3 seconds before redirecting
  }

  // Call the function to start the process
  preloadMainContent();

  const resetButton = document.getElementById("reset-button");

  resetButton.addEventListener("click", () => {
    localStorage.setItem("ballControlStatus", "Incomplete");
  });