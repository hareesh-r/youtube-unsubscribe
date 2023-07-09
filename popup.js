document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startUnsubscribeProcess);
  });
  
  async function startUnsubscribeProcess() {
    const estimatedTime = numIterations * timeout / 1000; // Calculate the estimated time in seconds
    const confirmationMessage = `Please keep the YouTube window open during the process. The process will start in approximately ${estimatedTime} seconds. Please wait.`;
    alert(confirmationMessage);
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
    });
  }
  