const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const queryAddUser = require('../../database/queries/add_new_user');
const queryCheckUser = require('../../database/queries/get_user_with_email');


//Create a new user validate by email
router.post('/api/users', (req, res) => {
  console.log("new users params", req.body)
  const new_user = req.body;

  // Check if the user already exists in the database
  queryCheckUser(new_user.email)
    .then((existingUser) => {
      if (existingUser) {
        res.send({ error: "User already exists" });
        return;
      }

      // User does not exist, proceed with adding the new user
      new_user.password = bcrypt.hashSync(new_user.password, 12);
      queryAddUser(new_user.name, new_user.last_name, new_user.email, new_user.password, new_user.user_type)
        .then((user) => {
          console.log("User", user);
          req.session.userId = user.id;
          res.send("User added successfully");
        })
        .catch(e => {
          console.error("Failed to add new user to the database", e);
          res.send(e);
        });
    })
    .catch(e => {
      console.error("Failed to check for existing user", e);
      res.send(e);
    });
});


module.exports = router;