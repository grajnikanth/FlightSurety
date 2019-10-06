const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");
const fs = require('fs');

module.exports = function(deployer, network, accounts) {

   // console.log("accounts[30] from Ganache passed to Migrations: " +accounts[30]); 
   // console.log(accounts);

   // let the first airline be the accounts[1] address
    let firstAirline = accounts[1];
    let firstAirlineName = "First";
    console.log("FirstAirline: " +firstAirline);
    console.log("firstAirlineName: "+firstAirlineName);
    deployer.deploy(FlightSuretyData, firstAirline, firstAirlineName)
    .then(() => {
        return deployer.deploy(FlightSuretyApp, FlightSuretyData.address)
                .then(() => {
                    let config = {
                        localhost: {
                            url: 'http://localhost:8545',
                            dataAddress: FlightSuretyData.address,
                            appAddress: FlightSuretyApp.address,
                            firstAirline: firstAirline,
                            firstAirlineName: firstAirlineName,
                            gas: deployer.networks[deployer.network].gas
                        }
                    }
                    fs.writeFileSync(__dirname + '/../src/dapp/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
                    fs.writeFileSync(__dirname + '/../src/server/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
                });
    });
}