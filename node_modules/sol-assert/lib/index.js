const opcode = require('./opcode')
const event = require('./event')
const bn = require('./bn')

module.exports = Object.freeze({
  ...opcode,
  ...event,
  ...bn,
})
