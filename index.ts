declare var require;

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res)=>{
  res.jsonp(req.query)
});

server.use(bodyParser.json({limit: '10mb', extended: false}));
server.use(bodyParser.urlencoded({extended: false}));
server.use((req, res, next)=>{
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
});



//POST
// header: Content-Type: application/json
// body:
/*
{
    "id": 6,
    "country": "usa",
    "properties": {
      "name": "Muli",
      "age": "34"
    }
  }
*/


// Use default router
server.use(router)
server.listen(3000,()=>{
  console.log('JSON Server is running')
});
