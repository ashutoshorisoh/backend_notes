const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const items = [
  { id: "1", name: "one" },
  { id: "2", name: "two" }
];

// GET route to fetch item by ID
app.get('/hey/:id', (req, res) => {
  const itemId = req.params.id; // Extract ID as a string
  const found = items.find(item => item.id === itemId); // Find item by ID

  if (!found) {
    return res.status(404).json({ error: "Item not found" });
  } else {
    res.json(found); // Respond with the found item
  }
});

// POST route to add a new item
app.post('/hey/posts', (req, res) => {
  console.log("req.body", req.body);
  const newItem = req.body;

  // Check if 'id' and 'name' are provided
  if (!newItem.id || !newItem.name) {
    return res.status(400).json({ error: "ID and name are required" });
  }

  // Check if the item already exists
  const existingItem = items.find(item => item.id === newItem.id);
  if (existingItem) {
    return res.status(400).json({ error: "Item with this ID already exists" });
  }

  // Add the new item to the array
  items.push(newItem);

  // Respond with the newly added item
  res.status(201).json(newItem);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
