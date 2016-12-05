var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');
server.use(middlewares);
server.get('/echo', function (req, res) {
    res.jsonp(req.query);
});
server.use(bodyParser.json({ limit: '10mb', extended: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(function (req, res, next) {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    next();
});
server.use(router);
server.listen(3000, function () {
    console.log('JSON Server is running');
});
