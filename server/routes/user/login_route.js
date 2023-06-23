const express = require('express');
const router = express.Router();
const queryCheckUser = require('../../database/queries/user/get_user_with_email');
const bcrypt = require('bcryptjs');
const session = require('express-session');

console.log('Code is executing...');

//Check if a user exists with a given username, userType and password
  
const login = async function(email, password, user_type) {
  const user = await queryCheckUser(email);
  
  //user from initial user seeds
  if (isSpecialUser(user) && password === 'password') {
    return user;
  }

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

const isSpecialUser = function(user) {
  // Check if the user is one of the pre-defined special users
  const specialUserEmails = [
    'sed.eget@outlook.org',
    'vitae.diam@yahoo.org',
    'integer@google.couk',
    'imperdiet.non@google.ca',
    'ac.turpis@google.edu',
    'ken@yahoo.org',
    'minumun@google.ca'
  ];

  return specialUserEmails.includes(user.email);
};

router.post('/api/session', (req, res) => {
  const {email, password, user_type} = req.body;
  req.session.testid = 'test';
  req.session.save(function(err) {

    login(email, password, user_type)
    .then(result => {
      console.log('Result: after login', result);
      req.session.userId = result.user_id;
      console.log("req.sessionafter login", req.session.userId);
      if (result.error) {
        console.log('Result: error', result); 
        res.send(result);
        return;
      }
      res.send(result);
    })
    .catch(e => {
    console.error('Error:', e); 

    res.send(e)
    });
  })
});


module.exports = router;