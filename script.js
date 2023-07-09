let batchCounter = 0;
let timeout = 150;

async function unsubscribeFromAllChannels() {
  const subscriptionButtons = document.querySelectorAll("#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");
  
  // Check if there are any channels left to unsubscribe
  if (subscriptionButtons.length === 0) {
    console.log("Unsubscription completed!");
    return;
  }
  
  for (let i = 0; i < 101; i++) {
    if (i >= subscriptionButtons.length) {
      break;
    }
    
    subscriptionButtons[i].click();
    await new Promise(resolve => setTimeout(resolve, timeout));
    
    const unsubscribeOption = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item");
    unsubscribeOption.click();
    await new Promise(resolve => setTimeout(resolve, timeout));
    
    const confirmButton = document.querySelector("#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");
    confirmButton.click();
    await new Promise(resolve => setTimeout(resolve, timeout));
    
    // Scroll one-third of the screen width to the bottom
    window.scrollBy(0, 140);
  }

  console.log("Completed batch: " + batchCounter++);
  
  // Delay before processing the next batch
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  unsubscribeFromAllChannels();
}

unsubscribeFromAllChannels();
