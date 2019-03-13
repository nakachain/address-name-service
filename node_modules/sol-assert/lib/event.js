const { assert } = require('chai')

module.exports = {
  /**
   * Asserts that the transaction emitted an event.
   * @param txReceipt Transaction receipt.
   * @param eventName Name of the event to validate.
   * @param numOfEvents (optional) Number of events emitted with the eventName.
   */
  event: (txReceipt, eventName, numOfEvents) => {
    assert.isDefined(txReceipt.events[eventName])
    if (numOfEvents) {
      assert.equal(txReceipt.events[eventName].length, numOfEvents)
    }
  },
}
