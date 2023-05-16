
app.post('/api/users', new_user);// Add a new user

curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "secret",
  "user_type": "customer"
}' http://localhost:8080/api/users

curl -X POST -H "Content-Type: application/json" -d '{
  "name":"John",
  "email":"john@example.com",
  "last_name":"Smith",
  "password":"123",
  "user_type":"customer"
  }' http://localhost:8080/api/users

curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Ivette",
  "last_name": "Maria",
  "email": "ivette.maria@example.com",
  "password": "password123",
  "user_type": "owner"
}' http://localhost:8080/api/users

------------------------------------------------------------
app.post('/api/session', loginUser);// User Login

curl -X POST -H "Content-Type: application/json" -d '{
  "email": "ivette.maria@example.com",
  "password": "password123",
  "user_type": "owner"
}' http://localhost:8080/api/session

------------------------------------------------------------
app.delete('/api/session', logout);// User logout

curl -X DELETE http://localhost:8080/api/session

------------------------------------------------------------
DIDNT WORK
app.get('/api/me', user_with_id); //Get an user with a given id

curl -X GET "http://localhost:8080/api/me"
------------------------------------------------------------
//Fetch all trucks from the database
app.get('/api/trucks', trucks);

curl -X GET "http://localhost:8080/api/trucks"

------------------------------------------------------------
NEED TO VALIDATE USER_TYPE TO BE OWNER
app.post('/api/trucks', new_truck);//Create a new truck record in the database
curl -X POST -H "Content-Type: application/json" -d '{
  "owner_id": 9,
  "truck_name": "Food Truck",
  "phone_number": "1234560",
  "cuisine": "Mexican",
  "instagram": "https://www.instagram.com/foodtruckexample",
  "facebook": "https://www.facebook.com/foodtruckexample",
  "website": "https://www.foodtruckexample.com",
  "picture": "https://www.example.com/foodtruck.jpg",
  "city": "New York"
}' http://localhost:8080/api/trucks
------------------------------------------------------------
app.get('/api/trucks/:truck_id/menu_items', menu);// Get the menu of a given truck
curl -X GET "http://localhost:8080/api/trucks/5/menu_items"
------------------------------------------------------------
app.post('/api/trucks/:truck_id/menu_items', new_menu_item);//Create a new menu item record in the database 
//add new menu item in truck_id=1
curl -X POST -H "Content-Type: application/json" -d '{
  "item_name": "Example Item",
  "price": 10.99,
  "colories": 500,
  "allergens": ["nuts", "dairy"],
  "halal": true,
  "picture": "example.jpg",
  "description": "Example description",
  "item_label": "Example Label",
  "quantity": 5
}' http://localhost:8080/api/trucks/1/menu_items
-------------------------------------------------------------
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given 
curl -X GET http://localhost:8080/api/trucks/1/orders
--------------------------------------------------------------
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given 
curl -X GET "http://localhost:8080/api/trucks/1/reviews"
-------------------------------------------------------------
WHY IS USER PASSED IN THE QUERY
app.get('/api/orders', order_for_user);//all the orders of the user given 
curl -X GET http://localhost:8080/api/orders?user_id=1
------------------------------------------------------------
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given
curl -X GET http://localhost:8080/api/trucks/1/orders
-----------------------------------------------------------
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given
curl -X GET http://localhost:8080/api/trucks/3/reviews
-----------------------------------------------------------
app.post('/api/cart/checkout', new_order);//add new order
