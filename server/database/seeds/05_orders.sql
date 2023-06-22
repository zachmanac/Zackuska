INSERT INTO orders (customer_id, truck_id, status, total_amount, total_calories, date, response)
VALUES
  (1, 1, 'Accepted', 25.99, 500, '2023-05-01 10:30:00', '10 minutes'),
  (4, 2, 'Pending', 15.50, 300, '2023-05-02 12:45:00', 'waiting for the trucks response'),
  (4, 3, 'Declined', 10.75, 200, '2023-05-03 17:15:00', '20 minutes'),
  (4, 1, 'Cancelled', 8.99, 150, '2023-05-04 09:00:00', 'waiting for the trucks response'),
  (1, 2, 'Accepted', 12.25, 250, '2023-05-05 14:20:00', '10 minutes');