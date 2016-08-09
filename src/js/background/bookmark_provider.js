var util = require('../util');

module.exports = function (chrome) {
  return {
    query: function (searchAllWindows) {
      return util.pcall(chrome.bookmarks.getTree.bind(chrome.bookmarks))
        .then(function (bookmarksTree) {
          var howManyBookmarks = countTreeLeaves(bookmarksTree);
          return getRecentBookMarks(howManyBookmarks);
        });
    }
  };

  function getRecentBookMarks(howManyBookmarks) {
    return util.pcall(chrome.bookmarks.getRecent.bind(chrome.bookmarks), howManyBookmarks)
      .then(function (bookmarks) {
        return bookmarks;
      })
  };

  function countTreeLeaves(tree) {
    var children = tree[0].children;
    if (!children) {
      return 1;
    }
    var numberOfLeaves = 0;
    var childrenQueue = util.createQueue(children);
    while (!childrenQueue.isEmpty()) {
      var child = childrenQueue.dequeue();
      if (child.children) {
        childrenQueue.enqueueAll(child.children)
      } else {
        numberOfLeaves++;
      }
    }
    return numberOfLeaves;
  }
};
