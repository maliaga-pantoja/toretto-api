'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
const cloudinary = require('cloudinary');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.use(loopback.token());
app.use((req, res, next) => {
  if (! req.accessToken) return next();
  req.currentUser = req.accessToken.userId;
  next();
});

/*
app.use((req, res, next) => {
  cloudinary.config({
    cloud_name: 'wyracocha-com',
    api_key: '676746722912316',
    api_secret: 'izCtQPt-LkHFpo8aopY6OVtkcyQ'
  });
  req.cloudinary = cloudinary;
  next();
});
*/

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
