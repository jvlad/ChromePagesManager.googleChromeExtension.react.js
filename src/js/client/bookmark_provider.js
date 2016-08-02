var util = require('../util');
var tabListSample = require('../../../test/client/tabListSample');

module.exports = function (chrome) {
  return {
    query: function (searchAllWindows) {
      var opts = {
        isBookmarksRequested: true
      };
      var fn = chrome.runtime.sendMessage.bind(chrome.runtime);

      return util.pcall(fn, opts).then(function (data) {
        return tabListSample.data;
      });
    }
  };
};
