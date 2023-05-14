
const db = require("../../connection");

//Sign up
const add_new_user = async function (name, lastName, email, pass, user_type) {
  const queryParam = [name, lastName, email, pass, user_type];
  try {
    const result = await db.query(` INSERT INTO users(name, last_name, email, password, user_type)
  VALUES
    ($1,$2,$3,$4,$5) RETURNING *`, queryParam);
    const newUser = result.rows[0]; // Get the newly added user from the result
      console.log('New user added successfully', newUser);
      return newUser;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = add_new_user;



