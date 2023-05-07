const db = require('../connection');

const add_new_user = function(name, lastName, email, pass, user_type){

  
  const queryParam=[name, lastName, email, pass, user_type];

  return db.query(` INSERT INTO users(name, last_name, email, password,user_type)
  VALUES
    ($1,$2,$3,$4,$5)`, queryParam)
  
  .then((result) => {
    result.status(201).json({ message: 'New user added successfully' });

  })
  .catch((err) => {
    console.log("Error", err);
  });
};

module.exports = add_new_user;
