const db = require('../../connection');

//Get a single user from the database given their email.
 const getUserWithEmail = function (email) {
  return db
    .query(
      `SELECT * FROM users WHERE email= $1;`,
      [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = getUserWithEmail;