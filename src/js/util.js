var Q = require('q');

module.exports = {
  // `pcall` takes a function that takes a set of arguments and
  // a callback (NON-Node.js style) and turns it into a promise
  // that gets resolved with the arguments to the callback.
  pcall: function (fn) {
    var deferred = Q.defer();
    var callback = function () {
      deferred.resolve(Array.prototype.slice.call(arguments)[0]);
    };
    var newArgs = Array.prototype.slice.call(arguments, 1);
    newArgs.push(callback);
    fn.apply(null, newArgs);
    return deferred.promise;
  },

  createQueue: function (initialItems) {
    return new Queue(initialItems);
  }
};

function Queue(initialItems) {
  // initialize the queue and offset
  var queue = initialItems ? initialItems : [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function () {
    return (queue.length - offset);
  };

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return (queue.length == 0);
  };

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item);
  };

  this.enqueueAll = function (itemList) {
    itemList.forEach(function (item) {
      queue.push(item);
    }, this);
  };

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  };

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return (queue.length > 0 ? queue[offset] : undefined);
  }
}
