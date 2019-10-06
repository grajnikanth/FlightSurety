
// how is this index.js imported into index.html. I do not see this file being inserted as a script into 
// the html file
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';

// immediately executing function
(async() => {

    let result = null;

    // define an instance (object) of the Contract class. Trigger the constructor of the Contract class 
    // in this process and send in the callback function we want to send to the Contract instance to 
    // be executed inside the initialize function of the Contract class.
    let contract = new Contract('localhost', () => {

        // Read transaction
        // execute the isOperational() function inside the Contract class and pass the
        // control to the callback function given below from the isOperational() functio
        // after receiving the promise from the blockchain call
        // console log the error and result to see how this went
        // execute the display function located below which adds html to the webpage with
        // the error and result as display to the website
        contract.isOperational((error, result) => {
            console.log("Inside index.js isOperational() function call - printing error and rsult");
            console.log(error,result);
        
            // To display() function pass in three arguments. Third argument is an array.
            // The first element of the array is an object
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });

        console.log("Inside index.js - First Airline: "+contract.airlines[0]);

        
        // Have Registered airlines pay 10 ether to be part of the insurance program
        // Display the first airline which was Registered with deployed contract
        contract.approveAirline(contract.airlines[0], (error, result) => {
            console.log('inside the index.js file approveAirline function call');
            console.log(error, result);
            contract.getInsuranceBalance((error, result) => {
                console.log('inside the index.js file getInsurance balance function call');
                console.log('Printing Insurance Balance information');
                console.log(error, result);
            });
            displayAirlines([ { label: 'Airline 1', error: null, airlineInfo: 'Airline Address: ' + contract.airlines[0] + ' '+'Airline Name: ' +contract.airlineNames[0]} ]);
        });

        


        //Register Rest of the three airlines and have them deposit 10 ether into the insurance contract
        // and display the airline
        //Register and approve Airline 2 
        contract.registerAirline(contract.airlines[1],contract.airlineNames[1],contract.airlines[0],
            (error, result) => {
                // console.log(error,result);
               

        });

        contract.approveAirline(contract.airlines[1], (error, result) => {
            console.log('inside the index.js file approveAirline function call');
            console.log(error, result);
            contract.getInsuranceBalance((error, result) => {
                console.log('inside the index.js file getInsurance balance function call');
                console.log('Printing Insurance Balance information');
                console.log(error, result);
            });
            displayAirlines([ { label: 'Airline 2', error: error, airlineInfo: 'Airline Address: ' + contract.airlines[1] + ' '+'Airline Name: ' +contract.airlineNames[1]} ]);
        });



       // Register and approve Airline 3
       contract.registerAirline(contract.airlines[2],contract.airlineNames[2],contract.airlines[0],
        (error, result) => {
            // console.log(error,result);

        });

        contract.approveAirline(contract.airlines[2], (error, result) => {
            console.log('inside the index.js file approveAirline function call');
            console.log(error, result);
            contract.getInsuranceBalance((error, result) => {
                console.log('inside the index.js file getInsurance balance function call');
                console.log('Printing Insurance Balance information');
                console.log(error, result);
            });
            displayAirlines([ { label: 'Airline 3', error: error, airlineInfo: 'Airline Address: ' + contract.airlines[2] + ' '+'Airline Name: ' +contract.airlineNames[2]} ]);
        });

        //Register and approve Airline 4
        contract.registerAirline(contract.airlines[3],contract.airlineNames[3],contract.airlines[0],
            (error, result) => {
                // console.log(error,result);
                

        });

        contract.approveAirline(contract.airlines[3], (error, result) => {
            console.log('inside the index.js file approveAirline function call');
            console.log(error, result);
            contract.getInsuranceBalance((error, result) => {
                console.log('inside the index.js file getInsurance balance function call');
                console.log('Printing Insurance Balance information');
                console.log(error, result);
            });
            displayAirlines([ { label: 'Airline 4', error: error, airlineInfo: 'Airline Address: ' + contract.airlines[3] + ' '+'Airline Name: ' +contract.airlineNames[3]} ]);
        });


        // Register flight1 to insure on APP contract
        contract.flights[0].timestamp = Math.floor(Date.now() / 1000);
        console.log("Timestamp of flight1: "+contract.flights[0].timestamp);
        contract.registerFlight(contract.flights[0], (error, result) => {
            console.log('inside the index.js file registerFlight function call');
            // console.log(error, result);
            // Retrieve the information for the flight just registered to the Blockchain
            displayFlights([ { error: error, flightInfo: contract.flights[0].flight + ' of Airline ' +contract.airlineNames[0] + ' with Timestamp: '+ contract.flights[0].timestamp + ' is Available for Insuring' } ]);
            contract.getFlightInfo(contract.flights[0], (error, result) => {
                console.log('inside the index.js file registerFlight->getFlightInfo function call');    
            });
        });

        // Register flight2 to insure on APP contract after 1 second from the first flight registered
        // to keep the timestamps different for the various flights
        setTimeout(()=> {
            contract.flights[1].timestamp = Math.floor(Date.now() / 1000);
            console.log("Timestamp of flight2: "+contract.flights[1].timestamp);  
            contract.registerFlight(contract.flights[1], (error, result) => {
                console.log('inside the index.js file registerFlight function call');
                // console.log(error, result);
                // Retrieve the information for the flight just registered to the Blockchain
                displayFlights([ { error: error, flightInfo: contract.flights[1].flight + ' of Airline ' +contract.airlineNames[1] + ' with Timestamp: '+ contract.flights[1].timestamp + ' is Available for Insuring' } ]);
                contract.getFlightInfo(contract.flights[1], (error, result) => {
                    console.log('inside the index.js file registerFlight->getFlightInfo function call'); 
                });
            });  
        }, 1000);

        // Register flight3 to insure on APP contract after 2 seconds from the first flight registered
        // to keep the timestamps different for the various flights
        setTimeout(()=> {
            contract.flights[2].timestamp = Math.floor(Date.now() / 1000);
            console.log("Timestamp of flight3: "+contract.flights[2].timestamp);  
            contract.registerFlight(contract.flights[2], (error, result) => {
                console.log('inside the index.js file registerFlight function call');
                // console.log(error, result);
                // Retrieve the information for the flight just registered to the Blockchain
                displayFlights([ { error: error, flightInfo: contract.flights[2].flight + ' of Airline ' +contract.airlineNames[2] + ' with Timestamp: '+ contract.flights[2].timestamp + ' is Available for Insuring' } ]);
                contract.getFlightInfo(contract.flights[2], (error, result) => {
                    console.log('inside the index.js file registerFlight->getFlightInfo function call'); 
                });
            });  
        }, 2000);


        // Register flight4 to insure on APP contract after 3 seconds from the first flight registered
        // to keep the timestamps different for the various flights
        setTimeout(()=> {
            contract.flights[3].timestamp = Math.floor(Date.now() / 1000);
            console.log("Timestamp of flight3: "+contract.flights[3].timestamp);  
            contract.registerFlight(contract.flights[3], (error, result) => {
                console.log('inside the index.js file registerFlight function call');
                // console.log(error, result);
                // Retrieve the information for the flight just registered to the Blockchain
                displayFlights([ { error: error, flightInfo: contract.flights[3].flight + ' of Airline ' +contract.airlineNames[3] + ' with Timestamp: '+ contract.flights[3].timestamp + ' is Available for Insuring' } ]);
                contract.getFlightInfo(contract.flights[3], (error, result) => {
                    console.log('inside the index.js file registerFlight->getFlightInfo function call'); 
                });
            });  
        }, 3000);


        // Read data from the website form to buy insurance when the buyer clicks the "Buy Insurance" button
        // Send a transaction to the app/data contract to buy insurance 
        DOM.elid('submit-buyInsurance').addEventListener('click', () => {
            let flightToInsure = DOM.elid('flight-insure').value;
            console.log("Buy Insurance Input box value from the webpage " +flightToInsure);

            let counter = 0;
            let foundFlight = null;
            let div1 = DOM.elid('display-buyInsurance');
            if(div1.querySelector('section')) {div1.querySelector('section').remove();}
            

            // Obtain the flight information for which the passenger wants to buy insurance from
           
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightToInsure){
                    counter = i;
                    foundFlight = true;
                    break;
                }
                else if(i == contract.flights.length-1) {
                    foundFlight = false;
                }
            }

            console.log('Inside EventListener of Buy Insurance button Counter value '+counter);

            if(foundFlight) {
                            // Call the buyInsurance() function to purchase insurance by passenger 1 
                contract.buyFlightInsurance(contract.flights[counter], (error, result) => {
                    console.log("Inside the index.js buyInsurance function call");
                    let error1 = error;
                    // Call the data contract to check if the passengers[0] premium paid was successfully stored on Blockchain
                
                    contract.getPassengerPayment(contract.flights[counter], (error, result) => {
                        console.log("Inside the index.js/byuInsurance()/getPassengerPayment() function call");
                        console.log("Passengers[0] premium payment in wei for flight insurance stored on Blockchain data contract is: ")
                        console.log(result);
                        let domId = 'display-buyInsurance';
                        let errorDisplay = null;
                        if(error1) {
                            errorDisplay = error1;
                            if(error) { errorDisplay = error1 + error}
                        }
                        genericDisplay(domId, 'Flight Insurance Payment Status', [ { label: 'Status: ', error: errorDisplay, value: 'successfully bought insurance of: ' +result + ' Wei'} ]);
                    });

                    // Call data contract to retrieve the passengerKeys associated with passengers
                    // who purchased insurance
                    contract.getPassengerKeys((error, result) => {
                        console.log('**Inside index.js - calling contract.js/getPassengerKeys() function');
            
                    });

                });
            }
            else{console.log('The flight requested to buy insurance for is not in the registered flights list');}

        });



        // User-submitted transaction
        // submit-oracle id is in the index.html
        // if the button submit-oracle is clicked then execute the callback function in the addEventListener
        // function
        // which triggers the Contract class function fetchFlightStatus
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flightToCheck = DOM.elid('flight-number').value;

            // Find the flight information stored in flights array for which status is requested. 
            // Once the flight is found send that flight information to the fetchFlightStatus() function
            // inside the contract.js file
            let counter = 0;
            let foundFlight = null;
            let div1 = DOM.elid('oracles');
            if(div1.querySelector('section')) {div1.querySelector('section').remove();}

            // Obtain the flight information for which the flight status will need to be looked up
            // using the flights array database
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightToCheck){
                    counter = i;
                    foundFlight = true;
                    break;
                }
                else if(i == contract.flights.length-1) {
                    foundFlight = false;
                }
            }

            if(foundFlight) {
                            // Write transaction
                contract.fetchFlightStatus(contract.flights[counter], (error, result) => {
                    console.log('** Index.js Back inside the callback ** ')
                    let domId = 'oracles';
                    let div1 = DOM.elid('oracles');
                    if(div1.querySelector('section')) {div1.querySelector('section').remove();}

                    if(result) {
                        genericDisplay(domId, 'Flight Status Report by Oracles', [ { label: 'Status', error: error, value: result.returnValues.result} ]);
                    }
                    else {
                        genericDisplay(domId, 'Flight Status Report by Oracles', [ { label: 'Status', error: error, value: 'Flight Status has not been resolved - No oracle consensus reached'} ]);
                    }
                    // Note for now we are only using passenger[0] for insuring a flight
                    // Find out how much money was paid to the passenger - Testing function
                    contract.getInsurancePaymentInfo(contract.flights[counter], (error, result) => {
                        //console.log('**Index.js - Checking if Passenger account got Credited**');

                    });
                    
                });
            }
            else {
                console.log('Flight Requested is not a valid flight');
                let domId = 'oracles';
                genericDisplay(domId, 'Flight Status Report by Oracles', [ { label: 'Status', error: 'Flight Requested is not a valid flight', value: ''} ]);
            
            }

        });


        // Event listener when Credit Withdraw button is clicked
        DOM.elid('submit-withdrawal').addEventListener('click', () => {

            let flightToCheck = DOM.elid('flight-withdraw').value;

            let counter = 0;
            let foundFlight = null;
            let div1 = DOM.elid('passengerWithdraw');
            if(div1.querySelector('section')) {div1.querySelector('section').remove();}
            

            // Obtain the flight information for which the flight status will need to be looked up
            // using the flights array database
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightToCheck){
                    counter = i;
                    foundFlight = true;
                    break;
                }
                else if(i == contract.flights.length-1) {
                    foundFlight = false;
                }
            }

            if(foundFlight) {
                // Write transaction
                contract.passengerCreditWithdraw(contract.flights[counter], (error, result) => {
                    console.log('** Index.js Back inside the callback ** ')
                    let valueDisplay = null;
                    let domId = 'passengerWithdraw';
                    let div1 = DOM.elid('passengerWithdraw');
                    if(div1.querySelector('section')) {div1.querySelector('section').remove();}
                    if(error) {
                        valueDisplay = '';
                    }
                    else {valueDisplay = 'Passenger = '+result.returnValues.passengerAddress + ' withdrawal was successful';}

                    genericDisplay(domId, 'Credit Withdrawal Status', [ { label: 'Status', error: error, value: valueDisplay} ]);
                    if(!error) {
                        contract.getInsurancePaymentInfo(contract.flights[counter], (error, result) => {
                            console.log('Credit Balance of passenger[0] should now be = 0');
                            console.log('Actual Credit balance inside Data contract ='+result);

                        });
                    }
                });
            }
            else {
                console.log('Flight Requested is not a valid flight');
                let domId = 'passengerWithdraw';
                genericDisplay(domId, 'Credit Withdrawal Status', [ { label: 'Status', error: 'Flight Requested is not a valid flight', value: ''} ]);
            }

        });

    });



    

})();

console.log("*********");
console.log("Three");
console.log("*********");

function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}

function genericDisplay(domId, title, results) {
    let displayDiv = DOM.elid(domId);
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
 //   section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}

function displayAirlines(results) {
    let displayDiv = DOM.elid("display-airlines");
    let section = DOM.section();
//   section.appendChild(DOM.h2(title));
//    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : result.airlineInfo));  
      //row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result));
        section.appendChild(row);
    })
    displayDiv.append(section);

}

function displayFlights(results) {
    let displayDiv = DOM.elid("display-flights");
    let section = DOM.section();
//   section.appendChild(DOM.h2(title));
//    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
     //   row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : result.flightInfo));  
      //row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result));
        section.appendChild(row);
    })
    displayDiv.append(section);

}








