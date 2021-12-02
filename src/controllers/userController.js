const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");


const SECRET = "pouetpouet";
const MAXAGE = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour of expiration



// exports.homepage  = (request, response) => {
//   response.render("home.ejs");
// }

exports.signup = (request, response) => {
  response.render("signup.ejs");
}

exports.newAccount = (request, response) => {
  const { first_name, last_name, username, password } = request.body;

  User.getByUsername(username, (error, result) => {
    if (error) {
      response.send(error.message);
    } else if (result.length !== 0) {
      response.send("A user with this username already exists!");
    } else {
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          response.send(error.message);
        }
  
        const newUser = {
          first_name,
          last_name,
          username,
          password: hash
        }
  
        User.create(newUser, request.body, (error, result) => {
          if (error) {
            response.send(error.message);
          }
          
          response.redirect("/login");
        })
      })
    }  
  });
}

exports.login = (request, response) => {
  response.render("login.ejs");
}

exports.authenticate = (request, response) => {
  const { username, password } = request.body;

  User.getByUsername(username, (error, result) => {
    if (error) {
      response.send(error.message);
    } else if (result.length === 0) {
      response.send("This user doesn't exist!");
    } else {
      const hash = result[0].password;

      bcrypt.compare(password, hash, (error, correct) => {
      if (error) {
        response.send(error.message);
      } else if (!correct) {
        response.send("Invalid password!");
      } else {
        const user = {
          id: result[0].id,
          username: result[0].username,
          exp: MAXAGE
        };
  
        jwt.sign(user, SECRET, (error, token) => {
          if (error) {
            response.send(error.message);
          } else {
            request.user = user;
            response.cookie('authcookie', token, { maxAge: 3600*1000 });
            response.redirect('/');
          }  
        });
      }  
    });
    }  
  });
}

exports.logout = (request, response) => {
  response.clearCookie("authcookie");
  response.redirect("/login");
}


exports.findAll = (request, response) => {
  User.getAll((error, tweets) => {
    if (error) {
      response.send(error.message);
    }
    else {
    const cookie = request.cookies.authcookie;
    let statut;
    if (!cookie) {
      statut = "visitor";
    }
    else {
      statut = "user";
    }
    response.render("home.ejs", { tweets, statut });
    }
  });
}

exports.profile = (request, response) => {
  const { username } = request.params;
  const usernameConnected = request.user.username;
  let statut;
  let owner;
  if (!request.user) {
    statut = "visitor";
    owner = "false";
  }
  else if (username !== usernameConnected) {
    statut = "user";
    owner = false; 
  }
  else {
    statut = "user";
    owner = true; 
  }
  
  User.getProfile(username, (error, result) => {
    if (error) {
      response.send(error.message);
    }
    
    response.render("profile.ejs", { result, statut, owner });
  });
}

exports.tweetDetails = (request, response) => {
  const { id_tweet, username } = request.params;
  const usernameConnected = request.user.username;
  let statut;
  let owner;
  if (!request.user) {
    statut = "visitor";
    owner = "false";
  }
  else if (username !== usernameConnected) {
    statut = "user";
    owner = false; 
  }
  else {
    statut = "user";
    owner = true; 
  }

  User.getTweetDetails(id_tweet, username, (error, result) => {
    if (error) {
      response.send(error.message);
    }
    response.render("profile.ejs", { result, statut, owner });
  });
}


exports.addOne = (request, response) => {
 
  const { id } = request.user;
  User.createTweet(id, request.body, (error, result) => {
    if (error) {
      response.send(error.message);
    }  
    response.redirect("/");
  })
}

exports.deleteOne = (request, response) => {
  const { id } = request.params;
  const { username } = request.user;
  
  User.deleteTweet(id, (error, result) => {
    if (error) {
      response.send(error.message);
    }
    response.redirect(`/profile/${username}`);
  })
}