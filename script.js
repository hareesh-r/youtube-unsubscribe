let batchCounter = 0;
let timeout = 100;
let scrollHeightOfDiv = document.querySelector("#grid-container > ytd-channel-renderer:nth-child(1)");

async function scrollDownAndRepeat() {
  const windowHeight = window.innerHeight;

  for (let i = 0; i < 5; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  window.scrollTo(0, 0);
  await new Promise(resolve => setTimeout(resolve, 2000));
  executeUnsubscribeCode();
}

async function executeUnsubscribeCode() {
  const subscriptionButtons = document.querySelectorAll("#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");

  for (let i = 0; i < 101; i++) {
    subscriptionButtons[i].click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    let unsubscribeOption = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item");
    if (unsubscribeOption == null) {
      unsubscribeOption = document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(2) > tp-yt-paper-item");
    }
    unsubscribeOption.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    const confirmButton = document.querySelector("#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");
    confirmButton.click();
    await new Promise(resolve => setTimeout(resolve, timeout));

    // Scroll one-third of the screen height of the div
    window.scrollBy(0, scrollHeightOfDiv.clientHeight);

    if (i === 100) {
      console.log("Completed batch " + batchCounter++);
      executeUnsubscribeCode();
    }
  }
}

async function startUnsubscribeProcess() {
  const estimatedTime = 101 * timeout / 1000; // Calculate the estimated time in seconds
  const confirmationMessage = `The process will start in approximately ${estimatedTime} seconds. Please wait.`;
  alert(confirmationMessage);
  window.location.href = "https://www.youtube.com/feed/channels";
}

if (window.location.href !== "https://www.youtube.com/feed/channels") {
  startUnsubscribeProcess();
} else {
  scrollDownAndRepeat();
}
