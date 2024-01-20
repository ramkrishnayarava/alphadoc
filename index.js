const process=require('dotenv');
const express = require('express');
const axios = require('axios');
const {CONTANTS}=require("./constant");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define the endpoint for the API
app.get('/time-series-intraday', async (req, res) => {
  try {
    // Extract required parameters from the request
    const { function_type,symbol, interval, adjusted = true, extended_hours = true, month, outputsize = 'compact', datatype = 'json', apikey } = req.query;

    // Check if required parameters are provided
    if (!symbol || !interval || !apikey || !function_type) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Make a request to the external API (assuming you have the API URL)
    const apiUrl = CONTANTS.URL; // Replace with the actual URL
    const response = await axios.get(apiUrl, {
      params: {
        function: function_type,
        symbol:symbol,
        interval:interval,
        adjusted:adjusted,
        extended_hours:extended_hours,
        month:month,
        outputsize:outputsize,
        datatype:datatype,
        apikey:process.env.API,
      },
     
    });
    // console.log(apiUrl);

    // Return the response from the external API
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/quote-endpoint', async (req, res) => {
    try {
      // Extract required parameters from the request
      const { function_type,symbol, datatype = 'json', apikey } = req.query;
  
      // Check if required parameters are provided
      if (!symbol || !function_type || !apikey) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      // Make a request to the external API (assuming you have the API URL)
      const apiUrl = CONTANTS.URL; // Replace with the actual URL
      const response = await axios.get(apiUrl, {
        params: {
          function: function_type,
          symbol:symbol,
          datatype:datatype,
          apikey:CONTANTS.API,
        },
       
      });
      // console.log(apiUrl);
  
      // Return the response from the external API
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/ticker-search', async (req, res) => {
    try {
      // Extract required parameters from the request
      const { function_type,keywords, datatype = 'json', apikey } = req.query;
  
      // Check if required parameters are provided
      if (!keywords || !function_type || !apikey) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      // Make a request to the external API (assuming you have the API URL)
      const apiUrl = CONTANTS.URL; // Replace with the actual URL
      const response = await axios.get(apiUrl, {
        params: {
          function: function_type,
          keywords:keywords,
          datatype:datatype,
          apikey:CONTANTS.API,
        },
       
      });
      // console.log(apiUrl);
  
      // Return the response from the external API
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/global-market-status', async (req, res) => {
    try {
      // Extract required parameters from the request
      const { function_type, apikey } = req.query;
  
      // Check if required parameters are provided
      if (!function_type || !apikey) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      // Make a request to the external API (assuming you have the API URL)
      const apiUrl = CONTANTS.URL; // Replace with the actual URL
      const response = await axios.get(apiUrl, {
        params: {
          function: function_type,
          apikey:CONTANTS.API,
        },
       
      });
      // console.log(apiUrl);
  
      // Return the response from the external API
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
