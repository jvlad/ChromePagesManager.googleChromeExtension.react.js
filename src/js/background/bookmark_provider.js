var util = require('../util');

module.exports = function (chrome) {
  return {
    query: function (searchAllWindows) {
      return util.pcall(chrome.bookmarks.getRecent.bind(chrome.bookmarks), 20)
        .then(function (bookmarks) {
          return (bookmarks);
        });
    }
  };
};
