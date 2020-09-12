var server = require('../src/app');
const PORT = process.env.PORT || 3000;
server.listen({
  port: PORT
}, function (err, app) {
  if (err) {
    throw err;
  }
  console.log('API server listening on port:', app.address().port);
});
