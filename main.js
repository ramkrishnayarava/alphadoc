const axios = require('axios');
const mongoose = require('mongoose');
const cron = require('node-cron');
const IntradayData=require('./model/IntraSchema');
const { CONTANTS } = require('./constant');
// Replace with your MongoDB connection string
const mongoDBConnectionString = 'YOUR_MONGO_DB_CONNECTION_STRING';

mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const apiBaseURL = 'https://www.alphavantage.co/query'; // Replace with the actual API base URL
const apiKey = CONTANTS.API;
const symbol = 'IBM';
const interval = '1min';

async function fetchAndStoreData() {
  try {
    const response = await axios.get(`${apiBaseURL}`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: interval,
        adjusted: true,
        extended_hours: true,
        outputsize: 'compact',
        datatype: 'json',
        apikey: apiKey,
      },
    });

    if (response.status === 200) {
      const data = response.data;
// console.log(data);
      if (data["Time Series ("+interval+")"]) {
        const intradayData = Object.entries(data["Time Series ("+interval+")"]).map(([timestamp, values]) => (
            // console.log(cleanObject(values))
        { timestamp: new Date(timestamp),
          ...cleanObject(values),
        }
        ));
        // console.log("intradayData",intradayData);
        await IntradayData.insertMany(intradayData);
        console.log('Data stored successfully.');
      } else {
        console.log('No intraday data found in the API response.');
      }
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function cleanObject(obj) {
    const result = {};
  
    for (const key in obj) {
      // Extract the part after the last space in the key
      const cleanedKey = key.substring(key.lastIndexOf(' ') + 1);
  
      // Set the cleaned key in the result object
      result[cleanedKey] = obj[key];
    }
  
    return result;
  }
  
//   

// Schedule the task to run every 1 minutes
cron.schedule('*/1 * * * *', async () => {
  await fetchAndStoreData();
});

// Uncomment the line below if you want to run the task immediately
fetchAndStoreData();
