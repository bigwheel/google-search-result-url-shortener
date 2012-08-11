function getShortenedUrl(url) {
	var hostPattern = new RegExp("^(.*?://.*?/)");
	var queryPattern = new RegExp("[\\?&](q=.*?)[&$#]");
	var path = url.match(hostPattern);
	var query = url.match(queryPattern);
	if (path && query)
		return path[1] + "search?" + query[1];
	else
		return null;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (getShortenedUrl(tab.url)) {
		chrome.pageAction.show(tabId);
	} else {
		chrome.pageAction.hide(tabId);
	}
});

chrome.pageAction.onClicked.addListener(function(tab) {
	var shortenedUrl = getShortenedUrl(tab.url);
	if(shortenedUrl) {
		chrome.tabs.update(tab.id, {url: shortenedUrl});
	}
});
