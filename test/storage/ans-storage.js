const { assert } = require('chai')
const TimeMachine = require('sol-time-machine')
const sassert = require('sol-assert')

const getConstants = require('../constants')
const ANSStorage = artifacts.require('ANSStorage')

const web3 = global.web3

contract('ANSStorage', (accounts) => {
  const { OWNER, ACCT1, INVALID_ADDR, MAX_GAS } = getConstants(accounts)
  const timeMachine = new TimeMachine(web3)
  
  let storage, storageMethods

  beforeEach(timeMachine.snapshot)
  afterEach(timeMachine.revert)

  beforeEach(async () => {
    storage = await ANSStorage.new(OWNER, { from: OWNER, gas: MAX_GAS })
    storageMethods = storage.contract.methods
  })
  
  describe('constructor', () => {
    it('sets the owner of the contract', async () => {
      assert.equal(await storageMethods.owner().call(), OWNER)
    })

    it('throws if the owner address is not valid', async () => {
      try {
        await ANSStorage.new(INVALID_ADDR, { from: OWNER, gas: MAX_GAS })
      } catch (err) {
        sassert.revert(err)
      }
    })
  })

  describe('assignName', () => {
    it('assigns the name for the senders address', async () => {
      let name = 'hello'
      await storageMethods.assignName(OWNER, name).send({ from: OWNER })
      assert.equal(await storageMethods.resolveName(name).call(), OWNER)
      assert.equal(await storageMethods.resolveAddress(OWNER).call(), name)

      name = 'world'
      await storageMethods.assignName(OWNER, name).send({ from: OWNER })
      assert.equal(await storageMethods.resolveName(name).call(), OWNER)
      assert.equal(await storageMethods.resolveAddress(OWNER).call(), name)
    })

    it('emits the NameAssigned event', async () => {
      const tx = await storageMethods.assignName(OWNER, 'name').send({ from: OWNER })
      sassert.event(tx, 'NameAssigned')
    })

    it('throws if trying to call it from a non-owner', async () => {
      assert.notEqual(await storageMethods.owner().call(), ACCT1)

      try {
        await storageMethods.assignName(ACCT1, 'abc').send({ from: ACCT1 })
      } catch (err) {
        sassert.revert(err)
      }
    })

    it('throws if assigned address is not valid', async () => {
      try {
        await storageMethods.assignName(INVALID_ADDR, 'def').send({ from: OWNER })
      } catch (err) {
        sassert.revert(err)
      }
    })
  })

  describe('resolveName', () => {
    it('returns the address', async () => {
      let name = 'hello'
      await storageMethods.assignName(OWNER, name).send({ from: OWNER })
      assert.equal(await storageMethods.resolveName(name).call(), OWNER)

      name = 'world'
      assert.equal(await storageMethods.resolveName(name).call(), INVALID_ADDR)
    })
  })

  describe('resolveAddress', () => {
    it('returns the name', async () => {
      let name = 'hello'
      await storageMethods.assignName(OWNER, name).send({ from: OWNER })
      assert.equal(await storageMethods.resolveAddress(OWNER).call(), name)

      name = 'world'
      await storageMethods.assignName(OWNER, name).send({ from: OWNER })
      assert.equal(await storageMethods.resolveAddress(OWNER).call(), name)
    })
  })
})
