let counter = 0;
let timeout = 150;

async function unsubscribeFromAllChannels() {
  const allSubs = document.querySelectorAll("#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");

  for (let i = 0; i < 101; i++) {
    allSubs[i].click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    const temp = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item");
    temp.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    const temp1 = document.querySelector("#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");
    temp1.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    // Scroll one-third of the screen width to the bottom
    window.scrollBy(0, 140);

    if (i === 100) {
      console.log("Completed batch " + counter++);
      unsubscribeFromAllChannels();
    }
  }
}

unsubscribeFromAllChannels();
