function jumpToCounterPathFile() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
    if (tab === undefined) {
      console.log("Couldn't get the current tab");
      return;
    }

    var currentTab = tab[0];
    var tabURL = currentTab.url;

    var URLIsInGithubDomain = (tabURL.indexOf("https://github.com/") === 0);
    if (!URLIsInGithubDomain) {
      return;
    }

    var URLIsObjCClassURLRegExp = /(.*\.)(h|m)/;
    var URLAndObjCExtension = URLIsObjCClassURLRegExp.exec(tabURL);

    if (URLAndObjCExtension !== null) {
      var URLWithoutExtension = URLAndObjCExtension[1];
      var extension = URLAndObjCExtension[2];

      var newExtension = extension == "h" ? "m" : "h";

      var newURL = URLWithoutExtension + newExtension;

      chrome.tabs.update(tab.id, { url: newURL});
    }
  });
}


chrome.commands.onCommand.addListener(function(command) {
      if (command == "jump-to-counter-part") {
        jumpToCounterPathFile();
      }
      else {
        throw "Unknown command " + command;
      }
});
