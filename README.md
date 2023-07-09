# YouTube Channel Unsubscription Automation

This script automates the process of unsubscribing from YouTube channels using the YouTube Developer Console.

## Prerequisites

- Access to a web browser (Chrome, Firefox, etc.) with developer console support.
- An active YouTube account with subscribed channels.

## Usage

1. Open your web browser and navigate to [https://www.youtube.com/feed/channels](https://www.youtube.com/feed/channels).
2. Open the developer console:
   - For Google Chrome, press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
   - For Mozilla Firefox, press `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac).
   - For other browsers, refer to the browser's documentation for opening the developer console.
3. Copy the code from the script file provided.
 ```javascript
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
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise(resolve => setTimeout(resolve, 2000));
  scrollDownAndRepeat();
}

startUnsubscribeProcess();



```

4. Paste the code into the console and press `Enter` to execute the script.
5. The script will start automating the unsubscription process by clicking on the notification preference buttons, selecting the unsubscribe option, and confirming the unsubscription.
6. After each action, the script will also scroll one-third of the screen width towards the bottom.
7. The script will continue until all subscribed channels are unsubscribed.
8. Once the process is complete, the console will display a message indicating the unsubscription is finished.

**Note**: Use this script responsibly and ensure compliance with YouTube's terms of service. Excessive and unauthorized automation may violate the terms and lead to account restrictions.

## Disclaimer

This script is provided as-is without any warranty. The author is not responsible for any misuse or damage caused by running the script. Use it at your own risk.

