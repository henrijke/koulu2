'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
const flash             = require('connect-flash');

const crypto            = require('crypto');

const passport          = require('passport');

const LocalStrategy     = require('passport-local').Strategy;

const connection        = require('./lib/dbconn');

const sess              = require('express-session');

const Store             = require('express-session').Store;

const BetterMemoryStore = require('session-memory-store')(sess);

const saltRoot= '7fa73b47df808d36c5fe328546ddef8b9011b2c6';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//Express session store and expiration
const store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
//sets expiration time for session in store variable. Then session name and session secret is set.
app.use(sess({

  name: 'JSESSION',

  secret: 'AAPELIONYLIARVOSTETTU',

  store:  store,

  resave: false,

  saveUninitialized: false

}));
//Passport module initialization
app.use(flash());
//Flash module is mounted using app.use. After flash module passport and passport session module is initialized.
app.use(passport.initialize());

app.use(passport.session());

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  next();
});
/*
*Passport LocalStrategy is called local, and username and password fields are specified.
* Request object req is passed to callback function.
* A SALT is defined and is concatenated with password. A query is passed to connection.query()
* method of mysql driver to fetch user information based on username entered by user.

If provided username is not correct then an error message is displayed to user,
 if username is correct then password concatenated with SALT and is hashed with sha1 algorithm using crypto module.
 If password is correct user information is returned.
*
* */

passport.use('local', new LocalStrategy({

      usernameField: 'username',

      passwordField: 'password',

      passReqToCallback: true //passback entire req to call back
    } , (req, username, password, done)=>{


      if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

      let salt = saltRoot;

      connection.query("select * from tbl_users where username = ?", [username], function(err, rows){

        console.log(err); console.log(rows);

        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

        salt = salt+''+password;

        const encPassword = crypto.createHash('sha1').update(salt).digest('hex');


        const dbPassword  = rows[0].password;

        if(!(dbPassword == encPassword)){
          //jos salasana väärä resettaa session
          //req.session.reset();
          return done(null, false, req.flash('message','Invalid username or password.'));

        }
        const session = req.session;
        session.username = rows[0].username;
        session.email = rows[0].email;
        console.log(" Henri tämän kirjoitti :-)"+session.username + " "+ session.email);

        return done(null, rows[0]);

      });

    }

));

// Passport serializes user information to store in session, deserialize function is used to deserialize the data.
passport.serializeUser((user, done)=>{

  done(null, user.id);

});

passport.deserializeUser(function(id, done){

  connection.query("select * from tbl_users where id = "+ id, function (err, rows){

    done(err, rows[0]);

  });

});

const isLoggedIn = (req,res,next)=>{
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/profile');
};

app.get('/',isLoggedIn, (req,res)=>{

  res.render('login/index',{'message' :req.flash('message')});

});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/profile', (req,res)=>{
  res.render('profile',{
    session: req.session
  })
});

app.post("/login", passport.authenticate('local', {

  successRedirect: '/profile',

  failureRedirect: '/register',

  failureFlash: true

}), (req, res, info)=>{
//Empty callback this is handled by middleware
});

app.get('/logout', (req, res)=> {
  req.session.reset();
  res.redirect('/');
});

// rekisteröinti ja lähetetään mysql pyyntö uuden käyttäjän luonnista
app.post("/register", (req, res, info)=>{

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  let salt = saltRoot;

  salt = salt+''+password;

  const encPassword = crypto.createHash('sha1').update(salt).digest('hex');

  const sql = 'INSERT INTO tbl_users (username,password,email) VALUES(?,?,?)';
  connection.query(sql,[username, encPassword,email], (err, result)=> {
    if (err) throw err;
    res.render('profile',{
     session: req.session
    })
  });
});

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
