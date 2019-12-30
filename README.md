# FlightSurety

FlightSurety is a project for Udacity's Blockchain course.

I built a DApp (Decentralized application) using Solidity smart contracts and web3 technology. The Dapp can used to buy insurance prior to boarding a flight. The insurance will pay the passenger if the flight is delayed due to airline fault. The insurane will pay 1.5x the insurance premium paid. 

The underlying code creates this Dapp by implement the following using Solidity smart contracts:

Multi-party consensus
Oracles
Receive, transfer and send funds
Smart Contract upgradability

The initial airline was registered on the smart contract when the contract was deployed. The subsequent four airlines can be added by any of the registered airlines. Each airline has to deposit 10 ether to be registered. After the first four airlines, any new airlines can be regisitered using a multiparty consensus of more than 50% airlines approving the new airline. Each airline can then register a flight which they are willing to insure.

A web application client was created to interact with the smart contract. The passenger can choose from the flights registered by each airline for buying insurane. Each passenger can buy an insurance of upto 1 ether. The smart contract holds the insurance premium and seed money provided by each airline in a smart contract. Once the passenger is paid the insurance due to flight delay, the passenger can withdraw the ether from the smart contract. The contract does not automatically transfer money to the passenger's wallet. The passenger has to withdraw the money from the smart contract. 

A server was created to simulate the Oracles. Upon startup of the server 20+ Oracles are registered on the smart contract. When a flight status update request is sent to the smart contract, the smart contract emits an event seeking information from the Oracles. The smart contract randomizes the Oracles it wants to get a response from. The server listens for this event and loops through all the Oracles and sends a response for flight status from the Oracles which were requested to send the flight status information. 

The smart contract then processes the information received from the Oracles. Based on the flight status information received from the Oracles, the flight status is confirmed based on the response of the majority of the Oracles. Then the smart contract will determine the passengers who need to be paid the insurance if their flight was delayed. The funds are not directly sent to the passenger for security reasons. Instead, the passenger has to send a withdraw request before the funds are released. 

Security provisions were made to the smart contracts by implementing the following:
  Contract can be paused by the owner to fix bugs.
  Contract can be upgraded.
  A data contract and app contract were implemented to persist data while the app logic is upgraded.
  Contract functions are setup to fail fast using require statements in the beginning.
  Best practices for withdrawing funds are followed to prevent leakage of funds.
  
## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`
`truffle compile`

## Ganache-cli
To run local blockchain run command below to create 100 accounts. Need these accounts to register several Oracles in the server code:

ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" -a 100

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js`
`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate`
`npm run dapp`

To view dapp:

`http://localhost:8000`

## Develop Server

`npm run server`
`truffle test ./test/oracles.js`

Use variable "numOfOracles" in server.js file to change number of Oracles to be registered manually. Currently it is set to 30.


## Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)
