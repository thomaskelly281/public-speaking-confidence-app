function preloadMainContent() {
    // This is a simple way to wait for a bit before redirecting.
    // In practice, you might check for specific resources or APIs to finish loading.
    setTimeout(function () {
      window.location.href = "falling-out-easy.html";
    }, 2000); // Wait for 2 seconds before redirecting
  }

  // Call the function to start the process
  preloadMainContent();