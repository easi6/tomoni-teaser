http = require('http')

port = 3405

server = http.createServer( 
  (req, res) -> 
    client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end("{ \"ip\": \"#{client_ip}\"}")
)

server.listen(port)

console.log("Server running at localhost:#{port}")
