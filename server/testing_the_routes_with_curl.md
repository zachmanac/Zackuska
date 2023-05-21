
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
  "owner_id": 10,
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
WHY IS USER PASSED IN THE QUERY? 
app.get('/api/orders', order_for_user);//all the orders of the user given 
curl -X GET http://localhost:8080/api/orders?user_id=1
curl -X GET http://localhost:8080/api/orders
------------------------------------------------------------
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given
curl -X GET http://localhost:8080/api/trucks/1/orders
-----------------------------------------------------------
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given
curl -X GET http://localhost:8080/api/trucks/3/reviews
-----------------------------------------------------------
app.post('/api/cart/checkout', new_order);//add new order

curl -X POST -H "Content-Type: application/json" -d '{
  "user_id": 12,
  "truck_id": 4,
  "menu_items": [
    { "1": 2 },
    { "6": 1 }
  ],
  "total_amount": 25.99,
  "total_calories": 1200
}' http://localhost:8080/api/cart/checkout
-----------------------------------------------------------
app.get('/api/trucks/dashboard', get_truck_by_owner_id);
curl -X GET http://localhost:8080/api/trucks/dashboard
-----------------------------------------------------------
app.get('/api/trucks/:truck_id/pending_orders', pending_orders_for_truck);//get all pending orders
curl -X GET http://localhost:8080/api/trucks/1/pending_orders
------------------------------------------------------------
app.post('/api/trucks/:order_id/accepted', order_accepted_by_truck);

curl -X POST -H "Content-Type: application/json" -d '{
  "response": "10 minutes"
}' http://localhost:8080/api/trucks/19/accepted
-----------------------------------------------------------
app.post('/api/trucks/:order_id/declined', order_declined_by_truck);

curl -X POST -H "Content-Type: application/json" -d '{
  "response": "out of stock"
}' http://localhost:8080/api/trucks/21/declined
--------------------------------------------------------------
app.get('/api/orders/:order_id/status', get_order_status_for_customer);//get a given order
curl -X GET http://localhost:8080/api/orders/1/status
---------------------------------------------------------------
app.post('/api/trucks/:truck_id/schedules', new_schedule);//Create a new schedule itenerary record in the database 
curl -X POST -H "Content-Type: application/json" -d '{
  "date": "2023-05-16",
  "address": "12345 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "start_time": "09:00:00",
  "end_time": "12:00:00",
  "place_name": "Example Place"
}' http://localhost:8080/api/trucks/8/schedules
-------------------------------------------------------------------
app.get('/api/trucks/:truck_id/schedules', schedule);// Get the schedule of a given truck
curl -X GET http://localhost:8080/api/trucks/1/schedules
--------------------------------------------------------------------
app.post('/api/trucks/:order_id/ready',order_ready);
curl -X POST -H "Content-Type: application/json" -d '{
  "response": "ready to pick up"
}' http://localhost:8080/api/trucks/19/ready
--------------------------------------------------------------------
app.put('/api/trucks/menu_items/:item_id', edit_menu);//edit menu here the truck can retire/change the menu items

curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "New Name",
    "price": 9.99,
    "calories": 500,
    "allergens": "No allergens",
    "halal": true,
    "picture": "new_item.jpg",
    "description": "Updated item description",
    "quantity": 100,
    "active": true
  }' \
  http://localhost:8080/api/trucks/menu_items/11
--------------------------------------------------------------------
app.put('/api/trucks/:truck_id', edit_truck)//truck-owner can change the truck variables
curl -X PUT -H "Content-Type: application/json" -d '{
  
  "phone_number": "1234567890",
  "cuisine": "Updated Cuisine",
  "instagram": "updated_instagram",
  "facebook": "updated_facebook",
  "website": "updated_website",
  "picture": "updated_picture.jpg",
  "city": "Updated City"
}' http://localhost:8080/api/trucks/5
------------------------------------------------------------------
app.put('/api/trucks/schedules/:schedule_id', change_schedule)//truck can change their schedule

curl -X PUT -H "Content-Type: application/json" -d '{
  "date": "2023-05-19",
  "address": "Updated Address",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "start_time": "09:00:00",
  "end_time": "17:00:00",
  "place_name": "Updated Place"
}' http://localhost:8080/api/trucks/schedules/1
