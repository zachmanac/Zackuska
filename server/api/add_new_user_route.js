const express = require('express');
const router = express.Router();
const add_new_user= require('../database/queries/add_new_user');

//need to validate the user before adding, hash the passwords
router.post('/api/users', (req, res) => {
  console.log("new users params", req.body)
  const new_user=req.body;

add_new_user(new_user.name, new_user.last_name, new_user.email, new_user.password, new_user.user_type)
.then(()=>{
  console.log ("User added sucessfully")
  
})
     .catch(e => {
      console.error("Fail to add new user to database",e);
      res.send(e)
    });


});

module.exports = router;