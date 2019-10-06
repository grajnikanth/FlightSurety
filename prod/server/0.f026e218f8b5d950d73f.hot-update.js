exports.id=0,exports.modules={"./src/server/server.js":function(e,o,n){"use strict";n.r(o);var t=n("./build/contracts/FlightSuretyApp.json"),s=n("./src/server/config.json"),l=n("web3"),r=n.n(l),c=n("express"),a=n.n(c);console.log("Checking to see what the server does at startup. Does it execute this console log line");var i=s.localhost,u=[],g=[],d=new r.a(new r.a.providers.WebsocketProvider(i.url.replace("http","ws"))),f=new d.eth.Contract(t.abi,i.appAddress),h=null;function p(e,o,n){var t=function(){var e=null;switch(Math.ceil(3*Math.random())){case 1:e=0;break;case 2:e=10;break;case 3:e=20}return e}();console.log("**Random Status Code Generated = "+t),f.methods.submitOracleResponse(e.index,e.airline,e.flight,e.timestamp,t).send({from:g[o],gas:i.gas},function(e,o){e?console.log("App contract is not accepting anymore Oracle status Updates - Oralce Consensus was Reached"):console.log(o),n(e,o)})}d.eth.getAccounts(function(e,o){console.log("Inside the getAccounts callback function"),e&&console.log(e),h=o[10],console.log("Total oracles being registered =70");for(var n=function(e){var n,t,s;console.log(o[e]),n=o[e],t=function(n,t){g[e-10]=o[e],function(e,o){f.methods.getMyIndexes().call({from:e},function(e,n){o(e,n)})}(o[e],function(o,n){var t;u[e-10]=n,console.log(u[e-10]),79==e&&(t=function(e,o){},f.methods.getBalance().call({from:h},function(e,o){console.log("Inside the getAppBalance Function - Print App balance or error"),console.log(e,o),t(e,o)}))})},s=d.utils.toWei("1","ether"),f.methods.registerOracle().send({from:n,value:s,gas:i.gas},function(e,o){console.log("Inside the server.js file - registerOracle function"),console.log(e,o),t(e,o)})},t=10;t<80;t++)n(t)}),f.events.OracleRequest({fromBlock:0},function(e,o){e&&console.log(e),console.log("Inside the Server.js file and inside the OracleRequest() event listener on the server"),console.log(o),console.log("index = "+o.returnValues.index),console.log("airline = "+o.returnValues.airline),e?console.log("event emitted has an error - double check"):function(e){console.log("Inside the processOracleRequest function "),console.log("Current index and flight being processed = "+e.returnValues.index+" "+e.returnValues.flight),console.log("Total Number of oracles registered on Blockchain = "+u.length);for(var o={index:e.returnValues.index,flight:e.returnValues.flight,airline:e.returnValues.airline,timestamp:e.returnValues.timestamp},n=0;n<u.length;n++)for(var t=0;t<3;t++)u[n][t]==o.index&&(console.log("Oracle at i= "+n+" matches with event index, and the oracleIndex[i] is "+u[n]),p(o,n,function(e,o){}))}(o)}),f.events.OracleReport({fromBlock:0},function(e,o){console.log("Event OracleReport was emitted and the event is as follows"),console.log(o)}),f.events.FlightStatusInfo({fromBlock:0},function(e,o){console.log("Event FlightStatusInfo was emitted and the event is as follows"),console.log(o)});var v=a()();v.get("/api",function(e,o){o.send({message:"An API for use with your Dapp!"})}),o.default=v}};