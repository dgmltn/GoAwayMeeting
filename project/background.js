// Copyright 2013 Doug Melton
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
