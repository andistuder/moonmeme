var http = require('http');
var httpDispatcher = require('httpdispatcher');
var dispatcher = new httpDispatcher();

var jsonfile = require('jsonfile')
const path = require('path');
var data_file = path.join(__dirname, '../data/portrait_data.json');

const PORT=8080;

function handleRequest(request, response){
    try {
        // console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/people", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

    var allPeople = jsonfile.readFileSync(data_file);

    res.end(JSON.stringify(allPeople));
});

dispatcher.onPost("/people", function(req, res) {
    // CHANGE this ot accept form data
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

    jsonfile.readFile(data_file, function(err, obj) {
        var allPeople = obj;
        var newPerson = JSON.parse(req.body);
        allPeople.push(newPerson);
        jsonfile.writeFile(data_file, allPeople, {spaces: 4}, function (err) {
          console.log(err)
        })
    })
    res.end(JSON.stringify({status: 'submitted'}));
});

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
