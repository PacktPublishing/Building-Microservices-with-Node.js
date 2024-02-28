const nock = require('nock');

// Set up Nock to mock the API endpoint
nock('https://api.example.com')
  .get('/data')
  .reply(200, { data: 'Mocked data' });

// Your application code that makes an HTTP request to https://api.example.com/data
// ...

// Example usage (replace with your actual code)
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Call the fetchData function
fetchData();
