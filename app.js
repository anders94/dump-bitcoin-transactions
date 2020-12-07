const BitcoinClient = require('bitcoin-core');

const rpc = new BitcoinClient({
    host: process.env.RPCHOST || '127.0.0.1',
    port: process.env.RPCPORT || 8332,
    network: process.env.RPCNETWORK || 'mainnet',
    username: process.env.RPCUSERNAME || 'rpcuser',
    password: process.env.RPCPASSWORD || 'super-secret-password'
});

const allowedSupply = (height) => {
    let reward = 5000000000n; // start at 50 BTC
    for (let x=1; x<(BigInt(height) / 210000n) + 1n; x++)
        reward = reward / 2n;

    return reward;
};

const valueToInt = (val) => {
    return BigInt(Math.ceil(Number(val) * 100000000).toFixed(0));

};

const main = async () => {
    const info = await rpc.getBlockchainInfo();

    for (let height=0; height<info.blocks; height++) {
	const hash = await rpc.getBlockHash(height);
	const block = await rpc.getBlock(hash);

	let data = { ins: [ ], outs: [ ] };
	for (let t=0; t<block.tx.length; t++) {
	    if (block.tx[t] == '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b') {
		// the genesis transaction isn't in the UTXO set
		data.ins.push(['0000000000000000000000000000000000000000000000000000000000000000-0', 5000000000n.toString()]);
		data.outs.push(['1111111111111111111111111111111111111111111111111111111111111111-0', 5000000000n.toString()]);
	    }
	    else {
		const txHex = await rpc.getRawTransaction(block.tx[t]);
		const tx = await rpc.decodeRawTransaction(txHex);

		// iterate over the inputs
		for (let i=0; i<tx.vin.length; i++) {
		    const vin = tx.vin[i];

		    if (vin.coinbase)
			data.ins.push(['0000000000000000000000000000000000000000000000000000000000000000-0', allowedSupply(block.height).toString()]);
		    else {
			const intxHex = await rpc.getRawTransaction(vin.txid);
			const intx = await rpc.decodeRawTransaction(intxHex);

			let value = -1;
			for (let ix=0; ix<intx.vout.length; ix++)
			    if (intx.vout[ix].n == vin.vout)
				value = intx.vout[ix].value;

			if (value == -1)
			    process.exit(); // blow up if we don't find this input

			data.ins.push([vin.txid+'-'+vin.vout, valueToInt(value).toString()]);
		    }
		}

		// iterate over the outputs
		for (let o=0; o<tx.vout.length; o++) {
		    const vout = tx.vout[o];

		    data.outs.push([tx.hash+'-'+vout.n, valueToInt(vout.value).toString()]);
		}

		// dump the transaction
		console.log(JSON.stringify(data));

	    }

	}

    }

}

main();
