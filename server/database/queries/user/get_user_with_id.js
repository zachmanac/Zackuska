const db = require('../../connection');
//User with given id
const getUserWithId = async function (user_id) {
  try {
    const result = await db
      .query(
        `SELECT * FROM users WHERE id= $1;`,
        [user_id]);
    return result.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getUserWithId;