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
