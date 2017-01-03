

class Thing {
  constructor({id, delay=1000}) {
    this.id = id;
    this.delay = delay; // milliseconds
    this.workerId = null;
  }
  start(task) {
    this.workerId = setInterval(() => {
      this[task]()
    }, this.delay)
  }
  kill() {
    clearInterval(this.workerId);
  }
}

module.exports = {
  Thing: Thing
};
