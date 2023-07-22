// Function to handle receiving messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Check if the message is a summary
    if (message.type === "summary") {
      // Update the popup HTML with the summary text
      document.getElementById("summary").innerText = message.text;
    }
  });

// Function to send a message to the background script
function sendMessageToBackground(action) {
  chrome.runtime.sendMessage({ type: "updateContextMenu", action: action });
}

// Handle the change event of the radio buttons
document.addEventListener("DOMContentLoaded", function() {
  const summarizeRadio = document.getElementById("summarize");
  const translateRadio = document.getElementById("translate");

  summarizeRadio.addEventListener("change", function() {
    sendMessageToBackground("summarize");
  });

  translateRadio.addEventListener("change", function() {
    sendMessageToBackground("translate");
  });
});
