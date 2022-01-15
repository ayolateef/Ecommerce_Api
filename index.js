const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require('./middleware/logger');

//Route files
const orders = require('./routes/orders')
const users = require('./routes/users')

dotenv.config();
// connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

app.use(logger);

// mount the routers
app.use('/api/v1/orders',orders);
app.use('/api/v1/users',users);



app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rej ections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  
  //close server & exit process
  server.close(() => process.exit(0));
});
