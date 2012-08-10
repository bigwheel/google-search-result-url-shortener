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
	chrome.tabs.query({active: true}, function(tabArray) {
		var shortenedUrl = getShortenedUrl(tabArray[0].url);
		if(shortenedUrl) {
			chrome.tabs.update(tabArray[0].id, {url: shortenedUrl});
		}
	});
});
