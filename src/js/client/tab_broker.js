var util = require('../util');

module.exports = function(chrome) {
  return {
    query: function(searchAllWindows) {
      var opts = {
        sendTabData: true,
        searchAllWindows: searchAllWindows
      };
      var fn = chrome.runtime.sendMessage.bind(chrome.runtime);

      return util.pcall(fn, opts).then(function(data) {
        var tabs = data.tabs;
        //todo rename to lastActiveTabId. Type of <Tab> are not equal to type of <Tab.id>, the function's name semantic is broken
        var lastActive = data.lastActive;

        var firstTab = [];
        var otherTabs = [];

        for(var idx in tabs) {
          var tab = tabs[idx];
          if (tab.id === lastActive) firstTab.push(tab);
          else otherTabs.push(tab);
        }

        return firstTab.concat(otherTabs);
      });
    }
  };
};
