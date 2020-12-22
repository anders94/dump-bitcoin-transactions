# dump-bitcoin-transactions
Generates a chronological list of all transactions summarizing each input, output and value
transferred. This way of summarizing transactions is useful to test other systems using real
world data from the bitcoin network.

Requires node.js with `npm` and uses the `bitcoin-core` module. I found the module not well
documented so I added some [bitcoin-core module examples](bitcoin-rpc.md).

## Theory of Operation
Using data from an indexed full bitcoin node, start at block 0 and summarize each transaction,
one per line of JSON, exposing all the transaction IDs and indexes of all inputs and outputs
as well as associated values. Each line of the output is a complete JSON string in the form:
```
{
  "ins":[
    "<transaction-id>-<index>",
    "<transaction-id>-<index>",
    ...
  ],
  "outs":[
    ["<transaction-id>-<index>","<value>"],
    ["<transaction-id>-<index>","<value>"],
    ...
  ]
}
```
Coinbase transactions come from the imaginary transaction id / index:
```
0000000000000000000000000000000000000000000000000000000000000000-0
```

## Sample Output
```
{"ins":["0000000000000000000000000000000000000000000000000000000000000000-0"],"outs":[["74240d6f32b34becbfb40942dfe524a4505089488bcde6793f98533d3ced73fb-0","5003455202"]]}
{"ins":["595bd202109d9c73ba4163fa947151b88b1d5b94417e5efe8dd7ce7e606c9349-0"],"outs":[["8d848ee81b9f606931c95660f5161a0ddce798b8cc6f3fa013f24d6523f31ae4-0","2103710000"],["8d848ee81b9f606931c95660f5161a0ddce798b8cc6f3fa013f24d6523f31ae4-1","89290000"]]}
{"ins":["d1bb58c0b8ee65e1307bfaac920188900aba8dc53d80e1c3579f996d90418655-1"],"outs":[["412f1d0ff9477709e47073f46a4f9ccb3d8f55e2100da218f23f15af8db93318-0","5967000000"],["412f1d0ff9477709e47073f46a4f9ccb3d8f55e2100da218f23f15af8db93318-1","1502000000"]]}
{"ins":["9aef7e209a9dd9fb798bcbea5668f63f95394b893cf370a2133583f3f1e68e43-0","f40eb2a833adc23a228e7719fab668b64d3dd50b233e1244f4cd9178ae60b5e9-0"],"outs":[["ac444fa3a5e0a572e882d382bf5373bffbda9a4863f684cb2b918a8f76aad114-0","11220648219"],["ac444fa3a5e0a572e882d382bf5373bffbda9a4863f684cb2b918a8f76aad114-1","3487717380"]]}
```

## First 100M Rows
Here's links to gzipped files of the first 100M bitcoin transactions.

https://cbdc-test-data.s3.amazonaws.com/btc-tx-01.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-02.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-03.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-04.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-05.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-06.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-07.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-08.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-09.txt.gz
https://cbdc-test-data.s3.amazonaws.com/btc-tx-10.txt.gz

## Setup
Install all the dependancies:
```
npm install
```

Set environment variables to point to the RPC service of a fullly indexed bitcoin node.
```
export RPCHOST="127.0.0.1"
export RPCPORT=8332,
export RPCNETWORK="mainnet"
export RPCUSERNAME="rpcuser"
export RPCPASSWORD="<your-password-here>"
```

## Usage
Run the app and capture the results from STDOUT.
```
node app > transactions.txt
```

Optionally, you can add a starting block number. To start at block 100,000:
```
node app 100000 > transactions.txt
```

## License
Copyright (c) 2020 Anders Brownworth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
