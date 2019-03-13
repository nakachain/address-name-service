const { assert } = require('chai')

const web3 = require('./web3')

module.exports = {
  /**
   * Asserts that a == b.
   * @param a Can be any BN.js compatible types.
   * @param b Can be any BN.js compatible types.
   */
  bnEqual: (a, b) => {
    let convertedA = a
    if (!web3.utils.isBN(a)) convertedA = web3.utils.toBN(a)
    
    let convertedB = b
    if (!web3.utils.isBN(b)) convertedB = web3.utils.toBN(b)
  
    assert.isTrue(convertedA.cmp(convertedB) === 0)
  },

  /**
   * Asserts that a >= b.
   * @param a Can be any BN.js compatible types.
   * @param b Can be any BN.js compatible types.
   */
  bnGTE: (a, b) => {
    let convertedA = a
    if (!web3.utils.isBN(a)) convertedA = web3.utils.toBN(a)
    
    let convertedB = b
    if (!web3.utils.isBN(b)) convertedB = web3.utils.toBN(b)
  
    assert.isTrue(convertedA.gte(convertedB))
  },

  /**
   * Asserts that a <= b.
   * @param a Can be any BN.js compatible types.
   * @param b Can be any BN.js compatible types.
   */
  bnLTE: (a, b) => {
    let convertedA = a
    if (!web3.utils.isBN(a)) convertedA = web3.utils.toBN(a)
    
    let convertedB = b
    if (!web3.utils.isBN(b)) convertedB = web3.utils.toBN(b)
  
    assert.isTrue(convertedA.lte(convertedB))
  },
}
