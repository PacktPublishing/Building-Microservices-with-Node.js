const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simulated asynchronous function to fetch data
async function fetchData() {
  // Replace with actual data retrieval logic
  return { message: 'Data fetched successfully' };
}

// Example route using async/await
app.get('/api/resource', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});