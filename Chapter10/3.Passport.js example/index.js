const passport = require('passport'); 

const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(  

  (username, password, done) => {  

    // Assuming a simple username/password check for demonstration purposes  

if (username === 'same_name' && password === 'secret') {  

      const user = { id: 1, username: ' same_name' };  

      return done(null, user); // Authentication successful  

    } else {  

      return done(null, false); // Authentication failed  

    }  

  }  

)); 