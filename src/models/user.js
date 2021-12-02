const db = require("../db");

exports.getAll = (callback) => {
  db.query(`SELECT * , DATE_FORMAT(creation_date, "%d  %M  %Y" )AS "Date" FROM tweets INNER JOIN users ON users.id = tweets.user_id ORDER BY creation_date DESC LIMIT 20;`, (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  })
}

exports.getByUsername = (username, callback) => {
  db.query(`SELECT * FROM users WHERE username = ?;`,[username], (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  })
}

exports.create = (user, user_info, callback) => {
  db.query(`INSERT INTO users (first_name, last_name, date_of_birth, email, password, phone_number, city, username) VALUES ("${user.first_name}", "${user.last_name}", "${user_info.date_of_birth}", "${user_info.email}", "${user.password}", ${user_info.phone_number}, "${user_info.city}", "${user_info.username}");`, (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    
    callback(null, result);
  })
}



exports.getProfile  = (username, callback) => {
  db.query(`SELECT * , DATE_FORMAT(creation_date, "%d  %M  %Y" )AS "Date", tweets.id as tweet_id FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE username = "${username}" ORDER BY creation_date DESC;`, (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }

    callback(null, result);
  })
}

exports.getTweetDetails  = (id_tweet, username, callback) => {
  
  db.query(`SELECT * , DATE_FORMAT(creation_date, "%d  %M  %Y" )AS "Date" FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE tweets.id = ${id_tweet} AND username = "${username}";`, (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }

    callback(null, result);
  })
}

exports.createTweet = (user_id, tweet, callback) => {
  db.query(`INSERT INTO tweets(text, creation_date, user_id) VALUES (?, ?, ?);`, [tweet.message, new Date(), user_id], (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    
    callback(null, result);
  })
}

exports.deleteTweet = (id, callback) => {
  db.query(`DELETE FROM tweets WHERE id = ?;`, [id], (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  })
}