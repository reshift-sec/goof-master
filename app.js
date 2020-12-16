/**
 * Module dependencies.
 */

// mongoose setup
require('./mongoose-db');
require('./typeorm-db')
const pg = require('pg')
var crypto = require('crypto');

var desCipher = crypto.createCipher('des', key);
var desEncrypted = cipher.write(secretText, 'utf8', 'hex'); // BAD: weak encryption

var aesCipher = crypto.createCipher('aes-128', key);
var aesEncrypted = cipher.update(secretText, 'utf8', 'hex'); // GOOD: strong encryption

const client = new pg.Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()

var passport = require('passport');
var st = require('st');
var crypto = require('crypto');
var express = require('express');
var http = require('http');
var path = require('path');
var ejsEngine = require('ejs-locals');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var optional = require('optional');
var marked = require('marked');
var fileUpload = require('express-fileupload');
var dust = require('dustjs-linkedin');
var dustHelpers = require('dustjs-helpers');
var cons = require('consolidate');
var xpath = require('xpath');
var lodash = require('lodash');




var routes = require('./routes');
var routesUsers = require('./routes/users.js')
var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', ejsEngine);
app.engine('dust', cons.dust);
cons.dust.helpers = dustHelpers;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(passport.authorize({ session: true }))



// Routes
app.use(routes.current_user);
app.get('/', routes.index);
app.get('/admin', routes.admin);
app.post('/admin', routes.admin);
app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
app.get('/edit/:id', routes.edit);
app.post('/update/:id', routes.update);
app.post('/import', routes.import);
app.get('/about_new', routes.about_new);
app.get('/chat', routes.chat.get);
app.put('/chat', routes.chat.add);
app.delete('/chat', routes.chat.delete);
app.use('/users', routesUsers)
app.use('changeEmail', routes.update);

// Static
app.use(st({ path: './public', url: '/public' }));

// Add the option to output (sanitized!) markdown
marked.setOptions({ sanitize: true });
app.locals.marked = marked;


app.post('/:path',  function (req, res) {
});

// development only
if (app.get('env') == 'development') {
  app.use(errorHandler());
}



app.post('/changeEmail', function (req, res) {
    let prefs = lodash.merge({}, JSON.parse(req.query.prefs));

});


app.get('/some/route', function(req, res) {
  let userName = req.param("userName");

  // BAD: Use user-provided data directly in an XPath expression
  let badXPathExpr = xpath.parse("//users/user[login/text()='" + userName + "']/home_dir/text()");
  badXPathExpr.select({
    node: root
  });
});

app.get('/full-profile/:userId', function(req, res) {

    if (req.cookies.loggedInUserId !== req.params.userId) {
        // BAD: login decision made based on user controlled data
        requireLogin();
    } else {
        // ... show private information
    }

});

app.get('/:path', function(req, res) {
  var path = req.params.path;
  if (isValidPath(path))
    res.sendFile(path);
  if (url.includes("example.com")) {
        res.redirect(url);
  }
  var pw = req.param("current_password");
  var user = req.param("user");
  var ip = req.param("ip");
  
  console.log("Unauthorized access attempt by " + user, ip);
  
  // BAD: Setting a cookie value with cleartext sensitive data.
  res.cookie("password", pw);
  

});


app.get("/:path", function(req, res) {
    var url = req.param("url");
    // BAD: the host of `url` may be controlled by an attacker
    if (url.match(/https?:\/\/www\.example\.com\//)) {
        res.redirect(url);
    }
});


var token = 'SECRET_TOKEN_f8ed84e8f41e4146403dd4a6bbcea5e418d23a9';
console.log('token: ' + token);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
