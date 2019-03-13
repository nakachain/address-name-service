# sol-assert
Helper assertion library for Solidity testing

## Install
```bash
npm install sol-assert
```

## Usage
```js
const sassert = require('sol-assert')
```

### .revert
```js
try {
    // your function call you expect to throw revert
} catch (e) {
    sassert.revert(e)
}
```

### .invalidOpcode
```js
try {
    // your function call you expect to throw invalid opcode
} catch (e) {
    sassert.invalidOpcode(e)
}
```

### .event
```js
function test1() {
    // Calling ERC20 transfer
    const receipt = await token.methods['transfer(address,uint256)'](ACCT1, 1).send({ from: OWNER })
    // Expect the `Transfer` event to be emitted
    sassert.event(receipt, 'Transfer')
}

function test2() {
    // Calling ERC223 transfer
    const receipt = await token.methods['transfer(address,uint256,bytes)'](ACCT1, 1).send({ from: OWNER })
    // Expect 2 Transfer events to be emitted because in my ERC223 contract I emit both Transfer events:
    // event Transfer(address indexed from, address indexed to, uint256 amount);
    // event Transfer(address indexed from, address indexed to, uint256 amount, bytes data);
    sassert.event(receipt, 'Transfer', 2)
}
```
