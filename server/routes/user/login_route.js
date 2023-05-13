const express = require('express');
const router = express.Router();
const queryCheckUser = require('../../database/queries/user/get_user_with_email');

  //Check if a user exists with a given username, userType and password
  
  const login = async function(email, password, userType) {
    const user = await queryCheckUser(email);
  
    if (!user) {
      console.log('There is no user with that email');
      return null;
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("Wrong password");
      return null;
    }
    
    if (user.user_type !== userType) {
      console.log("Wrong user type");
      return null;
    }
    
    return user;
  };


router.post('/api/session', (req, res) => {
  const {email, password, userType} = req.body;
    login(email, password, userType)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send(user);
    })
    .catch(e => res.send(e));
});

module.exports = router;