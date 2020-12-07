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
    ["<txid>-<index>","<value>"],
    ["<txid>-<index>","<value>"],
    ...
  ],
  "outs":[
    ["<txid>-<index>","<value>"],
    ["<txid>-<index>","<value>"],
    ...
  ]
}
```
Coinbase transactions come from the imaginary transaction id
`0000000000000000000000000000000000000000000000000000000000000000`.

## Sample Output
```
{"ins":[["0000000000000000000000000000000000000000000000000000000000000000-0","5000000000"]],"outs":[["e958faf790304fc4185b377552e93fddae3a513c255f8bb09526b5886ab83936-0","5201000000"]]}
{"ins":[["0000000000000000000000000000000000000000000000000000000000000000-0","5000000000"],["a87e31b0e252fecc4a487e054fbcbd2545ea8a110747ef875a59b2e3780101db-1","5000000000"]],"outs":[["e958faf790304fc4185b377552e93fddae3a513c255f8bb09526b5886ab83936-0","5201000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-0","100000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-1","3293000000"]]}
{"ins":[["0000000000000000000000000000000000000000000000000000000000000000-0","5000000000"],["a87e31b0e252fecc4a487e054fbcbd2545ea8a110747ef875a59b2e3780101db-1","5000000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-0","5000000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-1","5000000000"]],"outs":[["e958faf790304fc4185b377552e93fddae3a513c255f8bb09526b5886ab83936-0","5201000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-0","100000000"],["f8bf1e886d6ba6e4927acf861cf5ab3e62af2d50a6b011427f0369fa3e058eb2-1","3293000000"],["65f75ac62da749585c152f0ffed3c3482687699ccba81582561590c4e16306c9-0","100000000"],["65f75ac62da749585c152f0ffed3c3482687699ccba81582561590c4e16306c9-1","3193000000"]]}
```

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
