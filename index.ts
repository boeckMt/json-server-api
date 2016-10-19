declare var require;

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res)=>{
  res.jsonp(req.query)
});

server.use((req, res, next)=>{
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
});

// Use default router
server.use(router)
server.listen(3000,()=>{
  console.log('JSON Server is running')
});
