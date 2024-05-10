const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Example route
app.get('/api/data', async (req, res) => {
  try {
    // Example of making a request to an external API using Axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/data/:nb', async (req, res) => {
    try {
      // Example of making a request to an external API using Axios
      const response = await axios.get(`http://localhost:3000/api/test/${req.params.nb}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(error.response.status).json({ error: error.response.data });
    }
  });

app.get('/api/test/:nb', async (req, res) => {
    try {
        let number = parseInt(req.params.nb);
        if(isNaN(number)){
            throw new Error("Not a number");
        }

        if(number%2 == 0){
            return res.status(200).json({ 
                statuscode: 0,
                data: 'Even Number' 
            });    
        } else if(number == 5){
            return res.status(400).json({ 
                statuscode: -1,
                data: "This is not allowed input. Please try with some other number." 
            });    
        } else{
            return res.status(500).json({ 
                statuscode: -1,
                data: 'Odd Number'
            });
        }
    } catch (error) {
        res.status(500).send(error.message || "Sorry can't find that!");
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
