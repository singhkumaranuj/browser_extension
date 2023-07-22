// Function to handle the context menu click event
function onContextMenuClicked(info, tab) {
    if (info.menuItemId === "summarizeContextMenuItem") {
      const selectedText = info.selectionText;
  
      // Send the selected text to the content script
      chrome.tabs.sendMessage(tab.id, { task: "summarize", text: selectedText });
    }else if (info.menuItemId === "translateContextMenuItem") {
      const selectedText = info.selectionText;
  
      // Send the selected text to the content script
      chrome.tabs.sendMessage(tab.id, { task: "translation", text: selectedText });
    }
  }
  
  // Function to update the context menu
function updateContextMenu(action) {
  // Remove the existing context menu item
  chrome.contextMenus.removeAll();

  // Add a new context menu item based on the selected action
  if (action === "summarize") {
    chrome.contextMenus.create({
      id: "summarizeContextMenuItem", // Unique ID for "Summarise" item
      title: "Summarise",
      contexts: ["selection"]
    });
  } else if (action === "translate") {
    chrome.contextMenus.create({
      id: "translateContextMenuItem", // Unique ID for "Translate" item
      title: "Translate",
      contexts: ["selection"]
    });
  }
}

// Listen for messages from the popup.js script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "updateContextMenu") {
    updateContextMenu(message.action);
  }
});

// Register the on-click event listener
chrome.contextMenus.onClicked.addListener(onContextMenuClicked);





