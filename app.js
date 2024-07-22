const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8000;

// Connect to the database
connectDB();


const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions)); 

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});