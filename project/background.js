// Copyright (c) 2013 Doug Melton. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var badUrls = [
    "gotomeeting.com/s/register",
    "gotomeeting.com/fec/global/attendee_new_ticket",
    "download.citrixonline.com/launcher2/connected.html"
];

// Called when the url of a tab changes.
function checkForUrl(tabId, changeInfo, tab) {
    for (var i = 0; i < badUrls.length; i++) {
        var badUrl = badUrls[i];
        var index = tab.url.indexOf(badUrl);
        if (index > -1) {
            // ...automatically kill this tab.
            chrome.tabs.remove(tabId);
            chrome.extension.getBackgroundPage().console.log(
                "Removed tab with url '" + tab.url + "'"
                + " because it matched '" + badUrl + "'"
                + " at position " + index);
        }
    }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForUrl);
