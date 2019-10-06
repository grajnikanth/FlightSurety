import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';


console.log("Checking to see what the server does at startup. Does it execute this console log line");




// config = object {url, DataAddress, AppAddress}
let config = Config['localhost'];

// Array of arrays to store Oracle indexes to memory
let oracleIndexes = [];
let oracleAddresses = [];

//"url": "http://localhost:8545" - 
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws'))); //replace "http" with "ws"
// web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);

// Get accounts from ganache starting from 10 as Oracle addresses.
// Change numOfOracles value as required for testing

const numOfOracles = 30;
let defaultAccount = null;

// Registering Oracles
web3.eth.getAccounts((error, accts) => {
  console.log('Inside the getAccounts callback function');
  if (error) console.log(error)

  // Use the address 10 for default calls to contracts for testing purposes
  defaultAccount = accts[10];

  console.log('Total oracles being registered ='+numOfOracles);
  for(let i = 10; i<10+numOfOracles; i++) {
    console.log(accts[i]);
    registerOracle(accts[i], (error, result) => {
      oracleAddresses[i-10] = accts[i];
      getMyIndexes(accts[i], (error1,result1) => {
        // Print the indexes returned by the Blockchain for this Oracle
       // console.log('Inside the getAccounts functions - inside getMyIndexes function')
       // console.log(result1);
        oracleIndexes[i-10] = result1;
        console.log(oracleIndexes[i-10]);

        // If all the oracles are registered obtain the balance of the app contract to use as a test
        // to see how much ether is now stored by the app contract.
        if(i == 10+numOfOracles - 1) {
          getAppBalance((error2, result2) => {
            // The function called console logs the result
          });
        }
      });
    });  
  }



});

// function to call registerOracle() function of the app function to register an address as an oracle on Blockchain
  function registerOracle(address, callback)
  {
    let premium = web3.utils.toWei("1", "ether");
    flightSuretyApp.methods.registerOracle()
        .send({from: address, value: premium, gas: config.gas}, (error, result) => {
            console.log('Inside the server.js file - registerOracle function');
            console.log(error, result);
            callback(error, result);
    });
  }

  //Get the Indexes array from app contract for an oracle which was registered
  // The indexes are used for checking if a oracle will respond to the status request event
  function getMyIndexes(address, callback) {
      flightSuretyApp.methods.getMyIndexes().call({from: address}, (error, result) => {
         // console.log("Inside the getInsuranceBalance Function");
         // console.log(error, result);
          callback(error, result);
      });
  }


  function getAppBalance(callback) {
    flightSuretyApp.methods.getBalance().call({from: defaultAccount}, (error, result) => {
        console.log("Inside the getAppBalance Function - Print App balance or error");
        console.log(error, result);
        callback(error, result);
    });
  }



// The below function is called automatically whenever the OracleRequest event is emitted by the app contract on Blockchain
flightSuretyApp.events.OracleRequest({fromBlock: 0}, function (error, event) {
    if (error) console.log(error)
    console.log("Inside the Server.js file and inside the OracleRequest() event listener on the server");
    console.log(event);
    console.log('index = '+event.returnValues.index);
    console.log('airline = '+event.returnValues.airline);

    // Call function which will cause the oracles to send a status response to the app contract
    if(!error) {
      processOracleRequest(event);
    }
    else {console.log('event emitted has an error - double check');}
    
});

// Function processOracleRequest() will submit responses to the app contract based on fetchFlightStatus
// update request from the app contract via the event
function processOracleRequest(event) {
  console.log('Inside the processOracleRequest function ');
  console.log('Current index and flight being processed = '+event.returnValues.index + ' ' +event.returnValues.flight);

  console.log('Total Number of oracles registered on Blockchain = ' +oracleIndexes.length);


  let payload = {
    index: event.returnValues.index,
    flight: event.returnValues.flight,
    airline: event.returnValues.airline,
    timestamp: event.returnValues.timestamp
  } 

  for(let i = 0; i<oracleIndexes.length; i++) {
      for(let j=0; j<3; j++) {
        if(oracleIndexes[i][j] == payload.index) {
          console.log('Oracle at i= ' +i +' matches with event index, and the oracleIndex[i] is '+oracleIndexes[i]);

          // call a function to submit a Status Code to the blockchain since the Oracle matches the index
          submitOracleResponse(payload, i, (error,result) => { 

          });
        }
      }
  }
}

function submitOracleResponse(payload, i, callback) 
{
  let statusCode = getRandomStatusCode();
  console.log('**Random Status Code Generated = '+statusCode);

  flightSuretyApp.methods.submitOracleResponse(payload.index, payload.airline, payload.flight,
    payload.timestamp, statusCode).send({from: oracleAddresses[i], gas: config.gas}, (error, result) => {
       // console.log('Inside the submitOracleResponse call back function');
        if(error) {
          console.log('App contract is not accepting anymore Oracle status Updates - Oralce Consensus was Reached');
        }
        else {
          console.log(result);
        }
        // console.log(error,result);
        callback(error, result);
    });
}

function getRandomStatusCode()
{
  
  let randomNumber = null;
  let statusCode = null;
  // To keep it simple only one of the three 
  randomNumber = Math.ceil(Math.random() * 3);
  switch (randomNumber) 
  {
    case 1: 
      statusCode = 0;
      break;
    
    case 2:
      statusCode = 10;
      break;

    case 3:
      statusCode = 20;
      break;
    
  }

  return statusCode;
}

// Listen for Oracle events emitted by App contract once a OracleResponse is processed

//OracleReport event
flightSuretyApp.events.OracleReport({fromBlock: 0}, function (error, event) {
  // if (error) console.log(error)
  console.log("Event OracleReport was emitted and the event is as follows");
  console.log(event);
 // console.log('index = '+event.returnValues.index);
 // console.log('airline = '+event.returnValues.airline);
});

//FlightStatusInfo event
flightSuretyApp.events.FlightStatusInfo({fromBlock: 0}, function (error, event) {
  // if (error) console.log(error)
  console.log("Event FlightStatusInfo was emitted and the event is as follows");
  console.log(event);
 // console.log('index = '+event.returnValues.index);
 // console.log('airline = '+event.returnValues.airline);
});


const app = express();
app.get('/api', (req, res) => {
    res.send({
      message: 'An API for use with your Dapp!'
    })
});

export default app;


