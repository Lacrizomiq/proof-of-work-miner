const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction)
}

function mine() {
    // Get the current block height and create a new block object with the given id
    const block = { id : blocks.length }

    // Pull the transactions off the mempool and include them in the block
    const transactions = mempool.splice(0, MAX_TRANSACTIONS)
    block.transactions = transactions

    let nonce = 0
    block.nonce = nonce
    
    // Keep changing the nonce until it find a hash that is less than the TARGET_DIFFICULTY
    let hash = SHA256(JSON.stringify(block) + nonce.toString()).toString();
    while(BigInt(`0x${hash}`) >= TARGET_DIFFICULTY) {
        nonce++;
        block.nonce = nonce
        hash = SHA256(JSON.stringify(block) + nonce.toString()).toString();
    }

    // Push the block object and the hash into the blocks array
    blocks.push({ ...block, hash})
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

// Step 1 : Push the transtraction to the mempool
// Step 2 : Mine a block
// Step 3 : Block Hash
// Step 4 : Mine TX
// Step 5 : Difficulty

