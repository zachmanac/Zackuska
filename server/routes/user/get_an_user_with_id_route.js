const express = require('express');
const router = express.Router();
const query = require('../../database/queries/get_user_with_id');

router.get("/api/me", (req, res) => {
  const userId = req.session.userId;
  console.log(userId)
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }

  query(userId)
    .then(user => {
      console.log("User", user);
      console.log('User.name', user.name);
      
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }
  const data= {user: {name: user.name, email: user.email, id: userId}};
  console.log('Data', data);
      res.send(data);
    })
    .catch(e => res.send(e));
});

module.exports = router;