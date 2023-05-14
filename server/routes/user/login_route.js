const express = require('express');
const router = express.Router();
const queryCheckUser = require('../../database/queries/user/get_user_with_email');
const bcrypt = require('bcryptjs');
const session = require('express-session');

console.log('Code is executing...');


//Check if a user exists with a given username, userType and password
  
  const login = async function(email, password, user_type) {
    const user = await queryCheckUser(email);
  
    if (!user) {
      return { error: 'There is no user with that email' };
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      return { error: "Wrong password" };
    }
    
    if (user.user_type !== user_type) {
      return { error: "Wrong user type" };
    }
    
    return user;
};

router.post('/api/session', (req, res) => {
  const {email, password, user_type} = req.body;
    login(email, password, user_type)
    .then(result => {
      console.log('Result:', result);
      if (result.error) {
        console.log('Result:', result); 
        res.send(result);
        return;
      }
      req.session.userId = result.id;
      res.send(result);
    })
    .catch(e => {
    console.error('Error:', e); 

    res.send(e)
});
});


module.exports = router;