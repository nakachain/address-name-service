const { assert } = require('chai')

const checkMessage = (err, msg) => {
  if (msg) {
    assert.isAbove(
      err.message.search(msg), 
      -1, 
      `Error message not found in error: ${msg}`,
    )
  }
}

module.exports = {
  /**
   * Asserts that the error is a revert type.
   * @param err Error thrown from a transaction.
   * @param msg Error message to look for in err. (optional)
   */
  revert: (err, msg) => {
    assert.isAbove(
      err.message.search('revert'), 
      -1, 
      'Revert error must be returned',
    )
    checkMessage(err, msg)
  },

  /**
   * Asserts that the error is an invalid opcode type.
   * @param err Error thrown from a transaction.
   * @param msg Error message to look for in err. (optional)
   */
  invalidOpcode: (err, msg) => {
    assert.isAbove(
      err.message.search('invalid opcode'), 
      -1, 
      'Invalid opcode error must be returned',
    )
    checkMessage(err, msg)
  },
}
