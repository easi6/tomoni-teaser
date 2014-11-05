http = require('http')
url = require('url')

port = 8005

server = http.createServer(
  (req, res) ->
    console.log(req.headers)
    client_ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    url_parts = url.parse(req.url, true)
    query = url_parts.query
    json_str = "{ \"ip\": \"#{client_ip}\"}"
    if (!query.nil? && query.callback)
      json_str = query.callback + "("  + json_str + ")"
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(json_str)
)

server.listen(port)

console.log("Server running at localhost:#{port}")

