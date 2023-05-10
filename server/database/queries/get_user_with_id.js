const db = require('../connection');
//User with given id
const getUserWithId = async function (id) {
  try {
    const result = await db
      .query(
        `SELECT * FROM users WHERE id= $1;`,
        [id]);
    return result.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getUserWithId;