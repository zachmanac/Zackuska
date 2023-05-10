const express = require('express');
const router = express.Router();
const queryCheckUser = require('../../database/queries/get_user_with_email');

  //Check if a user exists with a given username and password
  
const login =  async function(email, password) {
  const user = await queryCheckUser(email);
  console.log('Validate user', user);
  console.log('Password', password);
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}


router.post('/api/session', (req, res) => {
  const {email, password} = req.body;
    login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
});

module.exports = router;