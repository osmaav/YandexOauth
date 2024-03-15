const TOKEN_KEY = 'yandex-token';
const REQUEST_PAYLOAD = { action: 'open_oauth'};

// copy input data to buffer
const copyTextToClipboard = (text) => {
  // ?
  if (!navigator.clipboard) {
    return false;
  }
  navigator.clipboard.writeText(text);
  return true;
}

// clear TOKEN_KEY
const clearStorage = () => {
  localStorage.setItem(TOKEN_KEY, null);
  window.close();
}

// entry point for background.js
const requestAuth = () => {
  chrome.runtime.sendMessage(REQUEST_PAYLOAD);
};


const processToken = (token) => {
  if (!token) {
    // console.log(1);
  }
  document.getElementById('oauth').addEventListener('click', () => requestAuth());
  document.getElementById('delete').addEventListener('click', () => clearStorage());
  document.getElementById('copy').addEventListener('click', () => copyTextToClipboard(token));
}

// Call getToken and after processToken with output from getToken
const getToken = (callback) => {
  // getiing data from storage by TOKEN_KEY
  localStorage.getItem(TOKEN_KEY)
}

// Call processToken with output from getToken
const onLoad = () => {
  getToken(processToken);
}

// entry point
onLoad();
