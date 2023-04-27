# Food Truck Tracking App

## User Stories

### As a customer, I want to:

- View a list of food trucks and their menus
- Sort the list of food trucks by location, name, and ratings
- View the details of a food truck, including its menu, location, and hours of operation
- Place an order from a food truck's menu
- Make a payment for my order
- View my order history
- Write a review for a food truck

### As a food truck owner, I want to:

- Create a profile for my food truck
- Update my food truck's menu, location, and hours of operation
- Receive customer orders through the app
- View my order history
- View customer reviews of my food truck

## Database Structure

### User Table:

- UserID (PK)
- FirstName
- LastName
- Email
- Password
- UserType (Customer, Food Truck Owner)

### Food Truck Table:

- TruckID (PK)
- TruckName
- Description
- Menu
- Location
- OpenHours
- OwnerID (FK)

### Order Table:

- OrderID (PK)
- CustomerID (FK)
- TruckID (FK)
- OrderDate
- TotalAmount
- Status (Pending, Confirmed, Completed, Cancelled)

### Order Detail Table:

- OrderDetailID (PK)
- OrderID (FK)
- MenuItemName
- MenuItemPrice
- Quantity

### Review Table:

- ReviewID (PK)
- CustomerID (FK)
- TruckID (FK)
- Rating
- Comment

## Possible Additions:

- Allow customers to save their favorite food trucks or menu items for quick access in the future.
- Provide an option for customers to customize their order by adding notes or special requests.
- Allow food truck owners to specify the availability of menu items (e.g., some items may only be available on certain days or times).
- Provide a map view of food trucks based on their location, allowing customers to easily find nearby food trucks.
- Allow customers to track the status of their order (e.g., order confirmed, being prepared, on its way).
- Allow customers to rate their overall experience with a food truck (e.g., quality of food, service, value for money).
- Allow food truck owners to view analytics and insights into their business performance (e.g., number of orders, total revenue, popular menu items).
