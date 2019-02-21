var https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

console.log("Echo server started.");
https.createServer(options, function(request,response){    
    response.writeHead(200);
	
    var responseData = "method: " + request.method + "\n" + "headers: " + JSON.stringify(request.headers) + "\n" + "url: " + request.url;
 
    var data = '';
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
	
    request.on('end', function() {
	      responseData = responseData + "\n" + "body: " + data + "\n";
        console.log(responseData);
        response.write(responseData);
        response.end();
    });
}).listen(443);
