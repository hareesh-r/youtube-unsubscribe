let batchCounter = 0;
let timeout = 150;
let scrollHeightOfDiv = document.querySelector("#grid-container > ytd-channel-renderer:nth-child(1)");

async function unsubscribeFromAllChannels() {
  const subscriptionButtons = document.querySelectorAll("#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");

  for (let i = 0; i < 101; i++) {
    subscriptionButtons[i].click();
    await new Promise(resolve => setTimeout(resolve, timeout));
    
    const unsubscribeOption = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item");
    if (unsubscribeOption == null) {
      continue;
    }
    unsubscribeOption.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    const confirmButton = document.querySelector("#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");
    confirmButton.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    // Scroll one-third of the screen width to the bottom
    window.scrollBy(0, scrollHeightOfDiv.clientHeight);

    if (i === 100) {
      console.log("Completed batch " + batchCounter++);
      unsubscribeFromAllChannels();
    }
  }
}

unsubscribeFromAllChannels();
