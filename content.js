// Function to handle receiving messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Check if the message is for summarization
    //if (message.type === "summarize") {
      // Make an API call to the backend server for text summarization
      
      // Endpoint URL of the Flask server
      //const serverUrl = "http://127.0.0.1:5000/summarize"; 
      const serverUrl = "http://127.0.0.1:5001/sum";
      // Send the selected text to the server for summarization
      fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({task:message.task, text: message.text }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Extract the summary from the server response
          const summary = data.summary;
  
          // Send the summary back to the background script
          alert(summary)
          chrome.runtime.sendMessage({ type: "summary", text: summary });

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    //}
  });
  