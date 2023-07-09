let numUnsubscribedChannels = 0;
let timeout = 100;
let scrollHeightOfDiv = document.querySelector("#grid-container > ytd-channel-renderer:nth-child(1)");

const numIterations = 101;
const numRepeats = 5;
const scrollDelay = 2000;

async function scrollDownAndRepeat() {
  const windowHeight = window.innerHeight;

  for (let i = 0; i < numRepeats; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, scrollDelay));
  }

  window.scrollTo(0, 0);
  await new Promise(resolve => setTimeout(resolve, scrollDelay));
  executeUnsubscribeCode();
}

async function executeUnsubscribeCode() {
  const subscriptionButtons = document.querySelectorAll("#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");

  for (let i = 0; i < numIterations; i++) {
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

    numUnsubscribedChannels++; // Increment the count of unsubscribed channels

    if (i === numIterations - 1) {
      console.log("Number of channels unsubscribed so far: " + numUnsubscribedChannels);
      executeUnsubscribeCode();
    }
  }
}

async function startUnsubscribeProcess() {
  const estimatedTime = numIterations * timeout / 1000; // Calculate the estimated time in seconds
  const confirmationMessage = `Please keep this window open during the process. The process will start in approximately ${estimatedTime} seconds. Please wait.`;
  alert(confirmationMessage);
  scrollDownAndRepeat();
}

if (window.location.href !== "https://www.youtube.com/feed/channels") {
  window.location.href = "https://www.youtube.com/feed/channels";
} else {
  startUnsubscribeProcess();
}
