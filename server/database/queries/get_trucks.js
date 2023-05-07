const db = require('../connection');

const listTrucks = function(){
  return db.query(`SELECT * FROM trucks`)
  
  .then((result) => {
    console.log(result.rows);//all trucks
    return result.rows;

  })
  .catch((err) => {
    console.log("Error", err);
  });
};

module.exports = listTrucks;
