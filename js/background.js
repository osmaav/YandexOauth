const OATUH_APP_ID = '4d583690e1214c4581e492a653213c59';

const TOKEN_KEY = 'yandex-token';

const OUATH_URL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${OATUH_APP_ID}`;
const URL_WITH_ACCESS_TOKEN_REGEX = 'https:\\/\\/music\\.yandex\\.(?:ru|com)\\/#access_token=([^&]*)';

let _oauthTabId;

// open oauth service
const openOauthTab = () => {
  chrome.tabs.create({url: OUATH_URL}, (tab) => { _oauthTabId = tab.id});
};


chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (_oauthTabId !== tabId) {
    return;
  }

  //check url by regular expression
  const match = tab.url.match(URL_WITH_ACCESS_TOKEN_REGEX);

  if (match) {
    localStorage.setItem(TOKEN_KEY,match[1]);
    // close tab
    chrome.tabs.remove(_oauthTabId);
    _oauthTabId = null;
  }
});

// entry point
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action == 'open_oauth') {
    openOauthTab();
  }
});
