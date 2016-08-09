var util = require('../util');



module.exports = function (chrome) {
  function getRecentBookMarks(howManyBookmarks) {
    return util.pcall(chrome.bookmarks.getRecent.bind(chrome.bookmarks), howManyBookmarks)
      .then(function (bookmarks) {
        return bookmarks;
      })
  };

  function countTreeLeaves(tree) {
    // todo remove line
    console.log(tree);
    console.log("tree logged");

    var children = tree[0].children;
    console.log(children);
    console.log("children logged");

    if (!children) {
      return 1;
    }

    var numberOfLeaves = 0;
    var childrenQueue = util.createQueue(children);
    // todo remove line
    console.log("childrenQueue: ");
    console.log(childrenQueue);
    // while (childrenQueue.isEmpty()) {
    //   var child = childrenQueue.dequeue();
    //   if (child.children) {
    //     childrenQueue.enqueueAll(child.children)
    //   } else {
    //     numberOfLeaves++;
    //   }
    // }
    return numberOfLeaves;
  }

  return {
    query: function (searchAllWindows) {
      //todo remove: current bookmarks number is 327 [Sun Aug  7 16:51:10 IDT 2016]
      return util.pcall(chrome.bookmarks.getTree.bind(chrome.bookmarks))
        .then(function (bookmarksTree) {
          var howManyBookmarks = countTreeLeaves(bookmarksTree);
          return getRecentBookMarks(3);
        });
    }
  };
};
